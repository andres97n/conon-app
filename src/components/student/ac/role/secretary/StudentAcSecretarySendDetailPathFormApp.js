import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';

import { 
  startLoadCurrentFeaturedInformationsSecretaryAcByMember, 
  startRemoveFeaturedInformationSecretaryAcList 
} from '../../../../../actions/student/ac_roles/secretaryAc/featuredInformationSecretaryAc';


export const StudentAcSecretarySendDetailPathFormApp = React.memo(({
  acContainer,
  secretaryId,
  memberId,
  errors,
  setFieldValue,
}) => {

  const dispatch = useDispatch();
  const { 
    secretaryFeaturedInformations,
    loadingSecretaryFeaturedInformation
  } = useSelector( state => state.dashboard.secretaryAc );
  const [itemCount, setItemCount] = useState(1);

  const handleLoadFeaturedInformationsFromMember = useCallback(
    ( secretaryId, memberId ) => {
      dispatch( startLoadCurrentFeaturedInformationsSecretaryAcByMember( 
        secretaryId, memberId 
      ));
    }, [dispatch],
  );

  const handleRemoveFeaturedInformationsFromMember = useCallback(
    () => {
      dispatch( startRemoveFeaturedInformationSecretaryAcList() );
    }, [dispatch],
  );

  const handleAddItem = () => {
    setFieldValue('secretaryPaths', [
      ...acContainer,
      { item: '' },
    ]);
    setItemCount(oldState => oldState + 1);
  }

  const handleRemoveItem = ( intervale ) => {
    const newAcContainer = acContainer.filter( 
      (question, index) => index !== intervale);
      setFieldValue('secretaryPaths', [ ...newAcContainer ]);
      setItemCount(oldState => oldState - 1);
  };

  const getErrorMessage = ( errors ) => {
    let error = '';
    errors.forEach( data => {
      if (Object.keys(data).length > 0) {
        error = data.item || data.description;
      }
    });
    return error;
  };

  useEffect(() => {
    if (secretaryId && memberId) {
      handleLoadFeaturedInformationsFromMember( secretaryId, memberId );
    }
  
    return () => {
      handleRemoveFeaturedInformationsFromMember();    
    }
  }, [
    secretaryId, 
    memberId, 
    handleLoadFeaturedInformationsFromMember,
    handleRemoveFeaturedInformationsFromMember
  ]);

  useEffect(() => {
    if (secretaryFeaturedInformations.length > 0) {
      setItemCount(secretaryFeaturedInformations.length + 1);
    }
  }, [secretaryFeaturedInformations]);
  
  if (loadingSecretaryFeaturedInformation) {
    return (
      <EmptyContentScreen />
    );
  }

  return (
    <>
      {
        Object.keys(errors).length > 0 && (
          <div className='col-12'>
            <Message
              severity="error" 
              text={getErrorMessage(errors['secretaryPaths'])} 
            />
          </div>
        )
      }
      {
        acContainer.map( (data, index) => (
          <div className='col-12' key={index}>
            <div className='card'>
              <div className='grid p-fluid'>
                <div className='col-12'>
                  <span className="p-float-label p-input-icon-left mt-3">
                    <i className="fas fa-link" />
                    <InputText
                      id={`secretaryPaths[${index}].item`}
                      name={`secretaryPaths[${index}].item`}
                      value={data.item}
                      disabled={itemCount > 3}
                      className={classNames({ 
                        'p-invalid': (errors['secretaryPaths'] && 
                          errors['secretaryPaths'][index]) &&
                          Object.keys(errors['secretaryPaths'][index]).length > 0 &&
                          errors.secretaryPaths[index].item
                      })} 
                      onChange={(e) => 
                        setFieldValue(`secretaryPaths[${index}].item`, e.target.value)
                      }/>
                    <label htmlFor={`secretaryPaths[${index}].item`}>
                      Ingrese una enlace*
                    </label>
                  </span>
                </div>
                <div className='col-12'>
                  <div className='center-inside'>
                    <div className='col-6'>
                      <Button
                        icon='fas fa-trash'
                        label='Eliminar Pregunta'
                        disabled={acContainer.length === 1}
                        className="p-button-raised p-button-danger" 
                        onClick={() => handleRemoveItem(index)}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <span className="p-float-label mt-3">
                    <InputTextarea
                      id={`secretaryPaths[${index}].description`}
                      name={`secretaryPaths[${index}].description`}
                      value={data.description}
                      required rows={3} cols={20}
                      disabled={itemCount > 3}
                      className={classNames({ 
                        'p-invalid': (errors.secretaryPaths && 
                          errors.secretaryPaths[index]) &&
                          Object.keys(errors.secretaryPaths[index]).length > 0 &&
                          errors.secretaryPaths[index].description
                      })}
                      onChange={(e) => 
                        setFieldValue(`secretaryPaths[${index}].description`, e.target.value)
                      }
                    />
                    <label htmlFor={`secretaryPaths[${index}].description`}>
                      Descripción acerca del enlace*
                    </label>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      <div className='col-12'>
        <div className='center-inside'>
          <Button
            label='Agregar Enlace' 
            icon='fas fa-plus'
            disabled={itemCount >= 3}
            className="p-button-raised p-button-primary " 
            onClick={handleAddItem}
          />
        </div>
      </div>
    </>
  )
});
