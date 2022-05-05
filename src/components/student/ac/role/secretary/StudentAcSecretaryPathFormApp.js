import React, { useCallback, useEffect, useRef } from 'react'
import { confirmDialog } from 'primereact/confirmdialog';
import { useFormik } from 'formik';

import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

import { StudentAcSecretaryPathDetailApp } from './StudentAcSecretaryPathDetailApp';

import { isValidHttpUrl } from '../../../../../helpers/abp-steps';


export const StudentAcSecretaryPathFormApp = React.memo(() => {
  
  const infoMsg = useRef(null);
  const formik = useFormik({
    initialValues: {
      secretaryPaths: [{ item: '' }]
    },
    validate: (data) => {
      let errors = {};
      let forms = [];
      if (data.secretaryPaths) {
        const dataValid = data.secretaryPaths.filter( 
          data => !data.item || !isValidHttpUrl(data.item)  
        );
        if (dataValid.length > 0) {
          data.secretaryPaths.forEach( (data, index) => {
            let itemError = {};
            if (!data.item) {
              itemError.item = `El campo ${index + 1} es requerido.`;
            } else if (data.item && !isValidHttpUrl(data.item)) {
              itemError.item = `El enlace del campo ${index + 1} no es válido.`;
            }
            forms = [ ...forms, itemError ];
          });
        }
      }
      if (forms.length > 0) {
        errors.secretaryPaths = forms;
      }
      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveSecretaryPaths( data );
    }
  });

  const { values, errors, setFieldValue, handleSubmit } = formik;

  const handleSubmitSecretaryPaths = ( data ) => {
    console.log(data);
  }

  const handleConfirmSaveSecretaryPaths = ( data ) => {
    const onePath = 'el siguiente enlace';
    const manyPaths = 'los siguientes enlaces'
    confirmDialog({
      message: `¿Está seguro de guardar ${
        data.secretaryPaths.length === 1 ? onePath : manyPaths 
      }?`,
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitSecretaryPaths( data ),
    });
  };

  const handleSetFieldValue = useCallback(
    ( field, value ) => {
      setFieldValue( field, value );
    }, [setFieldValue],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      infoMsg.current.show({
        severity: 'info',
        detail: 'Disponer de información clara e informativa es necesaria para obtener ' +
        'ideas y plantear la solución del problema.',
        sticky: true
      });
    }
  }, []);

  return (
    <>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-toolbox mr-2 icon-primary" />
          Agregar Información para el Equipo
        </h5>
        <h2 className='text-center'>
          <Tooltip target=".icon-info"/>
          <i 
            className="fas fa-info-circle icon-info mr-2 icon-primary"
            data-pr-tooltip="Puede ingresar enlaces ya sea sobre páginas, imágenes o vídeos" 
            data-pr-position="bottom"
          />
        </h2>
      </div>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-6'>
            <Button
              label={values.secretaryPaths.length === 1 ? 'Guarda Enlace' : 'Guarda Enlaces'} 
              icon='fas fa-save'
              type='submit'
              className="p-button-raised p-button-primary " 
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <StudentAcSecretaryPathDetailApp 
        acContainer={values.secretaryPaths}
        errors={errors}
        setFieldValue={handleSetFieldValue}
      />
    </>
  )
});
