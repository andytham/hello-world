import React from 'react';
import Map from './Map';
import './css/app.css';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRendered: false,
      audio: "",

    }
  }
  componentWillMount(){
    console.log('hello');
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
