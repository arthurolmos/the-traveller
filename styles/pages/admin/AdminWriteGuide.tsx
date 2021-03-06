import styled from 'styled-components';
import { DefaultFormStyled } from '../../components/forms/DefaultForm';

export const CoverImagePreviewStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  height: 400px;
  width: 800px;

  &:hover:after {
    transition: all 0.3s ease;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    content: 'Click to change picture';
    color: white;
    font-size: 32px;
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);

    @media (max-width: 600px) {
      font-size: 16px;
    }
  }

  @media (max-width: 880px) {
    height: 300px;
    width: 600px;
  }

  @media (max-width: 600px) {
    height: 100px;
    width: 300px;
  }
`;

export const FormStyled = styled(DefaultFormStyled)`
  width: 800px;

  @media (max-width: 880px) {
    width: 600px;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
`;

export const LabelStyled = styled.span`
  font-size: 12px;
  margin-bottom: 5px;
  padding-left: 5px;
`;

export const InfoStyled = styled.span`
  font-size: 12px;
  padding-left: 5px;
  font-style: italic;
  margin-top: 5px;
`;

export const ThumbnailPreviewContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  justify-items: center;

  @media (max-width: 880px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ThumbnailPreviewStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: 250px;
  height: 250px;

  &:hover:after {
    transition: all 0.3s ease;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    content: 'Click to remove picture';
    color: white;
    font-line: 1px;
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 600px) {
    width: 150px;
    height: 150px;

    &:hover:after {
      font-size: 12px;
    }
  }
`;

export const SubmitContainerStyled = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
