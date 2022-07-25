import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'primereact/button';

import { EmptyContentScreen } from '../../ui/EmptyContentScreen';
import { ReplyNewFormApp } from './ReplyNewFormApp';
import { ReplyDetailApp } from './ReplyDetailApp';

import { 
  startRemoveReplies 
} from '../../../actions/admin/comment';


export const ReplyListApp = React.memo(({
  userId,
  userName,
  userType,
  commentId,
  commentState,
  toast
}) => {

  const dispatch = useDispatch();
  const { replies, loadingReply } = useSelector( state => state.dashboard.comment );
  const [showForm, setShowForm] = useState(false);

  const handleRemoveReplies = useCallback(
    () => {
      dispatch( startRemoveReplies() );
    }, [dispatch],
  );


  const handleSetShowForm = useCallback(
    ( value ) => {
      setShowForm( value );
    }, [],
  );

  useEffect(() => {
    return () => {
      handleRemoveReplies();
    }
  }, [handleRemoveReplies]);

  if (loadingReply) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    );
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h6>{
          replies.length === 1
            ? `${replies.length} respuesta`
            : `${replies.length} respuestas`
        }</h6>
        <div className='center-inside'>
          {
            commentState === true && (
              <div className='col-4'>
                {
                  showForm
                    ? (
                      <Button
                        label='Cancelar Ingreso'
                        icon="fas fa-times"
                        className="p-button-raised p-button-danger" 
                        onClick={() => setShowForm(false)} 
                      />      
                    )
                    : (
                      <Button
                        label='Nuevo Comentario'
                        icon="fas fa-plus"
                        className="p-button-raised" 
                        onClick={() => setShowForm(true)} 
                      />
                    )
                }
              </div>
            ) 
          }
        </div>
      </div>
      {
        !showForm
        ? (
            <ReplyDetailApp 
              replies={replies}
              userId={userId}
              userType={userType}
              toast={toast}
            />
          )
          : (
            <ReplyNewFormApp
              userId={userId}
              userName={userName}
              commentId={commentId}
              toast={toast}
              setShowForm={handleSetShowForm}
            />
          )
      }
    </div>
  )
});
