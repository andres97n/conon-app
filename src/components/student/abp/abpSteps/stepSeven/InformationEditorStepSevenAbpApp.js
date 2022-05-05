import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { ProgressBar } from 'primereact/progressbar';
import { Editor } from 'primereact/editor';
import { InputTextarea } from 'primereact/inputtextarea';
import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';

import { emptyHeaderRender, toolbarOptions } from '../../../../../helpers/topic';
import { 
  startSaveGetInformationModelStepSevenAbp, 
  startUpdateGetInformationStepSevenAbp 
} from '../../../../../actions/student/abp_steps/getInformationStepSevenAbp';

export const InformationEditorStepSevenAbpApp = React.memo(({
  showImageLoading,
  uploadResume,
  editorRef,
  getInformation,
  teamId,
  toast,
  insertImageToEditor,
  handleChangeEditorData
}) => {

  const dispatch = useDispatch();
  const infoMsg = useRef(null);
  const formik = useFormik({
    initialValues: {
      getInformation: '',
      observations: ''
    },
    validate: (data) => {
      let errors = {};

      if (!data.getInformation) {
        errors.getInformation = 'La obtención de información es obligatorio.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveGetInformationData( data );
    }
  });

  const { 
    values, 
    errors, 
    setValues, 
    setFieldValue, 
    handleChange, 
    handleSubmit 
  } = formik;

  const modules = useMemo(() => ({
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: insertImageToEditor,
      },
    },
  }), [insertImageToEditor]);

  const handleSubmitGetInformationData = ( data ) => {
    const newInformation = {
      team_abp: teamId,
      get_information: data.getInformation,
      observations: data.observations,
      active: true
    };
    if (getInformation.id) {
      dispatch( startUpdateGetInformationStepSevenAbp( 
        newInformation, getInformation.id, toast 
      ));
    } else {
      dispatch( startSaveGetInformationModelStepSevenAbp( newInformation, toast ) );
    }
  }

  const handleConfirmSaveGetInformationData = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar la siguiente información?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitGetInformationData( data ),
    });
  }

  const handleSetGetInformationData = useCallback(
    ( getInformationData ) => {
      if (!values.getInformation && !values.observations) {
        setValues({
          getInformation: getInformationData.get_information,
          observations: getInformationData.observations
        });
      }
    },
    [values, setValues],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
        infoMsg.current.show({
          severity: 'info',
          detail: 'Si es que necesita subir una imagen tome en cuenta las dimensiones de ' +
          'la misma, ya que se subirá de esa forma.',
          sticky: true
        });
    }
  }, []);

  useEffect(() => {
    if (getInformation && Object.keys(getInformation).length > 0) {
      handleSetGetInformationData( getInformation );
    }
  }, [getInformation, handleSetGetInformationData]);

  return (
    <>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
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
          id='getInformation'
          ref={editorRef}
          style={{ height: '450px' }} 
          value={values.getInformation} 
          placeholder='Esta es la Recopilación de Información del equipo...'
          headerTemplate={emptyHeaderRender}
          modules={modules}
          onTextChange={(e) => {
            setFieldValue('getInformation', e.htmlValue)
            handleChangeEditorData(e.source)
          }}
        />
        {
          errors.getInformation
            ? (
              <small className="p-error mt-1">
                {errors['getInformation']}
              </small>
            )
            : (
              <small 
                id="getInformation-help" 
                className="p-d-block"
              >
                Puede ingresar hasta un máximo de 2 imágenes.
              </small>
            )
        }
      </div>
      <div className='col-12 mt-3'>
        <span className="p-float-label">
          <InputTextarea
              id='observations'
              name='observations'
              required rows={3} cols={20} 
              value={values.observations}
              onChange={handleChange}
          />
          <label htmlFor='observations'>
            Puede ingresar observaciones si así lo desea...
          </label>
        </span>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-3'>
            <Button
              icon='fas fa-save'
              label='Guardar Información'
              tooltip='Puede guardar los cambios realizados y que el grupo 
              lo visualice.'
              tooltipOptions={{position:'bottom'}}
              type='submit'
              className='p-button-raised'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
});
