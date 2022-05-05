import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { 
  startRemoveConversationDetailList, 
  startRemoveCurrentConversation 
} from '../../../actions/admin/conversation';


export const MessageConversationHeaderApp = React.memo(({
  showUserSearch,
  setShowUserSearch
}) => {

  const dispatch = useDispatch();
  const [searchConversation, setSearchConversation] = useState('');
  
  const handleSearchFilter = () => {
    console.log(searchConversation);
    // handleReset();
  }

  const handleShowUserSearch = () => {
    dispatch( startRemoveCurrentConversation() );
    dispatch( startRemoveConversationDetailList() );
    setShowUserSearch( true );
  }

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
      <div className='col-9'>
        <InputText
          name='searchConversation'
          value={searchConversation} 
          placeholder="Buscar" 
          onChange={(e) => setSearchConversation(e.target.value)} 
        />
      </div>
      <div className='col-3'>
        <Button 
          label='Buscar'
          icon='fas fa-search'
          type='submit'
          className='p-button-raised p-button-text'
          onClick={handleSearchFilter}
        />
      </div>
    </div>
  )
});
