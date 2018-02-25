import React from 'react';
import './info-box.css';

class InfoBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentCountry: "",
      equal: false
    }
    this.sync = this.sync.bind(this);
    this.pause = this.pause.bind(this);
    this.displayHello = this.displayHello.bind(this);
  }
  componentWillMount(){
    // console.log('mounting');
    fetch("/api/translations")
      .then(res => res.json())
      .then(translations => {
        this.setState({
          translationsData: translations
        })
      })
  }

  componentWillReceiveProps(){
  }

  componentDidUpdate(){
    // console.log("infobox updating");
  }
  sync(){
    if(this.state.currentCountry.country != this.props.country){
      // console.log("prevstate same");

    for (let country of this.props.countries) {
        if (country.country == this.props.country){
          // console.log(country.country, "FOUND THE COUTNRY");
          this.setState({
            currentCountry: country
          })
        }
    }

  }
  }
  pause(){
    // console.log("pausing");
    // console.log(this.state.hello);
  }
  grabTranslation(){
    // console.log('THIS RAN AGAIN');
    let transObj = {}
    let arrAll = []
    let arr = JSON.parse(this.state.currentCountry.languages) // turn string back into array
    if(this.state.currentCountry.languages){
      for (let [index, country] of arr.entries()){
        for (let language of this.state.translationsData){
          if (country == language.language){
            // transObj[country.name] = country.hello
            arrAll.push(`${language.name}:  ${language.hello}`)
          }
        } //second loop
      } //first loop
    }


    // console.log(arrAll);
    // console.log(Object.entries(arrAll[0]));
    // actually pushes to DOM
    let keyCount = 0
    return arrAll.map(translation => {
      keyCount++
      return (<div key={keyCount}> {translation} </div>)
    })
  } //end of grab

  displayHello(arr){
    return arr.map(entry => {
      return <div> {entry} </div>
    })
  }

  render(){
    return(
        <div className="info-box">
          {this.sync()}
          <div className="left-info">
            <div className="country-flag">
              {this.state.currentCountry ? <img className="flag-image" src={require(`./images/${this.state.currentCountry.country_code_two.toLowerCase()}.svg`)} /> : ""}
            </div>
          </div>
          <div className="right-info">
            <div className="country-name">
              {this.state.currentCountry.country} - {this.state.currentCountry.name} - {this.state.currentCountry.native}
            </div>
            <div className="hello">
              <div className="hello-title"> How to say "Hello" in:</div>
              {this.state.translationsData ? this.grabTranslation() : "No translation data"}
            </div>
          </div>

        </div>
    )
  }
}
export default InfoBox;
