import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Toast } from 'primereact/toast';

import { StudentAbpApp } from './abp/StudentAbpApp';
import { StudentAcApp } from './ac/StudentAcApp';
import { StudentDuaApp } from './dua/StudentDuaApp';
import { EmptyTeamStepsDataAbpApp } from './abp/abpSteps/EmptyTeamStepsDataAbpApp';

import { startRemoveCurrentMethodology } from '../../actions/admin/topic';

// TODO: Cuando se tenga todas las metodologías validar la fecha del tópico
// TODO: Cuando se tenga todas las metodologías probar cada una ellas el guardado de sus
//  componentes

export const SelectedStudentTopicApp = React.memo(({
    selectedTopic,
    currentMethodology,
    loadingMethodology
}) => {

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);   
    const toast = useRef(null);
    const topicSelected = useMemo(() => {
      if (selectedTopic) {
        return selectedTopic;
      }
      return {};
    }, [selectedTopic])

    const { type = null } = topicSelected;

    const handleRemoveCurrentMethodologyData = useCallback(
      () => {
        dispatch( startRemoveCurrentMethodology() );
      },
      [dispatch],
    );

    useEffect(() => {
      return () => {
        if (topicSelected) {
          handleRemoveCurrentMethodologyData();
        }
      }
    }, [topicSelected, handleRemoveCurrentMethodologyData]);
    
  return (
    <>
      {
        loadingMethodology
          ? <div className='col-12'>
            <EmptyTeamStepsDataAbpApp />
          </div>
          : (type && Object.keys(currentMethodology).length > 0)
            ? (type === 1)
              ? (
                <StudentDuaApp 
                  currentMethodology={currentMethodology}
                  userId={uid}
                  toast={toast}
                />
              )
              : (type === 2)
                ? (
                  <StudentAbpApp 
                    currentMethodology={currentMethodology}
                    selectedTopic={selectedTopic}
                    userId={uid}
                    toast={toast}
                  />
                )
                : (type === 3) && (
                  <StudentAcApp 
                    currentMethodology={currentMethodology}
                    selectedTopic={selectedTopic}
                    userId={uid}
                    toast={toast}
                  />
                )
            : (
              <div className='col-12'>
                <EmptyTeamStepsDataAbpApp />
              </div>
            )
      }
      <Toast ref={toast} />
    </>
  );
});
