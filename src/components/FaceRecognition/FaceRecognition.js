import React from "react";
// dont forget to import css fire!!!
import './FaceRecognition.css'


const FaceRecognition = ({imageUrl, box}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                {/* img tag can use width and height directly*/}
                {/* once the width fixed, and using height to auto adjust with width*/}
                <img id='inputImage' src={imageUrl} alt="" width='500px' height='auto' />

                {/* This div is actually going to be empty, as not displaying
                anything other then the box border, and the border has top, right, bottom and left order*/}
                <div className='bounding-box'
                style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
                >

                </div>
            </div>

        </div>

    )
}

export default FaceRecognition
