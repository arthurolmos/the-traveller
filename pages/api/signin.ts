import { setAuthCookies } from 'next-firebase-auth';
import initAuth from '../../firebase/init'; // the module you created above

initAuth();

const handler = async (req, res) => {
  try {
    const resp = await setAuthCookies(req, res);

    console.log({ resp });
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.', e });
  }
  return res.status(200).json({ success: true });
};

export default handler;
