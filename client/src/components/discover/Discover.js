import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DiscoverImage from '../../images/discoverImg.png';
import {
  DiscoverSection,
  DiscoverContainer,
  DiscoverImgContainer,
  DiscoverImg,
  DiscoverDescription,
  DiscoverTitle,
  DiscoverDescriptionText,
  DiscoverDescriptionBtn,
} from './style';
const Discover = () => {
  const userState = useSelector((state) => state.userLogin);
  const { userInfo } = userState;

  const [scrollDiscover, setScrollDiscover] = useState(0);

  const slideDiscover = () => {
    if (window.scrollY >= 330) {
      setScrollDiscover(scrollDiscover + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', slideDiscover);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return()=>{
      window.removeEventListener('scroll', slideDiscover); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DiscoverSection id='discover'>
      <DiscoverContainer>
        <DiscoverDescription scrollDiscover={scrollDiscover}>
          {userInfo && userInfo.name ? (
            <>
              <DiscoverTitle>Browse Now!</DiscoverTitle>
              <DiscoverDescriptionText>
                Go to Browse page to check out to who you can help,
                or publish your own helpMe post.
              </DiscoverDescriptionText>
              <DiscoverDescriptionBtn to='/browse'>
                Browse &rArr;
              </DiscoverDescriptionBtn>
              <DiscoverDescriptionBtn to='/add-post'>
                Add Post &rArr;
              </DiscoverDescriptionBtn>
            </>
          ) : (
            <>
              <DiscoverTitle>Register Now!</DiscoverTitle>
              <DiscoverDescriptionText>
                Register now to Get Special Offers and enjoy all of our
                Services!.
              </DiscoverDescriptionText>
              <DiscoverDescriptionBtn to='/signup'>
                Signup &rArr;
              </DiscoverDescriptionBtn>
            </>
          )}
        </DiscoverDescription>
        <DiscoverImgContainer scrollDiscover={scrollDiscover}>
          <DiscoverImg src={DiscoverImage}></DiscoverImg>
        </DiscoverImgContainer>
      </DiscoverContainer>
    </DiscoverSection>
  );
};

export default Discover;
