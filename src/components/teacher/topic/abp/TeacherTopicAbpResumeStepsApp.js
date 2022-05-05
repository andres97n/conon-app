import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { TeacherTopicAbpQualifyViewApp } from './TeacherTopicAbpQualifyViewApp';
import { EmptyContentScreen } from '../../../ui/EmptyContentScreen';

import { startRemoveRubricAbpDetailList } from '../../../../actions/teacher/rubricAbp';
import { startRemoveEvaluationDetailAbpList } from '../../../../actions/teacher/evaluationAbp';
import { startLoadQuestionsByTeamStepOneAbpList, startRemoveQuestionStepOneAbpList } from '../../../../actions/student/abp_steps/questionStepOneAbp';
import { ResumeTeamStepsAbpApp } from '../../../student/abp/abpSteps/ResumeTeamStepsAbpApp';
import { TeacherTopicAnswerMainApp } from '../TeacherTopicAnswerMainApp';

export const TeacherTopicAbpResumeStepsApp = React.memo(({
  topic,
  toast,
  currentMethodology,
  group,
  handleHideShowResumeSteps
}) => {

  const dispatch = useDispatch();
  const { 
    questionsStepOneAbp,
    loadingQuestionStepOneAbp
  } = useSelector(state => state.dashboard.questionStepOne);

  const handleRemoveCurrentTeamData = useCallback(
    () => {
      dispatch( startRemoveRubricAbpDetailList() );
      dispatch( startRemoveEvaluationDetailAbpList() );
    }, [dispatch]
  );

  const handleLoadQuestionsByTeamAbp = useCallback(
    ( teamAbpId ) => {
      dispatch( startLoadQuestionsByTeamStepOneAbpList(teamAbpId) );
    }, [dispatch],
  );

  const handleRemoveQuestionsByTeamAbp = useCallback(
    () => {
      dispatch( startRemoveQuestionStepOneAbpList() );
    }, [dispatch],
  );

  useEffect(() => {
    if (group && Object.keys(group).length > 0) {
      if (group.team_abp || Object.keys(group.team_abp).length > 0) {
        handleLoadQuestionsByTeamAbp( group.team_abp.id );
      }
    }
  
    return () => {
      if (group && Object.keys(group).length > 0) {
        if (group.team_abp && Object.keys(group.team_abp).length > 0) {
          handleRemoveQuestionsByTeamAbp();
        }
      }
    }
  }, [group, handleLoadQuestionsByTeamAbp, handleRemoveQuestionsByTeamAbp]);

  useEffect(() => {
    return () => {
      handleRemoveCurrentTeamData();
    }
  }, [currentMethodology, handleRemoveCurrentTeamData]);

  if (!group || Object.keys(group).length === 0) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    );
  }

  if (!group.team_abp || !group.details) {
    console.log('entro primer');
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>  
    )
  }

  if (Object.keys(group.team_abp).length === 0) {
    console.log('entro sefundo');
    <div className='grid p-fluid'>
        <div className='col-12'>
          <small>No se recibió el equipo a visualizar.</small>
        </div>
      </div>
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-3'>
            <Button 
              label='Regresar a Tabla'
              icon='fas fa-hand-point-left'
              className='p-button-raised'
              onClick={handleHideShowResumeSteps}
            />
          </div>
        </div>
      </div>
      <div className='col-12'>
        <h4 className='text-center'>
          <i className="fas fa-walking mr-2 icon-primary" />
          Progreso del Equipo
        </h4>
      </div>
      <div className='col-12'>
        <div className='card'>
          <TeacherTopicAbpQualifyViewApp 
            topicType={topic?.type}
            toast={toast}
            methodologyId={currentMethodology?.id}
            groupDetail={group.details}
          />
        </div>
      </div>
        {
          group.team_abp.step === 1
            ? (
              <div className='col-12'>
                <Message 
                  severity="info" 
                  text="El equipo aún se encuentra en el paso 1, hasta que no avance 
                  al siguiente paso no será posible mostrar información del mismo." 
                />
              </div>
            ) 
            : (
              <div className='col-12'>
                <TeacherTopicAnswerMainApp 
                  questions={questionsStepOneAbp}
                  loading={loadingQuestionStepOneAbp}
                  type={'ABP'}
                  toast={toast}
                />
                <ResumeTeamStepsAbpApp 
                  stepTeam={group.team_abp.step}
                  teamId={group.team_abp.id}
                />
              </div>
            )
        }
    </div>
  )
});
