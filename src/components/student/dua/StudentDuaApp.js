import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TabView, TabPanel } from 'primereact/tabview';
import { Messages } from 'primereact/messages';

import { StudentDuaBodyApp } from './StudentDuaBodyApp';
import { StudentDuaActivityApp } from './studentActivity/StudentDuaActivityApp';

import { showMessageComponent } from '../../../helpers/topic';
import { 
  startLoadActivityWithQuestions, 
  startRemoveCurrentActivity 
} from '../../../actions/teacher/activity';


export const StudentDuaApp = React.memo(({
  currentMethodology,
  userId,
  toast
}) => {

  const dispatch = useDispatch();
  const { currentActivity } = useSelector( state => state.dashboard.activity );
  const infoMsg = useRef(null);

  const handleLoadCurrentActivity = useCallback(
    ( duaId ) => {
      dispatch( startLoadActivityWithQuestions(duaId) );
    },
    [dispatch],
  );

  const handleRemoveCurrentActivity = useCallback(
    () => {
      dispatch( startRemoveCurrentActivity() );
    },
    [dispatch],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      showMessageComponent( 
        infoMsg, 
        'info', 
        'La metodología DUA busca insertar a todos los estudiantes en el aprendizaje de ' + 
        'conocimientos, mediante materiales informativos mostrados en distintos formatos; ' +
        'así el estudiante no se sienta excluido del aprendizaje de ningún tópico ' +
        'mostrado por el Docente.',
        true
      );
    }
  }, []);

  useEffect(() => {
    if (currentMethodology && Object.keys(currentMethodology).length > 0) {
      handleLoadCurrentActivity(currentMethodology.id);
    }
    return () => {
      if (currentMethodology && Object.keys(currentMethodology).length > 0) {
        handleRemoveCurrentActivity();
      }
    }
  }, [ currentMethodology, handleLoadCurrentActivity, handleRemoveCurrentActivity]);

  return (
    <div className='col-12'>
      <div className='p-grid p-fluid'>
        <div className='col-12'>
          <Messages
            ref={infoMsg}
            className='align-justify'
          />
        </div>
        <div className='col-12'>
          <TabView>
              <TabPanel 
                header="Metodología DUA" 
                leftIcon="fab fa-readme mr-2"
              >
                <div className='col-12'>
                  <StudentDuaBodyApp 
                    currentMethodology={currentMethodology}
                  />
                </div>
              </TabPanel>
              <TabPanel 
                header="Actividad" 
                leftIcon="fas fa-question-circle mr-2"
              >
                <div className='col-12'>
                  <StudentDuaActivityApp
                    currentActivity={currentActivity}
                    userId={userId}
                    toast={toast}
                  />
                </div>
              </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
});
