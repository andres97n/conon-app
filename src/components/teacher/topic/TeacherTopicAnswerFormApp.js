import React, { useCallback, useEffect, useState } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useDispatch, useSelector } from 'react-redux';

import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

import { EmptyContentScreen } from '../../ui/EmptyContentScreen';

import { 
  startLoadAnswersByQuestionStepOneAbp, 
  startRemoveAnswerStepOneAbpList, 
  startSaveAnswerStepOneAbp
} from '../../../actions/teacher/answerStepOneAbp';
import { getToastMsg } from '../../../helpers/abp';
import { existsQuestionInAnswers } from '../../../helpers/topic/table/topicTableAbp';


export const TeacherTopicAnswerFormApp = React.memo(({
  question,
  type,
  toast
}) => {
  
  const dispatch = useDispatch();
  const [teacherAnswer, setTeacherAnswer] = useState('');
  const { uid } = useSelector(state => state.auth);
  const { 
    answersStepOneAbp,
    loadingAnswersAbp
  } = useSelector(state => state.dashboard.answerStepOne);

  const handleLoadAnswersByTeam = useCallback(
    ( questionAbpId ) => {
      dispatch( startLoadAnswersByQuestionStepOneAbp( questionAbpId ) );
    }, [dispatch],
  );

  const handleRemoveAnswerByTeam = useCallback(
    () => {
      dispatch( startRemoveAnswerStepOneAbpList() );
    }, [dispatch],
  );

  const handleSubmitTeacherAnswer = ( data ) => {
    if (uid) {
      const newAnswer = {
        question_step_one_abp: question.id,
        user: uid,
        teacher_answer: data,
        active: true
      };
      console.log(newAnswer);
      dispatch( startSaveAnswerStepOneAbp( newAnswer, toast ) );
    } else {
      getToastMsg(
        toast, 
        'error', 
        'No se pudo encontrar al usuario actual, consulte con el Administrador.' 
      );
    }
  }

  const handleConfirmSaveTeacherAnswer = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar la siguiente respuesta?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitTeacherAnswer( data ),
    });
  };

  useEffect(() => {
    if ( question && Object.keys(question).length > 0 ) {
      if (type === 'ABP') {
        handleLoadAnswersByTeam( question.id );
      } else if (type === 'AC') {
        
      }
    }
  
    return () => {
      if ( question && Object.keys(question).length > 0 ) {
        handleRemoveAnswerByTeam();
      }
    }
  }, [question, type, handleLoadAnswersByTeam, handleRemoveAnswerByTeam]);

  if (loadingAnswersAbp) {
    return (
      <div className='card'>
        <EmptyContentScreen />
      </div>
    )
  }
  
  return (
    <>
      {
        (
          answersStepOneAbp.length > 0 && 
          existsQuestionInAnswers( answersStepOneAbp, question?.id )
        )
          ? (
            answersStepOneAbp.map( (answer, index) => (
              <div className='col-12' key={index}>
                {
                  (answer.question_step_one_abp.id === question?.id) && (
                    <span id='area_wrap' className='align-justify'>
                      {answer.teacher_answer}
                    </span>
                  )
                }
              </div>
            ))
          )
          : (
            <>
              <div className='col-12'>
                <span className="p-float-label">
                  <InputTextarea
                    name='teacherAnswer'
                    value={teacherAnswer}
                    required rows={3} cols={20}
                    onChange={(e) => setTeacherAnswer(e.target.value)}
                  />
                  <label htmlFor='teacherAnswer'>
                    Ingrese una respuesta*
                  </label>
                </span>
              </div>
              <div className='col-12'>
                <Button 
                  label='Guardar Respuesta'
                  icon='fas fa-save'
                  className='p-button-raised'
                  type='submit'
                  disabled={!teacherAnswer}
                  onClick={() => handleConfirmSaveTeacherAnswer(teacherAnswer)}
                />
              </div>
            </>            
          )
      }
    </>
  )
});
