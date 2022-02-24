import styled from 'styled-components';
import { AboutUsSectionStyled } from './AboutUsSection';

export const JoinSectionStyled = styled(AboutUsSectionStyled)`
  background: white url('/assets/about-us/santorini.jpg') no-repeat scroll
    center;
  background-size: 100%;
  color: white;
`;

export const JoinContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  height: 200px;
`;

export const JoinImageContainerStyled = styled.div`
  display: block;
  flex: 1;
  position: relative;
`;

export const JoinDescriptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  text-align: justify;
  padding: 0 20px;
  color: white;
`;
