import React from 'react';

import { Editor } from 'primereact/editor';

import { emptyHeaderRender } from '../../../../../helpers/topic';


export const TeamGetInformationStepSevenAbpApp = React.memo(({
  getInformation
}) => {
  return (
    <div className='col-12'>
      {
        !getInformation.get_information
          ? (
            <small>
              Aún no existe información generada.
            </small>
          )
          : (
            <>
              <Editor
                style={{ height: '320px' }} 
                headerTemplate={emptyHeaderRender}
                value={
                  getInformation.get_information
                } 
                readOnly={true}
              />
              <div className='col-12 mt-4'>
                <h5>Observaciones</h5>
                <span id='area_wrap' className='align-justify'> 
                  <i className="fas fa-asterisk mr-2" />
                  {getInformation.observations}
                </span>
              </div>
            </>
          )
      }
    </div>
  )
});
