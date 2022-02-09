import React from 'react';
import MainContainer from '../../components/layout/MainContainer';
import PageComponent from '../../components/layout/PageComponent';
import DefaultInput from '../../components/input/DefaultInput';
import DefaultButton from '../../components/buttons/DefaultButton';
import { toast } from 'react-toastify';
import exceptionHandler from '../../lib/exceptionHandler';
import { useRouter } from 'next/router';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  SignFormStyled,
  SpinnerContainerStyled,
} from '../../styles/pages/SignIn';
import Link from 'next/link';
import { BeatLoaderSpinner } from '../../components/spinners/BeatLoader';

export function SignIn() {
  const auth = getAuth();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if ([email, password].every((item) => item !== '')) {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);

        setLoading(false);
        router.push('/');
      } else {
        throw new Error('Fill all fields!');
      }
    } catch (err) {
      setLoading(false);

      const message = exceptionHandler(err);
      toast.warn(message);
    }
  };

  return (
    <MainContainer title="Sign In">
      <PageComponent title="Sign In">
        <SignFormStyled>
          <DefaultInput
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <DefaultInput
            type="new-password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {loading ? (
            <SpinnerContainerStyled>
              <BeatLoaderSpinner loading={loading} />
            </SpinnerContainerStyled>
          ) : (
            <DefaultButton title="Create Account" inverted onClick={submit} />
          )}
        </SignFormStyled>

        <p style={{ textAlign: 'center' }}>
          Don`t have an account? <Link href="/signin">Click here!</Link>
        </p>
      </PageComponent>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser()(SignIn);
