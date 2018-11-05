import React from 'react';
import rosto from './icone.jpg';
import Tilt from 'react-tilt';

function Logo() {
  return (
    <div className='center'>
        <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3">
                <img src={rosto} alt="Rosto AI" style={{paddingTop: '5px'}}></img>
            </div>
        </Tilt>
    </div>
  )
}

export default Logo
