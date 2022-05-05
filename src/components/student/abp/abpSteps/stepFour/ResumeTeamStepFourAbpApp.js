import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollPanel } from 'primereact/scrollpanel';
import { Badge } from 'primereact/badge';

import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';
import { ResumeTeamReferencesStepFourAbpApp } from './ResumeTeamReferencesStepFourAbpApp';

import { 
  startLoadUnknownConceptStepFourAbpList, 
  startRemoveUnknownConceptStepFourAbpList 
} from '../../../../../actions/student/abp_steps/unknownConceptStepFourAbp';
import { changeObjectDate } from '../../../../../helpers/abp-steps';

export const ResumeTeamStepFourAbpApp = React.memo(({
  teamId
}) => {

  const dispatch = useDispatch();
  const { 
    currentTeamUnknownConcepts,
    loadingTeamUnknownConcepts
  } = useSelector( state => state.dashboard.unknownConceptStepFour );
  const isMounted = useRef(true);

  const handleLoadTeamUnknownConceptsAndReferencesAbp = useCallback(
    ( team ) => {
      dispatch( startLoadUnknownConceptStepFourAbpList( team ) );
    },
    [dispatch],
  );

  const handleRemoveTeamUnknownConceptsAndReferencesAbp = useCallback(
    () => {
      dispatch( startRemoveUnknownConceptStepFourAbpList() );
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
      handleLoadTeamUnknownConceptsAndReferencesAbp( teamId );
    }
  
    return () => {
      if (teamId && !isMounted.current) {
        handleRemoveTeamUnknownConceptsAndReferencesAbp();
      }
    }
  }, [
    teamId, 
    handleLoadTeamUnknownConceptsAndReferencesAbp, 
    handleRemoveTeamUnknownConceptsAndReferencesAbp
  ]);

  return (
    <ScrollPanel
      className="custombar1" 
      style={{ 
        width: '100%', 
        height: currentTeamUnknownConcepts.length === 0
          ? '200px' 
          : '450px' 
      }}
    >
      <div className='card'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-brain icon-primary mr-2" />
              Paso 4
            </h5>
            <h6 className='text-center'>
              Hacer una lista de aquello que se desconoce
            </h6>
          </div>
          {
            loadingTeamUnknownConcepts
              ? (
                <EmptyTeamStepsDataAbpApp />
              )
              : (
                currentTeamUnknownConcepts.length === 0
                  ? (
                    <div className='col-12'>
                      <small>No existen registros del equipo sobre este paso.</small>
                    </div>
                  )
                  : (
                    currentTeamUnknownConcepts.map( (data, index) => (
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
                                {data.unknown_concept.unknown_concept}
                              </p>
                            </div>
                            <ResumeTeamReferencesStepFourAbpApp 
                              references={data.references}
                            />
                            <div className='col-12'>
                              <div className='center-inside'>
                                <Badge
                                  value={
                                    changeObjectDate(data.unknown_concept.created_at)
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
