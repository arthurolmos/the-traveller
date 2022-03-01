export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  isAdmin: boolean;
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
}
