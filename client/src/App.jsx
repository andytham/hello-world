import React from 'react';
import Map from './Map';
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

  componentDidMount(){
    // console.log(Flags);
  }

  render(){
    return(
      <div>
        <Map />
      </div>
    )
  }
}
