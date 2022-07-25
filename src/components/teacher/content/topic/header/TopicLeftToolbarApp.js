import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TopicDropdownApp } from './TopicDropdownApp';

import { 
  getTopicMethodologyTypeList,
  setAsignatureTopicDropdown,
  setClassroomTopicDropdown 
} from '../../../../../helpers/topic/header';
import { 
  startLoadAsignatureDetailByClassroomAndUser, 
  startRemoveAsignaturesDetail 
} from '../../../../../actions/admin/asignature';


export const TopicLeftToolbarApp = React.memo(({
  uid,
  classrooms,
  asignatures_detail,
  setTopicKeys
}) => {

  const dispatch = useDispatch();
  const [selectedClassroom, setSelectedClassroom] = useState({});
  const [selectedAsignature, setSelectedAsignature] = useState({});
  const [selectedMethodology, setSelectedMethodology] = useState({});


  const handleClassroomChange = useCallback(
    ( e ) => {
      if ( e.value ) {
        dispatch( startLoadAsignatureDetailByClassroomAndUser(
          e.value,
          uid
        ));
        setSelectedClassroom(e.value);
      } else {
        dispatch( startRemoveAsignaturesDetail() );
        setSelectedClassroom({});
        setSelectedAsignature({});
        setSelectedMethodology({});
        setTopicKeys({});
      }
    }, [uid, dispatch, setTopicKeys],
  );

  const handleAsignatureChange = useCallback(
    ( e ) => {
      if ( e.value ) {
        setSelectedAsignature(e.value);
      } else {
        setSelectedAsignature({});
        setSelectedMethodology({});
        setTopicKeys({});
      }
    }, [setTopicKeys],
  );

  const handleMethodologyChange = useCallback(
    ( e ) => {
      if ( e.value ) {
        setSelectedMethodology(e.value);
        setTopicKeys({
          selectedClassroom,
          selectedAsignature,
          selectedMethodology: e.value
        });
      } else {
        setSelectedMethodology({});
        setTopicKeys({});
      }
    }, [setTopicKeys, selectedClassroom, selectedAsignature],
  );

  return (
    <>
      <TopicDropdownApp 
        value={selectedClassroom}
        options={setClassroomTopicDropdown(classrooms)}
        placeholder={"Seleccione un Aula"}
        emptyMessage={'No se encontraron Aulas'}
        conditional={true}
        tooltipPositive={'Primero seleccione un aula'}
        tooltipNegative={'Lo siguiente es seleccionar una asignatura'}
        handleChange={handleClassroomChange}
      />
      <TopicDropdownApp 
        value={selectedAsignature}
        options={setAsignatureTopicDropdown(asignatures_detail)}
        placeholder={"Seleccione una Asignatura"}
        emptyMessage={'No se encontraron Asignaturas'}
        conditional={typeof selectedClassroom === 'number'}
        tooltipPositive={'Ahora debe seleccionar una asignatura'}
        tooltipNegative={'Para empezar seleccione una metodología'}
        handleChange={handleAsignatureChange}
      />
      <TopicDropdownApp 
        value={selectedMethodology}
        options={getTopicMethodologyTypeList(asignatures_detail, selectedAsignature)}
        placeholder={"Seleccione una Metodología"}
        emptyMessage={'No se encontraron Metodologías'}
        conditional={typeof selectedAsignature === 'number'}
        tooltipPositive={'Para terminar seleccione una metodología'}
        tooltipNegative={'Ya puede empezar a crear un tópico'}
        handleChange={handleMethodologyChange}
      />
    </>
  )
});
