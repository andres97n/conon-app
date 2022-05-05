import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';

import { startLoadQuestionsAndAnswersStepOneAbpList, startRemoveQuestionStepOneAbpList } from '../../../../actions/student/abp_steps/questionStepOneAbp';

export const QuestionsAbpListApp = React.memo(({
  currentTeam,
  userId,
}) => {

  const dispatch = useDispatch();
  const { questionsStepOneAbp, loadingQuestionStepOneAbp } = useSelector(
    state => state.dashboard.questionStepOne
  );

  const handleLoadTeamQuestions = useCallback(
    ( currentTeam, userId ) => {
      const userTeam = currentTeam.filter( student => student.user.id === userId );
      if (userTeam) {
        dispatch( startLoadQuestionsAndAnswersStepOneAbpList( userTeam[0].id ) );
      }
    },
    [dispatch],
  );

  const handleRemoveQuestionsTeamAbp = useCallback(
    () => {
      dispatch( startRemoveQuestionStepOneAbpList() );
    },
    [dispatch],
  );

  useEffect(() => {
    if (currentTeam.length > 0 && userId) {
      handleLoadTeamQuestions( currentTeam, userId );
    }
  
    return () => {
      if (currentTeam.length > 0 && userId) {
        handleRemoveQuestionsTeamAbp();
      }
    }
  }, [currentTeam, userId, handleLoadTeamQuestions, handleRemoveQuestionsTeamAbp]);
  
  return (
    <div className='card'>
       <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
                <i className="fas fa-question-circle mr-2"></i>
                Preguntas realizadas por el Equipo...
            </h5>
          </div>
          {
            ( loadingQuestionStepOneAbp )
              ? (
                <div className='col-12'>
                  <Skeleton height="3rem" className="p-mb-2"></Skeleton>
                  <Skeleton height="5rem"></Skeleton>
                </div>
              )
              : (
                questionsStepOneAbp.length > 0  
                  ? (
                    questionsStepOneAbp.map( (data, index) => (
                        <div className='col-6' key={index}>
                          <div className='card'>
                            <div className='grid p-fluid'>
                              <div className='col-12'>
                                <h6 className='text-center'>
                                  <i className="fas fa-question mr-2" />
                                  {`Pregunta ${index + 1}`}
                                </h6>
                              </div>
                              <div className='col-12'>
                                <h6 className='text-center'>
                                  {data.question.moderator_question}
                                </h6>
                              </div>
                              <div className='col-12'>
                                {
                                  (data.answer.length > 0)
                                    ? (
                                      <p className='text-justify'>
                                          {data.answer[0].teacher_answer}
                                      </p>
                                    )
                                    : (
                                      <small>Áun no existe respuesta del Docente.</small>
                                    )
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                    ))
                  )
                  : (
                    <div className='col-12'>
                      <p>Aún no existe ninguna pregunta</p>
                    </div>
                  )
              )
          }
       </div> 
    </div>
  )
});
