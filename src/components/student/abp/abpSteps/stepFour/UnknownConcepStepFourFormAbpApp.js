import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { confirmDialog } from 'primereact/confirmdialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { startSaveUnknownConceptStepFourAbp } from '../../../../../actions/student/abp_steps/unknownConceptStepFourAbp';

export const UnknownConcepStepFourFormAbpApp = React.memo(({
  teamId,
  conceptsSize,
  toast
}) => {
  
  const dispatch = useDispatch();
  const infoMsg = useRef(null);
  const formik = useFormik({
    initialValues: {
      concepts: [{
        concept: ''
      }]
    },
    validate: (data) => {
      let errors = {}
      let concepts = [];
      let isValid = true;
      
      data.concepts.forEach( (data, index) => {
        let errorConcept = {};

        if (!data.concept) {
          errorConcept.concept = `El concepto ${conceptsSize + index + 1} es requerido.`;  
        }
        concepts = [ ...concepts, errorConcept ];
      });

      concepts.forEach( error => {
        if (Object.keys(error).length > 0) {
          isValid = false;
        }
      });
      if (!isValid) {
        errors.concepts = concepts;
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveUnknownConcepts( data );
    }
  });

  const { values, errors, setValues, resetForm, handleChange, handleSubmit } = formik;

  const handleSubmitUnknownConcept = ( data ) => {
    let newConcepts;
    if (data.concepts.length === 1) {
      newConcepts = {
        team_abp: teamId,
        unknown_concept: data.concepts[0].concept,
        active: true
      };
    } else {
      newConcepts = data.concepts.map( data => ({
        team_abp: teamId,
        unknown_concept: data.concept,
        active: true
      }));
    }
    console.log(newConcepts);
    resetForm();
    dispatch( startSaveUnknownConceptStepFourAbp( newConcepts, toast ) );
  }

  const handleSetNewConcept = () => {
    setValues({
      concepts: [ 
        ...values.concepts, 
        {
          concept: ''
        } 
      ]
    });
  }

  const handleRemoveConcept = ( position ) => {
    setValues({
      concepts: values.concepts.filter( (data, index) => index !== position )
    });
  }

  const handleConfirmSaveUnknownConcepts = ( data ) => {
    const oneConcept = 'el siguiente concepto';
    const manyConcepts = 'los siguientes conceptos';
    confirmDialog({
        message: `Está seguro que desea guardar ${
        values.concepts.length === 1 ? oneConcept : manyConcepts 
        }?`,
        header: 'Confirmación de guardado',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, guardar',
        rejectLabel: 'No guardar',
        accept: () => handleSubmitUnknownConcept( data ),
    });
  }

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
        infoMsg.current.show({
          severity: 'warn',
          detail: 'Solo el moderador puede ingresar los conceptos que el equipo desconoce, ' +
          'asegúrese que participen todos; puede ingresar un máximo de 10 conceptos.',
          sticky: true
        });
    }
  }, []);

  return (
    <div className='card'>
      <div className='grid p-fluid'>
        <div className='col-10'>
          <h5>
            <i className="fas fa-lightbulb mr-2" />
            Estos son los conceptos que el equipo desconoce...
          </h5>
        </div>
        <div className='col-2'>
          <Button 
            icon="fas fa-plus"
            label='Nuevo Concepto'
            className='p-button-raised p-button-success mr-4'
            onClick={handleSetNewConcept}
          />
        </div>
        <div className='col-12'>
          <Messages
            ref={infoMsg}
            className='align-justify'
          />
        </div>
        {
          values.concepts.map( (data, index) => (
            <div className='col-12 mt-2' key={index}>
              <div className='grid p-fluid'>
                <div className='col-11'>
                  <div className='card'>
                    <span className="p-float-label mt-3">
                      <InputTextarea 
                        id={`concepts[${index}].concept`}
                        name={`concepts[${index}].concept`}
                        value={data.concept} 
                        className={classNames(
                          { 
                            'p-invalid': 
                            errors.concepts && errors.concepts[index]?.concept
                          }
                        )}
                        onChange={handleChange} 
                      />
                      <label 
                        htmlFor={`concepts[${index}].concept`}
                      >
                        {`Concepto ${conceptsSize + 1 + index}*`}
                      </label>
                    </span>
                    {
                      ( errors.concepts && errors.concepts[index]?.concept )
                        && (
                          <small className="p-error mt-1">
                            {errors.concepts[index].concept}
                          </small>
                        )
                    }
                  </div>
                </div>
                <div className='col-1'>
                  <div className='center-inside'>
                    <Button 
                      icon="fas fa-trash"
                      tooltip='Eliminar Concepto'
                      tooltipOptions={{position: 'bottom'}}
                      disabled={values.concepts.length === 1}
                      className='p-button-raised p-button-danger'
                      onClick={() => handleRemoveConcept( index )}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        }
        <div className='col-9'></div>
        <div className='col-3'>
          <Button 
            icon="fas fa-save"
            label={
              values.concepts.length === 1
                ? ('Guardar Concepto')
                : ('Guardar Conceptos')
            }
            type='submit'
            disabled={conceptsSize + values.concepts.length > 10}
            className='p-button-raised mr-4'
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
});
