import { Timestamp } from 'firebase/firestore';
import { ICountry } from './ICountry';

export interface IGuide {
  id?: string;
  title: string;
  country?: ICountry;
  text: string;
  author: {
    id: string;
    name: string;
  };
  coverImage?: string;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}
