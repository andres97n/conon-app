import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { TopicCreateDuaActivityFormApp } from './TopicCreateDuaActivityFormApp';

import { 
  getActivityFormFinalValue,
  getDuaActivityFormError, 
  getDuaActivityFormErrors, 
  getQuestionsLiteral
} from '../../../../../../../helpers/topic/headerRight';
import { startSaveActivity } from '../../../../../../../actions/teacher/activity';


export const TopicCreateDuaActivityApp = React.memo(({
  toast,
  handleSetShowBackMessage,
  handleSetBackMessage,
  handleHideCreateDialog,
  setIsSecondDialogBlock
}) => {
  
  const dispatch = useDispatch();
  const { currentDua } = useSelector(state => state.dashboard.dua);
  const initialState = {
    title: '',
    answers: [{
      literal: 'a',
      detail: '',
      value: 0
    }],
    questionValue: 0
  }
  const formik = useFormik({
    initialValues: {
      description: '',
      objective: '',
      questions: [ initialState ]
    },
    validate: (data) => {
      let errors = {}
      return getDuaActivityFormErrors( data, errors );
    },
    onSubmit: (data) => {
      handleConfirmSaveDuaActivity(data);
    }
  });

  const { values, errors, setFieldValue, handleSubmit } = formik;

  const handleSubmitDuaActivity = ( data ) => {
    const questions = getQuestionsLiteral( data.questions );
    const newActivity = {
      dua: currentDua.id,
      description: data.description,
      objective: data.objective,
      final_grade: getActivityFormFinalValue( data.questions ), 
      state: 1
    }
    const newQuestions = questions.map( question => ({
      title: question.title,
      value: question.questionValue,
      answers: question.answers,
      active: true
    }));
    dispatch( startSaveActivity( newActivity, newQuestions, toast ) );
    console.log(newQuestions);
    handleHideCreateDialog(true);
    handleSetShowBackMessage( true );
    setIsSecondDialogBlock( true );
    handleSetBackMessage( 
      'Asegúrese de asignar estudiantes al tópico si ya lo hizo, ha terminado de ' +
      'crear el tópico.' 
    );
  }

  const handleConfirmSaveDuaActivity = ( data ) => {
    confirmDialog({
      message: 
      'La presente actividad tiene un valor total ' +
      `de ${ getActivityFormFinalValue( data.questions ) }, está seguro de hacerlo?`,
      header: 'Confirmación de Guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitDuaActivity( data ),
    });
  }

  return (
    <div className='p-grid crud-demo'>
      <div className='p-col-12'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <div className='card'>
              <div className='center-inside'>
                <div className='col-6'>
                  <Button 
                    label='Guardar Actividad'
                    icon='fas fa-save'
                    type='submit'
                    className="p-button-raised p-button-success"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
              {
                Object.keys(errors).length > 0 && (
                  <div className='col-12'>
                    <Message 
                      severity="error" 
                      text={ getDuaActivityFormError( errors ) }
                    />
                  </div>
                )
              }
            </div>
          </div>
          <div className='col-12'>
            <div className='card'>
              <TopicCreateDuaActivityFormApp 
                values={values}
                errors={errors}
                initialState={initialState}
                setFieldValue={setFieldValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});
