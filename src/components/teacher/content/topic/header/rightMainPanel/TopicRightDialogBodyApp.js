import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TopicAssignDuaStudent } from './assignDialog/TopicAssignDuaStudent';
import { TopicAssignAbpStudentApp } from './assignDialog/TopicAssignAbpStudentApp';

import { startUpdateTopic } from '../../../../../../actions/admin/topic';
import { TopicAssignAcStudentApp } from './assignDialog/TopicAssignAcStudentApp';


export const TopicRightDialogBodyApp = React.memo(({
  selectedMethodology,
  currentTopic,
  toast,
  handleSetShowBackMessage,
  handleSetBackMessage,
  handleHideAssignDialog
}) => {

  const dispatch = useDispatch();
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleSetSelectedStudents = useCallback(
    ( value ) => {
      setSelectedStudents( value );
    }, [],
  );

  const handleAssingStudentsToTopic = ( selectedStudents ) => {
    let students = currentTopic.students || [];
    const newStudents = selectedStudents.map( 
      student => ( student.id )
    );
    students = [ ...students, ...newStudents ]
    const newTopic = {
      ...currentTopic, 
      students
    };
    dispatch( startUpdateTopic( newTopic, false, toast ));
  }

  return (
    <>
      {
        Object.keys(currentTopic).length === 0
          ? (
            <small className='text-center'>No se encontró ningún Tópico.</small>
          )
          : (
            selectedMethodology === 1
              ? (
                <TopicAssignDuaStudent 
                  topic={currentTopic}
                  selectedStudents={selectedStudents}
                  setSelectedStudents={handleSetSelectedStudents}
                  handleSetShowBackMessage={handleSetShowBackMessage}
                  handleSetBackMessage={handleSetBackMessage}
                  handleSaveStudentsToTopic={handleAssingStudentsToTopic}
                  handleHideAssignDialog={handleHideAssignDialog}
                />
              )
              : selectedMethodology === 2
                ? (
                  <TopicAssignAbpStudentApp 
                    topic={currentTopic}
                    selectedStudents={selectedStudents}
                    toast={toast}
                    setSelectedStudents={handleSetSelectedStudents}
                    handleSetShowBackMessage={handleSetShowBackMessage}
                    handleSetBackMessage={handleSetBackMessage}
                    handleSaveStudentsToTopic={handleAssingStudentsToTopic}
                    handleHideAssignDialog={handleHideAssignDialog}
                  />
                )
                : selectedMethodology === 3 && (
                  <TopicAssignAcStudentApp 
                    topic={currentTopic}
                    selectedStudents={selectedStudents}
                    toast={toast}
                    setSelectedStudents={handleSetSelectedStudents}
                    handleSetShowBackMessage={handleSetShowBackMessage}
                    handleSetBackMessage={handleSetBackMessage}
                    handleSaveStudentsToTopic={handleAssingStudentsToTopic}
                    handleHideAssignDialog={handleHideAssignDialog}
                  />
                )
          )
      }
      {/* {
        selectedMethodology === 1
        ? (
          <TopicAssignDuaStudent 
            topic={currentTopic}
            selectedStudents={selectedStudents}
            setSelectedStudents={handleSetSelectedStudents}
            handleSetShowBackMessage={handleSetShowBackMessage}
            handleSetBackMessage={handleSetBackMessage}
            handleSaveStudentsToTopic={handleAssingStudentsToTopic}
            handleHideAssignDialog={handleHideAssignDialog}
         />
        )
        : selectedMethodology === 2
          ? (
            <TopicAssignAbpStudentApp 
              topic={currentTopic}
              selectedStudents={selectedStudents}
              toast={toast}
              setSelectedStudents={handleSetSelectedStudents}
              handleSetShowBackMessage={handleSetShowBackMessage}
              handleSetBackMessage={handleSetBackMessage}
              handleSaveStudentsToTopic={handleAssingStudentsToTopic}
              handleHideAssignDialog={handleHideAssignDialog}
            />
          )
          : selectedMethodology === 3 && (
            <TopicAssignAcStudentApp 
              topic={topic}
              selectedStudents={selectedStudents}
              toast={toast}
              setSelectedStudents={handleSetSelectedStudents}
              handleSetShowBackMessage={handleSetShowBackMessage}
              handleSetBackMessage={handleSetBackMessage}
              handleSaveStudentsToTopic={handleAssingStudentsToTopic}
              handleHideAssignDialog={handleHideAssignDialog}
            />
          )
      } */}
    </>
  )
});
