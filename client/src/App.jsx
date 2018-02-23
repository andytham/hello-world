import React from 'react';
import Map from './Map'
import InfoBox from './InfoBox';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRendered: false

    }
  }
  componentWillMount(){
    console.log('hello');
  }



  render(){
    return(
      <div>
        <Map test="test" />



      </div>
    )
  }
}
