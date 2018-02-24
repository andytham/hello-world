import React from 'react';
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
    let arr = JSON.parse(this.state.currentCountry.languages) // turn string back into array
    if(this.state.currentCountry.languages){
      for (let [index, language] of arr.entries()){
        for (let country of this.state.translationsData){
          if (language == country.language){
            transObj[index] = country.hello
          }
        } //second loop
      } //first loop
    }

    let arrAll = []

    for (let value in transObj) {
      arrAll.push(transObj[value])
    }
    // console.log(arrAll);
    return arrAll.map(trans => {
      return <div> {trans} </div>
    })

  } //end of grab

  displayHello(arr){
    return arr.map(entry => {
      return <div> {entry} </div>
    })
  }
  render(){
    return(
      <div>
        {this.sync()}

        <div className="info-box">
          <div className="country-flag">
            {this.state.currentCountry ? <img src={require(`./images/${this.state.currentCountry.country_code_two.toLowerCase()}.svg`)} /> : ""}
          </div>
          <div className="country-name">
            {this.state.currentCountry.country} - {this.state.currentCountry.name} - {this.state.currentCountry.native}
          </div>
          <div className="hello">
            {this.state.translationsData ? this.grabTranslation() : "No data"}
          </div>
        </div>
      </div>
    )
  }
}
export default InfoBox;
