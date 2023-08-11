export type UserModelType = {
  id: number;
  email: string;
};
export type SignupUserType = Omit<UserModelType, 'id'> & { password: string };
export type SigninUserType = SignupUserType
export type UserType =
  | (UserModelType & { status: 'logged' })
  | { status: 'loading' }
  | { status: 'guest' };
