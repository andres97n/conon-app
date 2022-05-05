import React from 'react';

export const ToolChatMainApp = React.memo(({
  setShowChat
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          Chat Grupal
        </h5>
      </div>
    </div>
  )
});
