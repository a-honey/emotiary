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

                if(files.length >= 2){
                    const firstFileType = files[0].mimetype;
                    const areAllFilesSameType = files.every((file) => file.mimetype === firstFileType);

                    if (!areAllFilesSameType) {

                        return res.status(400).json({ message: 'Files have different types' });
                    }

                }

                const filePaths = files.map((file) => `fileUpload/${file.filename}`);

                const { userId } = req.params;
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
                console.log(oldFiles);
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

                for (const file of FilesUpload) {
                    // 중복 검사: 파일 URL로 이미 존재하는 파일 찾기
                    const existingFile = await prisma.fileUpload.findFirst({
                        where: { url: file.url },
                    });
                
                    if (existingFile) {
                        // 파일 URL이 이미 존재하면 업데이트
                        await prisma.fileUpload.update({
                            where: { url: existingFile.url },
                            data: { userId: userId },
                        });
                    } else {
                        // 파일 URL이 존재하지 않으면 새로운 파일 엔트리 생성
                        await prisma.fileUpload.create({
                            data: file,
                        });
                    }
                }

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
                next();
            }catch(err){
                next(err);
            }
        });
    }catch(error){
        next(error);
    }
}