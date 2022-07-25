import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Divider } from 'primereact/divider';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { InputText } from 'primereact/inputtext';

import { 
  startBlockGlossaryDetailByStudent 
} from '../../../../actions/admin/glossary';


export const ToolGlossaryDetailListApp = React.memo(({
  uid,
  details,
  toast
}) => {

  const dispatch = useDispatch();
  const [filteredTerms, setFilteredTerms] = useState([]);

  const handleBLockTerm = ( termId ) => {
    dispatch( startBlockGlossaryDetailByStudent( termId, toast ));
  }

  const handleConfirmBlockWord = ( termId ) => {
    confirmDialog({
      message: '¿Está seguro que desea bloquear el siguiente Término?',
      header: 'Confirmación de Bloqueo',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, bloquear',
      rejectLabel: 'No bloquear',
      acceptClassName: 'p-button-secondary',
      accept: () => handleBLockTerm( termId ),
    });
  }

  const searchTerms = (event) => {
    let _filteredTerms;
    if (!event.trim().length) {
      _filteredTerms = [ ...details ]
    } else {
      _filteredTerms = details.filter( term => {
        return term.title.toLowerCase().includes(event.toLowerCase());
      });
    }
    setFilteredTerms(_filteredTerms);
  }

  useEffect(() => {
    if (details.length > 0 && filteredTerms.length === 0) {
      setFilteredTerms(details);
    }
  }, [details, filteredTerms]);

  return (
    <>
      {
        details.length === 0
          ? (
            <div className='col-12'>
              <small>Aún no existen términos creados.</small>
            </div>
          )
          : (
            <ScrollPanel
              className="custombar1 mt-2"
              style={{
                width: '100%',
                height: '400px'
              }}
            >
              <div className='grid p-fluid'>
                <div className='col-12'>
                  <div className='center-inside'>
                    <div className='col-6'>
                      <span className="block mt-2 md:mt-0 p-input-icon-left">
                        <i className="fas fa-search" />
                        <InputText
                          type="search" 
                          placeholder='Buscar Término'
                          onInput={(e) => searchTerms(e.target.value)} 
                        />
                      </span>
                    </div>
                  </div>
                </div>
                {
                  filteredTerms.map( (word, index) => (
                    <div className='col-6' key={index}>
                      <div className='card'>
                        <div className='col-12'>
                          <h5>
                            {word.title}
                            {
                              word.url && (
                                <a 
                                  href={word.url} 
                                  target="_blank" 
                                  rel="noreferrer noopener"
                                  className='text-center'
                                >
                                  <i className="fas fa-external-link-alt ml-2" />
                                </a>
                              )
                            }
                          </h5>
                          <Divider />
                        </div>
                        <div className='col-12'>
                          <p 
                            id='area-wrap'
                            className='align-justify'
                          >{word.description}
                          </p>
                        </div>
                        <div className='col-12'>
                          <div className='center-inside'>
                            <Badge 
                              value={word.owner.name} 
                            ></Badge>
                          </div>
                        </div>
                        {
                          word.owner.id === uid && (
                            <div className='col-12'>
                              <div className='center-inside'>
                                <Button 
                                  icon="fas fa-ban"
                                  tooltip='Bloquear Término'
                                  tooltipOptions={{position:'bottom'}}
                                  className="p-button-rounded p-button-secondary"
                                  onClick={() => handleConfirmBlockWord(word.id)} 
                                />
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </ScrollPanel>
          )
      }
    </>
  )
});
