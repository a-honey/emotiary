// 네트워크 페이지에서 다른 유저의 다이어리를 불러옴
export interface DairyItemType {
  diary_id: number;
  user_id: number;
  username: string;
  profileImage: string;
  title: string;
  dateCreated: Date;
  content: string;
  emoji: string;
}

// 마이 페이지에서 내 다이어리를 불러옴
export interface MyDairyItemType {
  diary_id: number;
  title: string;
  dateCreated: Date;
  emoji: string;
}
