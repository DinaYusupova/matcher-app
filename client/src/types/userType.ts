export type UserModelType = {
  id: number;
  name: string;
  email: string;
};
export type SignupUserType = Omit<UserModelType, 'id'> & { password: string };
export type SigninUserType = Omit<SignupUserType, 'name'>;
export type UserType =
  | (UserModelType & { status: 'logged' })
  | { status: 'loading' }
  | { status: 'guest' };
