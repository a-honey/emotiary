export interface MyUserDataType {
  email: string;
  username: string;
  id: string;
  description: string;
  latestEmoji: string;
  alarmSetting: string;
  profileImage: { url: string }[];
}

export interface UserItemType {
  id: string;
  username: string;
  email: string;
  description: string;
  profileImage: FileDataType[];
  latestEmoji: string;
  isFriend: boolean;
}

interface FileDataType {
  id: number;
  url: string;
}
