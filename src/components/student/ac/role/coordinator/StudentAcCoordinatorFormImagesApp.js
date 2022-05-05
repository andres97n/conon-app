import React, { useEffect, useRef } from 'react';

import { Messages } from 'primereact/messages';

import { TopicUploadImageApp } from '../../../upload/TopicUploadImageApp';

import { getInfoMsg } from '../../../../../helpers/abp';


export const StudentAcCoordinatorFormImagesApp = React.memo(({
  schoolData,
  imageReferences,
  errors,
  toast,
  handleSetFieldValue
}) => {

  const infoMsg = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      getInfoMsg( 
        infoMsg, 
        'info',
        'Puede ingresar imágenes que describan o expliquen mucho más la solución que el ' + 
        'equipo plantea.',
        true
      );
    }
  }, []);

  return (
    <>
      <div className='col-12'>
        <div className='card'>
          <h5 className='text-center icon-black'>
            <i className="fas fa-images mr-2" />
            Imágenes Descriptivas
          </h5>
          <Messages
            ref={infoMsg}
            className='align-justify'
          />
          <div className='grid p-fluid'>
            <div className='col-6'>
              <TopicUploadImageApp 
                isMounted={isMounted}
                schoolData={schoolData}
                field={'imageReferences.firstImageUrl'}
                value={imageReferences.firstImageUrl}
                errorField={'firstImageUrl'}
                errors={errors}
                toast={toast}
                setFieldValue={handleSetFieldValue}
              />
            </div>
            <div className='col-6'>
              <TopicUploadImageApp 
                isMounted={isMounted}
                schoolData={schoolData}
                field={'imageReferences.secondImageUrl'}
                value={imageReferences.secondImageUrl}
                errorField={'secondImageUrl'}
                errors={errors}
                toast={toast}
                setFieldValue={handleSetFieldValue}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
});
