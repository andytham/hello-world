import React from 'react';
import InfoBox from './InfoBox'
import * as d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps';
import './map.css';

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRendered: false,
      countries: "",
    }
    this.renderMap = this.renderMap.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount(){
  }

  componentDidMount(){
    // console.log(this.props);
    this.renderMap()
    fetch('/api/countries')
      .then(res => res.json())
      .then(countries => {
        this.setState({
          countries: countries,
          country: "",
        })
      })
  }
  componentDidUpdate(){
  }
  selectCountry(selectedCountry){
    this.setState({
      country: selectedCountry
    })
    // console.log(this.state.country);
  }
  renderMap(){

    var fills = {
      someOtherFill: '#aa9f9f',
      defaultFill: '#24ac24'
    };
    var basic_choropleth = new Datamap({
      element: document.getElementById("map"),
      projection: 'mercator',
      responsive: true,
      fills: fills,
      // {
      //   defaultFill: "#ABDDA4",
      //   authorHasTraveledTo: "red"
      // },

      // data: {
      //   USA: { fillKey: "authorHasTraveledTo" },
      //   JPN: { fillKey: "authorHasTraveledTo" },
      //   ITA: { fillKey: "authorHasTraveledTo" },
      //   CRI: { fillKey: "authorHasTraveledTo" },
      //   KOR: { fillKey: "authorHasTraveledTo" },
      //   DEU: { fillKey: "authorHasTraveledTo" },
      // },
      geographyConfig: {
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: '#FFFFFF',


        highlightOnHover: false,
        highlightFillColor: '#FFFFFF',
        highlightBorderColor: "#FFFFFF",//'rgba(250, 15, 160, 0.2)',
        highlightBorderWidth: 2,
        highlightBorderOpacity: 1
      },
      // done: function(datamap) {
      //     datamap.svg.selectAll('.datamaps-subunit')
      //     .on('click', function(geography) {
      //         var state_id = geography.id;
      //         var fillkey_obj = datamap.options.data[state_id] || {fillKey: 'defaultFill'};
      //         var fillkey = fillkey_obj.fillKey;;
      //         var fillkeys = Object.keys(fills);
      //         var antikey = fillkeys[Math.abs(fillkeys.indexOf(fillkey) - 1)];
      //         var new_fills = {
      //           [geography.id] : {
      //             fillKey: antikey
      //           }
      //         };
      //         datamap.updateChoropleth(new_fills);
      //         // d3.select(".country-name").text(state_id)
      //         console.log("update state");
      //         selectCountry(state_id)
      //
      //     });
      //
      // }
    });

    var colors = d3.scale.category10();
    // window.setInterval(function() {
    //   basic_choropleth.updateChoropleth({
    //     USA: colors(Math.random() * 10),
    //     RUS: colors(Math.random() * 100),
    //     AUS: { fillKey: 'authorHasTraveledTo' },
    //     BRA: colors(Math.random() * 50),
    //     CAN: colors(Math.random() * 50),
    //     ZAF: colors(Math.random() * 50),
    //     IND: colors(Math.random() * 50),
    //   });}, 2000
    // );
    var countries = Datamap.prototype.worldTopo.objects.world.geometries; //creates an array of every country
    // test = d3.selectAll('basic_choropleth')

    var wind = window.d3


    wind.selectAll('.datamaps-subunit')
  //   .on("click", function(d) {
  //     console.log(d3.select(this).datum());
  //     let selected = d3.select(this);
  //     let datum = d.id || {};
  //
  //     let proxy = d.id
  //     console.log(selected);
  //
  //     // selected.style('fill',"red")
  //     // basic_choropleth.updateChoropleth({
  //     //     [proxy]: colors(Math.random() * 50),
  //     // })
  //   }
  // )
  .on('mouseover', function(d) {
    let $this = d3.select(this);
    // $this.style('fill',"#FFFFFF")
    $this.style('stroke', "#FFFFFF")
    $this.style('stroke-width', "4")
  })
  .on('mouseout', function(d) {
    let $this = d3.select(this);
    // $this.style('fill',"#000000")
    $this.style('stroke', "#FFFFFF")
    $this.style('stroke-width', "1")
  })

    console.log(countries);

    //built in resize in datamaps
    d3.select(window).on('resize', function() {
      basic_choropleth.resize()
    });
    // d3.select(window).on("resize", resize);
    // function resize() {
    //   console.log("RESIZING");
    //   var map = d3.select('.datamap');
    //   console.log(map[0][0]);
    //   var container = document.getElementById("container");
    //   console.log('width',container.clientWidth);
    //   var width = container.clientWidth;
    //   var height = container.clientHeight;
    //   map
    //   .attr("width", width)
    //   .attr("height", height);
    // }
    let d3SelectCountry = this.selectCountry //need to bind this to a function because d3 overrides the this context
    console.log("outside d3 function", this.props);
    wind.selectAll('.datamaps-subunit')
      .on('click', function(geography) {
        console.log(geography);
        basic_choropleth.updateChoropleth(null, {reset: true}) // resets map
        var state_id = geography.id;
        var fillkey_obj = basic_choropleth.options.data[state_id] || {fillKey: 'defaultFill'};
        var fillkey = fillkey_obj.fillKey;;
        var fillkeys = Object.keys(fills);
        var antikey = fillkeys[Math.abs(fillkeys.indexOf(fillkey) - 1)];
        var new_fills = {
          [geography.id] : "#c10000"
          // colors(Math.random() * 10)
          // {fillKey: antikey}
        };
        basic_choropleth.updateChoropleth(new_fills);
        // d3.select(".country-name").text(state_id)
        d3SelectCountry(state_id)
      })
      console.log(basic_choropleth.svg);
      wind.select('#test').on('click',function () {
      let poop = wind.selectAll('.datamaps-subunit')
      console.log(poop[0][0].__data__.id);


      var playInterval = setInterval(function() {
        let gah = Math.trunc(Math.random() * poop[0].length)
        console.log(gah);
        let state_id = poop[0][gah].__data__.id
        basic_choropleth.updateChoropleth(null, {reset: true}) // resets map
        var fillkey_obj = basic_choropleth.options.data[state_id] || {fillKey: 'defaultFill'};
        var fillkey = fillkey_obj.fillKey;;
        var fillkeys = Object.keys(fills);
        var antikey = fillkeys[Math.abs(fillkeys.indexOf(fillkey) - 1)];
        var new_fills = {
          [state_id] : "#c10000"
          // colors(Math.random() * 10)
          // {fillKey: antikey}
        };
        basic_choropleth.updateChoropleth(new_fills);
        // d3.select(".country-name").text(state_id)
        d3SelectCountry(state_id)
       }, 2000);
     })

  }//end of renderMap

  handleClick(){
    // var wind = window.d3
    // let poop = wind.selectAll('.datamaps-subunit')
    // console.log(poop[0][0].__data__.id);
    //
    // let gah = Math.trunc(Math.random() * poop[0].length)
    // console.log(gah);
    // let state_id = poop[0][gah].__data__.id
    // playInterval = setInterval(function() {
    //   basic_choropleth.updateChoropleth(null, {reset: true}) // resets map
    //   var fillkey_obj = basic_choropleth.options.data[state_id] || {fillKey: 'defaultFill'};
    //   var fillkey = fillkey_obj.fillKey;;
    //   var fillkeys = Object.keys(fills);
    //   var antikey = fillkeys[Math.abs(fillkeys.indexOf(fillkey) - 1)];
    //   var new_fills = {
    //     [state_id] : "#c10000"
    //     // colors(Math.random() * 10)
    //     // {fillKey: antikey}
    //   };
    //   basic_choropleth.updateChoropleth(new_fills);
    //   // d3.select(".country-name").text(state_id)
    //   d3SelectCountry(state_id)
    //  }, 2000);

  }


  render(){
    return(
      <div id="wrapper">
        <div id="map"> </div>
        <button id="test"> test</button>
        <button onClick={this.handleClick}> Play All </button>
        {this.state.country ? <InfoBox countries={this.state.countries} country={this.state.country}/> : <div className="loading">"Select A Country!"</div> }
      </div>
    )
  }
}

export default Map;
