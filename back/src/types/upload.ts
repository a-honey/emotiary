interface FileObjects {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
}

interface FileRequest {
    file?: FileObjects;
    files?: { [fieldname: string]: FileObjects[] };
    uploadFile?: string[];
    reviewId?: string;
    userId?: string;
}

export { FileObjects, FileRequest };
