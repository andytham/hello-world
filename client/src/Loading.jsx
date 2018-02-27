import React from 'react';
import loadingImg from './images/loading.gif'
class Loading extends React.Component {
  render(){
    return(
      <div>
        <div> Please Select A Country! </div>
        <img className="loading-image" width="300px" src={loadingImg} />
      </div>
    )
  }
}

export default Loading;
