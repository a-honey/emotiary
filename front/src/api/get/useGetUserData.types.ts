export interface MyUserDataType {
  email: string;
  username: string;
  id: string;
  description: string;
  latestEmoji: string;
  alarmSetting: string;
  filesUpload: { url: string }[];
}

export interface UserItemType {
  id: string;
  username: string;
  email: string;
  description: string;
  filesUpload: FileDataType[];
  latestEmoji: string;
  isFriend: boolean;
}

interface FileDataType {
  id: number;
  url: string;
}
