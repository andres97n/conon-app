import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollPanel } from 'primereact/scrollpanel';

import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';
import { TopicViewTextEditorApp } from '../../../editor/TopicViewTextEditorApp';
import { ResumeTeamStepEightImagesDetailApp } from './ResumeTeamStepEightImagesDetailApp';
import { ResumeTeamStepEightAbpVideoDetailApp } from './ResumeTeamStepEightAbpVideoDetailApp';

import { 
  startLoadCurrentProblemResolutionAbpList, 
  startRemoveProblemResolutionStepEightAbpList 
} from '../../../../../actions/student/abp_steps/problemResolutionStepEightAbp';


export const ResumeTeamStepEightAbpApp = React.memo(({
  teamId
}) => {

  const dispatch = useDispatch();
  const {
    currentProblemResolutionAbp,
    loadingProblemResolutionAbp
  } = useSelector( state => state.dashboard.problemResolutionStepEight );
  const isMounted = useRef(true);

  const handleLoadProblemResolutionAbpList = useCallback(
    ( teamAbpId ) => {
      dispatch( startLoadCurrentProblemResolutionAbpList(teamAbpId) );
    },
    [dispatch],
  );

  const handleRemoveProblemResolutionAbpList = useCallback(
    () => {
      dispatch( startRemoveProblemResolutionStepEightAbpList() );
    },
    [dispatch],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if ( teamId && isMounted.current ) {
      handleLoadProblemResolutionAbpList( teamId );
    }

    return () => {
      if ( teamId && isMounted.current ) {
        handleRemoveProblemResolutionAbpList()
      }
    }
  }, [
    teamId,
    handleLoadProblemResolutionAbpList,
    handleRemoveProblemResolutionAbpList
  ]);

  return (
    <ScrollPanel
      className="custombar1"
      style={{
        width: '100%',
        height: currentProblemResolutionAbp.length === 0
          ? '200px'
          : '450px'
      }}
    >
      <div className='card' style={{ padding: '0.5', lineHeight: '1.5' }}>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-brain icon-primary mr-2" />
              Paso 7
            </h5>
            <h6 className='text-center'>
              Obtener información
            </h6>
          </div>
          {
            loadingProblemResolutionAbp
              ? (
                <EmptyTeamStepsDataAbpApp />
              )
              : (
                currentProblemResolutionAbp.length === 0
                ? (
                  <div className='col-12'>
                    <small>No existen registros del equipo sobre este paso.</small>
                  </div>
                )
                : (
                  currentProblemResolutionAbp.map( (data, index) => (
                    <div className='col-12' key={index}>
                      <div className='grid p-fluid'>
                        <div className='col-12'>
                          <TopicViewTextEditorApp 
                            height={'450px'}
                            value={data.problem_resolution}
                          />
                        </div>
                        <div className='col-12'>
                          <ResumeTeamStepEightImagesDetailApp 
                            images={data.image_references || []}
                          />
                        </div>
                        <div className='col-12'>
                          <div className='card'>
                            <ResumeTeamStepEightAbpVideoDetailApp 
                              video={data.video_url || ''}
                            />
                          </div>
                        </div>
                        <div className='col-12'>
                          <div className='card'>
                            <h5 className='text-center'>Observaciones</h5>
                            {
                              !data.observations
                                ? (
                                  <small>
                                    No existen observaciones por parte del equipo.
                                  </small>
                                )
                                : (
                                  <span id='area_wrap' className='align-justify'>
                                    <i className="fas fa-asterisk mr-2" />
                                    {data.observations}
                                  </span>
                                )
                            }
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
