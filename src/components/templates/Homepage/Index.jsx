import React from 'react';
import './homeStyle.css';
import NavbarHome from './NavbarHome';
import MainSection from './MainSection';
import OptionGame from './OptionGame';
import SectionFeature from './SectionFeature';
import SystemRequire from './SystemRequire';
import Quotes from './Quotes';
import Newsletter from './Newsletter';
import SectionFooter from './SectionFooter';

function Homepage() {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <div className='homepage'>
      <NavbarHome accessToken={accessToken} />
      {/* <!-- main call to action --> */}
      <MainSection accessToken={accessToken} />
      {/* <!-- gameplay option--> */}
      <OptionGame />
      {/* <!-- game features --> */}
      <SectionFeature />
      {/* <!-- system requirements --> */}
      <SystemRequire />
      {/* <!-- top score --> */}
      <Quotes />
      {/* <!-- newsletter --> */}
      <Newsletter />
      {/* <!-- footer --> */}
      <SectionFooter />
    </div>
  );
}

export default Homepage;
