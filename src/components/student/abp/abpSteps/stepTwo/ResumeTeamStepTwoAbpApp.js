import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollPanel } from 'primereact/scrollpanel';
import { Badge } from 'primereact/badge';

import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';
import { ResumeTeamRatesStepTwoAbpApp } from './ResumeTeamRatesStepTwoAbpApp';

import { 
  startLoadTeamIdeasAndRatesStepTwoAbpList, 
  startRemoveRateStudentIdeaStepTwoAbpList 
} from '../../../../../actions/student/abp_steps/studentIdeaStepTwoAbp';
import { changeObjectDate } from '../../../../../helpers/abp-steps';


export const ResumeTeamStepTwoAbpApp = React.memo(({
  teamId
}) => {

  const dispatch = useDispatch();
  const { 
    ratingStudentIdeas, 
    loadingRateStudentIdea 
  } = useSelector( state => state.dashboard.studentIdeaStepTwo );
  const isMounted = useRef(true);

  const handleLoadTeamIdeasAndRatesAbp = useCallback(
    ( team ) => {
      dispatch( startLoadTeamIdeasAndRatesStepTwoAbpList( team ) );
    },
    [dispatch],
  );

  const handleRemoveTeamIdeasAndRatesAbp = useCallback(
    () => {
      dispatch( startRemoveRateStudentIdeaStepTwoAbpList() );
    },
    [dispatch],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (teamId && isMounted.current) {
      handleLoadTeamIdeasAndRatesAbp( teamId );
    }
  
    return () => {
      if (teamId && !isMounted.current) {
        handleRemoveTeamIdeasAndRatesAbp();
      }
    }
  }, [
    teamId, 
    handleLoadTeamIdeasAndRatesAbp, 
    handleRemoveTeamIdeasAndRatesAbp
  ]);

  return (
    <ScrollPanel
      className="custombar1" 
      style={{ 
        width: '100%', 
        height: ratingStudentIdeas.length === 0
          ? '200px' 
          : '450px' 
      }}
    >
      <div className='card'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-brain icon-primary mr-2" />
              Paso 2
            </h5>
            <h6 className='text-center'>Realizar una lluvia de ideas</h6>
          </div>
          {
            loadingRateStudentIdea 
              ? (
                <EmptyTeamStepsDataAbpApp />
              )
              : (
                ratingStudentIdeas.length === 0
                  ? (
                    <div className='col-12'>
                      <small>No existen registros del equipo sobre este paso.</small>
                    </div>
                  )
                  : (
                    ratingStudentIdeas.map( (data, index) => (
                      <div className='col-6' key={index}>
                        <div className='card'>
                          <div className='grid p-fluid'>
                            <div className="col-12">
                              <h6 className='text-center'>
                                {data.idea.team_detail_abp.user.name}
                              </h6>
                              <p> 
                                <i className="fas fa-minus mr-2" />
                                {data.idea.student_idea}
                              </p>
                            </div>
                            <ResumeTeamRatesStepTwoAbpApp 
                              rates={data.rates}
                            />
                            <div className='col-12'>
                              <div className='center-inside'>
                                <Badge
                                  value={
                                    changeObjectDate(data.idea.created_at)
                                  } 
                                  severity='info'
                                ></Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )
              )
          }
        </div>
      </div>
    </ScrollPanel>
  )
});
