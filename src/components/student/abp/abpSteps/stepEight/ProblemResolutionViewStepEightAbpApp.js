import React, { useMemo } from 'react';

import { Editor } from 'primereact/editor';
import { Image } from 'primereact/image';

import { emptyHeaderRender, getYotubeVideoId } from '../../../../../helpers/topic';


export const ProblemResolutionViewStepEightAbpApp = ({
  currentProblemResolutionAbp
}) => {

  const modules = useMemo(() => ({
    toolbar: {
      container: []
    },
  }), []);

  return (
    <div className='grid p-fluid'>
      {
        currentProblemResolutionAbp.length === 0
          ? (
            <div className='col-12'>
              <small>
                Aún no existe información generada.
              </small>
            </div>
          )
          : (
            <>
              <div className='col-12'>
                <Editor
                  style={{ height: '500px' }}
                  headerTemplate={emptyHeaderRender} 
                  modules={modules}
                  value={
                    currentProblemResolutionAbp[0].problem_resolution
                  } 
                  readOnly={true}
                />
              </div>
              <div className='col-12'>
                <h5 className='text-center'>
                  <i className="fas fa-images mr-2" />
                  Imágenes Descriptivas
                </h5>
              </div>
              {
                currentProblemResolutionAbp[0].image_references.length === 0
                  ? (
                    <div className='col-12'>
                      <small>Aún no existen imágenes.</small>
                    </div>
                  )
                  : (
                    currentProblemResolutionAbp[0].image_references.map( (image, index) => (
                      <div className='col-6' key={index}>
                        <div className='card'>
                          <div className='center-inside'>
                            <Image
                              preview 
                              src={image.path} 
                              alt="Imagen descriptiva"
                              width={350} 
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )
              }
              <div className='col-6'>
                <div className='card'>
                  <h5 className='text-center'>
                    <i className="fab fa-youtube mr-2" />Vídeo
                  </h5>
                  {
                    !currentProblemResolutionAbp[0].video_url
                      ? (
                        <small>Todavía no existe ningún vídeo guardado.</small>
                      )
                      : (
                        <div className='center-inside'>
                          <iframe
                            width="600"
                            height="400"
                            src={`https://www.youtube.com/embed/${getYotubeVideoId(currentProblemResolutionAbp[0].video_url)[1]}`}
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
                  }
                </div>
              </div>
              <div className='col-6'>
                <div className='card'>
                  <h5 className='text-center'>
                    <i className="fas fa-comment mr-2" />Observaciones
                  </h5>
                  <span id='area_wrap' className='align-justify'> 
                    <i className="fas fa-asterisk mr-2" />
                    {currentProblemResolutionAbp[0].observations}
                  </span>
                </div>
              </div>
            </>
          )
      }
    </div>
  )
}
