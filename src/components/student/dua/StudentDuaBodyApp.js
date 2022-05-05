import React from 'react';

import { StudentDuaAudioApp } from './StudentDuaAudioApp';
import { StudentDuaExternalReferenceApp } from './StudentDuaExternalReferenceApp';
import { StudentDuaImagesApp } from './StudentDuaImagesApp';
import { StudentDuaTextViewApp } from './StudentDuaTextViewApp';
import { StudentDuaVideoApp } from './StudentDuaVideoApp';


export const StudentDuaBodyApp = React.memo(({
  currentMethodology,
}) => {

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <div className='card'>
          <StudentDuaTextViewApp
            textValue={currentMethodology.written_conceptualization}
            title={'Explicación Escrita acerca del Tópico'}
            icon={"fas fa-universal-access mr-2 icon-primary"}
            height={'450px'}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <StudentDuaImagesApp
            duaImages={currentMethodology.images}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <StudentDuaAudioApp
            duaAudio={currentMethodology.oral_conceptualization}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <StudentDuaTextViewApp
            textValue={currentMethodology.example}
            title={'Ejemplo Explicativo'}
            icon={"fas fa-diagnoses mr-2 icon-primary"}
            height={'450px'}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='grid p-fluid'>
          <div className='col-6'>
            <div className='card'>
              <StudentDuaVideoApp
                duaVideo={currentMethodology.video}
              />
            </div>
          </div>
          <div className='col-6'>
            <div className='card'>
              <StudentDuaExternalReferenceApp 
                duaUrl={currentMethodology.extra_information}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});
