import React from 'react';
import {
  CollapsableMenuStyled,
  CollapsableMenuListContainerStyled,
  CollapsablePanelContainerStyled,
} from '../../styles/components/header/CollapsableMenu';
import SignButton from '../buttons/SignButton';
import { useAuthUser } from 'next-firebase-auth';
import UserMenu from './UserMenu';
import { useRouter } from 'next/router';
import { headerOptions } from './headerOptions';
import MenuItem from './MenuItem';
import AdminMenu from './AdminMenu';
import { db, getDoc, doc } from '../../firebase/db';

interface Props {
  open: boolean;
}

export default function CollapsableMenu({ open }: Props) {
  const { route } = useRouter();

  const AuthUser = useAuthUser();
  const user = AuthUser.id ? AuthUser : null;

  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    async function isAdmin() {
      const docRef = doc(db, 'users', user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const user = docSnap.data();

        setIsAdmin(user.isAdmin);
      }
    }

    if (user) isAdmin();
  }, [user]);

  const menu = React.useMemo(() => {
    return isAdmin ? <AdminMenu user={user} /> : <UserMenu user={user} />;
  }, [isAdmin, user]);

  return (
    <CollapsableMenuStyled open={open}>
      <CollapsableMenuListContainerStyled>
        {headerOptions.map((item, index) => {
          return <MenuItem item={item} key={index} route={route} />;
        })}
      </CollapsableMenuListContainerStyled>
      <CollapsablePanelContainerStyled>
        {user ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>Hello, {user.displayName}</div>
            {menu}
          </div>
        ) : (
          <>
            <SignButton title="Sign in" href="/signin" />
            <SignButton title="Sign up" href="/signup" inverted />
          </>
        )}
      </CollapsablePanelContainerStyled>
    </CollapsableMenuStyled>
  );
}
