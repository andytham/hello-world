import React from 'react';
import Map from './Map'


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
    console.log("hello");

  }


  render(){
    return(
      <div>

        <div> testing using components </div>
        <div id="info"></div>
      </div>
    )
  }
}
