import { Response, NextFunction } from "express";
import { PrismaClient } from ".prisma/client";
import { uploadMiddleware } from "./fileMiddleware";
import { IRequest } from "../types/user";
import { emptyApiResponseDTO } from "../utils/emptyResult";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

// 파일 업로드 및 Prisma 처리 미들웨어
export const fileUpload = async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // 파일 업로드 처리
      uploadMiddleware(req, res, async (err: any) => {
        // 파일 업로드 성공 시 파일 정보를 req.body에 저장
        const imageFile = (req as any).file;
        if (err instanceof multer.MulterError) {
          return res
            .status(400)
            .json({ message: "File upload error", error: err.message });
        } else if (err) {
          return res
            .status(500)
            .json({ message: "Internal server error", error: err.message });
        }
  
        if (imageFile) {
          // Prisma를 사용하여 파일 정보를 저장
        const { userId } = req.params;
        const imagePath = `imageUpload/${imageFile.filename}`;
  
        const foundUser = await prisma.user.findUnique({
          where: { id: userId },
        });
  
        if (!foundUser) {
          const response = emptyApiResponseDTO();
          return response;
        }
  
        // 이미지 업로드 시 기존 이미지 파일 삭제 및 새 이미지 정보 저장
        const oldImage = foundUser.profileImage;
        if (oldImage) {
          console.log(3);
          console.log(oldImage);
          // 기존 이미지 파일 삭제
          const filenameToDelete = oldImage.replace("imageUpload/", "");
          const filePathToDelete = path.join("./imageUpload", filenameToDelete);
          // 파일 삭제 시도
          fs.unlink(filePathToDelete, async (err) => {
            if (err) {
              console.error("Error deleting old file:", err);
              next(err);
            } 
            else{
              await prisma.user.update({
                where: { id: userId },
                data: {
                  profileImage: imagePath,
                },
              });
            }
        });
        }
        req.body.profileImage = imagePath; 
        }
        next();
      });
    } catch (error) {
      next(error);
    }
};