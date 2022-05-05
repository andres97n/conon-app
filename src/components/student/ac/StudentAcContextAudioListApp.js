import React, { useEffect, useRef } from 'react';

export const StudentAcContextAudioListApp = React.memo(({
  contextAudio
}) => {

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <>
      {
        contextAudio.length === 0
        ? (
          <small>No se ha guardado ningún audio con respecto a este tópico.</small>
        )
        : (
          isMounted.current && contextAudio.map( (data, index) => (
            <div className='col-6' key={index}>
              <div className='card'>
                <h5 className='text-center'>{data.name}</h5>
                <div className='center-inside'>
                  <audio controls src={data.path} />
                </div>
              </div>
            </div>
          ))
        )
      }
    </>
  )
});
