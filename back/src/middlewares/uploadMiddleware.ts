import { Response, NextFunction } from 'express';
import { PrismaClient } from '.prisma/client';
import { fileUploadMiddleware } from './fileMiddleware';
import { IRequest } from '../types/user';
import { FileObjects } from '../types/upload';
import { emptyApiResponseDTO } from '../utils/emptyResult';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

const handleFileUpload = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
  type: 'profile' | 'diary' | 'postDiary',
) => {
  try {
    await prisma.$transaction(async () => {
      fileUploadMiddleware(req, res, async (err: any) => {
        try {
          if (err instanceof multer.MulterError) {
            return res
              .status(400)
              .json({ message: 'upload error', error: err.message });
          } else if (err) {
            return res
              .status(500)
              .json({ message: 'Internal server error', error: err.message });
          }

          const files: FileObjects[] = req.files
            ? ([] as FileObjects[]).concat(...Object.values(req.files))
            : [];

          if (type === 'profile' || type === 'postDiary') {
            if (files.length >= 2) {
              const firstFileType = files[0].mimetype;
              const areAllFilesSameType = files.every(
                (file) => file.mimetype === firstFileType,
              );

              if (!areAllFilesSameType) {
                return res
                  .status(400)
                  .json({ message: 'Files have different types' });
              }
            }
          }

          const filePaths = files.map((file) => `fileUpload/${file.filename}`);

          if (type === 'profile') {
            const { userId } = req.params;
            const fileUploadCount = await prisma.fileUpload.count({
              where: {
                userId,
              },
            });

            if (fileUploadCount >= 1) {
              throw new Error('최대 1개의 파일만 허용됩니다.');
            }
            const foundUser = await prisma.user.findUnique({
              where: { id: userId },
              include: {
                profileImage: true,
              },
            });

            if (!foundUser) {
              const response = emptyApiResponseDTO();
              return response;
            }

            const oldFiles = foundUser.profileImage;

            if (oldFiles) {
              oldFiles.forEach(async (file) => {
                const filenameToDelete = file.url.replace('fileUpload/', '');
                const filePathToDelete = path.join(
                  './fileUpload',
                  filenameToDelete,
                );

                fs.unlink(filePathToDelete, async (err) => {
                  if (err) {
                    console.error('Error deleting old file:', err);
                    next(err);
                  }
                });
              });
            }

            const profileImage = filePaths.map((filename) => ({
              url: filename,
              userId: userId,
            }));

            await prisma.fileUpload.deleteMany({
              where: {
                userId: userId,
              },
            });

            await prisma.fileUpload.createMany({
              data: profileImage,
            });
          } else if (type === 'diary') {
            const { diaryId } = req.params;

            // 삭제할 데이터가 있을시
            if (req.body.deleteData) {
              const urlsToDelete = req.body.deleteData;

              // Delete files from disk storage
              urlsToDelete.forEach(async (url: string) => {
                const filenameToDelete = url.replace('fileUpload/', '');
                const filePathToDelete = path.join(
                  './fileUpload',
                  filenameToDelete,
                );

                fs.unlink(filePathToDelete, async (err) => {
                  if (err) {
                    console.error('Error deleting old file:', err);
                    next(err);
                  }
                });
              });

              await prisma.diaryFileUpload.deleteMany({
                where: {
                  url: {
                    in: urlsToDelete,
                  },
                },
              });
            }

            if (req.files) {
              if (files.length >= 2) {
                const firstFileType = files[0].mimetype;
                const areAllFilesSameType = files.every(
                  (file) => file.mimetype === firstFileType,
                );

                if (!areAllFilesSameType) {
                  return res
                    .status(400)
                    .json({ message: 'Files have different types' });
                }
              }
            }

            const fileUploadCount = await prisma.diaryFileUpload.count({
              where: {
                diaryId,
              },
            });

            if (fileUploadCount >= 5) {
              throw new Error('최대 5개의 파일만 허용됩니다.');
            }

            const foundDiary = await prisma.diary.findUnique({
              where: { id: diaryId },
              include: {
                filesUpload: true,
              },
            });

            if (!foundDiary) {
              const response = emptyApiResponseDTO();
              return response;
            }

            const FilesUpload = filePaths.map((filename) => ({
              url: filename,
              diaryId: diaryId,
            }));

            // Create new diary file records
            await prisma.diaryFileUpload.createMany({
              data: FilesUpload,
            });
          } else if (type === 'postDiary') {
            // Handle post diary file upload
            const userId = req.user.id;
            const foundDiary = await prisma.user.findUnique({
              where: { id: userId },
            });

            if (!foundDiary) {
              const response = emptyApiResponseDTO();
              return response;
            }

            const FilesUpload = filePaths.map((filename) => ({
              url: filename,
            }));

            await prisma.diaryFileUpload.createMany({
              data: FilesUpload,
            });

            res.locals.myData = [];

            for (const file of files) {
              res.locals.myData.push(`fileUpload/${file.filename}`);
            }
          }
          next();
        } catch (error) {
          next(error);
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

export const fileUpload = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  handleFileUpload(req, res, next, 'profile');
};

export const diaryUpload = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  handleFileUpload(req, res, next, 'diary');
};

export const postDiaryUpload = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  handleFileUpload(req, res, next, 'postDiary');
};

// export const fileUpload = async (
//   req: IRequest,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     fileUploadMiddleware(req, res, async (err: any) => {
//       try {
//         if (err instanceof multer.MulterError) {
//           return res
//             .status(400)
//             .json({ message: 'upload error', error: err.message });
//         } else if (err) {
//           return res
//             .status(500)
//             .json({ message: 'Internal server error', error: err.message });
//         }
//         const files: FileObjects[] = req.files
//           ? ([] as FileObjects[]).concat(...Object.values(req.files))
//           : [];

//         if (files.length >= 2) {
//           const firstFileType = files[0].mimetype;
//           const areAllFilesSameType = files.every(
//             (file) => file.mimetype === firstFileType,
//           );

//           if (!areAllFilesSameType) {
//             return res
//               .status(400)
//               .json({ message: 'Files have different types' });
//           }
//         }
//         const filePaths = files.map((file) => `fileUpload/${file.filename}`);

//         const { userId } = req.params;
//         const foundUser = await prisma.user.findUnique({
//           where: { id: userId },
//           include: {
//             profileImage: true,
//           },
//         });
//         console.log(1);
//         console.log(foundUser);
//         if (!foundUser) {
//           const response = emptyApiResponseDTO();
//           return response;
//         }

//         const oldFiles = foundUser.profileImage;
//         console.log(1);
//         if (oldFiles) {
//           console.log(1);
//           oldFiles.forEach(async (file) => {
//             const filenameToDelete = file.url.replace('fileUpload/', '');
//             const filePathToDelete = path.join(
//               './fileUpload',
//               filenameToDelete,
//             );

//             fs.unlink(filePathToDelete, async (err) => {
//               if (err) {
//                 console.error('Error deleting old file:', err);
//                 next(err);
//               }
//             });
//           });
//         }
//         console.log(1);
//         const profileImage = filePaths.map((filename) => ({
//           url: filename,
//           userId: userId,
//         }));
//         console.log(1);
//         // 기존 파일 업로드를 모두 삭제
//         await prisma.fileUpload.deleteMany({
//           where: {
//             userId: userId,
//           },
//         });

//         // 새로 업로드한 파일들을 생성
//         await prisma.fileUpload.createMany({
//           data: profileImage,
//         });
//         next();
//       } catch (err) {
//         next(err);
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const diaryUpload = async (
//   req: IRequest,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     fileUploadMiddleware(req, res, async (err: any) => {
//       try {
//         if (err instanceof multer.MulterError) {
//           return res
//             .status(400)
//             .json({ message: 'upload error', error: err.message });
//         } else if (err) {
//           return res
//             .status(500)
//             .json({ message: 'Internal server error', error: err.message });
//         }
//         const files: FileObjects[] = req.files
//           ? ([] as FileObjects[]).concat(...Object.values(req.files))
//           : [];

// if (req.body.deleteData) {
//   const urlsToDelete = req.body.deleteData;

//   // Delete files from disk storage
//   urlsToDelete.forEach(async (url: string) => {
//     const filenameToDelete = url.replace('fileUpload/', '');
//     const filePathToDelete = path.join(
//       './fileUpload',
//       filenameToDelete,
//     );

//     fs.unlink(filePathToDelete, async (err) => {
//       if (err) {
//         console.error('Error deleting old file:', err);
//         next(err);
//       }
//     });
//   });

//   await prisma.diaryFileUpload.deleteMany({
//     where: {
//       url: {
//         in: urlsToDelete,
//       },
//     },
//   });
// }
// if (req.files) {
//   if (files.length >= 2) {
//     const firstFileType = files[0].mimetype;
//     const areAllFilesSameType = files.every(
//       (file) => file.mimetype === firstFileType,
//     );

//     if (!areAllFilesSameType) {
//       return res
//         .status(400)
//         .json({ message: 'Files have different types' });
//     }
//   }

//           const filePaths = files.map((file) => `fileUpload/${file.filename}`);

//           const { diaryId } = req.params;
//           const fileUploadCount = await prisma.diaryFileUpload.count({
//             where: {
//               diaryId: diaryId,
//             },
//           });
//           if (fileUploadCount >= 5) {
//             throw new Error('최대 5개의 파일만 허용됩니다.');
//           }

//           const foundDiary = await prisma.diary.findUnique({
//             where: { id: diaryId },
//             include: {
//               filesUpload: true,
//             },
//           });
//           if (!foundDiary) {
//             const response = emptyApiResponseDTO();
//             return response;
//           }
//           const FilesUpload = filePaths.map((filename) => ({
//             url: filename,
//             diaryId: diaryId,
//           }));
//           // 새로 업로드한 파일들을 생성
//           await prisma.diaryFileUpload.createMany({
//             data: FilesUpload,
//           });
//         }
//         next();
//       } catch (err) {
//         next(err);
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const postDiaryUpload = async (
//   req: IRequest,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     fileUploadMiddleware(req, res, async (err: any) => {
//       try {
//         if (err instanceof multer.MulterError) {
//           return res
//             .status(400)
//             .json({ message: 'upload error', error: err.message });
//         } else if (err) {
//           return res
//             .status(500)
//             .json({ message: 'Internal server error', error: err.message });
//         }
//         const files: FileObjects[] = req.files
//           ? ([] as FileObjects[]).concat(...Object.values(req.files))
//           : [];
//         if (req.files) {
//           if (files.length >= 2) {
//             const firstFileType = files[0].mimetype;
//             const areAllFilesSameType = files.every(
//               (file) => file.mimetype === firstFileType,
//             );

//             if (!areAllFilesSameType) {
//               return res
//                 .status(400)
//                 .json({ message: 'Files have different types' });
//             }
//           }

//           const filePaths = files.map((file) => `fileUpload/${file.filename}`);

//           const userId = req.user.id;
//           const foundDiary = await prisma.user.findUnique({
//             where: { id: userId },
//           });
//           if (!foundDiary) {
//             const response = emptyApiResponseDTO();
//             return response;
//           }

//           const FilesUpload = filePaths.map((filename) => ({ url: filename }));

//           // 새로 업로드한 파일들을 생성
//           await prisma.diaryFileUpload.createMany({
//             data: FilesUpload,
//           });

//           res.locals.myData = [];

//           // 파일 URL을 배열에 추가
//           for (const file of files) {
//             res.locals.myData.push(`fileUpload/${file.filename}`);
//           }
//         }
//         next();
//       } catch (err) {
//         next(err);
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };
