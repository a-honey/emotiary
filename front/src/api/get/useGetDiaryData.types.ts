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
    profileImage: { url: string }[];
  };
  fileUpload: { url: string }[];
}
