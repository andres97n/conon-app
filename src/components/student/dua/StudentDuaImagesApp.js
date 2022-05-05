import React, { useEffect, useRef } from 'react';

import { Image } from 'primereact/image';
import { Messages } from 'primereact/messages';

import { showMessageComponent } from '../../../helpers/topic';


export const StudentDuaImagesApp = React.memo(({
  duaImages
}) => {

  const infoMsg = useRef(null);

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      showMessageComponent( 
        infoMsg, 
        'info', 
        'El objetivo de mostrar las siguientes imágenes consiste en aprender visualizando ' + 
        'el contenido de cada una de ellas; entender el contexto en el que se desarrolla, ' +
        'así como el Docente lo entendió al momento de ingresarlas como objeto de aprendizaje.',
        true
      );
    }
  }, []);

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-images mr-2 icon-primary" />
          Imágenes Descriptivas
        </h5>
      </div>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
      {
        duaImages && duaImages.length > 0
          ? (
            duaImages.map( (image, index) => (
              <div className='col-6' key={index}>
                <div className='card'>
                  <div className='center-inside'>
                    <Image 
                      src={image.path} 
                      alt={image.name} 
                      width="250" 
                      preview 
                    />
                  </div>
                </div>
              </div>
            ))
          )
          : (
            <div className='col-12'>
              <small>No se encontró ninguna imagen presentada por el Docente.</small>
            </div>
          )
      }
    </div>
  )
});
