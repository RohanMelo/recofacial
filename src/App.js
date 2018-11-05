import React, { Component } from 'react';
import Logo from './components/Logo/Logo';
import ImageForm from './components/ImageForm/ImageForm';
import Reconhecimento from './components/Reconhecimento/Reconhecimento';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

// API Key Necessária para o APP Funcionar, coloque aqui.
const app = new Clarifai.App({
  apiKey: 'API_KEY'
 });

const particlesConfig = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  // Com as informações do API, calcula as bordas relativas à imagem. O API envia essas informações em %.
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  // coleta as informações do API ao clicar no botão.
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(response =>     
      this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }
       
      
         
  
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesConfig} />
        <Logo />
        <ImageForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <Reconhecimento box={this.state.box} imageUrl={this.state.imageUrl} />
              

      </div>
    );
  }
}

export default App;
