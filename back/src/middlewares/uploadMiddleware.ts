import { Response, NextFunction } from "express";
import { PrismaClient } from ".prisma/client";
import { uploadMiddleware } from "./fileMiddleware";
import { IRequest } from "../types/user";
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
  
        // 파일 업로드 성공 시 파일 정보를 req.body에 저장
        // const imageFile = (req as any).file;
        if (!imageFile) {
          return res.status(400).json({ message: "No file uploaded" });
        }
  
        // Prisma를 사용하여 파일 정보를 저장
        const { userId } = req.params;
        const imagePath = `imageUpload/${imageFile.filename}`;
        if (!userId) {
          return res.status(404).json({ message: "User not found" });
        }
  
        const foundUser = await prisma.user.findUnique({
          where: { id: userId },
        });
  
        if (!foundUser) {
          return res.status(404).json({ message: "User not found" });
        }
  
        // 이미지 업로드 시 기존 이미지 파일 삭제 및 새 이미지 정보 저장
        const oldImage = foundUser.profileImage;
        if (oldImage) {
          // 기존 이미지 파일 삭제
          const filenameToDelete = oldImage.replace("imageUpload/", "");
          const filePathToDelete = path.join("./imageUpload", filenameToDelete);
          // 파일 삭제 시도
          fs.unlink(filePathToDelete, async (err) => {
            if (err) {
              console.error("Error deleting old file:", err);
              next(err);
            } 
            try {
                // 이미지 정보를 업데이트합니다.
                const updatedUser = await prisma.user.update({
                  where: { id: userId },
                  data: {
                    profileImage: imagePath,
                  },
                });
                next();
            } catch (error) {
                next(error);
            }
        });
        }
      });
    } catch (error) {
      next(error);
    }
};