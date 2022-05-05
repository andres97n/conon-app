import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Toast } from 'primereact/toast';

import { MessageConversationScreen } from './MessageConversationScreen';
import { MessageListViewApp } from './MessageListViewApp';

import { 
  startLoadCurrentConversationUsersList, 
  startRemoveConversationList, 
  startRemoveConversationUsers, 
  startRemoveCurrentConversation
} from '../../../actions/admin/conversation';


export const MessageScreen = () => {

  const dispatch = useDispatch();
  // const { messageCount } = useSelector(state => state.ui);
  const { uid, type } = useSelector(state => state.auth);
  const { conversations, loadingConversations } = useSelector(
    state => state.dashboard.conversation
  );
  const [showUserSearch, setShowUserSearch] = useState(false);
  const toast = useRef(null);

  const handleSetShowUserSearch = useCallback(
    ( value ) => {
      setShowUserSearch( value );
    }, [],
  );

  const handleLoadUserConversations = useCallback(
    ( userId ) => {
      dispatch( startLoadCurrentConversationUsersList( userId ) );
    }, [dispatch],
  );

  const handleRemoveUserConversations = useCallback(
    () => {
      dispatch( startRemoveConversationList() );
      dispatch( startRemoveCurrentConversation() );
      dispatch( startRemoveConversationUsers() );
    }, [dispatch],
  );

  useEffect(() => {
    if (uid) {
      handleLoadUserConversations( uid );
    }
    return () => {
      if (uid) {
        handleRemoveUserConversations();
      }
    }
  }, [uid, handleLoadUserConversations, handleRemoveUserConversations]);

  return (
    <div className="p-grid crud-demo">
      <Toast ref={toast} />
      <div className="p-col-12">
        <div className='card'>
          <div className="grid p-fluid">
            <div className="col-12">
              <h3>Mensajes</h3>
              {/* <h6>Tiene {messageCount} mensajes sin leer.</h6> */}
            </div>
            <div className="col-5">
              <div className='card'>
                <div className='grid p-fluid'>
                  {/* TODO: Terminar la parte del buscador de usuarios */}
                  <MessageConversationScreen
                    userId={uid}
                    showUserSearch={showUserSearch}
                    conversations={conversations}
                    loadingConversations={loadingConversations}
                    setShowUserSearch={handleSetShowUserSearch}
                  />
                </div>
              </div>
            </div>
            <div className="col-7">
              <div className='card'>
                <MessageListViewApp 
                  userId={uid}
                  type={type}
                  toast={toast}
                  showUserSearch={showUserSearch}
                  setShowUserSearch={setShowUserSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}
