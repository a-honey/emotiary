type UserDataType = 'receivedUser' | 'sentUser';

export type GetFriendReqDataType = {
  [x in UserDataType]: FriendReqCommonResponseType;
};

export interface FriendReqCommonResponseType {
  id: string;
  username: string;
  filesUpload: { url: string }[];
}
