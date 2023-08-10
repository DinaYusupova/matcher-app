export type UserInfoModelType = {
  name: string;
  age: number;
  gender: string;
  city: string;
  userAuthId: number;
  description: string;
};

export type UserInfoType =
  | (UserInfoModelType & { status: 'loaded' })
  | { status: 'loading' }
  | { status: 'unloaded' };
