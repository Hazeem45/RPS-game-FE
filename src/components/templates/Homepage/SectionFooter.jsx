import React from 'react';
import { FacebookIcon, NewsletterBackground, TwitchIcon, TwitterIcon } from '../../../assets/Image';

function SectionFooter() {
  return (
    <footer style={{ background: `url(${NewsletterBackground})` }}>
      <div className='foot-menu'>
        <ul>
          <div className='menu-list'>
            <li>
              <a href='#main-page'>main</a>
            </li>
            <li>
              <a href='#about'>about</a>
            </li>
            <li>
              <a href='#features'>game features</a>
            </li>
            <li>
              <a href='#requirements'>system requirements</a>
            </li>
            <li>
              <a href='#quotes'>quotes</a>
            </li>
          </div>
          <div className='icon-list'>
            <li>
              <a href='https://web.facebook.com/' target='_blank' rel='noreferrer'>
                <img src={FacebookIcon} alt='fb-icon' />
              </a>
            </li>
            <li>
              <a href='https://twitter.com/' target='_blank' rel='noreferrer'>
                <img src={TwitterIcon} alt='twt-icon' />
              </a>
            </li>
            <li>
              <a href='https://www.youtube.com/' target='_blank' rel='noreferrer'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' className='bi bi-youtube' viewBox='0 0 17 17'>
                  <path d='M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z' />
                </svg>
              </a>
            </li>
            <li>
              <a href='https://www.twitch.tv/' target='_blank' rel='noreferrer'>
                <img src={TwitchIcon} alt='twtch-icon' />
              </a>
            </li>
          </div>
        </ul>
      </div>
      <div className='line-footer'></div>
      <div className='bottom'>
        <div className='copyright'>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-c-circle' viewBox='0 0 16 16'>
            <path d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z' />
          </svg>
          <p>2024 RPS Games, Inc. All Right Reserved</p>
        </div>
        <div className='services'>
          <div>privacy policy</div>
          <div>|</div>
          <div>terms of services</div>
          <div>|</div>
          <div>code of conduct</div>
        </div>
      </div>
    </footer>
  );
}

export default SectionFooter;
