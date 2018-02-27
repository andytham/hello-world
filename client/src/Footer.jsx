import React from 'react';
import heart from './images/heart.png';
import github from './images/github.svg';
import './css/footer.css';

class Footer extends React.Component {
  render(){
    return(
      <div>
        <img className="footer-img" src={heart} />
        Created by Andy Tham - 2018
        <img className="footer-img" src={github} />
      </div>
    )
  }
}

export default Footer;
