import React from 'react';
import Image from '../../elements/Image';
import { MainBackground, Scrolldown } from '../../../assets/Image';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../../../utils/validation';
import PropTypes from 'prop-types';

function MainSection({ accessToken }) {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className='main-page'
      id='main-page'
      style={{
        backgroundImage: `url(${MainBackground})`,
      }}
    >
      <div className='content'>
        <h1>play traditional game</h1>
        <p>experience new traditional game play</p>
        <div
          onClick={() => {
            navigate('/dashboard');
            if (!validateToken(accessToken)) {
              location.reload();
            }
          }}
        >
          <button className='btn btn-warning'>{accessToken ? 'play' : 'login to play'}</button>
        </div>
      </div>
      <div className='scroll-down'>
        <div onClick={() => scrollToSection('about-game')}>
          <h6>the story</h6>
          <Image src={Scrolldown} />
        </div>
      </div>
    </section>
  );
}

MainSection.propTypes = {
  accessToken: PropTypes.string,
};

export default MainSection;
