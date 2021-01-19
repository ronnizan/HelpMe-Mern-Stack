import React, { useState, useEffect } from 'react';
import CartImage from '../../images/cart.png';
import {
  AboutSection,
  AboutContainer,
  AboutImgContainer,
  AboutImg,
  AboutDescription,
  AboutTitle,
  AboutDescriptionText,
} from './style';
const About = () => {
  const [scrollAbout, setScrollAbout] = useState(0);
  //slide content
  const slideAbout = () => {
    if (window.scrollY >= 30) {
      setScrollAbout(scrollAbout + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', slideAbout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      window.removeEventListener('scroll', slideAbout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AboutSection id='about'>
      <AboutContainer>
        <AboutImgContainer scrollAbout={scrollAbout}>
          <AboutImg src={CartImage}></AboutImg>
        </AboutImgContainer>
        <AboutDescription scrollAbout={scrollAbout}>
          <AboutTitle>We connect People</AboutTitle>
          <AboutDescriptionText>
            Post an note declaring what you need with price you are willing to
            pay, and let people bring you what you need!.
          </AboutDescriptionText>
        </AboutDescription>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;
