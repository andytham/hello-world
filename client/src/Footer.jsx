import React from 'react';
import heart from './images/heart.png';
import github from './images/github.svg';

class Footer extends React.Component {
  render(){
    return(
      <div className="footer">
        <a target="_blank" href="http://www.andytham.com"><img className="footer-img" src={heart} /></a>
        <div className="created">
          Created by Andy Tham - 2018
        </div>
        <div className="created-small">
          Created by Andy Tham
        </div>
        <div className="created-smaller">
          Andy Tham
        </div>
        <a ttarget="_blank" href="https://github.com/andytham/hello-world"><img className="footer-img" src={github} /> </a>
      </div>
    )
  }
}

export default Footer;
