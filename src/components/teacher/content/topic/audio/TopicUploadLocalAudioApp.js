import React, { useEffect, useRef, useState } from 'react';

import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';

import { useAudio } from '../../../../../hooks/useAudio';
import { getToastMsg } from '../../../../../helpers/abp';
import { getValidTopicAudios } from '../../../../../helpers/topic/main';


export const TopicUploadLocalAudioApp = React.memo(({
  schoolData,
  value,
  field,
  maxAudios,
  audioCount,
  toast,
  setFieldValue,
  setAudioCount
}) => {

  const [showImageLoading, setShowImageLoading] = useState(false);
  const audioRef = useRef(null);
  const { 
    uploadResume, 
    singleAudio, 
    saveSingleAudio, 
    handleClearSingleAudio 
  } = useAudio( schoolData, toast );

  const handleUploadAudio = ( event ) => {
    const { isValid, invalidAudio } = getValidTopicAudios(event.files);
    if (isValid) {
      event.files.forEach( audio => {
        saveSingleAudio( audio );
        setShowImageLoading(true);
        setAudioCount( true );
      });
      if (audioRef.current) {
        audioRef.current.clear();
      }
    } else {
      getToastMsg(
        toast, 
        'error', 
        (
          event.files.length > 1
            ? (`El formato del siguiente audio ${invalidAudio} insertado no es válido.`)
            : ('El formato del audio insertado no es válido.')
        )
      );
      audioRef.current.clear();
    }
  }

  const handleValidSelectedAudios = ( e ) => {
    if (e.files.length > maxAudios) {
      audioRef.current.clear();
      getToastMsg(toast, 'error', `Sólo permite subir hasta un máximo de ${maxAudios} audios.`);
    } else {
      if ((audioRef.current.files.length + audioCount) > maxAudios) {
        audioRef.current.clear();
        getToastMsg(toast, 'error', 'Ha superado el número de audios permitidos.');
      }
    }
  }

  useEffect(() => {
    const handleSetAudioSaved = ( singleAudio, field ) => {
      setShowImageLoading(false);
      setFieldValue( field, [ ...value, singleAudio ] );
      localStorage.setItem(`${field}${value.length + 1}`, singleAudio.path);
      handleClearSingleAudio();
    }

    if (
      Object.keys(singleAudio).length > 0 && 
      (value.length < maxAudios)
    ) {
      handleSetAudioSaved( singleAudio, field );
    }
  }, [
    singleAudio, 
    maxAudios, 
    field, 
    value, 
    setFieldValue, 
    handleClearSingleAudio 
  ]);

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
          name="audio" 
          accept="audio/*" 
          ref={audioRef}
          customUpload
          multiple
          maxFileSize={2500000}
          chooseLabel='Seleccionar Audio'
          uploadLabel='Subir'
          cancelLabel='Remover Todo'
          chooseOptions={{icon: 'fas fa-plus'}}
          uploadOptions={{icon: 'fas fa-upload'}}
          cancelOptions={{icon: 'fas fa-times'}}
          invalidFileSizeMessageSummary='Tamaño de Audio Inválido'
          invalidFileSizeMessageDetail='El tamaño del audio no puede ser 
          mayor de los 2,5Mb.'
          emptyTemplate={<p className="p-m-0">Arrastre y suelte un audio.</p>} 
          uploadHandler={handleUploadAudio}
          onSelect={handleValidSelectedAudios}
        />
        <small 
          id="image-help" 
          className="p-d-block mt-1"
        >
          Recuerde que para que el audio se guarde deberá presionar el 
          botón de "Subir".
        </small>
      </div>
    </>
  )
});
