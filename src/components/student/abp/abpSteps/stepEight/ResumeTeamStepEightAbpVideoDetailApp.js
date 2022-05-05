import React from 'react';

import { getYotubeVideoId } from '../../../../../helpers/topic';


export const ResumeTeamStepEightAbpVideoDetailApp = React.memo(({
  video
}) => {

  const embedId = getYotubeVideoId(video);

  return (
    <>
      <h5 className='text-center'>
        <i className="fas fa-video mr-2 icon-primary" />
        Vídeo Explicativo
      </h5>
      {
        video
          ? (
            <div className='center-inside'>
              <iframe
                width="600"
                height="300"
                src={
                  `https://www.youtube.com/embed/${embedId[1]}`
                }
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
          )
          : (
            <small>No existe ningún vídeo del equipo.</small>
          )
      }
    </>
  )
});
