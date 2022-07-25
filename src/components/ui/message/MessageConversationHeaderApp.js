import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { 
  startRemoveConversationDetailList, 
  startRemoveCurrentConversation 
} from '../../../actions/admin/conversation';


export const MessageConversationHeaderApp = React.memo(({
  userId,
  conversations,
  showUserSearch,
  setFilteredUsers,
  setShowUserSearch,
  setShowMessageDetail
}) => {

  const dispatch = useDispatch();

  const searchConversations = (event) => {
    let _filteredUsers;
    if (!event.trim().length) {
      _filteredUsers = [ ...conversations ]
    } else {
      _filteredUsers = conversations.filter( conversation => {
        if (userId !== conversation.first_user.id) {
          return conversation.first_user.name.toLowerCase().includes(event.toLowerCase());
        } else {
          return conversation.second_user.name.toLowerCase().includes(event.toLowerCase());
        }
      });
    }
    setFilteredUsers(_filteredUsers);
  }

  const handleShowUserSearch = () => {
    dispatch( startRemoveCurrentConversation() );
    dispatch( startRemoveConversationDetailList() );
    setShowUserSearch( true );
    setShowMessageDetail( false );
  }

  useEffect(() => {
    if (conversations.length > 0) {
      setFilteredUsers([ ...conversations ]);
    }
  }, [conversations, setFilteredUsers]);

  return (
    <div className='grid p-fluid'>
      {
        !showUserSearch && (
          <div className='col-12'>
            <div className='center-inside'>
              <div className='col-4'>
                <Button 
                  label='Nuevo Mensaje'
                  icon='fas fa-plus'
                  className='p-button-outlined'
                  onClick={handleShowUserSearch}
                />
              </div>
            </div>
          </div>
          )
      }
      <div className='col-12'>
        <InputText
          name='searchConversation'
          placeholder="Buscar" 
          onChange={(e) => searchConversations(e.target.value)} 
        />
      </div>
    </div>
  )
});
