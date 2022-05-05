import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProgressSpinner } from 'primereact/progressspinner';

import { TopicStudentInfoApp } from './TopicStudentInfoApp';
import { SelectedStudentTopicApp } from './SelectedStudentTopicApp';
import { StudentTopicListApp } from './StudentTopicListApp';

import { startLoadCurrentAbp } from '../../actions/teacher/abp';
import { startLoadDuaByTopic } from '../../actions/teacher/dua';
import { startLoadCurrentAc } from '../../actions/teacher/ac';
import { startLoadTopicsListByStudent } from '../../actions/admin/topic';

// TODO: Aplicar el history de routee DOM, así como el useLocation para recuperar los valores
//  del enlace, de esta manera guardar la informcaión del tópico.

// TODO: Cuando el id se extraiga del url se deberá ponerlo al estado y esta manera siga el 
//  transcurso normal, cargarlo mediante el useeffect.

export const MethodologyStudentScreen = ({ history }) => {

  // const location = useLocation();
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.auth);
  const { 
    topics, currentMethodology, loading, loadingMethodology 
  } = useSelector(state => state.dashboard.topic);
  const [selectedTopic, setSelectedTopic] = useState({});
  const [isTopicSelected, setIsTopicSelected] = useState(false);

  const handleLoadActiveTopics = useCallback(
    ( uid ) => {
      dispatch( startLoadTopicsListByStudent(uid) );
    }, [dispatch],
  );

  const handleSelectTopic = useCallback(( topic ) => {
    setSelectedTopic(topic);
    setIsTopicSelected(true);
    if (topic.type === 1) {
      dispatch( startLoadDuaByTopic(topic.id) );
    } else if (topic.type === 2) {
      dispatch( startLoadCurrentAbp(topic.id) );
    } else if (topic.type === 3) {
      dispatch( startLoadCurrentAc(topic.id) );
    }
    // history.push(`?q=${topic.id}`);
  }, [dispatch]);
  
  const backStudentTopicList = useCallback( () => {
    console.log('limpia');
    setSelectedTopic({});
    setIsTopicSelected(false);
    // history.push('');
  }, [setSelectedTopic, setIsTopicSelected]);

  useEffect(() => {
    if (uid) {
      handleLoadActiveTopics( uid );
    }
  }, [uid, handleLoadActiveTopics]);

  if (loading) {
    <ProgressSpinner />
  }

  return (
    <div className="p-grid crud-demo">
      <div className="p-col-12">
        {
          (isTopicSelected) && ( 
            <TopicStudentInfoApp 
              selectedTopic={selectedTopic}
              backStudentTopicList={backStudentTopicList}
            /> 
          )
        }
      </div>
      <div className="p-col-12">
        <div className='card'>
          {
            (isTopicSelected)
              ? (
                <>
                  <i className="text-center icon-primary fas fa-brain fa-2x"></i>
                  <h3 
                    className='text-center'
                    style={{textAlign: 'justify'}}
                  >
                    { selectedTopic && selectedTopic.title }
                  </h3>
                </>
              )
              : (
                <h3 className='text-center mb-4'>
                  <i className="fas fa-book mr-2 icon-primary"></i>
                  Tópicos por Realizar
                </h3>
              )
          }
          <div className='grid p-fluid'>
            {
              (isTopicSelected)
                ? (
                  <SelectedStudentTopicApp 
                    selectedTopic={selectedTopic}
                    currentMethodology={currentMethodology}
                    loadingMethodology={loadingMethodology}
                  />
                )
                : (
                  topics.length > 0 
                    ? 
                      <StudentTopicListApp 
                        activeTopics={topics}
                        handleSelectTopic={handleSelectTopic}
                      />
                    : <div className='col-12'>
                        <small>
                          Aún no existen Tópicos generados por el Docente.
                        </small>
                    </div> 
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
