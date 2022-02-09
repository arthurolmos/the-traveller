import styled from 'styled-components';

export const SignFormStyled = styled.form`
  gap: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 500px;

  @media (max-width: 600px) {
    width: 300px;
  }
`;
