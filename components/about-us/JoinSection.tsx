import React from 'react';
import {
  JoinDescriptionStyled,
  JoinContainerStyled,
  JoinSectionStyled,
} from '../../styles/components/about-us/JoinSection';

export function JoinSection() {
  return (
    <JoinSectionStyled>
      <h2>Join our community!</h2>
      <JoinContainerStyled>
        <JoinDescriptionStyled>
          <button></button>
          Join
        </JoinDescriptionStyled>
      </JoinContainerStyled>
    </JoinSectionStyled>
  );
}
