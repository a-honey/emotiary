import { Response, NextFunction } from 'express';
import { fileUploadMiddleware } from './fileMiddleware';
import { IRequest } from '../types/user';
import { FileObjects } from '../types/upload';
import { emptyApiResponseDTO } from '../utils/emptyResult';
import { prisma } from '../../prisma/prismaClient';
import { generateError } from '../utils/errorGenerator';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

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
            generateError(400, 'upload error');
          } else if (err) {
            generateError(500, 'Internal server error');
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
                generateError(400, 'Files have different types');
              }
            }
          }

          const filePaths = files.map((file) => `fileUpload/${file.filename}`);

          if (type === 'profile') {
            if (req.files) {
              const { userId } = req.params;
              const foundUser = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                  profileImage: true,
                },
              });
              await prisma.fileUpload.deleteMany({
                where: {
                  userId: userId,
                },
              });

              if (!foundUser) {
                const response = emptyApiResponseDTO();
                return response;
              }
              const fileUploadCount = await prisma.fileUpload.count({
                where: {
                  userId,
                },
              });

              if (fileUploadCount >= 2) {
                throw new Error('최대 1개의 파일만 허용됩니다.');
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

              await prisma.fileUpload.createMany({
                data: profileImage,
              });
            }
          } else if (type === 'diary') {
            const { diaryId } = req.params;

            // 삭제할 데이터가 있을시
            if (req.body.deleteData) {
              const urlsToDelete = req.body.deleteData;

              await prisma.diaryFileUpload.deleteMany({
                where: {
                  url: {
                    in: urlsToDelete,
                  },
                },
              });

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
            }

            if (req.files) {
              if (files.length >= 2) {
                const firstFileType = files[0].mimetype;
                const areAllFilesSameType = files.every(
                  (file) => file.mimetype === firstFileType,
                );

                if (!areAllFilesSameType) {
                  generateError(400, 'Files have different types');
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

            await prisma.diaryFileUpload.createMany({
              data: FilesUpload,
            });
          } else if (type === 'postDiary') {
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
