import { IUser } from "./user";

export interface IDiary {
    id: string;
    authorId: string;
    createdDate: Date;
    title: string;
    content: string;
    is_public: string;
    emoji: string;
    createdAt: Date;
    updatedAt: Date;
    filesUpload: diaryFileUpload[];
}

export interface diaryFileUpload {
    url?: string;
    diary?: string;
    diaryId?: string;
    createdAt?: Date;
    deleteData? : string;
  }