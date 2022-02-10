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
`;
