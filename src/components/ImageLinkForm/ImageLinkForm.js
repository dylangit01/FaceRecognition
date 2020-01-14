import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    // {onInputChange} is destructuring way, instead of writing props, and below will be
    // props.onInputChange
    return(
       <div>
           <p className='f3'>
               {'This Magic Brain will detect faces in your pictures. Give it a try'}
           </p>
           <div className='center'>
               <div className='form center pa4 br3 shadow-5'>
                   <input className='f4 br1 pa2 w-70 center' type="text"
                   onChange={onInputChange}
                          //this prop's name has to be same in App.js
                   />
                   <button className='w-30 grow f4 link br2 ph3 pv2 dib white bg-light-purple'
                   onClick={onButtonSubmit}
                   >Detect</button>
               </div>
           </div>
       </div>

    )
}

export default ImageLinkForm
