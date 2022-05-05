import React from 'react';

import { 
  TeacherTopicEditViewFinalizeDuaVideoApp 
} from '../dua/TeacherTopicEditViewFinalizeDuaVideoApp';


export const TeacherTopicEditViewAcMainFinalizeApp = React.memo(({
  currentMethodology
}) => {
  return (
    <>
      <div className='col-12'>
        <div className='card'>
          <div className='grid p-fluid'>
            <div className='col-12'>
              <h5 className='text-center mb-4'>
                <i className="fas fa-audio-description icon-primary mr-2" />
                Explicación Oral
              </h5>
            </div>
            {
              currentMethodology.context_audio?.length === 0
                ? (
                  <small>No se han guardado audios para este tópico.</small>
                )
                : (
                  currentMethodology.context_audio && 
                  currentMethodology.context_audio.map( (audio, index) => (
                    <div className='col-6' key={index}>
                      <div className='card'>
                        <div className='col-12'>
                          <h6 className='text-center'>{audio.name}</h6>
                        </div>
                        <div className='center-inside'>
                          <audio controls src={audio.path} />
                        </div>
                      </div>
                    </div>
                  ))
                )
            }
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='grid p-fluid'>
          <div className='col-6'>
            <div className='card'>
              <TeacherTopicEditViewFinalizeDuaVideoApp 
                videoUrl={currentMethodology.context_video}
              />
            </div>
          </div>
          <div className='col-6'>
            <div className='card'>
                  <h5 className='text-center'>
                    <i className="fas fa-link icon-primary mr-2" />
                    Enlace Contenido Externo
                  </h5>
                  {
                    !currentMethodology.path_reference
                      ? (
                        <small>No existe ningún enlace externo para este tópico.</small>
                      )
                      : (
                        <div className='center-inside'>
                          <a 
                            href={currentMethodology.path_reference} 
                            target="_blank" 
                            rel="noreferrer noopener"
                            className='text-center'
                          >
                            <p>
                              <i className="fas fa-external-link-alt mr-2" />
                              Enlace
                            </p>
                          </a>
                        </div>
                      )
                  }
            </div>
          </div>
        </div>
      </div>
    </>
  )
});
