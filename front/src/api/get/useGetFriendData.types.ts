export interface ResponseFriendType {
  data: ReceivedUserDataType[];
  message: string;
  status: number;
}

export interface ReceivedUserDataType {
  id: string;
  username: string;
  profileImage: string | null;
}
