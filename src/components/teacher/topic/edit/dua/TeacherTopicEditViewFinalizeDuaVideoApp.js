import React from 'react';

import { getYotubeVideoId } from '../../../../../helpers/topic';

export const TeacherTopicEditViewFinalizeDuaVideoApp = React.memo(({
  videoUrl
}) => {

  const embedId = getYotubeVideoId(videoUrl);

  if (!videoUrl) {
    return (
      <div className='col-12'>
        <small>No fue asignado ningún vídeo para este tópico.</small>
      </div>
    )
  }

  return (
    <>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fab fa-youtube icon-primary mr-2" />
          Vídeo de Youtube
        </h5>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <iframe
            width="600"
            height="300"
            src={`https://www.youtube.com/embed/${embedId[1]}`}
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
    </>
  )
});
