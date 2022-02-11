import React from 'react';
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import DefaultInput from '../../components/input/DefaultInput';
import MainContainer from '../../components/layout/MainContainer';
import PageComponent from '../../components/layout/PageComponent';
import DefaultForm from '../../components/form/DefaultForm';
import QuillInput from '../../components/input/QuillInput';
import DefaultButton from '../../components/buttons/DefaultButton';
import { BeatLoaderSpinner } from '../../components/spinners/BeatLoader';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/db';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export function NewPost() {
  const router = useRouter();
  const AuthUser = useAuthUser();
  const uid = AuthUser.id;

  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, `posts`), {
        uid,
        title,
        text,
        review: true,
      });

      toast.success(`Document written with ID: ${docRef.id}`);

      setLoading(false);

      router.push('/posts');
    } catch (e) {
      setLoading(false);
      console.error('Error adding document: ', e);
    }
  };

  return (
    <MainContainer title="Write a Post!">
      <PageComponent title="Write a Post!">
        <DefaultForm onSubmit={submit}>
          <DefaultInput
            value={title}
            placeholder="Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />

          <QuillInput
            value={text}
            placeholder="Write your Post..."
            onChange={setText}
          />

          <div
            style={{
              marginTop: 40,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {loading ? (
              <BeatLoaderSpinner loading={loading} />
            ) : (
              <DefaultButton
                title="Submit for Review"
                inverted
                onClick={submit}
              />
            )}
          </div>
        </DefaultForm>
      </PageComponent>
    </MainContainer>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(NewPost);
