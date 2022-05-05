import React, { useCallback, useState } from 'react';

import { TabView,TabPanel } from 'primereact/tabview';

import { TopicTeacherMainFormApp } from './TopicTeacherMainFormApp';
import { TopicTeacherDuaEditorApp } from '../dua/TopicTeacherDuaEditorApp';
import { TopicTeacherDuaFinalizationApp } from '../dua/TopicTeacherDuaFinalizationApp';
import { TopicTeacherAbpFinalizationApp } from '../abp/TopicTeacherAbpFinalizationApp';
import { TopicTeacherAcFinalizationApp } from '../ac/TopicTeacherAcFinalizationApp';


export const TopicTeacherTabApp = React.memo(({
  topicData,
  isTitleSaved,
  values,
  errors,
  toast,
  setFieldValue,
  setIsTitleSaved
}) => {

  const [schoolData, setSchoolData] = useState({});

  const handleSetSchoolData = useCallback(
    ( value ) => {
      setSchoolData( value );
    }, [],
  );

  return (
    <>
      <TabView>
        <TabPanel 
          header="Información Principal" 
          leftIcon="fas fa-file-signature mr-2"
        >
          <TopicTeacherMainFormApp
            topicData={topicData}
            values={values}
            errors={errors}
            isTitleSaved={isTitleSaved}
            setFieldValue={setFieldValue}
            setIsTitleSaved={setIsTitleSaved}
            setSchoolData={handleSetSchoolData}
          />
        </TabPanel>
        <TabPanel
          header={
            topicData.methodology.abbrev === 'DUA'
              ? 'Conceptualización Escrita'
              : 'Planteamiento del Problema'
          }
          leftIcon="fas fa-pen mr-2"
        >
          {
            topicData.methodology.abbrev === 'DUA'
              ? (
                <TopicTeacherDuaEditorApp 
                  schoolData={schoolData}
                  value={values['written_conceptualization']}
                  field={'written_conceptualization'}
                  errors={errors}
                  title={'Conceptualización Escrita'}
                  icon={'book'}
                  toast={toast}
                  setFieldValue={setFieldValue}
                />      
              )
              : topicData.methodology.abbrev === 'ABP'
                ? (
                  <TopicTeacherDuaEditorApp 
                    schoolData={schoolData}
                    value={values['problem']}
                    field={'problem'}
                    errors={errors}
                    title={'Definición del Problema'}
                    icon={'book'}
                    toast={toast}
                    setFieldValue={setFieldValue}
                  />  
                )
                : (
                  <TopicTeacherDuaEditorApp 
                    schoolData={schoolData}
                    value={values['real_problem']}
                    field={'real_problem'}
                    errors={errors}
                    title={'Definición del Problema'}
                    icon={'book'}
                    toast={toast}
                    setFieldValue={setFieldValue}
                  />
                )
          }
        </TabPanel>
        <TabPanel
          header={
            topicData.methodology.abbrev === 'DUA'
              ? 'Ejemplo Demostrativo'
              : topicData.methodology.abbrev === 'ABP'
                ? 'Finalización de ABP'
                : 'Finalización de AC'
          }
          leftIcon="fas fa-edit mr-2"
        >
          {
            topicData.methodology.abbrev === 'DUA'
              ? (
                <TopicTeacherDuaEditorApp 
                  schoolData={schoolData}
                  value={values['example']}
                  field={'example'}
                  errors={errors}
                  title={'Ejemplo Demostrativo'}
                  icon={'book-open'}
                  toast={toast}
                  setFieldValue={setFieldValue}
                />      
              )
              : topicData.methodology.abbrev === 'ABP'
                ? (
                  <TopicTeacherAbpFinalizationApp 
                    schoolData={schoolData}
                    values={values}
                    errors={errors}
                    toast={toast}
                    setFieldValue={setFieldValue}
                  />  
                )
                : (
                  <TopicTeacherAcFinalizationApp 
                    schoolData={schoolData}
                    values={values}
                    errors={errors}
                    toast={toast}
                    setFieldValue={setFieldValue}
                  />
                )
          }
        </TabPanel>
        <TabPanel
          header={
            topicData.methodology.abbrev === 'DUA'
              ? 'Finalización de DUA'
              : 'CONON'
          }
          leftIcon={
            topicData.methodology.abbrev === 'DUA'
              ? "fas fa-photo-video mr-2"
              : "fas fa-brain mr-2"
          }
          disabled={topicData.methodology.abbrev !== 'DUA'}
        >
          <TopicTeacherDuaFinalizationApp 
            schoolData={schoolData}
            values={values}
            errors={errors}
            toast={toast}
            setFieldValue={setFieldValue}
          />
        </TabPanel>
      </TabView>
    </>
  )
});
