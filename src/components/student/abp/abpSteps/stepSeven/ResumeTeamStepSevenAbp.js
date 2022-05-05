import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollPanel } from 'primereact/scrollpanel';
import { Editor } from 'primereact/editor';

import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';
import { ResumeTeamReferencesStepSevenAbpApp } from './ResumeTeamReferencesStepSevenAbpApp';

import { 
  startLoadGetInformationModelAndReferencesAbpList, 
  startRemoveGetInformationStepSevenAbpList 
} from '../../../../../actions/student/abp_steps/getInformationStepSevenAbp';
import { emptyHeaderRender } from '../../../../../helpers/topic';


export const ResumeTeamStepSevenAbp = React.memo(({
  teamId
}) => {

  const dispatch = useDispatch();
  const { 
    currentGetInformationModel,
    loadingGetInformationModel
  } = useSelector( state => state.dashboard.getInformationStepSeven );
  const isMounted = useRef(true);

  const handleLoadGetInformationAbpList = useCallback(
    ( teamAbpId ) => {
      dispatch( startLoadGetInformationModelAndReferencesAbpList(teamAbpId) );
    },
    [dispatch],
  );

  const handleRemoveGetInformationAbpList = useCallback(
    () => {
      dispatch( startRemoveGetInformationStepSevenAbpList() );
    },
    [dispatch],
  );

  useEffect(() => {
    if ( teamId && isMounted.current ) {
      handleLoadGetInformationAbpList( teamId );
    }
  
    return () => {
      if ( teamId && isMounted.current ) {
        handleRemoveGetInformationAbpList()
      }
    }
  }, [
    teamId, 
    handleLoadGetInformationAbpList, 
    handleRemoveGetInformationAbpList
  ]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <ScrollPanel
      className="custombar1" 
      style={{ 
        width: '100%', 
        height: currentGetInformationModel.length === 0
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
            loadingGetInformationModel
              ? (
                <EmptyTeamStepsDataAbpApp />
              )
              : (
                currentGetInformationModel.length === 0
                ? (
                  <div className='col-12'>
                    <small>No existen registros del equipo sobre este paso.</small>
                  </div>
                )
                : (
                  currentGetInformationModel.map( (data, index) => (
                    <div className='col-12' key={index}>
                      <div className='grid p-fluid'>
                        <div className='col-12'>
                          <Editor 
                            style={{ height: '450px' }} 
                            headerTemplate={emptyHeaderRender}
                            value={
                              data.information.get_information
                            } 
                            readOnly={true}
                          />
                        </div>
                        <div className='col-12'>
                          <h5>Observaciones</h5>
                          {
                            !data.information.observations
                              ? (
                                <small>
                                  No existen observaciones acerca de la información ingresada.
                                </small>
                              )
                              : (
                                <span id='area_wrap' className='align-justify'> 
                                  <i className="fas fa-asterisk mr-2" />
                                  {data.information.observations}
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
                        <ResumeTeamReferencesStepSevenAbpApp 
                          references={data.references}
                        />
                      </div>
                    </div>
                  ))
                )
              )
          }
          <div className='col-12'>
          </div>
        </div>    
      </div>
    </ScrollPanel>
  )
});
