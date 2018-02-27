import React from 'react';
import Map from './Map';
import './css/app.css';
import './css/map.css';
import './css/info-box.css';
import './css/footer.css';
// import './css/phone.css';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRendered: false,
      audio: "",

    }
  }
  componentWillMount(){
  }

  componentDidMount(){
    // console.log(Flags);
  }

  render(){
    return(
      <div>
        <link rel="shortcut icon" href={require("./images/favicon.ico")} />
        <link href="https://fonts.googleapis.com/css?family=Nanum+Pen+Script|Noto+Sans" rel="stylesheet" />
        <Map />
      </div>
    )
  }
}
