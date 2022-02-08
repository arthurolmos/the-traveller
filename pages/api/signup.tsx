// ./pages/api/logout
// ./pages/api/login
import { unsetAuthCookies } from 'next-firebase-auth';
import '../../firebase/init'; // the module you created above

const handler = async (req, res) => {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.' });
  }
  return res.status(200).json({ success: true });
};

export default handler;
