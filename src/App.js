import React, { Component } from 'react';
import Recog from './helpers/recog';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			urls: [],
      display: false,
      length: 40,
      found: 0,
      loading: true,
      images: []
    }
    this.generate = this.generate.bind(this);
    this.recog = new Recog();
  }
  
  generate(){
  	let ids = [];
  	for(let i = 0; i < 40; i++){
      let id = Math.floor(100000 + Math.random() * 90000);
      ids.push(id);
    }
		let urls = ids.map(id=>`https://avatars1.githubusercontent.com/u/${id}?s=200&v=4`)

    this.recog.detect(urls).then(detected => {
      console.log(detected);
      this.setState({
        urls: detected,
        display: true
      })
    })
  }
  
  render() {

    return (
			<div id="container">
			  <button onClick={this.generate}>Generate</button>
        {this.state.display && <ImageGrid urls={this.state.urls} />}
			</div>
    )
  }
}

class ImageGrid extends React.Component {
	render(){

    let images = this.props.urls.map((url, i)=><img src={url} alt={url} key={i}/>)
    return (
      <div className="image-grid">{images}</div>
    )
  }
}


export default App;
