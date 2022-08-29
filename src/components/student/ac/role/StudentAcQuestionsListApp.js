import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';

import { EmptyContentScreen } from '../../../ui/EmptyContentScreen';

import { 
  startBlockSpokesmanQuestionAc,
  startLoadSpokesmanQuestionsWithAnswersAc, 
  startRemoveSpokesmanQuestionAcList
} from '../../../../actions/student/ac_roles/spokesmanAc/spokesmanQuestionAc';
import { getIsMessageValidToDelete } from '../../../../helpers/conversation/conversationList';


export const StudentAcQuestionsListApp = React.memo(({
  teamDetailAc,
  toast
}) => {

  const dispatch = useDispatch();
  const {
    spokesmanQuestions,
    loadingSpokesmanQuestion
  } = useSelector( state => state.dashboard.spokesmanAc );
  const isMounted = useRef(true);

  const handleLoadSpokesmanQuestions = useCallback(
    ( teamDetailId ) => {
      dispatch( startLoadSpokesmanQuestionsWithAnswersAc( teamDetailId ));
    }, [dispatch],
  );

  const handleRemoveSpokesmanQuestions = useCallback(
    () => {
      dispatch( startRemoveSpokesmanQuestionAcList() );
    }, [dispatch],
  );
  

  const handleBlockSpokesmanQuestion = ( data ) => {
    dispatch( startBlockSpokesmanQuestionAc( data, toast ));
  }

  const handleConfirmSaveSpokesmanQuestion = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea bloquear la siguiente pregunta?',
      header: 'Confirmación de bloqueo',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, bloquear',
      rejectLabel: 'No bloquear',
      acceptClassName: 'p-raised-button p-button-secondary',
      accept: () => handleBlockSpokesmanQuestion( data ),
    });
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (
      Object.keys(teamDetailAc).length > 0 && 
      isMounted.current
    ) {
      handleLoadSpokesmanQuestions( teamDetailAc.id );
    }
    
    return () => {
      if (Object.keys(teamDetailAc).length > 0) {
        handleRemoveSpokesmanQuestions();
      }
    }
  }, [teamDetailAc, handleLoadSpokesmanQuestions, handleRemoveSpokesmanQuestions]);

  if (loadingSpokesmanQuestion) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    )
  }

  return (
    <>
      <Panel
        header={
          <p>
            <i className="fas fa-question-circle mr-2 icon-primary" />
            Preguntas Realizadas al Docente
          </p>
        } 
        toggleable 
        collapsed={true}
        expandIcon='fas fa-plus'
        collapseIcon="fas fa-minus"
      >
        <div className='grid p-fluid'>
          {
            spokesmanQuestions.length === 0
              ? (
                <div className='col-12'>
                  <small>Aún no existen preguntas realizadas.</small>
                </div>
              )
              : (
                spokesmanQuestions.map( (data, index) => (
                  <div className='col-6' key={index}>
                    <div className='card'>
                      <div className='grid p-fluid'>
                        <div className={(
                              getIsMessageValidToDelete(data.question.created_at) &&
                              Object.keys(data.answer).length === 0
                            )
                              ? 'col-11'
                              : 'col-12'
                          }
                        >
                          <p className='align-justify'>{data.question.spokesman_question}</p>
                        </div>
                        {
                          (
                            getIsMessageValidToDelete(data.question.created_at) &&
                            Object.keys(data.answer).length === 0
                          ) && (
                            <div className='col-1'>
                              <Button 
                                icon='fas fa-ban'
                                tooltip='Bloquear Pregunta'
                                tooltipOptions={{position: 'bottom'}}
                                className=''
                                onClick={() => handleConfirmSaveSpokesmanQuestion(
                                  data.question.id
                                )}
                              />
                            </div>
                          )
                        }
                        <div className='col-12'>
                          {
                            Object.keys(data.answer).length === 0
                              ? (
                                <small>No existe respuesta sobre esta pregunta</small>
                              )
                              : (
                                <p id='area_wrap'>{data.answer.teacher_answer}</p>
                              )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
          }
        </div>
      </Panel>
    </>
  )
});
