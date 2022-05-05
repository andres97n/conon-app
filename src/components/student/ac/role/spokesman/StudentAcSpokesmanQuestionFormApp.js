import React, { useCallback, useEffect, useRef } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';

import { StudentAcQuestionFormDetailApp } from './StudentAcQuestionFormDetailApp';

import { getMultipleFormError } from '../../../../../helpers/topic/student/ac/acCoordinator';


export const StudentAcSpokesmanQuestionFormApp = React.memo(() => {
  
  const dispatch = useDispatch();
  const infoMsg = useRef(null);
  const formik = useFormik({
    initialValues: {
      questions: [{
        item: ''
      }]
    },
    validate: (data) => {
      let errors = {};

      return getMultipleFormError(errors, data.questions, 'questions');
    },
    onSubmit: (data) => {
      handleConfirmSaveSpokesmanQuestions( data );
    }
  });

  const { values, errors, setFieldValue, handleSubmit } = formik;

  const handleSubmitSpokesmanQuestions = ( data ) => {
    console.log(data);
  }

  const handleConfirmSaveSpokesmanQuestions = ( data ) => {
    const oneQuestion = 'la siguiente pregunta';
    const manyQuestions = 'las siguientes preguntas'
    confirmDialog({
      message: `¿Está seguro de guardar ${
        data.questions.length === 1 ? oneQuestion : manyQuestions 
      }?`,
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitSpokesmanQuestions( data ),
    });
  };

  const handleSetFieldValue = useCallback(
    ( field, value ) => {
      setFieldValue( field, value );
    }, [setFieldValue],
  );

  useEffect(() => {
    if (infoMsg.current?.state.messages?.length === 0) {
      infoMsg.current.show({ 
        severity: 'info', 
        detail: 'Es importante resolver dudas y preguntas acerca del problema planteado ' +
        'antes de empezar el camino hacia la solución.', 
        sticky: true 
      });
    }
  }, []);

  return (
    <>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-question mr-2 icon-primary" />
          Preguntas al Docente
        </h5>
        <Messages
          ref={infoMsg} 
          className='align-justify'
        />
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-6'>
            <Button
              label={ 
                values.questions.length === 1 
                ? "Guardar Pregunta" : "Guardar Preguntas" 
              }
              icon='fas fa-envelope-open-text'
              type='submit'
              className="p-button-raised p-button-success" 
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <StudentAcQuestionFormDetailApp 
        acContainer={values.questions}
        errors={errors}
        setFieldValue={handleSetFieldValue}
      />
    </>
  )
});
