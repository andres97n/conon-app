import React from 'react';

export const StudentDuaExternalReferenceApp = React.memo(({
  duaUrl
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-external-link-square-alt mr-2 icon-primary"/>
          Información Adicional
        </h5>
      </div>
      {
        duaUrl
          ? (
            <div className='col-12'>
              <div className='center-inside'>
                <a 
                  href={duaUrl} 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className='text-center'
                >
                  <p>
                    <i className="fas fa-external-link-alt mr-2" />
                    Contenido Adicional
                  </p>
                </a>
              </div>
            </div>
          )
          : (
            <div className='col-12'>
              <small>
                El Docente no ha ingresado ningún enlace hacia información adicional
              </small>
            </div>
          )
      }
    </div>
  )
});
