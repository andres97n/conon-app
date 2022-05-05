import { Image } from 'primereact/image';
import React from 'react';

export const TeacherTopicEditViewAbpMainFinalizeApp = React.memo(({
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
              currentMethodology.oral_explication?.length === 0
                ? (
                  <small>No se han guardado audios para este tópico.</small>
                )
                : (
                  currentMethodology.oral_explication && 
                  currentMethodology.oral_explication.map( (audio, index) => (
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
              <h4 className='text-center mb-4'>
                <i className="fas fa-image icon-primary mr-2" />
                Imagen Descriptiva
              </h4>
              {
                Object.keys(currentMethodology.descriptive_image).length === 0
                  ? (
                    <small>No se ha guardado ninguna imagen para este tópico.</small>
                  )
                  : (
                    <div className='col-12'>
                      <div className='center-inside'>
                        <Image
                          preview 
                          src={currentMethodology.descriptive_image.path} 
                          alt={currentMethodology.descriptive_image.name}
                          width={350} 
                        />
                      </div>
                    </div>
                  )
              }
            </div>
          </div>
          <div className='col-6'>
            <div className='card'>
              <h5 className='text-center'>
                <i className="fas fa-link icon-primary mr-2" />
                Enlace Contenido Externo
              </h5>
              {
                !currentMethodology.reference_url
                  ? (
                    <small>No existe ningún enlace externo para este tópico.</small>
                  )
                  : (
                    <div className='center-inside'>
                      <a 
                        href={currentMethodology.reference_url} 
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
