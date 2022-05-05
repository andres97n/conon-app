import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';

import { 
  startLoadConversationUsersListByStudent, 
  startLoadConversationUsersListByTeacher, 
  startRemoveConversationUsers 
} from '../../../actions/admin/conversation';


export const MessageNewConversationsApp = React.memo(({
  userId,
  type,
  userSelected,
  setUserSelected,
  setShowMessageDetail,
  handleClearMessagePanel
}) => {

  const dispatch = useDispatch();
  const { searchUsersList } = useSelector(
    state => state.dashboard.conversation
  );
  const [filteredUsers, setFilteredUsers] = useState([]);
  const schoolPeriodId = localStorage.getItem('currentPeriodId');

  const handleLoadFilteredUsers = useCallback(
    ( uid, type, schoolPeriodId ) => {
      if (type === 1) {
        dispatch( startLoadConversationUsersListByTeacher( uid, schoolPeriodId ) );
      } else if (type === 2) {
        dispatch( startLoadConversationUsersListByStudent( uid, schoolPeriodId ));
      }
    }, [dispatch],
  );

  const handleRemoveFilteredUsers = useCallback(
    () => {
      dispatch( startRemoveConversationUsers() );
    }, [dispatch],
  );

  const handleSearchUser = (e) => {
    let _filteredUsers;
    if (!e.query.trim().length) {
      _filteredUsers = [...searchUsersList];
    }
    else {
      _filteredUsers = searchUsersList.filter((user) => {
        return user.name.toLowerCase().includes(e.query.toLowerCase());
      });
    }
    setFilteredUsers(_filteredUsers);
  }

  useEffect(() => {
    if (userId && schoolPeriodId && type) {
      handleLoadFilteredUsers( userId, type, schoolPeriodId );
    }
    return () => {
      if (userId) {
        handleRemoveFilteredUsers();
      }
    }
  }, [userId, type, schoolPeriodId, handleLoadFilteredUsers, handleRemoveFilteredUsers]);

  return (
    <div className='grid p-fluid'>
      <div className='col-11'>
        <AutoComplete 
          value={userSelected} 
          field="name" 
          forceSelection
          suggestions={filteredUsers} 
          completeMethod={handleSearchUser} 
          placeholder='Busque por el nombre o apellido'
          dropdown
          dropdownMode='current'
          onChange={(e) => setUserSelected(e.value)}
          onSelect={() => setShowMessageDetail(true)} 
          onClear={() => setShowMessageDetail(null)}
        />
      </div>
      <div className='col-1'>
        <Button 
          icon='fas fa-times'
          tooltip='Cancelar'
          tooltipOptions={{position: 'bottom'}}
          className='p-button-outlined p-button-danger'
          onClick={handleClearMessagePanel}
        />
      </div>
    </div>
  )
});
