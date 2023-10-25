export interface DiaryItemType {
  id: string;
  authorId: string;
  createdDate: Date;
  title: string;
  content: string;
  is_public: 'private' | 'friend' | 'all';
  emoji: string;
  favoriteCount: number;
  author: {
    id: string;
    username: string;
    email: string;
    profileImgae: string;
  };
}
export interface PaginationType {
  totalItem: number;
  totalPage: number;
  currentPage: number;
  limit: number;
}
