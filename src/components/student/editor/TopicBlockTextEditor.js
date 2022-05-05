import React from 'react';

import { Message } from 'primereact/message';

import { TopicBlockUploadApp } from '../upload/TopicBlockUploadApp';

// TODO: Eliminar este componente

export const TopicBlockTextEditor = React.memo(({
  blockImagesNum,
  schoolData,
  items,
  toast,
  handleBlockEditor
}) => {
  return (
    <div className='grid p-fluid'>
      {
        blockImagesNum > 0 &&
          <div className='col-12'>
            <Message
               severity="error" 
               text="Cuando elimine la última imagen no guardada asegúrese de recargar 
               e ingresar nuevamente a este tópico, esto pasa cuando se guardan las imágenes 
               pero no la información general del paso." 
             />
          </div>
      }
      {
        blockImagesNum === 1
          ? (
            <div className='col-6'>
              <TopicBlockUploadApp
                schoolData={schoolData}
                item={items[0]}
                toast={toast}
                handleBlockImageUploadButtons={handleBlockEditor}
              />
            </div>
          )
          : (
            blockImagesNum === 2
              ? (
                <>
                  <div className='col-6'>
                    <TopicBlockUploadApp 
                      schoolData={schoolData}
                      item={items[0]}
                      toast={toast}
                      handleBlockImageUploadButtons={handleBlockEditor}
                    />
                  </div>
                  <div className='col-6'>
                    <TopicBlockUploadApp 
                      schoolData={schoolData}
                      item={items[1]}
                      toast={toast}
                      handleBlockImageUploadButtons={handleBlockEditor}
                    />
                  </div>
                </>
              )
              : (
                <>
                  <div className='col-6'>
                    <TopicBlockUploadApp 
                      schoolData={schoolData}
                      item={items[0]}
                      toast={toast}
                      handleBlockImageUploadButtons={handleBlockEditor}
                    />
                  </div>
                  <div className='col-6'>
                    <TopicBlockUploadApp 
                      schoolData={schoolData}
                      item={items[1]}
                      toast={toast}
                      handleBlockImageUploadButtons={handleBlockEditor}
                    />
                  </div>
                  <div className='col-6'>
                    <TopicBlockUploadApp 
                      schoolData={schoolData}
                      item={items[2]}
                      toast={toast}
                      handleBlockImageUploadButtonss={handleBlockEditor}
                    />
                  </div>
                </>
              )
          )
      }
    </div>
  )
});
