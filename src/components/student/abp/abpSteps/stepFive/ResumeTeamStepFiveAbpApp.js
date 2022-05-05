import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollPanel } from 'primereact/scrollpanel';
import { Badge } from 'primereact/badge';

import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';
import { ResumeTeamRatesStepFiveAbpApp } from './ResumeTeamRatesStepFiveAbpApp';

import { 
  startLoadTeamPerformActionsAndRatesStepFiveAbpList, 
  startRemovePerformActionStepFiveAbpList 
} from '../../../../../actions/student/abp_steps/performActionStepFiveAbp';
import { changeObjectDate } from '../../../../../helpers/abp-steps';


export const ResumeTeamStepFiveAbpApp = React.memo(({
  teamId
}) => {

  const dispatch = useDispatch();
  const { 
    currentPerformActions,
    loadingPerformAction
  } = useSelector( state => state.dashboard.performActionStepFive );
  const isMounted = useRef(true);

  const handleLoadTeamPerformActionsAndRatesAbpList = useCallback(
    ( team ) => {
      dispatch( startLoadTeamPerformActionsAndRatesStepFiveAbpList( team ) );
    },
    [dispatch],
  );

  const handleRemoveTeamPerformActionsAndRatesAbpList = useCallback(
    () => {
      dispatch( startRemovePerformActionStepFiveAbpList() );
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
      handleLoadTeamPerformActionsAndRatesAbpList( teamId );
    }
  
    return () => {
      if (teamId && !isMounted.current) {
        handleRemoveTeamPerformActionsAndRatesAbpList();
      }
    }
  }, [
    teamId, 
    handleLoadTeamPerformActionsAndRatesAbpList, 
    handleRemoveTeamPerformActionsAndRatesAbpList
  ]);

  return (
    <ScrollPanel
      className="custombar1" 
      style={{ 
        width: '100%', 
        height: currentPerformActions.length === 0
          ? '200px' 
          : '450px' 
      }}
    >
      <div className='card'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-brain icon-primary mr-2" />
              Paso 5
            </h5>
            <h6 className='text-center'>
              Hacer una lista de aquello que necesita hacerse para resolver el problema
            </h6>
          </div>
          {
            loadingPerformAction
              ? (
                <EmptyTeamStepsDataAbpApp />
              )
              : (
                currentPerformActions.map( (data, index) => (
                  <div className='col-6' key={index}>
                    <div className='card'>
                      <div className='grid p-fluid'>
                        <div className="col-12">
                          <h6 className='text-center'>
                            <i className="fas fa-book-reader icon-primary mr-2" />
                            {data.perform_action.team_detail_abp.user.name}
                          </h6>
                          <p className='align-justify'> 
                            <i className="fas fa-minus mr-2" />
                            {data.perform_action.action}
                          </p>
                        </div>
                        <ResumeTeamRatesStepFiveAbpApp 
                          rates={data.rates}
                        />
                        <div className='col-12'>
                          <div className='center-inside'>
                            <Badge
                              value={
                                changeObjectDate(data.perform_action.created_at)
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
          }
        </div>
      </div>
    </ScrollPanel>
  )
});
