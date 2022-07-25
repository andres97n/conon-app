import React, { useCallback, useEffect, useRef } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { Button } from 'primereact/button';

import { 
  StudentAcSecretarySendDetailPathFormApp 
} from './StudentAcSecretarySendDetailPathFormApp';

import { getIconRole } from '../../../../../helpers/topic/table/topicTable';
import { isValidHttpUrl } from '../../../../../helpers/abp-steps';
import { 
  startSaveFeaturedInformationSecretaryAc 
} from '../../../../../actions/student/ac_roles/secretaryAc/featuredInformationSecretaryAc';


export const StudentAcSecretarySendInfoDetailApp = React.memo(({
  student,
  teamDetailAc,
  toast
}) => {

  const dispatch = useDispatch();
  const isMounted = useRef(true);
  const formik = useFormik({
    initialValues: {
      secretaryPaths: [{ item: '', description: '' }]
    },
    validate: (data) => {
      let errors = {};
      let forms = [];
      if (data.secretaryPaths) {
        const dataValid = data.secretaryPaths.filter( 
          data => !data.item || !isValidHttpUrl(data.item) || !data.description 
        );
        if (dataValid.length > 0) {
          data.secretaryPaths.forEach( (data, index) => {
            let itemError = {};
            if (!data.item) {
              itemError.item = `El campo ${index + 1} es requerido.`;
            } else if (data.item && !isValidHttpUrl(data.item)) {
              itemError.item = `El enlace del campo ${index + 1} no es válido.`;
            }
            if (!data.description) {
              itemError.description = `La descripción #${index + 1} es requerida.`;
            }
            forms = [ ...forms, itemError ];
          });
        }
      }
      if (forms.length > 0) {
        errors.secretaryPaths = forms;
      }
      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveSecretaryPaths( data );
    }
  });

  const { values, errors, handleReset, setFieldValue, handleSubmit } = formik;

  const handleSubmitSecretaryPaths = ( data ) => {
    const secretaryPaths = data.secretaryPaths.map( path => ({
      team_detail_ac: teamDetailAc.id,
      member_ac: student.id,
      external_path: path.item,
      description_path: path.description
    }));
    dispatch( startSaveFeaturedInformationSecretaryAc( secretaryPaths, toast ));
    handleReset();
  }

  const handleConfirmSaveSecretaryPaths = ( data ) => {
    const onePath = 'el siguiente enlace';
    const manyPaths = 'los siguientes enlaces'
    confirmDialog({
      message: `¿Está seguro de guardar ${
        data.secretaryPaths.length === 1 ? onePath : manyPaths 
      }?`,
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitSecretaryPaths( data ),
    });
  };

  const handleSetFieldValue = useCallback(
    ( field, value ) => {
      setFieldValue( field, value );
    }, [setFieldValue],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className={`${getIconRole(student.role_type)} icon-primary`} />
          {student.owner.name}
        </h5>
      </div>
      {
        isMounted.current && (
          <div className='col-12'>
            <div className='center-inside'>
              <div className='col-6'>
                <Button
                  icon='fas fa-save'
                  label={
                    values.secretaryPaths.length > 1 
                      ? 'Envíar Enlaces' 
                      : 'Envíar Enlace'
                  }
                  type='submit'
                  className="p-button-raised" 
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        )
      }
      <StudentAcSecretarySendDetailPathFormApp 
        acContainer={values.secretaryPaths}
        errors={errors}
        secretaryId={teamDetailAc?.id} 
        memberId={student?.id} 
        setFieldValue={handleSetFieldValue}
      />
    </div>
  )
});
