import React from 'react';

import { Button } from 'primereact/button';

import { TopiCreateDuaActivityAnswerApp } from './TopiCreateDuaActivityAnswerApp';
import { TopicCreateDuaActivityFormQuestionApp } from './TopicCreateDuaActivityFormQuestionApp';


export const TopicCreateDuaActivityQuestionApp = React.memo(({
  values,
  errors,
  setFieldValue
}) => {

  const answerInitialState = {
    literal: 'A',
    detail: '',
    value: 0
  }

  const handleAddActivityAnswer = ( index ) => {
    setFieldValue(
      'questions',
      values.questions.map( (question, intervale) => 
        intervale === index
          ? { ...question, answers: [ ...question.answers, answerInitialState] }
          : question
      )
    );
  }

  const handleRemoveActivityQuestion = ( index ) => {
    setFieldValue(
      'questions',
      values.questions.filter( (question, intervale) => intervale !== index )
    );
  }

  const handleRemoveActivityAnswer = ( questionIndex, answerIndex ) => {
    setFieldValue(
      'questions',
      values.questions.map( (question, index) => 
        index === questionIndex
          ? (
            { 
              ...question,
              answers : question.answers.filter( 
                (answer, intervale) => intervale !== answerIndex 
              )
            }
          )
          : question
      )
    );
  }

  return (
    <>
      {
        values.questions.map( (question, index) => (
          <div className='col-12' key={index}>
            <div className='card'>
              <div className='grid p-fluid'>
                <div className='col-12'>
                  <div className='center-inside'>
                    <Button
                      icon='fas fa-minus'
                      type='submit'
                      tooltip='Eliminar Pregunta'
                      tooltipOptions={{position: 'bottom'}}
                      disabled={values.questions.length < 2}
                      className="p-button-rounded p-button-danger"
                      onClick={() => handleRemoveActivityQuestion(index)}
                    />
                    <h6 className='ml-2'>Pregunta {index + 1}</h6>
                  </div>
                </div>
                <TopicCreateDuaActivityFormQuestionApp 
                  question={question}
                  index={index}
                  errors={errors}
                  setFieldValue={setFieldValue}
                />
                <div className='col-12'>
                  <TopiCreateDuaActivityAnswerApp 
                    question={question}
                    index={index}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    handleRemoveActivityAnswer={handleRemoveActivityAnswer}
                  />
                </div>
                <div className='col-12'>
                  <div className='center-inside'>
                    <Button
                      icon='fas fa-plus'
                      type='submit'
                      tooltip='Añadir Literal'
                      tooltipOptions={{position: 'bottom'}}
                      className="p-button-rounded"
                      onClick={() => handleAddActivityAnswer( index )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
});
