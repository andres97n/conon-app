import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { confirmDialog } from 'primereact/confirmdialog';

import { getModeratorQuestionObjects, getModeratorQuestionsError } from '../../../../../helpers/abp-steps';
import { startSaveManyQuestionStepOneAbp, startSaveQuestionStepOneAbp } from '../../../../../actions/student/abp_steps/questionStepOneAbp';

// TODO: Probar si es que se actualiza el reducer cuando se ingresan mas de 1 una pregunta.

export const QuestionsTeamStepOneApp = React.memo(({
  teamId,
  questionsStepOneAbp,
  toast
}) => {

  const dispatch = useDispatch();
  const initialState = [{
    question: ''
  }];

  const [moderatorQuestions, setModeratorQuestions] = useState(initialState);
  const [questionCount, setQuestionCount] = useState(1);
  const warnMsg = useRef(null);

  const handleChangeModeratorQuestions = (intervale, value) => {
    setModeratorQuestions(
      moderatorQuestions.map( 
        (question, index) => index === intervale
          ? ({
            question: value
          })
          : (question)
      )
    );
  }

  const handleAddModeratorQuestion = () => {
    setModeratorQuestions([
      ...moderatorQuestions,
      {
        question: '',
      },
    ]);
    setQuestionCount(oldState => oldState + 1);
  }

  const handleRemoveModeratorQuestion = ( intervale ) => {
    const newModeratorQuestions = moderatorQuestions.filter( 
      (question, index) => index !== intervale);
    setModeratorQuestions(newModeratorQuestions);
    setQuestionCount(oldState => oldState - 1);
  };

  const handleSubmitModeratorQuestions = () => {
    const moderatorQuestionsValid = getModeratorQuestionObjects( 
      moderatorQuestions, teamId 
    );
    if (moderatorQuestionsValid.length === 1) {
      dispatch(startSaveQuestionStepOneAbp( moderatorQuestionsValid[0], toast ));
    } else{
      dispatch(startSaveManyQuestionStepOneAbp( moderatorQuestionsValid, toast ));
    }
    setModeratorQuestions(initialState);
    setQuestionCount(1);
  };

  const validateFormModeratorQuestion = () => {
    if (getModeratorQuestionsError(moderatorQuestions)) {
      confirmModeratorQuestion();
    } else{
      toast.current.show({ 
        severity: 'error', 
        summary: 'Conon Informa', 
        detail: 'Existen campo/s que no han sido llenados.', 
        life: 6000 });
    }
  }

  const confirmModeratorQuestion = () => {
    const oneQuestion = 'la siguiente pregunta';
    const manyQuestions = 'las siguientes preguntas'
    confirmDialog({
      message: `Está seguro de enviar ${
        moderatorQuestions.length === 1 ? oneQuestion : manyQuestions 
      }?`,
      header: 'Confirmación de envío',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, envíar',
      rejectLabel: 'No envíar',
      accept: () => handleSubmitModeratorQuestions(),
    });
  };

  useEffect(() => {
    if (questionsStepOneAbp.length > 0) {
      setQuestionCount(questionsStepOneAbp.length + 1);
    }
  }, [questionsStepOneAbp, setQuestionCount]);
  

  useEffect(() => {
    if (warnMsg.current?.state.messages?.length === 0) {
      warnMsg.current.show({ 
          severity: 'warn', 
          detail: `Las preguntas realizadas serán envíadas al Docente para que este las responda, y cada una de ellas se mostrarán a lo largo del desarrollo del tópico.
          ${"\n"}Tenga en cuenta que sólo se permite un máximo de 5 preguntas y solo hasta el paso 5 del tópico.`, 
          sticky: true 
      });
    }
  }, [warnMsg]);
  
  return (
    <div className='card'>
      <h5>
        <i className="fas fa-question-circle mr-2" />
        Preguntas para el Docente...
      </h5>
      <Messages
          ref={warnMsg} 
          className='align-justify'
      />
      <div className='grid p-fluid'>
        <div className='col-10'></div>
        <div className='col-2'>
          <Button 
            label='Añadir Pregunta' 
            icon='fas fa-plus'
            disabled={questionCount >= 5}
            className="p-button-raised p-button-primary " 
            onClick={handleAddModeratorQuestion}
          />
        </div>
        {
          moderatorQuestions.map( (data, index) => (
            <div className='col-12' key={index}>
              <div className='grid p-fluid'>
                <div className='col-11'>
                  <div className='card'>
                    <span className="p-input-icon-left">
                      <i className="fas fa-question" />
                      <InputText 
                          id={`question${index + 1}`}
                          name={`question${index + 1}`}
                          value={data.question}
                          autoComplete='off'
                          placeholder='Ingrese una pregunta por parte del grupo'
                          onChange={(e) => handleChangeModeratorQuestions(
                            index,
                            e.target.value
                          )}
                      ></InputText>
                    </span>
                    {
                      (!data.question && moderatorQuestions.length > 1)
                        ? (
                          <small className="p-error mt-1">
                            {`La pregunta ${questionsStepOneAbp.length + 1 + index} es obligatoria.`}
                          </small>
                        )
                        : (
                          <small 
                              id={`question${index + 1}-help`}
                              className="p-d-block mt-1"
                          >Pregunta {questionsStepOneAbp.length + 1 + index} dirigida al Docente.</small>
                        )
                    }
                  </div>
                </div>
                <div className='col-1'>
                  <div className='inner'>
                    <Button 
                      icon='fas fa-trash'
                      tooltip='Quitar Pregunta'
                      tooltipOptions={{position: 'bottom'}}
                      disabled={moderatorQuestions?.length === 1}
                      className="p-button-raised p-button-danger" 
                      onClick={() => handleRemoveModeratorQuestion(index)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='grid p-fluid'>
        <div className='col-5'></div>
        <div className='col-2'>
            <Button 
              label="Envíar y Guardar" 
              icon='fas fa-envelope-open-text'
              className="p-button-raised p-button-success" 
              onClick={validateFormModeratorQuestion}
            />
        </div>
      </div>
    </div>
  )
});
