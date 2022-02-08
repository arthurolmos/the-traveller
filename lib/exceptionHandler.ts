export default function exceptionHandler(err) {
  if (err.name === 'FirebaseError') {
    if (err.code === 'auth/weak-password') {
      const str = err.message.substr(err.message.indexOf(' ') + 1);
      return str.replace(' (' + err.code + ')', '');
    }

    if (err.code === 'auth/email-already-in-use') {
      return 'Email already in use';
    }

    if (err.code === 'auth/invalid-email') {
      return 'Invalid email format';
    }
  }

  return err.message;
}
