import React from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { MainContainer, PageComponent } from '../../components/layouts';
import { DefaultInput } from '../../components/inputs';
import { DefaultButton } from '../../components/buttons';
import { toast } from 'react-toastify';
import exceptionHandler from '../../lib/exceptionHandler';
import { useRouter } from 'next/router';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { SpinnerContainerStyled } from '../../styles/pages/SignUp';
import Link from 'next/link';
import { BeatLoaderSpinner } from '../../components/spinners/BeatLoader';
import SignForm from '../../components/forms/SignForm';
import { db } from '../../firebase/db';
import { doc, setDoc } from 'firebase/firestore';

export function SignUp() {
  const auth = getAuth();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        [firstName, lastName, email, password, confirmPassword].every(
          (item) => item !== ''
        )
      ) {
        if (password !== confirmPassword)
          throw new Error('Passwords not matching!');

        setLoading(true);

        // Creates the user on Auth
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Updates Auth profile
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });

        // Creates user on DB
        await setDoc(doc(db, 'users', user.uid), {
          firstName,
          lastName,
          email,
          isAdmin: false,
        });

        setLoading(false);
        router.push('/');
      } else {
        throw new Error('Fill all fields!');
      }
    } catch (err) {
      console.error({ err });

      setLoading(false);

      const message = exceptionHandler(err);
      toast.warn(message);
    }
  };

  return (
    <MainContainer title="Sign Up">
      <PageComponent title="Sign Up">
        <SignForm onSubmit={submit}>
          <DefaultInput
            value={firstName}
            placeholder="First Name"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <DefaultInput
            value={lastName}
            placeholder="Last Name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />

          <DefaultInput
            value={email}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <DefaultInput
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <DefaultInput
            style={{
              borderColor: password === confirmPassword ? 'lightgreen' : 'red',
            }}
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {loading ? (
            <SpinnerContainerStyled>
              <BeatLoaderSpinner loading={loading} />
            </SpinnerContainerStyled>
          ) : (
            <DefaultButton title="Create Account" inverted onClick={submit} />
          )}
        </SignForm>

        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link href="/signin">Click here!</Link>
        </p>
      </PageComponent>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser()(SignUp);
