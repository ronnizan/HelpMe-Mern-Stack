import React from "react";
import {ServicesContainer,ServicesH1,ServicesWrapper,ServicesCard,ServicesIcon,ServicesH2,ServicesP} from "./style"
import Icon1 from "../../images/svg4.png"
import Icon2 from "../../images/svg3.png"
import Icon3 from "../../images/svg2.png"

const Services = () => {
  
  return (
    <>
      <ServicesContainer id='services'>
        <ServicesH1>Our Services</ServicesH1>
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon src={Icon1} />
            <ServicesH2>Fast Response</ServicesH2>
            <ServicesP>We help you get you what you need Quickly!</ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon2} />
            <ServicesH2>All free</ServicesH2>
            <ServicesP>No fee needed to use our service</ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon3} />
            <ServicesH2>Easy Registration </ServicesH2>
            <ServicesP>Quick Registration Process</ServicesP>
          </ServicesCard>
        </ServicesWrapper>
      </ServicesContainer>
    </>
  );
};

export default Services;
