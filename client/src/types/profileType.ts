export type ProfileModelType = {
  id: number;
  name: string;
  age: number;
  gender: string;
  city: string;
  userId: number;
  description: string;
  photo: string;
};

export type ProfileType = ProfileModelType;
// | (ProfileModelType & { status: 'loaded' })
// | { status: 'loading' }
// | { status: 'unloaded' };
