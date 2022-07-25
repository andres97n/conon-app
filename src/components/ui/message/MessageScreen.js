import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';

import { MessageConversationScreen } from './MessageConversationScreen';
import { MessageListViewApp } from './MessageListViewApp';

import { 
  startLoadCurrentConversationUsersList, 
  startRemoveConversationList, 
  startRemoveCurrentConversation
} from '../../../actions/admin/conversation';


export const MessageScreen = () => {

  const dispatch = useDispatch();
  const { uid, type } = useSelector(state => state.auth);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [showMessageDetail, setShowMessageDetail] = useState(false);
  const toast = useRef(null);
  const schoolPeriod = localStorage.getItem('currentPeriodId');

  const handleSetShowUserSearch = useCallback(
    ( value ) => {
      setShowUserSearch( value );
    }, [],
  );

  const handleSetShowMessageDetail = useCallback(
    ( value ) => {
      setShowMessageDetail( value );
    }, [],
  );

  const handleLoadUserConversations = useCallback(
    () => {
      dispatch( startLoadCurrentConversationUsersList() );
    }, [dispatch],
  );

  const handleRemoveUserConversations = useCallback(
    () => {
      dispatch( startRemoveConversationList() );
      dispatch( startRemoveCurrentConversation() );
    }, [dispatch],
  );

  useEffect(() => {
    handleLoadUserConversations();
    return () => {
      handleRemoveUserConversations();
    }
  }, [handleLoadUserConversations, handleRemoveUserConversations]);

  if (!schoolPeriod) {
    return (
      <div className='grid p-fluid'>
        <div className='col-12'>
          <Message
            severity="warn" 
            text="No se puede generar Áreas de Conocimiento si no está creado
            el Período Lectivo" 
          />
        </div>
      </div>
    )
  }

  return (
    <div className="p-grid crud-demo">
      <Toast ref={toast} />
      <div className="p-col-12">
        <div className='card'>
          <div className="grid p-fluid">
            <div className="col-12">
              <h3>Mensajes</h3>
            </div>
            <div className="col-5">
              <div className='card'>
                <div className='grid p-fluid'>
                  <MessageConversationScreen
                    userId={uid}
                    toast={toast}
                    showUserSearch={showUserSearch}
                    setShowUserSearch={handleSetShowUserSearch}
                    setShowMessageDetail={handleSetShowMessageDetail}
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
                  showMessageDetail={showMessageDetail}
                  setShowUserSearch={setShowUserSearch}
                  setShowMessageDetail={handleSetShowMessageDetail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}
