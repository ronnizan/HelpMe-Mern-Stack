import React from 'react';
import {
  HeroSection,
  HeroContainer,
  Circle,
  HeroDescription,
  HeroTitle,
  HeroDescriptionText
} from './style';
const Hero = () => {

  return (
    <>
      <Circle></Circle>
      <HeroSection>
        <HeroContainer>
          <HeroDescription>
            <HeroTitle> HelpMe</HeroTitle>
            <br/> 
            <HeroDescriptionText>
              Stuck At Home and cant buy what you need? 
            </HeroDescriptionText>
            <HeroDescriptionText>
              HelpMe connects between people in need
            </HeroDescriptionText>
            <HeroDescriptionText>
              and people who are willing to help.
            </HeroDescriptionText>
          </HeroDescription>
        </HeroContainer>
      </HeroSection>

    </>
  );
};

export default Hero;
