export type ProfileModelType = {
  id: number;
  name: string;
  age: number;
  gender: string;
  userLongitude: number;
  userLatitude: number;
  distanceBetweenUsers: number, 
  userId: number;
  description: string;
  photo: string;
};

export type ProfileType = ProfileModelType;
// | (ProfileModelType & { status: 'loaded' })
// | { status: 'loading' }
// | { status: 'unloaded' };
