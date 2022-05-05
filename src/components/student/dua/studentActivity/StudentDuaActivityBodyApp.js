import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { confirmDialog } from 'primereact/confirmdialog'; 

import { StudentDuaActivityAnswerBodyApp } from './StudentDuaActivityAnswerBodyApp';

import { showMessageComponent } from '../../../../helpers/topic';
import { startSaveStudentActivity } from "../../../../actions/teacher/activityStudent";
import { 
  getFormikFieldsActivity, 
  getStudentActivityCalification, 
  getStudentActivityObject, 
  isOptionSelected 
} from '../../../../helpers/dua';


export const StudentDuaActivityBodyApp = React.memo(({
  currentActivity,
  userId,
  toast
}) => {

  const dispatch = useDispatch();
  const infoMsg = useRef(null);
  const formik = useFormik({
    initialValues: {
      ...getFormikFieldsActivity(currentActivity.questions)
    },
    validate: (data) => {
      let errors = {};

      Object.values(data).forEach( (value, index) => {
        if (!isOptionSelected(value)) {
          errors[`questions${index + 1}`] = `La pregunta ${index + 1} debe tener respuesta.`;
        }
      });

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveStudentActivity( data );
    }
  });

  const { values, errors, setFieldValue, handleSubmit } = formik;

  const handleSubmitStudentActivity = ( data ) => {
    const qualification = getStudentActivityCalification(currentActivity.questions, data);
    const newStudentActivity = {
      activity: currentActivity.activity.id,
      owner: userId,
      qualification,
      observations: '',
      active: true
    };
    const newAnswers = getStudentActivityObject( currentActivity.questions, data );
    dispatch( startSaveStudentActivity( newStudentActivity, newAnswers, toast ) );
  }

  const handleConfirmSaveStudentActivity = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar las siguientes respuestas?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitStudentActivity( data ),
    });
  }

  const handleSetFormField = useCallback(
    ( field, value ) => {
      setFieldValue(field, value)
    }, [ setFieldValue ],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      showMessageComponent( 
        infoMsg, 
        'info', 
        'El Docente espera con la siguiente actividad presentada, compruebe el ' + 
        'conocimiento adquirido sobre este Tópico y así resuelva dudas que talvez la ' +
        'metodología DUA no lo pudo hacer; el Docente confía en su honestidad académica.',
        true
      );
    }
  }, []);

  return (
    <>
      <div className='col-12'>
          <Messages
            ref={infoMsg}
            className='align-justify'
          />
        </div>
      {
        currentActivity.questions.map( (question, index) => (
          <div className='col-12' key={question.id}>
            <div className='card'>            
              <div className='grid p-fluid'>
                <div className='col-12'>
                  <p className='text-justify'>
                    <i className="fas fa-asterisk mr-2" />
                    {question.title}
                  </p>
                </div>
                <StudentDuaActivityAnswerBodyApp 
                  questions={currentActivity.questions}
                  answers={question.answers}
                  index={index}
                  values={values}
                  setFieldValue={handleSetFormField}
                />
              </div>
            </div>
          </div>
        ))
      }
      {
        Object.keys(errors).length > 0 &&
          (
            <div className='col-12'>
              <div className='center-inside mt-3'>
                <div className='col-8'>
                  <Message 
                    severity="error" 
                    text={errors[`${Object.keys(errors)[0]}`]} 
                  />
                </div>
              </div>
            </div>
          )
      }
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <Button
              label="Guardar Actividad" 
              className="p-button-raised"
              icon="fas fa-save fa-lg"
              iconPos='top'
              type='submit'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
});
