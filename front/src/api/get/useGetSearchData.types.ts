export interface SearchUserType {
  id: string;
  username: string;
  email: string;
  description: string;
  profileImage: { url: string }[];
  isFriend: false;
}
