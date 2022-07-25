import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'primereact/button';

import { EmptyContentScreen } from '../../EmptyContentScreen';
import { ToolGlossaryFormApp } from './ToolGlossaryFormApp';
import { ToolGlossaryDetailListApp } from './ToolGlossaryDetailListApp';

import { 
  startLoadGlossaryWithDetails, 
  startRemoveCurrentGlossary 
} from '../../../../actions/admin/glossary';


export const ToolGlossaryDetailApp = React.memo(({
  classroomSelected,
  toast
}) => {

  const dispatch = useDispatch();
  const { uid, name } = useSelector( state => state.auth );
  const { currentGlossary, loading } = useSelector( 
    state => state.dashboard.glossary 
  );
  const [showForm, setShowForm] = useState(false);

  const handleLoadCurrentGlossary = useCallback(
    ( classroomId ) => {
      dispatch( startLoadGlossaryWithDetails(classroomId) );
    }, [dispatch],
  );
  
  const handleRemoveCurrentGlossary = useCallback(
    () => {
      dispatch( startRemoveCurrentGlossary() );
    }, [dispatch],
  );

  const handleSetShowForm = useCallback(
    ( value ) => {
      setShowForm( value );
    }, [],
  );

  useEffect(() => {
    if (Object.keys(classroomSelected).length > 0) {
      handleLoadCurrentGlossary(classroomSelected.id)   
    }
  
    return () => {
      if (Object.keys(classroomSelected).length > 0) {
        handleRemoveCurrentGlossary()
      }
    }
  }, [
    classroomSelected, 
    handleLoadCurrentGlossary, 
    handleRemoveCurrentGlossary
  ]);

  if (loading || Object.keys(currentGlossary).length === 0) {
    return (
      <EmptyContentScreen />
    );
  }
  
  if (!currentGlossary.glossary || !currentGlossary.details) {
    return (
      <div className='col-12'>
        <div className='card'>
          <small>No se encontró el Glosario.</small>
        </div>
      </div>
    );
  }

  return (
    <div className='col-12'>
      <div className='card'>
        {
          !showForm
            ? (
              <>
                <div className='col-12'>
                  <div className='center-inside'>
                    <div className='col-6'>
                      <Button 
                        label='Nuevo Término'
                        icon='fas fa-plus'
                        iconPos='left'
                        className='p-button-raised'
                        onClick={() => setShowForm(true)}
                      />
                    </div>
                  </div>
                </div>
                <ToolGlossaryDetailListApp 
                  uid={uid}
                  details={currentGlossary.details}
                  toast={toast}
                />
              </>
            )
            : (
              <>
                <div className='col-12'>
                  <div className='center-inside'>
                    <div className='col-6'>
                      <Button 
                        label='Cancelar Ingreso'
                        icon='fas fa-times'
                        iconPos='left'
                        className='p-button-raised p-button-danger'
                        onClick={() => setShowForm(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <ToolGlossaryFormApp
                    uid={uid}
                    name={name}
                    glossary={currentGlossary.glossary}
                    classroomId={classroomSelected.id}
                    toast={toast}
                    setShowForm={handleSetShowForm}
                  />
                </div>
              </>
            )
        }
      </div>
    </div>
  )
});
