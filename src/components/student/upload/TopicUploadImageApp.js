import React, { useCallback, useEffect, useState } from 'react';

import { TabView, TabPanel } from 'primereact/tabview';

import { TopicUploadViewLocalImageApp } from './TopicUploadViewLocalImageApp';
import { TopicUploadLocalImageApp } from './TopicUploadLocalImageApp';
import { TopicUploadReferenceImageApp } from './TopicUploadReferenceImageApp';

import { useImage } from '../../../hooks/useImage';


export const TopicUploadImageApp = React.memo(({
  isMounted,
  schoolData,
  field,
  value,
  errorField,
  errors,
  toast,
  setFieldValue,
}) => {

  const [showTabPanel, setShowTabPanel] = useState({
    showFirstTabPanel: true,
    showSecondTabPanel: true
  });
  const { getImageMetadata } = useImage( schoolData, toast );

  const handleChangeTabPanel = useCallback(
    (blockPanel, numberPanel) => {
      if (blockPanel) {
        if (numberPanel === 0) {
          setShowTabPanel(oldState => ({
            ...oldState,
            showFirstTabPanel: false
          }));
        }
        if (numberPanel === 1) {
          setShowTabPanel(oldState => ({
            ...oldState,
            showSecondTabPanel: false
          }));
        }
      } else {
        setShowTabPanel({
          showFirstTabPanel: true,
          showSecondTabPanel: true
        });
      }
    },
    [ setShowTabPanel ],
  );

  const { showFirstTabPanel, showSecondTabPanel } = showTabPanel;

  useEffect(() => {
    const imagePath = localStorage.getItem(`${field}Path`);
    const handleSetPath = async ( path ) => {
      try {
        const imageData = await getImageMetadata( path );
        if (imageData) {
          setFieldValue(`${field}`, {
            name: imageData.name,
            size: imageData.size,
            path
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      if (isMounted.current) { 
        if (imagePath && Object.keys(value).length === 0) {
          handleSetPath( imagePath );
        }
      }
    }, 1000);
  }, [isMounted, field, value, getImageMetadata, setFieldValue]);  

  return (
    <div className='card'>
      <div className='grid p-fluid'>
        {
          Object.keys(value).length > 0
            ? (
              <TopicUploadViewLocalImageApp 
                field={field}
                value={value}
                schoolData={schoolData}
                setFieldValue={setFieldValue}
                handleChangeTabPanel={handleChangeTabPanel}
                toast={toast}
              />
            )
            : (
              <>
                <TabView className="tabview-custom">
                  <TabPanel 
                    header="Seleccionar imagen del equipo" 
                    leftIcon="fas fa-image mr-1"
                    disabled={!showFirstTabPanel}
                  >
                    <TopicUploadLocalImageApp
                      schoolData={schoolData} 
                      field={field}
                      toast={toast}
                      setFieldValue={setFieldValue}
                      handleChangeTabPanel={handleChangeTabPanel}
                    />
                  </TabPanel>
                  <TabPanel 
                    header="Ingresar enlace de imagen"
                    leftIcon="fas fa-link mr-1"
                    disabled={!showSecondTabPanel}
                  >
                    <TopicUploadReferenceImageApp 
                      field={field}
                      setImageValue={setFieldValue}
                      handleChangeTabPanel={handleChangeTabPanel}
                    />
                  </TabPanel>
                </TabView>
                <div className='col-12'>
                  <small className="p-error mt-1">
                    {errors[`${errorField}`]}
                  </small>
                </div>
              </>
            )
        }
      </div>
    </div>
  )
});
