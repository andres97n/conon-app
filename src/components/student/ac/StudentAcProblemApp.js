import React from 'react';

import { Panel } from 'primereact/panel';

import { TopicViewTextEditorApp } from '../editor/TopicViewTextEditorApp';
import { StudentAcContextVideoApp } from './StudentAcContextVideoApp';
import { StudentAcContextAudioListApp } from './StudentAcContextAudioListApp';


export const StudentAcProblemApp = React.memo(({
  currentMethodology
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-exclamation-circle mr-2 icon-warn" />
          Este es el problema a resolver...
        </h5>
      </div>
      <div className='col-12'>
        <TopicViewTextEditorApp 
          height={'350px'}
          value={currentMethodology.real_problem}
        />
      </div>
      <div className='col-12'>
        <div className='card'>
          <Panel 
            header={
              <p>
                <i className="fas fa-audio-description mr-2 icon-primary" />
                Explicación Oral
              </p>
            } 
            toggleable 
            collapsed={true}
            expandIcon='fas fa-plus'
            collapseIcon="fas fa-minus"
          >
            <StudentAcContextAudioListApp 
              contextAudio={currentMethodology.context_audio}
            />
          </Panel>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <Panel 
            header={
              <p><i className="fas fa-video mr-2 icon-primary" />Vídeo Informativo</p>
            } 
            toggleable 
            collapsed={true}
            expandIcon='fas fa-plus'
            collapseIcon="fas fa-minus"
          >
            <StudentAcContextVideoApp 
              contextVideo={currentMethodology.context_video}
            />
          </Panel>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          { 
            (currentMethodology.path_reference)
              ? (
                <a 
                  href={currentMethodology.path_reference} 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className='text-center'
                >
                  <h6>
                    <i className="fas fa-external-link-alt mr-2" />
                    Contenido Externo
                  </h6>
                </a>
              )
              : (
                <small>
                  No se subió ningún contenido relacionado para este tópico.
                </small>
              )
          }
        </div>
      </div>
    </div>
  )
});
