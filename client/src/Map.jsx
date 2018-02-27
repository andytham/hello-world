import React from 'react';
import InfoBox from './InfoBox'
import * as d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps';
import Title from './Title';
import Loading from './Loading';
import Footer from './Footer';
import './css/map.css';

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRendered: false,
      countries: "",
    }
    this.renderMap = this.renderMap.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
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
      geographyConfig: {
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: '#FFFFFF',
        highlightOnHover: false,
        highlightFillColor: '#FFFFFF',
        highlightBorderColor: "#FFFFFF",
        highlightBorderWidth: 2,
        highlightBorderOpacity: 1
      },
    });

    var colors = d3.scale.category10();

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


    //built in resize in datamaps
    d3.select(window).on('resize', function() {
      basic_choropleth.resize()
    });

    let d3SelectCountry = this.selectCountry //need to bind this to a function because d3 overrides the this context
    console.log("outside d3 function", this.props);
    wind.selectAll('.datamaps-subunit')
      .on('click', function(geography) {
        console.log(geography);
        basic_choropleth.updateChoropleth(null, {reset: true}) // resets map
        var state_id = geography.id;
        var new_fills = {
          [geography.id] : "#c10000"
          // colors(Math.random() * 10)
          // {fillKey: antikey}
        };
        basic_choropleth.updateChoropleth(new_fills);
        // d3.select(".country-name").text(state_id)
        d3SelectCountry(state_id)
      })

      //randomly select country to display
      let d3animateState = this.animateState;
      wind.select('#animate').on('click',function () {
        let poop = wind.selectAll('.datamaps-subunit')
        let playInterval = setInterval(function() {

          let gah = Math.trunc(Math.random() * poop[0].length)
          let state_id = poop[0][gah].__data__.id
          basic_choropleth.updateChoropleth(null, {reset: true}) // resets map
          var new_fills = {
            [state_id] : "#c10000"

          };
          basic_choropleth.updateChoropleth(new_fills);
          // d3.select(".country-name").text(state_id)
          d3SelectCountry(state_id)
         }, 2000);
         console.log(playInterval);

        wind.select('#stop').on('click', function(){
          console.log(playInterval);
          clearInterval(playInterval)
        })
       })

  }//end of renderMap


  render(){
    return(
      <div id="wrapper">
        <div id="map"> </div>
        <div className="not-map">
          <Title />
          <div className="buttons">
            <button id="animate"> play</button>
            <button id="stop"> stop </button>
          </div>
          {
            this.state.country
            ?
            <InfoBox countries={this.state.countries} country={this.state.country}/>
            :
            <div className="loading">
              Pick a country
            </div>
          }
        </div>


      </div>
    )
  }
}

export default Map;
