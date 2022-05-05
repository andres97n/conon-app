import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProgressSpinner } from 'primereact/progressspinner';

import { StudentAbpHeaderApp } from './StudentAbpHeaderApp';
import { StudentAbpProblemApp } from './StudentAbpProblemApp';
import { QuestionsAbpListApp } from './abpSteps/QuestionsAbpListApp';
import { ResumeTeamStepsAbpApp } from './abpSteps/ResumeTeamStepsAbpApp';
import { StudentAbpBodyApp } from './StudentAbpBodyApp';
import { StudentAbpEvaluationApp } from './StudentAbpEvaluationApp';

import { 
  startLoadCurrentRubricAbp, 
  startLoadRubricByAbp, 
  startRemoveRubricAbpDetailList, 
  startRemoveRubricAbpList 
} from '../../../actions/teacher/rubricAbp';
import { 
  startLoadCurrentTeamAbp, 
  startRemoveTeamAbpDetailList 
} from '../../../actions/teacher/teamAbp';


export const StudentAbpApp = React.memo(({
  currentMethodology,
  selectedTopic,
  userId,
  toast
}) => {

  const dispatch = useDispatch();
  const { currentTeam, loadingTeamAbp } = useSelector(state => state.dashboard.teamAbp);
  const { 
    rubrics,
    currentRubric, 
    loadingRubricAbp 
  } = useSelector(state => state.dashboard.rubricAbp);
  const { questionsStepOneAbp } = useSelector(
    state => state.dashboard.questionStepOne
  );
  const { id } = currentMethodology;

  const handleLoadTeamAndRubricAbp = useCallback( ( currentMethodology ) => {
    dispatch( startLoadCurrentTeamAbp( currentMethodology.id, userId ));
    dispatch( startLoadRubricByAbp(currentMethodology.id) );
    dispatch( startLoadCurrentRubricAbp( currentMethodology.id ));
  }, [userId, dispatch]);

  const handleRemoveAbpDetailData = useCallback(
    () => {
      dispatch( startRemoveTeamAbpDetailList() );
      dispatch( startRemoveRubricAbpList() );
      dispatch( startRemoveRubricAbpDetailList() );
    }, [dispatch],
  );

  useEffect(() => {
    if (currentMethodology && Object.keys(currentMethodology).length > 0) {
      handleLoadTeamAndRubricAbp( currentMethodology );
    }

    return () => {
      if (currentMethodology && Object.keys(currentMethodology).length > 0) {
        handleRemoveAbpDetailData( currentMethodology );
      }
    }
  }, [currentMethodology, handleLoadTeamAndRubricAbp, handleRemoveAbpDetailData]);

  if (loadingTeamAbp && loadingRubricAbp) {
    return (
      <ProgressSpinner />
    )
  }
  
  return (
    <>
      <div className='col-12 mt-2'>
        <StudentAbpHeaderApp
          currentTeam={currentTeam}
          rubrics={rubrics}
          currentRubric={currentRubric}
        />
      </div>
      <div className='col-12'>
        <StudentAbpProblemApp 
          currentMethodology={currentMethodology}
        />
      </div>
      {
        (currentTeam && currentTeam[0]?.step > 1 && currentTeam[0]?.step < 9 )
          && (
            <>
              <div className='col-12'>
                <ResumeTeamStepsAbpApp 
                  stepTeam={currentTeam[0]?.step}
                  teamId={currentTeam[0]?.id}
                />
              </div>
              <div className='col-12'>
                <QuestionsAbpListApp 
                  currentTeam={currentTeam}
                  userId={userId}
                />
              </div>
            </>
          )
      }
      <div className='col-12'>
        {
          (currentTeam.length > 0 && currentTeam[0]?.step === 9)
            ? (
              <StudentAbpEvaluationApp 
                abpId={currentMethodology?.id}
                rubrics={currentRubric}
                teamDetail={currentTeam.filter( student => student.user.id === userId )}
                toast={toast}
              />
            )
            : (
              <StudentAbpBodyApp
                abpId={id}
                teamDetail={currentTeam.filter( student => student.user.id === userId )}
                questionsStepOneAbp={questionsStepOneAbp}
                selectedTopic={selectedTopic}
                toast={toast}
              />
            )
        }
      </div>
    </>
  );
});
