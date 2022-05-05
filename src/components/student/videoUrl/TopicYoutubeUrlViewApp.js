import React from 'react';

import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { getYotubeVideoId } from '../../../helpers/topic';


export const TopicYoutubeUrlViewApp = React.memo(({
  value,
  field,
  setVideoValue
}) => {

  const embedId = getYotubeVideoId(value)[1];

  const handleDeleteYoutubeVideo = () => {
    setVideoValue( field, '' );
  } 

  const handleConfirmDeleteLocalImage = () => {
    confirmDialog({
      message: '¿Está seguro que desea quitar el siguiente vídeo?',
      header: 'Confirmación de eliminado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, quitar',
      rejectLabel: 'No quitar',
      acceptClassName: 'p-button-raised p-button-danger',
      accept: () => handleDeleteYoutubeVideo(),
    });
  }

  return (
    <div className='col-12'>
      <div className='grid p-fluid'>
        <div className='col-12'>
          <div className='center-inside'>
            <iframe
              width="600"
              height="300"
              src={`https://www.youtube.com/embed/${embedId}`}
              frameBorder="0"
              allow="
                accelerometer; 
                autoplay; 
                clipboard-write; 
                encrypted-media; 
                gyroscope; 
                picture-in-picture
              "
              allowFullScreen
              title="Url Video"
            />
          </div>
        </div>
        <div className='col-12'>
          <div className='center-inside'>
            <div className='col-4'>
              <Button
                icon='fas fa-trash-alt'
                label='Eliminar Vídeo'
                className='p-button-raised p-button-danger'
                onClick={handleConfirmDeleteLocalImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});
