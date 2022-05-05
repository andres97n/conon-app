import React from 'react';

import { Image } from 'primereact/image';

import { 
  TeacherTopicEditViewFinalizeDuaVideoApp 
} from './TeacherTopicEditViewFinalizeDuaVideoApp';


export const TeacherTopicEditViewFinalizeDuaApp = React.memo(({
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
              currentMethodology.oral_conceptualization?.length === 0
                ? (
                  <small>No se han guardado audios para este tópico.</small>
                )
                : (
                  currentMethodology.oral_conceptualization && 
                  currentMethodology.oral_conceptualization.map( (audio, index) => (
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
        <div className='card'>
          <div className='grid p-fluid'>
            <div className='col-12'>
              <h4 className='text-center mb-4'>
                <i className="fas fa-images icon-primary mr-2" />
                Imágenes Descriptivas
              </h4>
            </div>
            {
              currentMethodology.image?.length === 0
                ? (
                  <small>No se han guardado imágenes para este tópico.</small>
                )
                : (
                  currentMethodology.images && 
                  currentMethodology.images.map( (image, index) => (
                    <div className='col-6' key={index}>
                      <div className='card'>
                        <div className='col-12'>
                          <div className='center-inside'>
                            <Image
                              preview 
                              src={image.path} 
                              alt={image.name}
                              width={350} 
                            />
                          </div>
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
        <div className='card'>
          <div className='grid p-fluid'>
            <div className='col-6'>
              <div className='card'>
                <TeacherTopicEditViewFinalizeDuaVideoApp 
                  videoUrl={currentMethodology.video}
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
                  !currentMethodology.extra_information
                    ? (
                      <small>No existe ningún enlace externo para este tópico.</small>
                    )
                    : (
                      <div className='center-inside'>
                        <a 
                          href={currentMethodology.extra_information} 
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
      </div>
    </>
  )
});
