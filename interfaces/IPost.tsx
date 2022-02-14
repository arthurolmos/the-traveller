export enum IPostStatus {
  PENDING_APPROVAL = 'Pending Approval',
  REJECTED = 'Rejected',
  APPROVED = 'Approved',
}

export interface IPost {
  id?: string;
  title: string;
  text: string;
  author: string;
  status: IPostStatus;
  coverImage?: string;
}
