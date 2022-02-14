import { Timestamp } from 'firebase/firestore';

export enum IPostStatus {
  PENDING_APPROVAL = 'Pending Approval',
  REJECTED = 'Rejected',
  APPROVED = 'Approved',
}

export interface IPost {
  id?: string;
  title: string;
  text: string;
  authorId: string;
  authorName: string;
  status: IPostStatus;
  coverImage?: string;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  approvedAt?: Date | Timestamp;
}
