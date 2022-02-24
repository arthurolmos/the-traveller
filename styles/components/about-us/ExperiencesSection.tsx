import styled from 'styled-components';
import { AboutUsSectionStyled } from './AboutUsSection';

export const ExperiencesSectionStyled = styled(AboutUsSectionStyled)`
  background: ${({ theme }) => theme.main.white};
`;

export const ExperiencesContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  height: 400px;
  background: ${({ theme }) => theme.main.white};
`;

export const ExperiencesImageContainerStyled = styled.div`
  display: block;
  flex: 1;
  position: relative;
`;

export const ExperiencesDescriptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  text-align: justify;
  padding: 0 20px;
`;
