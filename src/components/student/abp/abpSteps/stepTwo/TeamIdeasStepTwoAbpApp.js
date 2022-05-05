import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Rating } from 'primereact/rating';
import { Messages } from 'primereact/messages';

import { getRatingStepTwoDatabaseObject, getStudentIdeaStepTwoObject } from '../../../../../helpers/abp-steps';
import { startUpdateRateStudentIdeaStepTwoAbp } from '../../../../../actions/student/abp_steps/studentIdeaStepTwoAbp';

export const TeamIdeasStepTwoAbpApp = React.memo(({
  ratingStudentIdeas,
  loadingRateStudentIdea,
  userId,
  toast
}) => {

  const dispatch = useDispatch();
  const [ratings, setRatings] = useState([]);
  const infoMsg = useRef(null);

  const handleSetStudentRatings = useCallback(
    ( ratings ) => {
      setRatings( ratings );
    },
    [setRatings],
  );

  const handleChangeStudentRatings = ( student_idea, rating, value ) => {
    const currentStudentIdea = getStudentIdeaStepTwoObject(
      ratingStudentIdeas, student_idea, rating, value
    );
    const currentRating = getRatingStepTwoDatabaseObject(
      ratings, student_idea, rating, value
    )
    if (currentRating && currentStudentIdea) {
      dispatch( startUpdateRateStudentIdeaStepTwoAbp( currentRating, currentStudentIdea ) );
      setRatings(
        ratings.map( data => data.student_idea === student_idea
          ? (
            {
              student_idea,
              rate_student_ideas: data.rate_student_ideas.map( rate => 
                rate.rating === rating
                  ? ({
                    ...rate,
                    rate_student_idea: value
                  })
                  : ( rate )
              )
            }
          )
          : ( data ) 
        )
      );
    } else {
      toast.current.show({ 
        severity: 'error', 
        summary: 'Conon Informa', 
        detail: 'No se puedo actualizar el rating seleccionado', 
        life: 5000 });
    }
  }

  useEffect(() => {
    if (infoMsg.current?.state.messages?.length === 0) {
        infoMsg.current.show({ 
            severity: 'info', 
            detail: "Demuestra tu participación al equipo interactuando con " +
            "cada idea, lo puedes hacer puntuando la misma por medio del rating " + 
            "que se muestra." , 
            sticky: true 
        });
    }
  }, [infoMsg]);
  
  useEffect(() => {
    if (ratingStudentIdeas.length > 0 && ratings.length === 0) {
      const teamRatings = ratingStudentIdeas.map( data => ({
        student_idea: data.student_idea.id,
        rate_student_ideas: data.rate_student_ideas.map( rating => ({
            rating: rating.id,
            user: rating.user.id,
            rate_student_idea: rating.rate_student_idea
        }))
      }))
      handleSetStudentRatings(teamRatings);
    }
  }, [ratingStudentIdeas, ratings, handleSetStudentRatings]);

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='grid p-grid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-users mr-2"/>
              Ideas del Equipo
            </h5>
          </div>
          <div className='col-12'>
            <Messages
                ref={infoMsg} 
                className='align-justify'
            />
          </div>
          {
            (loadingRateStudentIdea)
              ? (
                <ProgressSpinner />
              )
              : (
                  (ratingStudentIdeas && ratingStudentIdeas.length === 0)
                    ? (
                      <div className='col-12'>
                        <small className='align-justify'>
                          Aún no existen ideas del Equipo.
                        </small>
                      </div>
                    )
                    : (
                      ratingStudentIdeas.map( (data, index) => (
                        <div className='col-12' key={index}>
                          <div className='grid p-fluid'>
                            <div className='col-8'>
                              <div className='card'>
                                <div className='grid p-fluid'>
                                  <div className='col-12'>
                                    <p className='align-justify'>
                                    <i className="fas fa-asterisk mr-2" />
                                      {data.student_idea.student_idea}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-4'>
                              <div className='grid p-fluid'>
                                {
                                  data.rate_student_ideas.map( (rating, i) => (
                                    <div 
                                      className='col-4'  
                                      key={i}
                                    >
                                      <div className='grid p-fluid'>
                                        <div className='col-12'>
                                          <h6 className='text-center'>
                                            <i className="fas fa-book-reader mr-2"/>
                                          </h6>
                                          <p className='text-center'>
                                            {rating.user.name}
                                          </p>
                                        </div>
                                        <div className='col-12'>
                                          <Rating 
                                            value={ratings[index]?.rate_student_ideas[i].rate_student_idea} 
                                            cancel={false}
                                            disabled={userId !== rating.user.id}
                                            onChange={(e) => handleChangeStudentRatings(
                                              data.student_idea.id,
                                              rating.id,
                                              e.value
                                            )} 
                                            stars={5} 
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )
              )
          }
        </div>
      </div>
    </div>
  )
});
