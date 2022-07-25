import React from 'react';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { TopicViewTextEditorApp } from "../../../../student/editor/TopicViewTextEditorApp";
import { Image } from 'primereact/image';
import { InputTextarea } from 'primereact/inputtextarea';

export const CoordinatorPerformanceProblemResolutionApp = React.memo(({
  problemResolutionGroup,
  loadingProblemResolutionGroup
}) => {
  return (
    <>
      {
        loadingProblemResolutionGroup
          ? (
            <EmptyContentScreen />
          )
          : (
            <>
              <div className='col-12'>
                <h5 className='text-center'>Resolución del Problema</h5>
              </div>
              <div className='col-12'>
                <TopicViewTextEditorApp 
                  height={'400px'}
                  value={problemResolutionGroup.problem_resolution}
                />
              </div>
              <h5 className='text-center'>Imágenes agregadas</h5>
              {
                Array.isArray(problemResolutionGroup?.references_images) &&
                  problemResolutionGroup.references_images.map( (image, index) => (
                    <div className='col-6' key={index}>
                      {
                        Object.keys(image).length > 0 && (
                          <div className='card'>
                            <div className='center-inside'>
                              <Image
                                src={image.path} 
                                alt={image.name} 
                                width="250" 
                                preview 
                            />
                            </div>
                          </div>
                        )
                      }
                    </div>
                  ))
              }
              <div className='col-12'>
                <div className='card'>
                  <h5 className='text-center'>Comentarios</h5>
                    <InputTextarea 
                      value={problemResolutionGroup.observations}
                      autoResize
                      disabled 
                    />
                </div>
              </div>
            </>
          )
      }
    </>
  )
});
