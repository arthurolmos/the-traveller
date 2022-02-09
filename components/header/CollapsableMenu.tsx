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
import { menuOptions } from './menuOptions';
import MenuItem from './MenuItem';

interface Props {
  open: boolean;
  collapsed: boolean;
}

export default function CollapsableMenu({ open, collapsed }: Props) {
  const { route } = useRouter();

  const AuthUser = useAuthUser();
  const user = AuthUser.id ? AuthUser : null;

  return (
    <CollapsableMenuStyled open={open} collapsed={collapsed}>
      <CollapsableMenuListContainerStyled>
        {menuOptions.map((item, index) => {
          return <MenuItem item={item} key={index} route={route} />;
        })}
      </CollapsableMenuListContainerStyled>
      <CollapsablePanelContainerStyled>
        {user ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>Hello, {user.displayName}</div>
            <UserMenu user={user} />
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
