import React, { useState } from 'react';
import { CreateRoomPageOverview, DashboardPageOverview, GameBackground, GameHistoryPageOverview, RpsImage, SwitchLeftIcon, SwitchRightIcon, VersusComPageOverview, VersusPlayerPageOverview } from '../../../assets/Image';

function OptionGame() {
  const images = [RpsImage, DashboardPageOverview, VersusComPageOverview, CreateRoomPageOverview, VersusPlayerPageOverview, GameHistoryPageOverview];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationNext, setanimationNext] = useState([]);
  const [animationPrev, setanimationPrev] = useState([]);
  const [clicked, setclicked] = useState('');

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setanimationNext(['center-to-left', 'right-to-left']);
    setclicked('next');
    setTimeout(() => {
      setanimationNext([]);
    }, 300);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setanimationPrev(['left-to-right', 'center-to-right']);
    setclicked('prev');
    setTimeout(() => {
      setanimationPrev([]);
    }, 300);
  };

  return (
    <section className='game-choice' id='about-game' style={{ backgroundImage: `url(${GameBackground})` }}>
      <div className='title'>
        <p>What&apos;s so special?</p>
        <h2>the games</h2>
      </div>
      <div className='img-slider'>
        <div className='carousel'>
          <div className='carousel-inner'>
            <img className={`slide-img prev ${animationNext[0]}`} src={images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]} alt={`Slide ${currentIndex === 0 ? images.length - 1 : currentIndex}`} />
            <img src={images[currentIndex]} className={`slide-img current ${clicked === 'prev' ? animationPrev[0] : animationNext[1]}`} alt={`Slide ${currentIndex + 1}`} />
            <img className={`slide-img next ${animationPrev[1]}`} src={images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]} alt={`Slide ${currentIndex === images.length - 1 ? 0 : currentIndex + 1}`} />
          </div>
          <button className='carousel-control prev' onClick={prevSlide} aria-label='Previous'>
            <img src={SwitchLeftIcon} alt='Previous' />
          </button>
          <button className='carousel-control next' onClick={nextSlide} aria-label='Next'>
            <img src={SwitchRightIcon} alt='Next' />
          </button>
        </div>
      </div>
    </section>
  );
}

export default OptionGame;
