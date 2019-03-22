import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class FacesOfGithub extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			urls: [],
      display: false
    }
    this.generate = this.generate.bind(this);
  }
  
  generate(){
  	let ids = [];
  	for(let i = 0; i < 40; i++){
      let id = Math.floor(100000 + Math.random() * 90000);
      ids.push(id);
    }
		let urls = ids.map(id=>`https://avatars1.githubusercontent.com/u/${id}?s=200&v=4`)
    
    this.setState({
    	urls: urls,
      display: true
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

    let images = this.props.urls.map(url=><img src={url} />)
    return (
      <div className="image-grid">{images}</div>
    )
  }
}


export default FacesofGithub;
