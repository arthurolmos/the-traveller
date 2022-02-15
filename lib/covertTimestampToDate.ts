import { Timestamp } from 'firebase/firestore';

export default function convertTimestampToDate(timestamp: Timestamp) {
  const date = timestamp.toDate().toLocaleString();

  console.log({ date });

  return date;
}
