import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollPanel } from 'primereact/scrollpanel';
import { Badge } from 'primereact/badge';

import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';
import { ResumeTeamInteractionsStepOneAbpApp } from './ResumeTeamInteractionsStepOneAbpApp';

import { 
  startLoadTeamOpinionsAndInteractionsStepOneAbp, 
  startRemoveInteractionStepOneAbpList 
} from '../../../../../actions/student/abp_steps/opinionStepOneAbp';
import { changeObjectDate } from '../../../../../helpers/abp-steps';

export const ResumeTeamStepOneAbpApp = React.memo(({
  teamId
}) => {

  const dispatch = useDispatch();
  const { opinionsTeamAbp, loadingOpinionStepOneAbp } = useSelector(
    state => state.dashboard.opinionStepOne
  );
  const isMounted = useRef(true);

  const handleLoadTeamOpinionsAndInteractions = useCallback(
    ( team ) => {
      dispatch( startLoadTeamOpinionsAndInteractionsStepOneAbp( team ) );
    },
    [dispatch],
  );

  const handleRemoveTeamOpinionsAndInteractions = useCallback(
    () => {
      dispatch( startRemoveInteractionStepOneAbpList() );
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
      handleLoadTeamOpinionsAndInteractions( teamId );
    }

    return () => {
      if (teamId && !isMounted.current) {
        handleRemoveTeamOpinionsAndInteractions();
      }
    }
  }, [
    teamId,
    handleLoadTeamOpinionsAndInteractions,
    handleRemoveTeamOpinionsAndInteractions
  ]);

  return (
    <ScrollPanel
      className="custombar1" 
      style={{ 
        width: '100%', 
        height: opinionsTeamAbp.length === 0
          ? '200px' 
          : '450px' 
      }}
    >
      <div className='card'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-brain icon-primary mr-2" />
              Paso 1
            </h5>
            <h6 className='text-center'>Leer y Analizar el escenario del problema</h6>
          </div>
          {
            loadingOpinionStepOneAbp
              ? (
                <EmptyTeamStepsDataAbpApp />
              )
              : (
                opinionsTeamAbp.length === 0
                  ? (
                    <div className='col-12'>
                      <small>No existen registros del equipo sobre este paso.</small>
                    </div>
                  )
                  : (
                    opinionsTeamAbp.map( (data, index) => (
                      <div className='col-6' key={index}>
                        <div className='card'>
                          <div className='grid p-fluid'>
                            <div className="col-12">
                              <h6 className='text-center'>
                                {data.opinion.team_detail_abp.user}
                              </h6>
                              <p>
                                <i className="fas fa-minus mr-2" />
                                {data.opinion.opinion}
                              </p>
                            </div>
                            <ResumeTeamInteractionsStepOneAbpApp 
                              interactions={data.interactions}
                            />
                            <div className='col-12'>
                              <div className='center-inside'>
                                <Badge
                                  value={
                                    changeObjectDate(data.opinion.created_at)
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
