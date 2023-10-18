import { PrismaClient, Prisma } from "@prisma/client";
import { sendEmail } from "../utils/email";
import { generateRandomPassowrd } from "../utils/password";
import bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";
import { userResponseDTO } from "../dtos/userDTO";
import { successApiResponseDTO } from "../utils/successResult";

const prisma = new PrismaClient();

export const createUser = async (inputData: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const { username, password, email } = inputData;

    // 비밀번호를 해시하여 저장 (안전한 비밀번호 저장)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성 및 저장
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, email },
    });


    const UserResponseDTO = plainToClass(userResponseDTO, user,{
      excludeExtraneousValues : true,
    });

    const response = successApiResponseDTO(UserResponseDTO);
    return response;
  } catch (error) {
    throw error;
  }
};

export const myInfo = async (userId: string) => {
  try {
    // 사용자 ID를 기반으로 내 정보 조회
    const myInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const UserResponseDTO = plainToClass(userResponseDTO, myInfo,{
      excludeExtraneousValues : true,
    });

    const response = successApiResponseDTO(UserResponseDTO);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (userId: string) => {
  try {
    // 사용자 ID를 기반으로 사용자 정보 조회
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const response = successApiResponseDTO(userInfo);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserService = async (
  userId: string,
  inputData : Prisma.UserUpdateInput,
) => {
  try {
    if (inputData.password) {
      delete inputData.password; // 비밀번호는 여기서 업데이트하지 않음
    }
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

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: inputData,
    });
    const response = successApiResponseDTO(updatedUser);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUserService = async (userId: string) => {
  try {
    // 해당 사용자의 Refresh Token 삭제
    await prisma.refreshToken.deleteMany({
      where: {
        userId: userId,
      },
    });

    // 사용자 삭제
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return "사용자가 삭제되었습니다.";
  } catch (error) {
    throw error;
  }
};

export const forgotUserPassword = async (email: string) => {
  try {
    // 임시 비밀번호 생성
    const tempPassword = generateRandomPassowrd();
    const saltRounds = 10;

    // 임시 비밀번호를 해시하여 저장
    const hashedPassword = await bcrypt.hash(tempPassword, saltRounds);

    // 사용자의 비밀번호를 업데이트하여 초기화
    await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword },
    });

    // 사용자에게 임시 비밀번호를 이메일로 전송
    await sendEmail(
      email,
      "비밀번호 재설정",
      `임시 비밀번호 : ${tempPassword}`
    );
  } catch (error) {
    throw error;
  }
};

export const resetUserPassword = async (email: string, password: string) => {
  try {
    const saltRounds = 10;

    // 새로운 비밀번호를 해시하여 저장
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 사용자의 비밀번호를 업데이트하여 재설정
    await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword },
    });
  } catch (error) {
    throw error;
  }
};

export const getUserFromDatabase = async (userId: string) => {
  try {
    // 데이터베이스에서 해당 사용자 정보 조회
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id : true,
        username: true,
        email: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

// 내 아이디 for문돌리는 id
export const areUsersFriends = async (userId1 : string, userId2 : string) => {
  try{
    const friendShip = await prisma.friend.findFirst({
      where : {
        OR : [
          {
            sentUserId : userId1,
            receivedUserId : userId2,
          },
          {
            sentUserId : userId2,
            receivedUserId : userId1,
          },
        ]
      }
    });
    if(userId1 === userId2){
      return true;
    }else{
      return !!friendShip;
    }
  }catch(error){
    throw error;
  }
}