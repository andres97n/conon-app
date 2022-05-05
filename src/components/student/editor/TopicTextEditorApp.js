import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Editor } from 'primereact/editor';
import { ProgressBar } from 'primereact/progressbar';

import { useImage } from '../../../hooks/useImage';
import { getToastMsg } from '../../../helpers/abp';
import { emptyHeaderRender, getImgUrls, toolbarOptions } from '../../../helpers/topic';

// TODO: Esperar hasta que se ejecute el componente padre y despues este

export const TopicTextEditorApp = React.memo(({
  isMounted,
  schoolData,
  maxImages,
  value,
  field,
  errors,
  toast,
  setFieldValue,
}) => {
  
  const [showImageLoading, setShowImageLoading] = useState(false);
  const editorRef = useRef(null);
  const imageCountRef = useRef(1);
  const maxImagesRef = useRef(maxImages);
  const { 
    handleClearSingleImage,
    saveSingleImage, 
    deleteSingleImage, 
    singleImage,
    uploadResume
  } = useImage( schoolData, toast );

  const insertImageToEditor = useCallback(
    () => {
      if ( imageCountRef.current <= maxImagesRef.current ) {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
          const file = input.files[0];
          if (/^image\//.test(file.type)) {
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
    [saveSingleImage, setShowImageLoading, toast],
  );

  // const handleCustomMatcherEditor = (node, delta) => {
  //   delta.ops = delta.ops.map(op => ({
  //     insert: op.insert
  //   }))
  //   return delta
  // }

  const modules = useMemo(() => ({
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: insertImageToEditor,
      },
    }
  }), [insertImageToEditor]);

  const handleSetImageToEditor = useCallback(
    ( singleImage ) => {
      const quillObj = editorRef.current.quill; 
      const range = quillObj.getSelection();
      quillObj.insertEmbed(range.index, 'image', singleImage.path);
      localStorage.setItem(`${field}${imageCountRef.current}`, singleImage.path);
      imageCountRef.current = imageCountRef.current + 1;    
      setShowImageLoading(false);
      handleClearSingleImage();
    }, [field, setShowImageLoading, handleClearSingleImage],
  );

  const deleteImageToEditor = async ( deleted ) => {
    const imageToDelete = deleted[0];
    const isImageDeleted = await deleteSingleImage( imageToDelete );
    if (isImageDeleted) {
      const firstImage = localStorage.getItem(`${field}1`);
      const secondImage = localStorage.getItem(`${field}2`);
      const thirdImage = localStorage.getItem(`${field}3`);
      if (imageToDelete === firstImage) {
        localStorage.removeItem(`${field}1`);
      } else if (imageToDelete === secondImage) {
        localStorage.removeItem(`${field}2`);
      } else if (imageToDelete === thirdImage) {
        localStorage.removeItem(`${field}3`);
      }
      imageCountRef.current = imageCountRef.current - 1;
    }
  }

  const handleChangeEditorData = ( source ) => {
  // const inserted = getImgUrls(obj.delta);
    let currrentContents = editorRef.current.quill.getContents(); 
    const deleted = getImgUrls(currrentContents.diff(source));
    if (deleted.length > 0) {
      deleteImageToEditor( deleted );
    }
  }

  useEffect(() => {
    if (Object.keys(singleImage).length > 0) {
      handleSetImageToEditor( singleImage );
    }
  }, [singleImage, handleSetImageToEditor]);

  useEffect(() => {
    const firstImageEditor = localStorage.getItem(`${field}1`);
    const secondImageEditor = localStorage.getItem(`${field}2`);
    const thirdImageEditor = localStorage.getItem(`${field}3`);
    const handleSetImageToEditor = ( path ) => {
      if (editorRef.current.quill) {
        const range = editorRef.current.quill.selection;
        if (range) {
          editorRef.current.quill.insertEmbed(range.index, 'image', path);
          imageCountRef.current = imageCountRef.current + 1;
        }
      }
    }
    setTimeout(() => {
      if (!value && isMounted.current) {
        if (firstImageEditor) {
          handleSetImageToEditor( firstImageEditor );
        }
        if (secondImageEditor) {
          handleSetImageToEditor( secondImageEditor );
        }
        if (thirdImageEditor) {
          handleSetImageToEditor( thirdImageEditor );
        }
      }
    }, 1000);
  }, [isMounted, value, field]);

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
        <Editor
          id={`${field}`}
          ref={editorRef}
          style={{ height: '450px' }} 
          value={value} 
          placeholder='Esta es la Recopilación de Información del equipo...'
          headerTemplate={emptyHeaderRender}
          modules={modules}
          onTextChange={(e) => {
            setFieldValue(`${field}`, e.htmlValue)
            handleChangeEditorData(e.source)
          }}
        />
        {
          errors[`${field}`]
            ? (
              <small className="p-error mt-1">
                {errors[`${field}`]}
              </small>
            )
            : (
              <small 
                id="getInformation-help" 
                className="p-d-block"
              >
                Puede ingresar hasta un máximo de {maxImages} imágenes.
              </small>
            )
        }
      </div>
    </>
  )
})
