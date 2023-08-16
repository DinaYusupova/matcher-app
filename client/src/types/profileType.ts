export type ProfileModelType = {
  id: number;
  name: string;
  age: number;
  gender: string;
  userLongitude: string;
  userLatitude: string;
  distanceBetweenUsers: null | number;
  userId: number;
  description: string;
  photos: null | string[];
};

export type ProfileType = ProfileModelType;
// | (ProfileModelType & { status: 'loaded' })
// | { status: 'loading' }
// | { status: 'unloaded' };
