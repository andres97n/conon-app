import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollPanel } from 'primereact/scrollpanel';
import { Editor } from 'primereact/editor';

import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';
import { ResumeTeamReferencesStepSixAbpApp } from './ResumeTeamReferencesStepSixAbpApp';
import { emptyHeaderRender } from '../../../../../helpers/topic';

import { 
  startLoadProblemDefinitionAndReferencesAbpList, 
  startRemoveProblemDefinitionStepSixAbpList 
} from '../../../../../actions/student/abp_steps/problemDefinitionStepSixAbp';


export const ResumeTeamStepSixAbpApp = React.memo(({
  teamId
}) => {
  
  const dispatch = useDispatch();
  const { 
    currentProblemDefinition,
    loadingProblemDefinition
  } = useSelector( state => state.dashboard.problemDefinitionStepSix );
  const isMounted = useRef(true);

  const handleLoadTeamProblemDefinitionAndReferencesAbp = useCallback(
    ( team ) => {
      dispatch( startLoadProblemDefinitionAndReferencesAbpList( team ) );
    },
    [dispatch],
  );

  const handleRemoveTeamProblemDefinitionAndReferencesAbp = useCallback(
    () => {
      dispatch( startRemoveProblemDefinitionStepSixAbpList() );
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
      handleLoadTeamProblemDefinitionAndReferencesAbp( teamId );
    }
  
    return () => {
      if (teamId && !isMounted.current) {
        handleRemoveTeamProblemDefinitionAndReferencesAbp();
      }
    }
  }, [
    teamId, 
    handleLoadTeamProblemDefinitionAndReferencesAbp, 
    handleRemoveTeamProblemDefinitionAndReferencesAbp
  ]);

  return (
    <ScrollPanel
      className="custombar1" 
      style={{ 
        width: '100%', 
        height: currentProblemDefinition.length === 0
          ? '200px' 
          : '450px' 
      }}
    >
      <div className='card' style={{ padding: '0.5', lineHeight: '1.5' }}>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-brain icon-primary mr-2" />
              Paso 6
            </h5>
            <h6 className='text-center'>
              Definir el problema
            </h6>
          </div>
          {
            loadingProblemDefinition
              ? (
                <EmptyTeamStepsDataAbpApp />
              )
              : (
                currentProblemDefinition.length === 0
                ? (
                  <div className='col-12'>
                    <small>No existen registros del equipo sobre este paso.</small>
                  </div>
                )
                : (
                  currentProblemDefinition.map( (data, index) => (
                    <div className='col-12' key={index}>
                      <div className='grid p-fluid'>
                        <div className='col-12'>
                          <Editor 
                            style={{ height: '300px' }} 
                            headerTemplate={emptyHeaderRender}
                            value={
                              data.problem_definition.problem_definition
                            } 
                            readOnly={true}
                          />
                        </div>
                        <div className='col-12'>
                          <h5>Observaciones</h5>
                          {
                            !data.problem_definition.observations
                              ? (
                                <small>
                                  No existen observaciones acerca de la información ingresada.
                                </small>
                              )
                              : (
                                <span id='area_wrap' className='align-justify'> 
                                  <i className="fas fa-asterisk mr-2" />
                                  {data.problem_definition.observations}
                                </span>
                              )
                          }
                        </div>
                        <div className='col-12'>
                          <h5 className='text-center'>
                            <i className="fas fa-link mr-2 mt-2 icon-primary" />
                            Enlaces
                          </h5>
                        </div>
                        <ResumeTeamReferencesStepSixAbpApp 
                          references={data.references}
                        />
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
