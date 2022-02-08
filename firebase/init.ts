// ./initAuth.js
import { initializeApp } from 'firebase/app';
import { init } from 'next-firebase-auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC6pbpJKRQOi_iIRjw-nw1c6VWXgMSC50E',
  authDomain: 'the-traveller-b17d4.firebaseapp.com',
  projectId: 'the-traveller-b17d4',
  storageBucket: 'the-traveller-b17d4.appspot.com',
  messagingSenderId: '841764313667',
  appId: '1:841764313667:web:e6254f12d3e783ef8bd2f6',
  measurementId: 'G-K2WMWLDPQ6',
};

const initAuth = () => {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/signin', // required
    logoutAPIEndpoint: '/api/signout', // required
    onLoginRequestError: (err) => {
      console.error(err);
    },
    onLogoutRequestError: (err) => {
      console.error(err);
    },
    // firebaseAuthEmulatorHost: 'localhost:9099',
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'my-example-app-id',
        clientEmail: 'example-abc123@my-example-app.iam.gserviceaccount.com',
        // The private key must not be accessible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
      databaseURL: 'https://my-example-app.firebaseio.com',
    },
    // Use application default credentials (takes precedence over fireaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: true,
    firebaseClientInitConfig: {
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId,
      appId: firebaseConfig.appId,
      measurementId: firebaseConfig.measurementId,
      databaseURL: 'https://my-example-app.firebaseio.com',
    },
    cookies: {
      name: 'ExampleApp', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: false, // set this to false in local (non-HTTPS) development
      signed: false,
    },
    onVerifyTokenError: (err) => {
      console.error(err);
    },
    onTokenRefreshError: (err) => {
      console.error(err);
    },
  });
};

initializeApp(firebaseConfig);
initAuth();
