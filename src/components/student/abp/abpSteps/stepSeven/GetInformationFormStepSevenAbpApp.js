import React, { useCallback, useEffect, useRef, useState } from 'react';

import { TeamGetInformationStepSevenAbpApp } from './TeamGetInformationStepSevenAbpApp';

import { useImage } from '../../../../../hooks/useImage';
import {  
  getImgUrls, 
  loadSchoolData, 
} from '../../../../../helpers/topic';
import { getToastMsg } from '../../../../../helpers/abp';
import { InformationEditorStepSevenAbpApp } from './InformationEditorStepSevenAbpApp';
import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';


export const GetInformationFormStepSevenAbpApp = React.memo(({
  getInformation,
  teamId,
  selectedTopic,
  isModerator,
  loadingGetInformationModel,
  toast
}) => {

  const [showImageLoading, setShowImageLoading] = useState(false);
  const editorRef = useRef(null);
  const imageCountRef = useRef(1);
  const schoolPeriodName = localStorage.getItem('currentPeriodName');
  const schoolData = loadSchoolData( schoolPeriodName, selectedTopic, true );
  const { 
    handleClearSingleImage,
    saveSingleImage, 
    deleteSingleImage, 
    singleImage,
    uploadResume
  } = useImage( schoolData, toast );

  const insertImageToEditor = useCallback(
    () => {
      if ( imageCountRef.current <= 2 ) {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
          const file = input.files[0];
          if (/^image\//.test(file.type)) {
            // const imageUrl = URL.createObjectURL(file);
            // const quillObj = editorRef.current.quill; 
            // const range = quillObj.getSelection();
            saveSingleImage( file );
            setShowImageLoading(true);
          } else {
              getToastMsg(toast, 'error', 'El archivo ingresado no es del tipo Imagen.');
          }
        }
      } else {
          getToastMsg(toast, 'error', 'Ha excedido el número de imágenes ingresadas.');
      }
    },
    [toast, saveSingleImage, setShowImageLoading],
  );

  const handleSetImageToEditor = useCallback(
    ( singleImage ) => {
      const quillObj = editorRef.current.quill; 
      const range = quillObj.getSelection();
      quillObj.insertEmbed(range.index, 'image', singleImage.path);
      imageCountRef.current = imageCountRef.current + 1;    
      setShowImageLoading(false);
      handleClearSingleImage();
    },
    [setShowImageLoading, handleClearSingleImage],
  );

  const deleteImageToEditor = useCallback(
    async ( deleted ) => {
      imageCountRef.current = imageCountRef.current - 1;
      deleteSingleImage( deleted[0] );
    },
    [ deleteSingleImage ],
  );

  const handleChangeEditorData = useCallback(
    ( source ) => {
      let currrentContents = editorRef.current.quill.getContents(); 
      // const inserted = getImgUrls(obj.delta);
      const deleted = getImgUrls(currrentContents.diff(source));
      if (deleted.length > 0) {
        deleteImageToEditor( deleted );
      }
    },
    [deleteImageToEditor],
  );

  useEffect(() => {
    if (Object.keys(singleImage).length > 0) {
      handleSetImageToEditor( singleImage );
    }
  }, [singleImage, handleSetImageToEditor]);

  return (
    <div className='col-12'>
      <div className='grid p-fluid'>
        {
          loadingGetInformationModel
            ? (
              <EmptyTeamStepsDataAbpApp />
            )
            : (
              isModerator
                ? (
                  <InformationEditorStepSevenAbpApp 
                    showImageLoading={showImageLoading}
                    uploadResume={uploadResume}
                    editorRef={editorRef}
                    getInformation={getInformation}
                    teamId={teamId}
                    toast={toast}
                    insertImageToEditor={insertImageToEditor}
                    handleChangeEditorData={handleChangeEditorData}
                  />
                )
                : (
                  <TeamGetInformationStepSevenAbpApp 
                    getInformation={getInformation}
                  />
                )
            )
        }
      </div>
    </div>
  )
});
