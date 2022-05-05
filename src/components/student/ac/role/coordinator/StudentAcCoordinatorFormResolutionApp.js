import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { confirmDialog } from 'primereact/confirmdialog';

import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

import { TopicTextEditorApp } from '../../../editor/TopicTextEditorApp';
import { StudentAcCoordinatorFormImagesApp } from './StudentAcCoordinatorFormImagesApp';
import { 
  StudentAcCoordinatorFinalizeButtonApp 
} from './StudentAcCoordinatorFinalizeButtonApp';

import { loadSchoolData } from '../../../../../helpers/topic';


export const StudentAcCoordinatorFormResolutionApp = React.memo(({
  selectedTopic,
  toast
}) => {

  const dispatch = useDispatch();
  const schoolPeriodName = localStorage.getItem('currentPeriodName');
  const schoolData = loadSchoolData( schoolPeriodName, selectedTopic, true );
  const isMounted = useRef(false);
  const formik = useFormik({
    initialValues: {
      problem_resolution: '',
      imageReferences: {
        firstImageUrl: {},
        secondImageUrl: {}
      },
      observations: ''
    },
    validate: (data) => {
      let errors = {};

      if (!data.problem_resolution) {
        errors.problem_resolution = 'La resolución del problema es obligatorio.';
      }
      if ( Object.keys(data.imageReferences.firstImageUrl).length === 0 ) {
        errors.firstImageUrl = 'La primera imagen no ha sido subida.';
      }
      if ( Object.keys(data.imageReferences.secondImageUrl).length === 0 ) {
        errors.secondImageUrl = 'La segunda imagen no ha sido subida.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveProblemResolutionData( data );
    }
  });

  const { values, errors, setFieldValue, handleSubmit } = formik;

  const handleSubmitProblemResolution = ( data ) => {
    console.log(data);
  }

  const handleConfirmSaveProblemResolutionData = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar la siguiente información?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitProblemResolution( data ),
    });
  }

  const handleSetFieldValue = useCallback(
    ( field, value ) => {
      setFieldValue(field, value);
    }, [ setFieldValue ],
  );

  return (
    <>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-bullseye mr-2 icon-primary" />
          Resolución del Problema
        </h5>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <Button 
              label='Guardar Cambios'
              icon='fas fa-save'
              type='submit'
              tooltip='Puede guardar las veces que sea necesario.'
              tooltipOptions={{position:'bottom'}}
              className='p-button-raised p-button-success'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <div className='col-12'>
        <Message 
          severity="warn" 
          text="Recuerde que si recarga esta página se perderá su información actual, 
          aseguŕese de guardar las veces que sea necesario para que esto no pase." 
        />
      </div>
      <div className='col-12'>
        <div className='card'>
          <TopicTextEditorApp
            isMounted={isMounted}
            schoolData={schoolData}
            maxImages={2}
            value={values.problem_resolution}
            field={'problem_resolution'}
            errors={errors}
            toast={toast}
            setFieldValue={handleSetFieldValue}
          />
        </div>
      </div>
      <StudentAcCoordinatorFormImagesApp 
        schoolData={schoolData}
        imageReferences={values.imageReferences}
        errors={errors}
        toast={toast}
        handleSetFieldValue={handleSetFieldValue}
      />
      <div className='col-12'>
        <span className="p-float-label mt-3">
          <InputTextarea
            id='observations'
            name='observations'
            value={values.observations}
            required rows={3} cols={20}
            onChange={(e) => 
              setFieldValue('observations', e.target.value)
            }
          />
          <label htmlFor='observations'> Escribir Observaciones</label>
        </span>
      </div>
      <StudentAcCoordinatorFinalizeButtonApp />
    </>
  )
});
