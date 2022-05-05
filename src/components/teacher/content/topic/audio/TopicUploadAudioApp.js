import React  from 'react';


import { TopicUploadLocalAudioApp } from './TopicUploadLocalAudioApp';


// TODO: Finalizar el local audio y el grabado probarlo al final

export const TopicUploadAudioApp = React.memo(({
  schoolData,
  value,
  field,
  maxAudios,
  audioCount,
  toast,
  setFieldValue,
  setAudioCount
}) => {

  // const [showTabPanel, setShowTabPanel] = useState({
  //   showFirstTabPanel: true,
  //   showSecondTabPanel: true
  // });
  // const { recorderState, ...handlers } = useRecorder();

  // const { showFirstTabPanel, showSecondTabPanel } = showTabPanel;

  // const handleChangeTabPanel = useCallback(
  //   (blockPanel, numberPanel) => {
  //     if (blockPanel) {
  //       if (numberPanel === 0) {
  //         setShowTabPanel(oldState => ({
  //           ...oldState,
  //           showFirstTabPanel: false
  //         }));
  //       }
  //       if (numberPanel === 1) {
  //         setShowTabPanel(oldState => ({
  //           ...oldState,
  //           showSecondTabPanel: false
  //         }));
  //       }
  //     } else {
  //       setShowTabPanel({
  //         showFirstTabPanel: true,
  //         showSecondTabPanel: true
  //       });
  //     }
  //   }, [],
  // );

  return (
    <div className='card'>
      <div className='grid p-fluid'>
        <div className='col-12'>
          <TopicUploadLocalAudioApp
            schoolData={schoolData}
            value={value}
            field={field}
            maxAudios={maxAudios}
            audioCount={audioCount}
            toast={toast}
            setFieldValue={setFieldValue}
            setAudioCount={setAudioCount}
          />
        </div>
        {/* <div className='col-12'>
          <TabView className="tabview-custom">
            <TabPanel 
              header="Seleccionar imagen del equipo" 
              leftIcon="fas fa-image mr-1"
              disabled={!showFirstTabPanel}
            >
              <TopicUploadRecorderControlsApp 
                recorderState={recorderState}
                handlers={handlers}
                field={field}
                value={value}
                setFieldValue={setFieldValue}
                setShowTabPanel={handleChangeTabPanel}
              />
            </TabPanel>
            <TabPanel 
              header="Ingresar enlace de imagen"
              leftIcon="fas fa-link mr-1"
              disabled={!showSecondTabPanel}
            >
              <TopicUploadLocalAudioApp 
              />
            </TabPanel>
          </TabView>
        </div> */}
      </div>
    </div>
  )
});
