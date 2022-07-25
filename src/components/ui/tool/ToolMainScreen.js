import React, { useCallback, useState } from 'react';

import { Tooltip } from 'primereact/tooltip';
import { SpeedDial } from 'primereact/speeddial';
import { Dialog } from 'primereact/dialog';

import { ToolGlossaryMainApp } from './glossary/ToolGlossaryMainApp';
import { ToolChatMainApp } from './ToolChatMainApp';


export const ToolMainScreen = () => {
  
  const [showGlossary, setShowGlossary] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const items = [
    {
      label: 'Glosario',
      icon: 'fas fa-spell-check',
      command: () => setShowGlossary(true)
    },
    // {
    //   label: 'Chat',
    //   icon: 'fas fa-comment-dots',
    //   command: () => setShowChat(true)
    // },
  ];

  const handleSetShowChat = useCallback(
    ( value ) => {
      setShowChat( value );
    }, [],
  );

  const headerPanelTemplate = ( type ) => (
    <div className="p-grid p-justify-end">
      <h5 className='p-col-6'>
        {
          type === 1
            ? ('Administrar Glosario')
            : type === 2 && ( 'Chat Grupal' )
        }
      </h5>
    </div>
  );

  const headerGlossaryPanelTemplate = (
    <React.Fragment>
      <h5 className='text-center'>
        <i className="fas fa-book-reader mr-2 icon-primary" />
        Visualizar Glosario
      </h5>
    </React.Fragment>
  );

  return (
    <div 
      className="speeddial-mask-demo" 
      style={{ position: 'relative', height: '350px' }}
    >
      <Tooltip
        target=".speeddial-mask-demo .speeddial-right .p-speeddial-action" 
        position='left'
      />
      <SpeedDial
        model={items} 
        className='speeddial-right'
        showIcon='fas fa-tools'
        hideIcon='fas fa-times'
        direction="up"
        buttonClassName='p-button-raised p-button-warning'
      />
      <Dialog
        modal 
        visible={showGlossary} 
        style={{ width: '60vw' }} 
        header={headerGlossaryPanelTemplate}
        className="p-fluid" 
        onHide={() => setShowGlossary(false)}
      >
        <ToolGlossaryMainApp/>
      </Dialog>
      <Dialog
        modal 
        visible={showChat} 
        style={{ width: '40vw' }} 
        header={headerPanelTemplate(2)}
        className="p-fluid" 
        onHide={() => setShowChat(false)}
      >
        <ToolChatMainApp 
          setShowChat={handleSetShowChat}
        />
      </Dialog> 
    </div>
  )
}
