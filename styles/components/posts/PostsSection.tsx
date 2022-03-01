import styled from 'styled-components';
import { IPostStatus } from '../../../models';

export const PostsSectionStyled = styled.section<{ title: string }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 400px;

  > h2 {
    text-align: center;
    color: ${({ title, theme }) =>
      title === IPostStatus.APPROVED
        ? theme.main.green
        : title === IPostStatus.PENDING_APPROVAL
        ? theme.main.orange
        : theme.main.red};
  }

  ul {
    list-style-type: none;
    padding: 0;
    flex: 1;
  }
`;

export const ContentStyled = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  overflow-y: auto;
`;
