import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Toast } from 'primereact/toast';

import { ToolGlossaryDetailApp } from './ToolGlossaryDetailApp';
import { ToolGlossaryTeacherMainApp } from './ToolGlossaryTeacherMainApp';

import { 
  startLoadClassroomByStudent,
  startLoadClassroomsByTeacher, 
  startRemoveClassrooms 
} from '../../../../actions/admin/classroom';


export const ToolGlossaryMainApp = React.memo(() => {

  const dispatch = useDispatch();
  const { uid, type } = useSelector(state => state.auth);
  const { classrooms } = useSelector(
    state => state.dashboard.classroom
  );
  const [wasLoad, setWasLoad] = useState(false);
  const [classroomSelected, setClassroomSelected] = useState(null);
  const [viewClassroom, setViewClassroom] = useState(false);
  const toast = useRef(null);

  const handleLoadClassrooms = useCallback(
    ( uid, type ) => {
      if (uid) {
        if (type === 1) {
          dispatch( startLoadClassroomsByTeacher( uid ));
        } else if (type === 2) {
          dispatch( startLoadClassroomByStudent( uid ));
        }
      }
    }, [dispatch],
  );
    
  const handleRemoveClassrooms = useCallback(
    () => {
      if (wasLoad) {
        dispatch( startRemoveClassrooms() );
      }
    }, [dispatch, wasLoad],
  );

  const handleSetClassroomSelected = useCallback(
    ( value ) => {
      setClassroomSelected( value );
    }, [],
  );

  const handleSetViewClassroom = useCallback(
    ( value ) => {
      setViewClassroom( value );
    }, [],
  );

  useEffect(() => {
    if (classrooms.length === 0) {
      setWasLoad(true);
    }
  }, [classrooms]);

  useEffect(() => {
    handleLoadClassrooms( uid, type );
  
    return () => {
      handleRemoveClassrooms();
    }
  }, [
    uid, 
    type, 
    handleLoadClassrooms, 
    handleRemoveClassrooms
  ]);

  useEffect(() => {
    if (uid && classrooms.length > 0) {
      if (type === 2) {
        setClassroomSelected( classrooms[0] );
        setViewClassroom(true);
      }
    }
  }, [uid, type, classrooms]);

  return (
    <div className='grid p-fluid'>
      <Toast ref={toast} />
      {
        type === 1 && (
          <ToolGlossaryTeacherMainApp
            classrooms={classrooms}
            classroomSelected={classroomSelected}
            viewClassroom={viewClassroom}
            setClassroomSelected={handleSetClassroomSelected}
            setViewClassroom={handleSetViewClassroom}
          />
        )
      }
      {
        (
          classroomSelected && 
          viewClassroom && 
          typeof classroomSelected === 'object'
        ) && (
          <ToolGlossaryDetailApp
            classroomSelected={classroomSelected}
            toast={toast}
          />
        )
      }
    </div>
  )
});
