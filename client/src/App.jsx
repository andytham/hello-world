import React from 'react';
import * as d3 from 'd3';
import Datamap from 'datamaps';
// import map from './datamaps.world.min.js'
import './map.css'

var mapStyle = {
  position: 'relative',
  width: '500px',
  height: '300px'
}


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
    var basic_choropleth = new Datamap({
      element: document.getElementById("container"),
      projection: 'mercator',
      fills: {
        defaultFill: "#ABDDA4",
        authorHasTraveledTo: "red"
      },
      data: {
        USA: { fillKey: "authorHasTraveledTo" },
        JPN: { fillKey: "authorHasTraveledTo" },
        ITA: { fillKey: "authorHasTraveledTo" },
        CRI: { fillKey: "authorHasTraveledTo" },
        KOR: { fillKey: "authorHasTraveledTo" },
        DEU: { fillKey: "authorHasTraveledTo" },
      }
    });

    var colors = d3.scale.category10();
    window.setInterval(function() {
      console.log("colors?");
      basic_choropleth.updateChoropleth({
        USA: colors(Math.random() * 10),
        RUS: colors(Math.random() * 100),
        AUS: { fillKey: 'authorHasTraveledTo' },
        BRA: colors(Math.random() * 50),
        CAN: colors(Math.random() * 50),
        ZAF: colors(Math.random() * 50),
        IND: colors(Math.random() * 50),
      });}, 2000
    );
  }

  render(){
    return(
      <div>
        <div className="">
          hello world
        </div>
        <div id="container" style={mapStyle}></div>
        <div>{this.renderMap()} </div>
      </div>
    )
  }
}
