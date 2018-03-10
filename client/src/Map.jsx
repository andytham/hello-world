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
    console.log(worldjson);
    console.log(JSON.stringify(worldjson));
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
    var fills = {
      someOtherFill: '#aa9f9f',
      defaultFill: '#24ac24'
    };

    var temp_width = d3.select("#map").style("width")
    var m_width = +temp_width.split("px").join(""),
      width = 938,
      height = 500,
      country,
      state;
    var projection = d3.geo.mercator()
      .scale(150)
      .translate([
        width / 2,
        height / 1.5
      ]);

    var path = d3.geo.path().projection(projection);
    var svg = d3.select("#map")
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("width", m_width)
      .attr("height", m_width * height / width);

    svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)

    var g = svg.append("g");
    var poop = JSON.stringify(worldjson)
    var poop2 = JSON.parse(worldjson)
    d3.json(poop, function(error, world) {
      console.log(worldjson);
      console.log(error);
      g.selectAll(".datamaps-subunit")
        .data(topojson.feature(world, world.objects.world).features)
        .enter()
        .append("path")
        .attr("class", function(d) {
          return "datamaps-subunit " + d.id;
        })
        .attr("d", path);
    })

    d3.selectAll(".datamaps-subunit")
      .attr("fill", "#24ac24")
      .attr("stroke", "lightBlue")
      .attr("stroke-width", "1")

    d3.selectAll('.datamaps-subunit')
      .on('mouseover', function(d) {
        let $this = d3.select(this);
        // $this.style('fill',"#FFFFFF")
        $this.style('stroke', "#FFFFFF")
        $this.style('stroke-width', "1")
        $this.on('mousemove', null);
        $this.on('mousemove', function() {
          var position = d3.mouse(this);
          d3.select('.datamaps-hoverover').style('top', ((position[1] + 30)) + "px").style('left', (position[0]) + "px").html(function() {
            try {
              // console.log(d);
              return (d.properties.name);
            } catch (e) {
              console.log(options);
              return "";
            }
          })
          d3.select('.datamaps-hoverover').style('display', 'block');
        })
      })
      .on('click', click_country)
      .on('mouseout', function(d) {
        let $this = d3.select(this);
        // $this.style('fill',"#000000")
        $this.style('stroke', "#FFFFFF")
        $this.style('stroke-width', "1")
        d3.select('.datamaps-hoverover').style('display', 'none');
      })

    function click_country(geography) {
      var state_id = geography.id;
      var new_fills = {
        [geography.id]: "#c10000"
      };
      d3.selectAll('.datamaps-subunit').attr("fill", "red")
      d3.select(this).attr("fill", "#000000")
      var xyz = get_xyz(geography)
      if (d && country !== d) {
        var xyz = get_xyz(d);
        country = d;
        zoom(xyz)
      } else {
        var xyz = [
          width / 2,
          height / 1.5,
          1
        ];
        country = null;
        zoom(xyz);
      }
      d3SelectCountry(state_id)
    }

    var wind = window.d3

    function zoom(xyz) {
      g.transition().duration(1750).attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")
    }

    function get_xyz(d) {
      var bounds = path.bounds(d);
      //bounds are two points creating a box that encompasses the svg
      var w_scale = (bounds[1][0] - bounds[0][0]) / width;
      var h_scale = (bounds[1][1] - bounds[0][1]) / height;
      var z = (.96 / Math.max(w_scale, h_scale)) / 3;

      var x = (bounds[1][0] + bounds[0][0]) / 2;
      var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
      return [x, y, z];
    }

    window.addEventListener('resize', function() {
      // var w = $("#map").width();
      var w_temp = d3.select("#map").style("width")
      var w = + w_temp.split("px").join("")
      svg.attr("width", w);
      svg.attr("height", w * height / width);
      console.log("resizing");
    })

    // console.log("outside d3 function", this.props);

    //randomly select country to display
    let d3animateState = this.animateState;
    let d3isAnimating = false;
    wind.select('#animate').on('click', function() {
      if (!d3isAnimating) {
        d3isAnimating = true;
        wind.select('#animate').style('display', 'none')
        wind.select('#stop').style('display', 'block')
        let poop = wind.selectAll('.datamaps-subunit')
        let playInterval = setInterval(function() {

          let gah = Math.trunc(Math.random() * poop[0].length)
          let state_id = poop[0][gah].__data__.id
          basic_choropleth.updateChoropleth(null, {reset: true}) // resets map
          var new_fills = {
            [state_id]: "#c10000"
          };
          basic_choropleth.updateChoropleth(new_fills);
          // d3.select(".country-name").text(state_id)
          d3SelectCountry(state_id)
        }, 2000);
        wind.select('#stop').on('click', function() {
          wind.select('#stop').style('display', 'none')
          wind.select('#animate').style('display', 'block')
          d3isAnimating = false;
          clearInterval(playInterval)
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
          <img className="button" id="animate" src={playImg}/>
          <img className="button" id="stop" src={stopImg}/>
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
