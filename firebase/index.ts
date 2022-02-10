import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import initAuth from './auth';

initializeApp(firebaseConfig);
initAuth();
