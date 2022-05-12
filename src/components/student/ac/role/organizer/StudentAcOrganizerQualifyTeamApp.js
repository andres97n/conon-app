import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';
import { useFormik } from 'formik';

import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputTextarea } from 'primereact/inputtextarea';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';

import { 
  startLoadDescribeUnderstadingOrganizerAcByMember, startSaveDescribeUnderstadingOrganizerAc 
} from '../../../../../actions/student/ac_roles/organizerAc/describeUnderstadingOrganizerAc';
import { StudentAcOrganizerQualifyTeamViewApp } from './StudentAcOrganizerQualifyTeamViewApp';


export const StudentAcOrganizerQualifyTeamApp = React.memo(({
  student,
  teamDetailAc,
  toast
}) => {

  const dispatch = useDispatch();
  const {
    organizerDescribeUnderstandingList,
    loadingOrganizerDescribeUnderstanding
  } = useSelector( state => state.dashboard.organizerAc );
  const isMounted = useRef(true);
  const formik = useFormik({
    initialValues: {
      studentRate: 0,
      observations: ''
    },
    validate: (data) => {
      let errors = {};

      if (data.studentRate === 0) {
        errors.studentRate = 'La valoración es requerida.';
      }
      if (!data.observations) {
        errors.observations = 'El campo de observación es requerido.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveStudentObservation( data );
    }
  });

  const { values, errors, setFieldValue, handleChange, handleSubmit } = formik;

  const handleSubmitStudentObservation = ( data ) => {
    const newStudentObservation = {
      team_detail_ac: teamDetailAc.id,
      member_ac: student.id,
      member_assessment: data.studentRate,
      understanding: data.observations,
      active: true
    };
    dispatch( startSaveDescribeUnderstadingOrganizerAc( newStudentObservation, toast ));
  }

  const handleConfirmSaveStudentObservation = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar la siguiente descripción?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitStudentObservation( data ),
    });
  };

  const handleLoadStudentUnderstanding = useCallback(
    ( teamDetailId, memberId ) => {
      dispatch( startLoadDescribeUnderstadingOrganizerAcByMember( teamDetailId, memberId ));
    }, [dispatch],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (
      Object.keys(teamDetailAc).length > 0 &&
      Object.keys(student).length > 0 && 
      isMounted.current
    ) {
      handleLoadStudentUnderstanding( teamDetailAc.id, student.id );
    }
  }, [teamDetailAc, student, handleLoadStudentUnderstanding]);

  if (loadingOrganizerDescribeUnderstanding) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    )
  }

  return (
    <div className='grid p-fluid'>
      {
        organizerDescribeUnderstandingList.length > 0
          ? (
            <StudentAcOrganizerQualifyTeamViewApp 
              currentOrganizerDescribeUnderstanding={organizerDescribeUnderstandingList[0]}
              toast={toast}
            />
          )
          : (
            <>
              <div className='field col-12'>
                <h6 className='text-center'>
                  Valoración del Entendimiento Global sobre el Problema*
                </h6>
                <div className='center-inside'>
                  <Rating 
                    stars={10} 
                    value={values.studentRate}
                    tooltip='Seleccione una estrella para asignar un valor, caso contrario 
                    seleccione el ícono de cancelar para limpiar'
                    tooltipOptions={{position:'bottom'}}
                    onChange={(e) => e.value 
                      ? setFieldValue('studentRate', e.value) 
                      : setFieldValue('studentRate', 0)
                    }
                  />
                </div>
              </div>
              <div className='col-12'>
                <span className="p-float-label">
                  <InputTextarea
                    id='observations'
                    name='observations'
                    required rows={3} cols={20} 
                    value={values.observations}
                    className={classNames({ 'p-invalid': !!errors.observations })}
                    onChange={handleChange}
                  />
                  <label htmlFor='observations'>
                    Describa el entendimiento general de este integrante*
                  </label>
                </span>
              </div>
              {
                Object.keys(errors).length > 0 && (
                  <div className='col-12'>
                    <Message 
                      severity="error" 
                      text={errors[Object.keys(errors)[0]]} 
                    />
                  </div>
                )
              }
              <div className='col-12'>
                <div className='center-inside'>
                  <div className='col-6'>
                    <Button 
                      label='Guardar Observación'
                      icon='fas fa-save'
                      className='p-button-raised'
                      type='submit'
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </>
          )
      }
    </div>
  )
});
