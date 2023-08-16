import React from 'react';
import './styles/MainPage.css';
import './styles/styles.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../img/matcher.png';
import promoImg from '../../img/promo_girl.svg';

export default function MainPage(): JSX.Element {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo-content">
          <div className="promo-text">
            <div className="promo-title">ОТКРОЙ НОВЫХ ЛЮДЕЙ</div>
            <div className="promo-button-wrap">
              <Button
                component={Link}
                to="/auth/signup"
                style={{
                  borderRadius: '10px',
                  width: '220px',
                  height: '55px',
                  fontWeight: '500',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                }}
              >
                Войти
              </Button>
            </div>
          </div>

          <div className="promo-img">
            <img src={promoImg} alt="girl" />
          </div>
        </div>
      </div>

      <div className="between" />
      <div className="footer">
        <div className="logo">
          <img src={logo} alt="matcher-logo" className="logo-img" />
          <div className="company-name">MA TCH ER</div>
        </div>
        <div className="footer-text-container">
          <div className="footer-text-1"> Company About Contact Support Careers</div>
          <div className="footer-text-2"> Legal Terms Privacy</div>
        </div>
      </div>
    </section>
  );
}
