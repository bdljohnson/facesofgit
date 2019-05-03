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
      hits: 0,
      max: 200
    }
    this.generate = this.generate.bind(this);
    this.hitcounter = this.hitcounter.bind(this);
    this.updateUrls = this.updateUrls.bind(this);
    this.recog = new Recog();
  }
  
  generate(){
    this.setState({
      display: true,
      loading: true,
      counter: 0,
      hits: 0,
      images: []
    })
  	let ids = [];
  	for(let i = 0; i < this.state.max; i++){
      let id = Math.floor(Math.random() * 20000000) + 1;
      ids.push(id);
    }
		let urls = ids.map(id=>`https://avatars1.githubusercontent.com/u/${id}?s=200&v=4`)

    this.recog.detect(urls, this.counter.bind(this), this.hitcounter, this.updateUrls)
  }
  counter(){
    this.setState({
      counter: this.state.counter + 1
    })
  }
  hitcounter(){
    this.setState({
      hits: this.state.hits + 1
    })
  }
  componentWillMount(){
    this.loadTimer = setTimeout( _ => this.setState({initialLoad: false}), 2000)
  }
  /**
   * 
   * @param {Number} id The id of the image hit
   * @param {Object} options Options containing the status
   */
  updateUrls(id){
    this.setState((prevState)=>({images: [...prevState.images, id], loading: false}))
  }
  render() {

    return (
			<div id="container">
    {this.state.initialLoad ? <button disabled>Generate</button> : (<div className="top-container"><span>Processed: {this.state.counter}/{this.state.max}</span><button onClick={this.generate}>Generate</button><span>Hits: {this.state.hits}</span></div>)}
        {this.state.display && 
        <ImageGrid urls={this.state.images} />}
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
