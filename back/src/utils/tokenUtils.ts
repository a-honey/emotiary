import jwt from "jsonwebtoken";
import { IUser } from "../types/user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import jwtSecret from "../passport-config/jwtSecret";

export const generateAccessToken = (user: IUser): string => {
  const accessToken = jwt.sign({ id: user.id }, jwtSecret, {
    expiresIn: "3d",
  });
  return accessToken;
};

export const generateRefreshToken = (user: IUser): string => {
  const refreshToken = jwt.sign({ id: user.id }, jwtSecret, {
    expiresIn: "30d", // 예: 30일
  });
  return refreshToken;
};

export const storeRefreshTokenInDatabase = async (
  userId: string,
  refreshToken: string
): Promise<void> => {
  try {
    await prisma.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const verifyRefreshToken = async (
  refreshToken: string
): Promise<string> => {
  try {
    const refreshTokenData = await prisma.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!refreshTokenData) {
      return null;
    }

    return refreshTokenData.userId;
  } catch (error) {
    throw error;
  }
};
