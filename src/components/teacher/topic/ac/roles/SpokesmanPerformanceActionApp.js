import React from 'react';

import { InputTextarea } from 'primereact/inputtextarea';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';


export const SpokesmanPerformanceActionApp = React.memo(({
  spokesmanQuestions,
  loadingSpokesmanQuestion
}) => {
  return (
    <>
      {
        loadingSpokesmanQuestion
          ? (
            <EmptyContentScreen />
          )
          : (
            <>
              <div className='col-12'>
                <h5 className='text-center'>Preguntas Realizadas al Docente</h5>
              </div>
              {
                spokesmanQuestions.map( (question, index) => (
                  <div className='col-12' key={index}>
                    <InputTextarea
                      value={question.spokesman_question}
                      autoResize
                      disabled 
                    />
                  </div>
                ))  
              }
            </>
          )
      }
    </>
  )
});
