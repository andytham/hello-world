import React from 'react';

class InfoBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentWillMount(){
    console.log("current props", this.props);
  }

  componentDidUpdate(){

  }

  render(){
    return(
      <div className="info-box">
        <div className="country-flag">

        </div>
        <div className="country-name">
          country: {this.props.country}
        </div>
        <div className="country-native">
          native:
        </div>
        <div className="hello">

        </div>

      </div>
    )
  }
}
export default InfoBox;
