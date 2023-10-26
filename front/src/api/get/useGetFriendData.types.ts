export interface ReceivedUserDataType {
  receivedUser: {
    id: string;
    username: string;
    filesUpload: { url: string }[];
  };
}

// 받은 친구요청 리스트
export interface sentUserDataType {
  sentUser: { id: string; username: string; filesUpload: { url: string }[] };
}
