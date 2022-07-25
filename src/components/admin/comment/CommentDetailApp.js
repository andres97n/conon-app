import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';

import { CommentFormApp } from './CommentFormApp';
import { CommentTableApp } from './CommentTableApp';

import { startRemoveComments } from '../../../actions/admin/comment';


export const CommentDetailApp = React.memo(({
  topic,
  toast
}) => {
  
  const dispatch = useDispatch();
  const { uid, name, type } = useSelector(state => state.auth);
  const [showForm, setShowForm] = useState(false);
  const infoMsg = useRef(null);

  const handleRemoveComments = useCallback(
    () => {
      dispatch( startRemoveComments() );
    }, [dispatch],
  );

  const handleSetShowForm = useCallback(
    ( value ) => {
      setShowForm( value );
    }, [],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      infoMsg.current.show({
        severity: 'info',
        detail: 'Los hilos de comentarios son apartados para comentar sobre un tema en ' +
        'concreto que el usuario desee tratar sobre los tópicos desarrollados. ',
        sticky: true
      });
    }
  }, []);  

  useEffect(() => {
    return () => {
      handleRemoveComments();
    }
  }, [handleRemoveComments]);
  
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <div className='card'>
          <h3 className='text-center'>
            <i className="fas fa-comments mr-3 icon-primary" />
            Hilos de Comentarios
          </h3>
          <div className='center-inside'>
            <div className='col-4'>
              {
                !showForm
                  ? (
                    <Button 
                      label='Crear Hilo'
                      icon='fas fa-plus'
                      className='p-button-raised'
                      onClick={() => setShowForm(true)}
                    />
                  )
                  : (
                    <Button 
                      label='Cancelar Hilo'
                      icon='fas fa-times'
                      className='p-button-raised p-button-danger'
                      onClick={() => setShowForm(false)}
                    />
                  )
              }
            </div>
          </div>
          <div className='col-12'>
            <Messages
              ref={infoMsg}
              className='align-justify'
            />
          </div>
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          {
            showForm
              ? (
                <CommentFormApp
                  userId={uid}
                  name={name}
                  topicId={topic.id}
                  toast={toast}
                  setShowForm={handleSetShowForm}
                />
              )
              : (
                <CommentTableApp
                  userId={uid}
                  userName={name}
                  userType={type}
                  toast={toast}
                />
              )
          }
        </div>
      </div>
    </div>
  )
});
