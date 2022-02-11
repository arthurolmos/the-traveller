import styled from 'styled-components';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false }
);

export const QuillInputStyled = styled(ReactQuill)`
  height: 300px;
  width: 100%;
`;

export const QuillInputContainerStyled = styled.div`
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 600px) {
    margin-bottom: 80px;
  }
`;
