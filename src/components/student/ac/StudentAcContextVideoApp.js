import React, { useEffect, useRef } from 'react';

import { getYotubeVideoId } from '../../../helpers/topic';


export const StudentAcContextVideoApp = React.memo(({
  contextVideo
}) => {

  const isMounted = useRef(true);
  const embedId = getYotubeVideoId(contextVideo)[1];

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  if (!embedId) {
    <div className='grid p-fluid'>
      <div className='col-12'>
        <small>El docente no ha ingresado ningún vídeo.</small>
      </div>
    </div>
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          Vídeo Informativo
        </h5>
        <div className='center-inside'>
          {
            isMounted.current && (
              <iframe
                width="600"
                height="400"
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
            )
          }
        </div>
      </div>
    </div>
  )
});
