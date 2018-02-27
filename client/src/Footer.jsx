import React from 'react';
import heart from './images/heart.png';
import github from './images/github.svg';
import './css/footer.css';

class Footer extends React.Component {
  render(){
    return(
      <div className="footer">
        <img className="footer-img" src={heart} />
        <div className="created">
          Created by Andy Tham - 2018
        </div>
        <div className="created-small">
          Created by Andy Tham - 2018
        </div>
        <img className="footer-img" src={github} />
      </div>
    )
  }
}

export default Footer;
