import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { MessageNewConversationsApp } from './MessageNewConversationsApp';
import { MessageConversationDetailApp } from './MessageConversationDetailApp';


export const MessageListViewApp = React.memo(({
  userId,
  type,
  toast,
  showUserSearch,
  showMessageDetail,
  setShowUserSearch,
  setShowMessageDetail
}) => {

  const { currentConversation } = useSelector(
    state => state.dashboard.conversation
  );
  const [userSelected, setUserSelected] = useState(null);
  
  const handleSetUserSelected = useCallback(
    ( user ) => {
      setUserSelected(user);
    }, [],
  );

  const handleSetShowMessageDetail = useCallback(
    ( value ) => {
      setShowMessageDetail( value );
    }, [setShowMessageDetail],
  );

  const handleClearMessagePanel = useCallback(
    () => {
      setShowUserSearch(false);
      setUserSelected(null);
      setShowMessageDetail(false);
    }, [setShowUserSearch, setShowMessageDetail],
  );

  const handleClearNewMessage = useCallback(
    () => {
      setShowUserSearch(false);
      setUserSelected(null);
    }, [setShowUserSearch],
  );

  return (
    <div className='grid p-fluid'>
      {
        showUserSearch && (
          <div className='col-12'>
            <MessageNewConversationsApp
              type={type}
              userSelected={userSelected}
              setUserSelected={handleSetUserSelected}
              setShowMessageDetail={handleSetShowMessageDetail}
              handleClearMessagePanel={handleClearMessagePanel}
            />
          </div>
        )
      }
      {
        (
          !showMessageDetail && 
          !showUserSearch && 
          Object.keys(currentConversation).length === 0
        ) && (
          <div className='col-12'>
            <p className='text-center'>
              Seleccione una conversación para escribir mensajes.
            </p>
          </div>
        ) 
      }
      {
        ( showMessageDetail || Object.keys(currentConversation).length > 0 ) && (
          <MessageConversationDetailApp 
            ownerId={userId}
            user={userSelected}
            conversation={currentConversation}
            toast={toast}
            handleClearSearch={handleClearNewMessage}
          />
        )
      }
    </div>
  )
});
