import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollPanel } from 'primereact/scrollpanel';
import { Badge } from 'primereact/badge';

import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';
import { ResumeTeamReferencesStepThreeAbpApp } from './ResumeTeamReferencesStepThreeAbpApp';

import { 
  startLoadLearnedConceptsStepThreeAbpList, 
  startRemoveLearnedConceptStepThreeAbpList 
} from '../../../../../actions/student/abp_steps/learnedConceptStepThreeAbp';
import { changeObjectDate } from '../../../../../helpers/abp-steps';


export const ResumeTeamStepThreeAbpApp = React.memo(({
  teamId
}) => {

  const dispatch = useDispatch();
  const { 
    currentTeamLearnedConcepts,
    loadingTeamLearnedConcepts 
  } = useSelector( state => state.dashboard.learnedConceptStepThree );
  const isMounted = useRef(true);

  const handleLoadTeamLearnedConceptsAndReferencesAbp = useCallback(
    ( team ) => {
      dispatch( startLoadLearnedConceptsStepThreeAbpList( team ) );
    },
    [dispatch],
  );

  const handleRemoveTeamLearnedConceptsAndReferencesAbp = useCallback(
    () => {
      dispatch( startRemoveLearnedConceptStepThreeAbpList() );
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
      handleLoadTeamLearnedConceptsAndReferencesAbp( teamId );
    }
  
    return () => {
      if (teamId && !isMounted.current) {
        handleRemoveTeamLearnedConceptsAndReferencesAbp();
      }
    }
  }, [
    teamId, 
    handleLoadTeamLearnedConceptsAndReferencesAbp, 
    handleRemoveTeamLearnedConceptsAndReferencesAbp
  ]);

  return (
    <ScrollPanel
      className="custombar1" 
      style={{ 
        width: '100%', 
        height: currentTeamLearnedConcepts.length === 0
          ? '200px' 
          : '450px' 
      }}
    >
      <div className='card'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-brain icon-primary mr-2" />
              Paso 3
            </h5>
            <h6 className='text-center'>
              Hacer una lista de aquello que se conoce
            </h6>
          </div>
          {
            loadingTeamLearnedConcepts
              ? (
                <EmptyTeamStepsDataAbpApp />
              )
              : (
                currentTeamLearnedConcepts.length === 0
                  ? (
                    <div className='col-12'>
                      <small>No existen registros del equipo sobre este paso.</small>
                    </div>
                  )
                  : (
                    currentTeamLearnedConcepts.map( (data, index) => (
                      <div className='col-6' key={index}>
                        <div className='card'>
                          <div className='grid p-fluid'>
                            <div className="col-12">
                              <h6 className='text-center'>
                                <i className="fas fa-pencil-ruler icon-primary mr-2" />
                                Moderador
                              </h6>
                              <p className='align-justify'> 
                                <i className="fas fa-minus mr-2" />
                                {data.learned_concept.learned_concept}
                              </p>
                            </div>
                            <ResumeTeamReferencesStepThreeAbpApp 
                              references={data.references}
                            />
                            <div className='col-12'>
                              <div className='center-inside'>
                                <Badge
                                  value={
                                    changeObjectDate(data.learned_concept.created_at)
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
