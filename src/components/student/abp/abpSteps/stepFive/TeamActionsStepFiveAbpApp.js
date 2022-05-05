import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Rating } from 'primereact/rating';
import { Messages } from 'primereact/messages';

import { 
  startUpdateRatePerformActionStepFiveAbp 
} from '../../../../../actions/student/abp_steps/performActionStepFiveAbp';

export const TeamActionsStepFiveAbpApp = React.memo(({
  ratingPerformActions,
  userId
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

  const handleUpdateStudentRatings = ( perform_action, rating, value ) => {
    let newRating;
    ratingPerformActions.forEach( data => {
      data.rates.forEach( rate => {
        if (rate.id === rating) {
          newRating = {
            user: rate.user,
            rate_perform_action: value,
            active: true
          };
        }
      });
    });
    setRatings(
      ratings.map( data => data.perform_action === perform_action
        ? (
          {
            perform_action,
            rates: data.rates.map( rate => 
              rate.rating === rating
              ? ({
                ...rate,
                rate_perform_action: value
              })
              : ( rate )
            )
          }
        )
        : ( data ) 
      )
    );
    dispatch( startUpdateRatePerformActionStepFiveAbp( perform_action, rating, newRating ) );
  }

  useEffect(() => {
    if (infoMsg.current?.state.messages?.length === 0) {
        infoMsg.current.show({ 
            severity: 'info', 
            detail: "Demuestra tu participación al equipo interactuando con " +
            "cada estrategia ingresada, lo puedes hacer puntuando la misma por medio del " + 
            "rating que se muestra." , 
            sticky: true 
        });
    }
  }, [infoMsg]);

  useEffect(() => {
    if (ratingPerformActions.length > 0 && ratings.length === 0) {
      const teamRatings = ratingPerformActions.map( data => ({
        perform_action: data.perform_action.id,
        rates: data.rates.map( rating => ({
            rating: rating.id,
            user: rating.user.id,
            rate_perform_action: rating.rate_perform_action
        }))
      }))
      handleSetStudentRatings(teamRatings);
    }
  }, [ratingPerformActions, ratings, handleSetStudentRatings]);

  return (
    <div className='card'>
      <div className='grid p-fluid'>
        <div className='col-12'>
          <h5 className='text-center'>
            <i className="fas fa-users mr-2 icon-black" />
            Estrategias del Equipo
          </h5>
        </div>
        <div className='col-12'>
            <Messages
                ref={infoMsg} 
                className='align-justify'
            />
          </div>
        {
          ratingPerformActions.length === 0
            ? (
              <div className='col-12'>
                <small>
                  Aún no existen estrategias de los demás integrantes del grupo.
                </small>
              </div>
            )
            : (
              ratingPerformActions.map( (data, index) => (
                <div className='col-12' key={index}>
                  <div className='grid p-fluid'>
                    <div className='col-7'>
                      <div className='card'>
                        <p className='text-justify'>
                          <i className="fas fa-asterisk mr-2" />
                          {data.perform_action.action}
                        </p>
                      </div>
                    </div>
                    <div className='col-5'>
                      <div className='grid p-fluid'>
                        {
                          data.rates.length === 0
                            ? (
                              <div className='col-12'>
                                <small>
                                  No existen calificaciones para esta estrategia.
                                </small>
                              </div>
                            )
                            : (
                              data.rates.map( (rate, i) => (
                                <div className='col-4' key={rate.id}>
                                  <div className='card'>
                                    <div className='grid p-fluid'>
                                      <div className='col-12'>
                                        <h6 className='text-center'>
                                          <i className="fas fa-book-reader" />
                                        </h6>
                                        <h6 className='text-center'>
                                          { rate.user.name }
                                        </h6>
                                      </div>
                                      <div className='col-12'>
                                        <Rating
                                          value={ratings[index]?.rates[i].rate_perform_action} 
                                          cancel={false}
                                          disabled={userId !== rate.user.id}
                                          onChange={(e) => handleUpdateStudentRatings(
                                            data.perform_action.id,
                                            rate.id,
                                            e.value
                                          )} 
                                          stars={5} 
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
        }
      </div>
    </div>
  )
});
