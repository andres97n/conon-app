import React from 'react';
import { getYotubeVideoId } from '../../../helpers/topic';

export const StudentDuaVideoApp = React.memo(({
  duaVideo
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fab fa-youtube mr-2 icon-primary" />
          Vídeo Demostrativo
        </h5>
      </div>
      {
        duaVideo 
          ? (
            <div className='col-12'>
              <div className='center-inside'>
                <iframe
                  width="600"
                  height="400"
                  src={`https://www.youtube.com/embed/${getYotubeVideoId(duaVideo)[1]}`}
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
                  title="Video Demostrativo"
                />
              </div>
            </div>
          )
          : (
            <div className='col-12'>
              <small>El docente no ha implementado ningún vídeo al Tópico.</small>
            </div>
          )
      }
    </div>
  )
});
