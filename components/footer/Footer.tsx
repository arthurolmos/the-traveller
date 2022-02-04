import React from "react";
import {
  FooterContainerLeftStyled,
  FooterContainerRightStyled,
  FooterStyled,
  FooterStyledLink,
} from "../../styles/components/footer";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <FooterStyled>
      <FooterContainerLeftStyled>
        <a href="#" target="_blank" rel="noreferrer">
          <FaTwitter size={24} />
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <FaFacebookF size={24} />
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <FaInstagram size={24} />
        </a>
      </FooterContainerLeftStyled>
      <FooterContainerRightStyled>
        <span>
          Developed by{" "}
          <FooterStyledLink
            href="https://www.scrumlaunch.com"
            target="_blank"
            rel="noreferrer"
          >
            ScrumLaunch
          </FooterStyledLink>
        </span>
      </FooterContainerRightStyled>
    </FooterStyled>
  );
}
