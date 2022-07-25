import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SecretaryPerformanceReferenceApp } from './SecretaryPerformanceReferenceApp';
import { SecretaryPerformanceForTeamApp } from './SecretaryPerformanceForTeamApp';

import { 
  startLoadSecretaryInformationsByTeamDetail, 
  startRemoveSecretaryInformationAcList 
} from '../../../../../actions/student/ac_roles/secretaryAc/secretaryInformationAc';
import { 
  startLoadFeaturedInformationsSecretaryAcList, 
  startRemoveFeaturedInformationSecretaryAcList 
} from '../../../../../actions/student/ac_roles/secretaryAc/featuredInformationSecretaryAc';


export const TeacherTopicSecretaryPerformanceApp = React.memo(({
  student
}) => {
  
  const dispatch = useDispatch();
  const { 
    secretaryInformations,
    secretaryFeaturedInformations,
    loadingSecretaryInformation,
    loadingSecretaryFeaturedInformation
  } = useSelector( state => state.dashboard.secretaryAc );
  const isMounted = useRef(true);

  const handleLoadSecretaryActions = useCallback(
    ( teamDetailId ) => {
      dispatch( startLoadSecretaryInformationsByTeamDetail( teamDetailId ));
      dispatch( startLoadFeaturedInformationsSecretaryAcList( teamDetailId ));
    }, [dispatch],
  );

  const handleRemoveSecretaryActions = useCallback(
    () => {
      dispatch( startRemoveSecretaryInformationAcList() );
      dispatch( startRemoveFeaturedInformationSecretaryAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (student && isMounted.current) {
      handleLoadSecretaryActions( student?.id );
    }
  
    return () => {
      if (student) {
        handleRemoveSecretaryActions();
      }
    }
  }, [
    student, 
    handleLoadSecretaryActions, 
    handleRemoveSecretaryActions
  ]);

  return (
    <>
      <div className='col-6'>
        <div className='card'>
          <SecretaryPerformanceReferenceApp
            secretaryInformations={secretaryInformations}
            loadingSecretaryInformation={loadingSecretaryInformation}
          />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <SecretaryPerformanceForTeamApp 
            secretaryFeaturedInformations={secretaryFeaturedInformations}
            loadingSecretaryFeaturedInformation={loadingSecretaryFeaturedInformation}
          />
        </div>
      </div>
    </>
  )
});
