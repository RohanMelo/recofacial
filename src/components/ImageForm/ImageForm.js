import React from 'react';
import './ImageForm.css';


// #TODO: lógica de input
function ImageForm({ onInputChange, onButtonSubmit }) {
  return (
    <div>
      <p className="f3">Reconhecimento Facial</p>
      <div className="center">
          <div className="center form pa4 br3 shadow-5">
            <input type="text" className="f4 pa2 w-70 center" onChange={onInputChange} />
            <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detectar</button>
          </div>
      </div>
    </div>
  )
}

export default ImageForm
