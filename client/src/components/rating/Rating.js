import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';

const Rating = ({
  value,
  text,
  color,
  setActiveLink,
  showText = true,
  width = '80%',
  fromProfiles,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: width }}>
      <span>
        <i style={{ color }}>
          {value >= 1 ? (
            <AiFillStar />
          ) : value >= 0.5 ? (
            <BsStarHalf />
          ) : (
            <AiOutlineStar />
          )}
        </i>
      </span>
      <span>
        <i style={{ color }}>
          {value >= 2 ? (
            <AiFillStar />
          ) : value >= 1.5 ? (
            <BsStarHalf />
          ) : (
            <AiOutlineStar />
          )}
        </i>
      </span>
      <span>
        <i style={{ color }}>
          {' '}
          {value >= 3 ? (
            <AiFillStar />
          ) : value >= 2.5 ? (
            <BsStarHalf />
          ) : (
            <AiOutlineStar />
          )}
        </i>
      </span>
      <span>
        <i style={{ color }}>
          {' '}
          {value >= 4 ? (
            <AiFillStar />
          ) : value >= 3.5 ? (
            <BsStarHalf />
          ) : (
            <AiOutlineStar />
          )}
        </i>
      </span>
      <span>
        <i style={{ color }}>
          {' '}
          {value >= 5 ? (
            <AiFillStar />
          ) : value >= 4.5 ? (
            <BsStarHalf />
          ) : (
            <AiOutlineStar />
          )}
        </i>
      </span>
      {fromProfiles && <span>&nbsp;({text && text})</span>}
      {showText && (
        <span
          title='Click to see reviews'
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => setActiveLink('reviews')}
        >
          {' '}
          &nbsp;<span>({text && text})</span>{' '}
        </span>
      )}
    </div>
  );
};

export default Rating;
