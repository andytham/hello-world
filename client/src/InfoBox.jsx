import React from 'react';
import './css/info-box.css';
import Translations from './Translations';
var countryCheck = ""; //dont delete this variable, super hotfix

class InfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCountry: "",
      equal: false
    }
    this.sync = this.sync.bind(this);
    this.pause = this.pause.bind(this);
    this.displayHello = this.displayHello.bind(this);
    this.playHello = this.playHello.bind(this);
    this.isNepal = this.isNepal.bind(this);
  }
  componentWillMount() {
    // console.log('mounting');
    fetch("/api/translations").then(res => res.json()).then(translations => {
      this.setState({translationsData: translations})
    })
  }

  componentWillReceiveProps() {}

  componentDidUpdate() {
    // console.log("infobox updating");
  }
  sync() {
    if (this.state.currentCountry.country != this.props.country) {
      // console.log("prevstate same");
      for (let country of this.props.countries) {
        if (country.country == this.props.country) {
          // console.log(country.country, "FOUND THE COUTNRY");
          this.setState({
            currentCountry: country
          }, this.pause)
        }
      }
    }
  }
  pause() {
    // console.log(this.state.hello);
  }
  grabTranslation() {
    // console.log('THIS RAN AGAIN');
    let transObj = {}
    let arrAll = []
    let keyCount = 0
    let arr = JSON.parse(this.state.currentCountry.languages) // turn string back into array
    if (this.state.currentCountry.languages) {

      let mapped = arr.map(country => {
        for (let language of this.state.translationsData) {
          if (country == language.language) {
            keyCount++
            return <Translations key={keyCount} name={language.name} hello={language.hello} code={language.language}/>
          }
        }
      })
      //play audio of first language if exists
      if (countryCheck != this.state.currentCountry) {
        this.playHello(mapped)
      }
      countryCheck = this.state.currentCountry
      return mapped;
    }
  } //end of grab
  playHello(mapped) {
    for (let i = 0; i < mapped.length; i++) {
      try {
        let sound = require(`./audio/${mapped[i].props.code}.mp3`)
        let audio = new Audio(sound);
        audio.play();
        return;
      } catch (error) {
        //no audio found for that language
      }
    }
  }

  displayHello(arr) {
    return arr.map(entry => {
      return <div>
        {entry}
      </div>
    })
  }

  isNepal(){
    //check for the abnormal flag
    if (this.state.currentCountry.country_code_two == "NP"){
      return <img className="flag-image nepal" src={require(`./images/flags/${this.state.currentCountry.country_code_two.toLowerCase()}.svg`)}/>
    } else {
      console.log(this.state.currentCountry.country_code_two);
      return <img className="flag-image" src={require(`./images/flags/${this.state.currentCountry.country_code_two.toLowerCase()}.svg`)}/>
    }
  }

  render() {
    return (
      <div className="info-box">
        {this.sync()}
        <div className="top-info">
          <div className="country-flag">
            {
              this.state.currentCountry
                ? this.isNepal()
                : ""
            }
          </div>
        </div>
        <div className="bottom-info">
          <div className="country-name">
            {this.state.currentCountry.name}
            <br/>
            ({this.state.currentCountry.native})
            <br/>
            <hr/>
          </div>
          <div className="hello">
            {
              this.state.translationsData
                ? this.grabTranslation()
                : "No translation data"
            }
          </div>
          <div className="misc">

          </div>
        </div>

      </div>
    )
  }
}
export default InfoBox;
