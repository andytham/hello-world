import React from 'react';
let string = "af,ar,bn,ca,cs,cy,da,de,el,en,en_us,en_gb,en_au,eo,es,et,fi,fr,gu,hi,hr,hu,id,is,it,iw,ja,kn,ko,la,lv,mk,nl,no,pl,pt,ro,ru,sk,sq,sr,sv,sw,ta,te,th,tl,tr,uk,vi,yi,zh,zh-CN,zh-TW";
let arr = string.split(',')

class Translations extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hasAudio: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(){

  }
  componentDidUpdate(){}

  check(){
    try {
      let sound = require(`./audio/${this.props.code}.mp3`)
      console.log("set state probably?");
      return <button onClick={this.handleClick}> Play Sound </button>
    }
    catch(error) {
      console.log(error);

      // expected output: SyntaxError: unterminated string literal
      // Note - error messages will vary depending on browser
    }
  }

  handleClick(){
    let sound = require(`./audio/${this.props.code}.mp3`)
    var audio = new Audio(sound);
    audio.play();
  }

  render(){
    return(
      <div>
        <div> {this.props.name}: {this.props.hello} </div>
        {this.check()}
        {this.state.hasAudio ? <button onClick={this.handleClick}> Play Sound </button> : ""}
      </div>
    )
  }
}

export default Translations
