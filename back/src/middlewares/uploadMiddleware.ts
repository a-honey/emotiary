import { Response, NextFunction } from "express";
import { PrismaClient } from ".prisma/client";
import { fileUploadMiddleware } from "./fileMiddleware";
import { IRequest } from "../types/user";
import { FileObjects } from "../types/upload";
import { emptyApiResponseDTO } from "../utils/emptyResult";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

export const fileUpload = async (req : IRequest, res : Response, next : NextFunction) => {
    try{
        fileUploadMiddleware(req,res,async(err : any)=> {
            try{
                if (err instanceof multer.MulterError) {
                    return res
                        .status(400)
                        .json({ message: 'Image upload error', error: err.message });
                } else if (err) {
                    return res
                        .status(500)
                        .json({ message: 'Internal server error', error: err.message });
                }
                const files: FileObjects[] = req.files ? ([] as FileObjects[]).concat(...Object.values(req.files)) : [];

                const { userId } = req.params;
                const filePaths = files.map((file) => `fileUpload/${file.filename}`);
                const foundUser = await prisma.user.findUnique({
                    where: { id: userId },
                    include : {
                        filesUpload : true,
                    }
                });

                if (!foundUser) {
                    const response = emptyApiResponseDTO();
                    return response;
                }

                const oldFiles = foundUser.filesUpload;
                if(oldFiles){
                    oldFiles.forEach(async(file) => {
                        const filenameToDelete = file.url.replace('fileUpload/', '');
                        const filePathToDelete = path.join('./fileUpload', filenameToDelete);

                        fs.unlink(filePathToDelete, async(err) => {
                            if(err){
                                console.error('Error deleting old file:', err);
                                next(err);
                            }
                        });
                    });
                }
                const FilesUpload = filePaths.map((filename) => ({ url: filename, userId : userId }));
                console.log(FilesUpload);

                // 기존 파일 업로드를 모두 삭제
                await prisma.fileUpload.deleteMany({
                    where: {
                        userId: userId,
                    },
                });

                // 새로 업로드한 파일들을 생성
                await prisma.fileUpload.createMany({
                    data: FilesUpload,
                });


                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    include: {
                      filesUpload: true, // filesUpload 필드 포함
                    },
                });
              
                if (user) {
                    const filesUpload = user.filesUpload;
                    console.log('프로필 이미지 목록:', filesUpload);
                  
                    // 각 이미지에 접근하려면 URL을 사용할 수 있습니다.
                    filesUpload.forEach((file) => {
                      console.log('이미지 URL:', file.url);
                    });
                } else {
                    console.log('사용자를 찾을 수 없습니다.');
                }
          
                next();
            }catch(err){
                next(err);
            }
        });
    }catch(error){
        next(error);
    }
}