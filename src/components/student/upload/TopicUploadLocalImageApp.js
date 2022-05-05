import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';

import { useImage } from '../../../hooks/useImage';
import { isImageValid } from '../../../helpers/topic';
import { getToastMsg } from '../../../helpers/abp';


export const TopicUploadLocalImageApp = React.memo(({
  schoolData,
  field,
  toast,
  setFieldValue,
  handleChangeTabPanel
}) => {

  
  const [showImageLoading, setShowImageLoading] = useState(false);
  const imageRef = useRef(null); 
  const { 
    saveSingleImage,
    singleImage,
    uploadResume,
  } = useImage( schoolData, toast );

  const handleUploadImage = ( event ) => {
    if (event.files.length === 1) {
      if (isImageValid(event.files[0])) {
        saveSingleImage( event.files[0] );
        setShowImageLoading(true);
      } else {
        getToastMsg(toast, 'error', 'El formato de la imagen insertada no es el correcto.');
        imageRef.current.clear();
      }
    }
    else{
      getToastMsg(toast, 'error', 'Sólo permite subir una imagen por selección.');
      imageRef.current.clear();
    }
  }

  const handleSelectLocalImage = () => {
    handleChangeTabPanel( true, 1 );
  }

  const handleRemoveImageList = () => {
    handleChangeTabPanel( false );
  }

  const handleShowImageSaved = useCallback(
    ( singleImage, field ) => {
      if (imageRef.current) {
        imageRef.current.clear();
      }
      setShowImageLoading(false);
      setFieldValue( field, singleImage );
      localStorage.setItem(`${field}Path`, singleImage.path);
    },
    [ 
      setFieldValue, 
      setShowImageLoading, 
    ],
  );

  useEffect(() => {
    if (Object.keys(singleImage).length > 0) {
      handleShowImageSaved( singleImage, field,  );
    }
  }, [singleImage, field, handleShowImageSaved ]);
  
  return (
    <>
      {
        showImageLoading &&
          (
            <div className='col-12'>
              <ProgressBar value={uploadResume}></ProgressBar>
            </div>
          )
      }
      <div className='col-12'>
        <FileUpload 
          name="image" 
          accept="image/*" 
          ref={imageRef}
          customUpload
          maxFileSize={2000000}
          chooseLabel='Seleccionar Imagen'
          uploadLabel='Subir'
          cancelLabel='Remover Todo'
          chooseOptions={{icon: 'fas fa-plus'}}
          uploadOptions={{icon: 'fas fa-upload'}}
          cancelOptions={{icon: 'fas fa-times'}}
          invalidFileSizeMessageSummary='Tamaño de Imagen Inválido'
          invalidFileSizeMessageDetail='El tamaño de la imagen no puede ser 
          mayor de los 2Mb.'
          emptyTemplate={<p className="p-m-0">Arrastre y suelte una imagen.</p>} 
          uploadHandler={handleUploadImage}
          onSelect={handleSelectLocalImage}
          onRemove={handleRemoveImageList}
          onClear={handleRemoveImageList}
        />
        <small 
          id="image-help" 
          className="p-d-block mt-1"
        >
          Recuerde que para que la imagen se guarde deberá presionar el 
          botón de "Subir Imagen".
        </small>
      </div>
    </>
  )
});
