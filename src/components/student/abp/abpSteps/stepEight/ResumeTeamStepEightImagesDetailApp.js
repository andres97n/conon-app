import React from 'react';

import { Image } from 'primereact/image';


export const ResumeTeamStepEightImagesDetailApp = React.memo(({
  images
}) => {
  return (
    <div className='card'>
      <h5 className='text-center'>
        <i className="far fa-images mr-2 icon-primary" />
        Imágenes Descriptivas
      </h5>
      <div className='grid p-fluid'>
        {
          images.length > 0
            ? (
              images.map( (image, index) => (
                <div className='col-6' key={index}>
                  <div className='center-inside'>
                    <Image
                      preview 
                      src={image.path} 
                      alt="Imagen descriptiva"
                      width={350} 
                    />
                  </div>
                </div>
              ))
            )
            : (
              <>
                <div className='col-12'>
                  <small>No se ha guardado ninguna imagen.</small>
                </div>
              </>
            )
        }
      </div>
    </div>
  )
});
