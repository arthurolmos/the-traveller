import React from 'react';
import { MainContainer, PageComponent } from '../../components/layouts';
import {
  AdminPageContent,
  AdminContainerStyled,
} from '../../styles/components/admin/AdminPageLayout';
import { AdminMenu } from '../../components/admin/AdminMenu';

interface Props {
  title: string;
  children: React.ReactNode;
}

export function AdminPageLayout({ title, children }: Props) {
  return (
    <MainContainer title={title}>
      <PageComponent title={title}>
        <AdminContainerStyled>
          <AdminMenu />

          <AdminPageContent>{children}</AdminPageContent>
        </AdminContainerStyled>
      </PageComponent>
    </MainContainer>
  );
}
