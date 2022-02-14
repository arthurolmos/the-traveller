import { Timestamp } from 'firebase/firestore';

export default function convertTimestampToDate(timestamp: Date) {
  const time = Timestamp.fromDate(timestamp);
}
