export interface DiaryBodyType {
  title: string;
  content: string;
  is_public: string;
  createdDate: string;
}

export interface CommentBodyType {
  content: string;
  nestedComment?: string;
}
