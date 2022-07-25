import React, { useCallback, useEffect } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';

import { EmptyContentScreen } from '../EmptyContentScreen';
import { MessageConversationDetailFormApp } from './MessageConversationDetailFormApp';

import { 
  startBlockConversationDetail,
  startLoadConversationDetailList,
  startRemoveConversationDetailList,
} from '../../../actions/admin/conversation';
import { 
  getIsMessageValidToDelete 
} from '../../../helpers/conversation/conversationList';


export const MessageConversationDetailApp = React.memo(({
  ownerId,
  user,
  conversation,
  toast,
  handleClearSearch
}) => {

  const dispatch = useDispatch();
  const { conversationDetail, loadingMessages } = useSelector(
    state => state.dashboard.conversation
  );

  const handleDeleteMessage = ( messageId ) => {
    dispatch( startBlockConversationDetail( messageId, toast ) );
  }

  const handleConfirmDeleteMessage = ( messageId ) => {
    confirmDialog({
      message: 'Está seguro de eliminar el siguiente mensaje?',
      header: 'Panel de Eliminación',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'No eliminar',
      acceptClassName: 'p-button-danger',
      accept: () => handleDeleteMessage( messageId )
    });
  }

  const handleLoadConversationMessages = useCallback(
    ( conversationId ) => {
      dispatch( startLoadConversationDetailList( conversationId ));
    }, [dispatch],
  );

  const handleRemoveConversationMessages = useCallback(
    () => {
      dispatch( startRemoveConversationDetailList() );
    },
    [dispatch],
  );

  useEffect(() => {
    if (Object.keys(conversation).length > 0) {
      handleLoadConversationMessages( conversation.id );
    }
  
    return () => {
      if (Object.keys(conversation).length > 0) {
        handleRemoveConversationMessages();
      }
    }
  }, [
    conversation, 
    handleLoadConversationMessages, 
    handleRemoveConversationMessages
  ]);
  
  if (loadingMessages) {
    return (
      <EmptyContentScreen />
    )
  }

  return (
    <>
      <div className='col-12'>
        <div className='card'>
          <ScrollPanel
            className="custombar1" 
            style={{ 
              width: '100%', 
              height: conversationDetail.length === 0 ? '50px' : '350px' 
            }}
          >
            <div className='grid p-fluid'>
              {
                conversationDetail.length === 0 
                ? (
                  <div className='col-12'>
                    <small>No existen mensajes de esta conversación.</small>
                  </div>
                ) 
                : (
                  conversationDetail.map( message => (
                    <div className='col-12 imessage' key={message.id}>
                      {
                        message.owner === ownerId 
                          ? (
                            <p className='from-me'>{message.detail}</p>
                          )
                          : (
                            <p className='from-them'>{message.detail}</p>
                          )
                      }
                      {
                        (
                          message.owner === ownerId && 
                          getIsMessageValidToDelete(message.created_at)) && (
                          <p className='from-me no-tail emoji'>
                            <Button 
                              icon='far fa-trash-alt'
                              tooltip='Eliminar Mensaje'
                              tooltipOptions={{position: 'bottom'}}
                              className='p-button-rounded p-button-danger'
                              onClick={() => handleConfirmDeleteMessage(message.id)}
                            />
                          </p>
                        )
                      }
                    </div>
                  ))
                )
              }
            </div>
          </ScrollPanel>
        </div>
      </div>
      <MessageConversationDetailFormApp 
        ownerId={ownerId}
        user={user}
        conversation={conversation}
        toast={toast}
        handleClearSearch={handleClearSearch}
      />
    </>
  )
});
