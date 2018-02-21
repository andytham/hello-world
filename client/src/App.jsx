import React from 'react';
import d3 from 'd3';
import Datamap from 'datamaps';

export default class helloWorld extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRendered: false
    }
    this.renderMap = this.renderMap.bind(this);
  }
  componentWillMount(){
    console.log('hello');
  }
  componentDidMount(){
    console.log("hello");

  }

  renderMap(){
    var map = new Datamap({element: document.getElementById('container')});
    this.setState({
      isRendered: true
    })
  }

  render(){
    return(
      <div>
        <div>
          hello world
        </div>


        <div id="container" style="position: relative; width: 500px; height: 300px;"></div>
        <div>{this.renderMap()} </div>
      </div>
    )
  }
}
