import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Panel } from 'primereact/panel';

import { EmptyContentScreen } from '../../../ui/EmptyContentScreen';

import { 
  startLoadCurrentFeaturedInformationsSecretaryAcByMember,
   startRemoveFeaturedInformationSecretaryAcList 
  } from '../../../../actions/student/ac_roles/secretaryAc/featuredInformationSecretaryAc';
import { startLoadSecretarysTeam } from '../../../../actions/teacher/teamAc';


export const StudentAcMemberReferenceListApp = React.memo(({
  userAc,
  currentMethodology
}) => {

  const dispatch = useDispatch();
  const { 
    secretaryFeaturedInformations,
    loadingSecretaryFeaturedInformation
  } = useSelector( state => state.dashboard.secretaryAc );
  const [secretaryTeam, setSecretaryTeam] = useState({});

  const handleLoadFeaturedInformationsFromMember = useCallback(
    ( secretaryId, memberId ) => {
      dispatch( startLoadCurrentFeaturedInformationsSecretaryAcByMember( 
        secretaryId, memberId 
      ));
    }, [dispatch],
  );

  const handleRemoveFeaturedInformationsFromMember = useCallback(
    () => {
      dispatch( startRemoveFeaturedInformationSecretaryAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    if (currentMethodology) {
      startLoadSecretarysTeam( currentMethodology.id || 0 ).then( data => (
        setSecretaryTeam(data)
      ));
    }
  }, [currentMethodology]);

  useEffect(() => {
    if (Object.keys(secretaryTeam).length > 0 && userAc) {
      handleLoadFeaturedInformationsFromMember( secretaryTeam.id, userAc.id );
    }
  
    return () => {
      if (Object.keys(secretaryTeam).length > 0 && userAc) {
        handleRemoveFeaturedInformationsFromMember();
      }
    }
  }, [
    secretaryTeam, 
    userAc, 
    handleLoadFeaturedInformationsFromMember,
    handleRemoveFeaturedInformationsFromMember
  ]);

  return (
    <Panel
      header={
        <p>
          <i className="fas fa-link mr-2 icon-primary" />
          Enlaces Enviados por el Secretario del Equipo
        </p>
      } 
      toggleable 
      collapsed={true}
      expandIcon='fas fa-plus'
      collapseIcon="fas fa-minus"
    >
      <div className='grid p-fluid'>
        {
          loadingSecretaryFeaturedInformation
            ? (
              <EmptyContentScreen />
            )
            : secretaryFeaturedInformations.length === 0
              ? (
                <div className='col-12'>
                  <small>Aún no existen enlaces asignados.</small>
                </div>
              )
              : (
                secretaryFeaturedInformations.map( (data, index) => (
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
                      </div>
                    </div>
                  </div>
                ))
              )
        }
      </div>
    </Panel>
  )
});
