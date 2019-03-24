import React, { Component } from 'react';
import Recog from './helpers/recog';
import { ClipLoader } from 'react-spinners'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
			urls: [],
      display: false,
      length: 40,
      found: 0,
      loading: true,
      images: [],
      initialLoad: true,
      counter: 0,
      max: 40
    }
    this.generate = this.generate.bind(this);
    this.recog = new Recog();
  }
  
  generate(){
    this.setState({
      display: true,
      loading: true,
      counter: 0
    })
  	let ids = [];
  	for(let i = 0; i < 40; i++){
      let id = Math.floor(100000 + Math.random() * 90000);
      ids.push(id);
    }
		let urls = ids.map(id=>`https://avatars1.githubusercontent.com/u/${id}?s=200&v=4`)

    this.recog.detect(urls, this.counter.bind(this)).then(detected => {
      console.log(detected);
      this.setState({
        urls: detected,
        display: true,
        loading: false,
        hits: detected.length
      })
    })
  }
  counter(){
    this.setState({
      counter: this.state.counter + 1
    })
  }
  componentWillMount(){
    this.loadTimer = setTimeout( _ => this.setState({initialLoad: false}), 2000)
  }
  render() {

    return (
			<div id="container">
        {this.state.initialLoad ? <button disabled>Generate</button> : <button onClick={this.generate}>Generate</button>}
        {this.state.display && 
        this.state.loading ? <div className="loading-container"><ClipLoader sizeUnit={"px"} size={100} /> <span>Processed: {this.state.counter}/{this.state.max}</span></div> :
        <ImageGrid urls={this.state.urls} />}
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
