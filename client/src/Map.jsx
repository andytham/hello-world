import React from 'react';
import InfoBox from './InfoBox'
import * as d3 from 'd3';
import * as topojson from 'topojson';
import Datamap from 'datamaps';
import Title from './Title';
import Loading from './Loading';
import Footer from './Footer';
import playImg from './images/play.png';
import stopImg from './images/stop.jpg';
import worldjson from './world.json';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRendered: false,
      countries: ""
    }
    this.renderMap = this.renderMap.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }
  componentWillMount() {
  }

  componentDidMount() {
    // console.log(this.props);
    this.renderMap()
    fetch('/api/countries').then(res => res.json()).then(countries => {
      this.setState({countries: countries, country: ""})
    })
  }
  componentDidUpdate() {}
  selectCountry(selectedCountry) {
    this.setState({country: selectedCountry})
    // console.log(this.state.country);
  }

  renderMap() {
    let d3SelectCountry = this.selectCountry //need to bind this to a function because d3 overrides the this context
    let isZoomed = false;
    let zoomedZ = 0;
    var fills = {
      someOtherFill: '#aa9f9f',
      defaultFill: '#24ac24'
    };

    var temp_width = d3.select("#map").style("width")
    var temp_height = d3.select("#map").style("height")
    var m_width = +temp_width.split("px").join(""), //grab the max width and height
      m_height = +temp_height.split("px").join(""),
      width = m_width,
      // height = Math.min(width * (550 / 800), m_height - 50)
      height = width * (550 / 800),
      country,
      state;
      console.log(width);
    var projection = d3.geo.mercator()
      .scale(200)
      .translate([
        width / 2,
        height / 1.5
      ]);

    var path = d3.geo.path().projection(projection);
    var svg = d3.select("#map")
      .append("svg")
      .attr("class", "map-svg")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("width", m_width)
      .attr("height", m_width * height / width);

      //hover info box
    d3.select("#map")
      .append("div")
      .attr("class", "country-hoverover")
      .style("display", "none")
      .style("position", "absolute")

    // svg.append("rect")
    //   .attr("class", "background")
    //   .attr("fill", "blue")
    //   .attr("width", width)
    //   .attr("height", height)

    var g = svg.append("g")
    function help(world) {
      g.append("g")
        .attr("id","countries")
        .selectAll(".country-subunit")
        .data(topojson.feature(world, world.objects.world).features)
        .enter()
        .append("path")

        .attr("class", function(d) {
          return "country-subunit " + d.id;
        })
        .attr("d", path);
    }
    help(worldjson)

    // d3.selectAll(".country-subunit")
    //   .attr("fill", "#24ac24")
    //   .attr("stroke", "#FFFFFF")
    //   .attr("stroke-width", "1")
    d3.selectAll(".country-subunit")
      .attr("fill", "#24ac24")
      .attr("stroke", "#FFFFFF")
      .attr("stroke-width", "1")

    d3.selectAll('.country-subunit')
      .on('mouseover', mouseover)
      .on('click', click_country)
      .on('mouseout', mouseout)

    function click_country(geography) {
      console.log(geography);
      d3.selectAll('.country-subunit').attr("fill", "#24ac24")
      d3.select(this).attr("fill", "#c10000")
      var xyz = get_xyz(geography)
      if (geography && country !== geography) {
        var xyz = get_xyz(geography);
        country = geography;
        isZoomed = true;
        zoomedZ = xyz[2];
        zoom(xyz)
      } else {
        var xyz = [
          width / 2,
          height / 1.5,
          1
        ];
        country = null;
        isZoomed = false;
        d3.select(this).attr("fill", "#24ac24")
        zoom(xyz);
        zoomedZ = 1;
      }
      d3SelectCountry(geography.id)
    }

    function mouseover(d){
      let $this = d3.select(this);
      if (!isZoomed){
        $this.attr('stroke', "#FFFFFF")
        $this.attr('stroke-width', "2")
      } else {
        $this.attr("stroke-width", String(2.0 / zoomedZ))
      }

      $this.on('mousemove', null);
      $this.on('mousemove', function() {
        var position = d3.mouse(this);
        d3.select('.country-hoverover')
          .style('top', ((position[1] + 30)) + "px")
          .style('left', (position[0]) + "px")
          .html(function() {
          try {
            console.log(position);
            return (d.properties.name);
          } catch (e) {
            console.log(options);
            return "";
          }
        })
        d3.select('.country-hoverover').style('display', 'block');
      })
    }

    function mouseout(d){
      let $this = d3.select(this);
      if (!isZoomed){
        $this.attr('stroke', "#FFFFFF")
        $this.attr('stroke-width', "1")
      } else {
        var xyz = get_xyz(d);
        $this.attr("stroke-width", String(1.0 / zoomedZ))
      }

      d3.select('.country-hoverover').style('display', 'none');
    }


    function get_xyz(d) {
      var bounds = path.bounds(d);
      //bounds are two points creating a box that encompasses the svg
      var w_scale = (bounds[1][0] - bounds[0][0]) / width;
      var h_scale = (bounds[1][1] - bounds[0][1]) / height;

      let fix_zoom = ["USA", "RUS", "NZL", "FJI", "GRL", "KIR", "CAN"]
      if ( fix_zoom.indexOf(d.id) != -1 ){ //fixes weird zooming due to naturally large country size and wrapping around
        var z = (.96 / Math.max(w_scale, h_scale));
      } else {
        var z = (.96 / Math.max(w_scale, h_scale)) / 3;
      }

      var x = (bounds[1][0] + bounds[0][0]) / 2;
      var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
      return [x, y, z];
    }

    function zoom(xyz) {
      g.transition().duration(1750)
        .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")


      d3.selectAll(".country-subunit")
      .attr("stroke-width", String(1.0 / xyz[2]))
    }

    window.addEventListener('resize', function() {
      var w_temp = d3.select("#map").style("width")
      var w = + w_temp.split("px").join("")
      svg.attr("width", w);
      svg.attr("height", w * height / width);
      console.log("resizing");
      console.log(w);
    })

    // console.log("outside d3 function", this.props);
    var wind = window.d3
    //randomly select country to display
    let d3animateState = this.animateState;
    let d3isAnimating = false;

    function randomLoop(){
      // zoom back out first
      setTimeout(function(){
        var xyz = [
          width / 2,
          height / 1.5,
          1
        ];
        country = null;
        isZoomed = false;
        zoom(xyz);
        console.log('pausing...');
      }, 5500)
      let poop = wind.selectAll('.country-subunit')
      let gah = Math.trunc(Math.random() * poop[0].length)
      console.log(gah);
      let state_id = poop[0][gah].__data__.id
      d3.selectAll(".country-subunit").attr("fill", "#24ac24")
      d3.select(`.${state_id}`).attr("fill", "#c10000") //highlight selected random country
      d3SelectCountry(state_id)
      //poop[0][gah].__data__.properties
      console.log(poop[0][gah].__data__);
      var xyz = get_xyz(poop[0][gah].__data__)
      zoom(xyz)
    }

    wind.select('#animate').on('click', function() {
      if (!d3isAnimating) {
        d3isAnimating = true;
        wind.select('#animate').style('display', 'none')
        wind.select('#stop').style('display', 'block')
        randomLoop()
        let playInterval = setInterval(randomLoop, 7000);
        wind.select('#stop').on('click', function() {
          wind.select('#stop').style('display', 'none')
          wind.select('#animate').style('display', 'block')
          d3isAnimating = false;
          clearInterval(playInterval)
          var xyz = [
            width / 2,
            height / 1.5,
            1
          ];
          country = null;
          isZoomed = false;
          d3.select(this).attr("fill", "#24ac24")
          zoom(xyz);
          zoomedZ = 1;
        })
      }
    })
  } //end of renderMap

  render() {
    return (<div id="wrapper">
      <div id="map"></div>
      <div className="not-map">
        <Title/>
        <div className="buttons">
          <div className="button" id="animate" > Random Loop? </div>
          <div className="button" id="stop" > Stop Loop?</div>
        </div>
        {
          this.state.country
            ? <InfoBox countries={this.state.countries} country={this.state.country}/>
            : <div className="loading">
                <Loading/>
              </div>
        }
        <Footer/>
      </div>

    </div>)
  }
}

export default Map;
