import { Timestamp } from 'firebase/firestore';
import { ICountry } from './ICountry';

export enum IPostStatus {
  PENDING_APPROVAL = 'Pending Approval',
  REJECTED = 'Rejected',
  APPROVED = 'Approved',
}

export interface IPost {
  id?: string;
  title: string;
  country: ICountry;
  text: string;
  author: {
    id: string;
    name: string;
  };
  status: IPostStatus;
  coverImage?: string;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  approvedAt?: Date | Timestamp;
}
