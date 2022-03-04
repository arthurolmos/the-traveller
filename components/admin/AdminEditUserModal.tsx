import React from 'react';
import { IUser } from '../../models';
import { ModalRowStyled } from '../../styles/components/admin/AdminEditUserModal';
import { DefaultButton } from '../buttons';
import { LabelInput } from '../inputs';
import DefaultModalLayout from '../modals/DefaultModalLayout';

interface Props {
  open: boolean;
  close: () => void;
  user: IUser;
}

export default function AdminEditUserModal({ open, user, close }: Props) {
  const submit = async () => {
    console.log('submit');
  };

  return (
    <DefaultModalLayout title="Edit User" open={open} close={close}>
      <ModalRowStyled>
        <LabelInput value={user?.firstName} label="First Name" />
        <LabelInput value={user?.lastName} label="Last Name" />
      </ModalRowStyled>

      <LabelInput value={user?.email} label="Email" />
      <LabelInput value={user?.profilePicture} label="Profile Picture" />

      <ModalRowStyled>
        <LabelInput value={user?.social?.instagram} label="Instagram" />
        <LabelInput value={user?.social?.facebook} label="Facebook" />
        <LabelInput value={user?.social?.twitter} label="Twitter" />
      </ModalRowStyled>

      <div
        style={{
          alignSelf: 'center',
        }}
      >
        <DefaultButton inverted onClick={submit} title="Save" />
      </div>
    </DefaultModalLayout>
  );
}
