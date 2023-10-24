export interface DiaryBodyType {
  title: string;
  content: string;
  is_public: string;
  emoji: string;
  createdDate: string;
  emotion: string;
}

export interface CommentBodyType {
  content: string;
  nestedComment?: string;
}
