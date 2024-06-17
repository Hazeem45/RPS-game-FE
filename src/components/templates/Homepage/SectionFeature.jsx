import React from 'react';
import { FeatureBackground } from '../../../assets/Image';

function SectionFeature() {
  return (
    <section className='features' id='features' style={{ backgroundImage: `url(${FeatureBackground})` }}>
      <div className='container'>
        <div className='title'>
          <p>What&apos;s so special?</p>
          <h2>features</h2>
        </div>
        <div className='list-feature'>
          <ul>
            <li>
              <h3>traditional games</h3>
              <p>If you miss your childhood, we provide traditional games here</p>
            </li>
            <li>
              <h3>game suit</h3>
            </li>
            <li>
              <h3>tbd</h3>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SectionFeature;
