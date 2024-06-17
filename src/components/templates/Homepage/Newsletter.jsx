import React from 'react';
import { NewsletterBackground, SkullImage } from '../../../assets/Image';

function Newsletter() {
  return (
    <section className='newsletter' style={{ backgroundImage: `url(${NewsletterBackground})` }}>
      <div className='skull'>
        <div className='skull-img' style={{ background: `radial-gradient(59% 63% at 50% 50%, #00000000 0%, #00000000 42%, #080a0b 99.74%), url(${SkullImage})` }}></div>
      </div>
      <div className='subscribe'>
        <h4>Want to stay in touch?</h4>
        <div className='title'>
          <h2>newsletter subscribe</h2>
        </div>
        <p>In order to start receiving our news, all you have to do is enter your email address. Everything else will be taken care of by us. We will send you emails containing information about game. We don&apos;t spam.</p>
        <label htmlFor='inputEmail' className='form-label'>
          Your Email address
        </label>
        <form className='form'>
          <input type='email' className='form-control' id='inputEmail' placeholder='youremail@example.com' />
          <button className='btn btn-warning'>subscribe now</button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
