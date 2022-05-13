import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';

import { 
  startBlockSecretaryInformationAc,
  startLoadSecretaryInformationsAcList,
  startRemoveSecretaryInformationAcList 
} from '../../../../actions/student/ac_roles/secretaryAc/secretaryInformationAc';


export const StudentAcReferenceListApp = React.memo(({
  teamDetailAc,
  toast
}) => {

  const dispatch = useDispatch();
  const {
    secretaryInformations
  } = useSelector( state => state.dashboard.secretaryAc );
  const isMounted = useRef(true);

  const handleBlockTeamReference = ( data ) => {
    dispatch( startBlockSecretaryInformationAc( data, toast ));
  }

  // const handleLoadTeamReferences = useCallback(
  //   ( teamId ) => {
  //     dispatch( startLoadSecretaryInformationsAcList( teamId ));
  //   }, [dispatch],
  // );

  const handleRemoveTeamReferences = useCallback(
    () => {
      dispatch( startRemoveSecretaryInformationAcList() );
    }, [dispatch],
  );

  const handleConfirmBlockPath = ( data ) => {
    confirmDialog({
      message: '¿Está seguro de bloquear el siguiente enlace?',
      header: 'Confirmación de bloqueo',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, bloquear',
      rejectLabel: 'No bloquear',
      acceptClassName: 'p-raised-button p-button-secondary',
      accept: () => handleBlockTeamReference( data ),
    });
  };

  useEffect(() => {
    if (
      Object.keys(teamDetailAc).length > 0 && isMounted.current
    ) {
      if (teamDetailAc.role_type !== 4) {
        // handleLoadTeamReferences( teamDetailAc.team_ac );
      }
    }  
    return () => {
      if (Object.keys(teamDetailAc).length > 0) {
        if (teamDetailAc.role_type !== 4) {
          handleRemoveTeamReferences();
        }
      }
    }
  }, [ teamDetailAc, handleRemoveTeamReferences ]);

  return (
    <>
      <Panel
        header={
          <p>
            <i className="fas fa-link mr-2 icon-primary" />
            Enlaces Referenciales
          </p>
        } 
        toggleable 
        collapsed={true}
        expandIcon='fas fa-plus'
        collapseIcon="fas fa-minus"
      >
        <div className='grid p-fluid'>
          {
            secretaryInformations.length === 0
              ? (
                <div className='col-12'>
                  <small>Aún no existen enlaces guardados.</small>
                </div>
              )
              : (
                secretaryInformations.map( (data, index) => (
                  <div className='col-2' key={index}>
                    <div className='card'>
                      <div className='grid p-fluid'>
                        <div className='col-12'>
                          <div className='center-inside'>
                            <a 
                              href={data.external_path} 
                              target="_blank" 
                              rel="noreferrer noopener"
                              className='text-center'
                            >
                              <p>
                                <i className="fas fa-external-link-alt mr-2" />
                                Enlace
                              </p>
                            </a>
                          </div>
                        </div>
                        {
                          teamDetailAc.role_type === 4 && (
                            <div className='col-12'>
                              <div className='center-inside'>
                                <Button
                                  icon='fas fa-ban'
                                  tooltip='Bloquear Enlace'
                                  tooltipOptions={{position: 'bottom'}}
                                  className='p-raised-button p-button-secondary'
                                  onClick={() => handleConfirmBlockPath(
                                    data.id
                                  )}
                                  />
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                ))
              )
          }
        </div>
      </Panel>
    </>
  )
});
