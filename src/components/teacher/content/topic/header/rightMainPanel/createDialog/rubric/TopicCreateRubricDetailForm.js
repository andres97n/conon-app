import React from 'react';

import { Accordion, AccordionTab } from 'primereact/accordion';

import { TopicCreateRubricSectionFormApp } from './TopicCreateRubricSectionFormApp';


export const TopicCreateRubricDetailForm = React.memo(({
  values,
  errors,
  setFieldValue
}) => {

  const tabHeader = ( title ) => (
    <React.Fragment>
      <i className="fas fa-tasks mr-2 icon-primary"></i>
      <span>{title}</span>
    </React.Fragment>
  );

  return (
    <>
      <div className='col-12'>
        <Accordion>
          <AccordionTab header={tabHeader('Resolución del Problema')}>
            <TopicCreateRubricSectionFormApp 
              values={values}
              field={'methodology'}
              errors={errors}
              rubricObjects={{
                title: 'methodology_title_detail',
                description: 'methodology_description_detail',
                porcent: 'methodology_porcent_detail',
                value: 'methodology_value_detail'
              }}
              defaultObjects={{
                defaultTitle: 'Resolución del Problema', 
                defaultPorcent: 50
              }}
              setFieldValue={setFieldValue}
            />
          </AccordionTab>
          <AccordionTab header={tabHeader('Desempeño Individual')}>
            <TopicCreateRubricSectionFormApp 
                values={values}
                field={'individual'}
                errors={errors}
                rubricObjects={{
                  title: 'individual_title_detail',
                  description: 'individual_description_detail',
                  porcent: 'individual_porcent_detail',
                  value: 'individual_value_detail'
                }}
                defaultObjects={{
                  defaultTitle: 'Desempeño Individual', 
                  defaultPorcent: 12.5
                }}
                setFieldValue={setFieldValue}
              />
          </AccordionTab>
          <AccordionTab header={tabHeader('Desempeño Colectivo')}>
            <TopicCreateRubricSectionFormApp 
              values={values}
              field={'team'}
              errors={errors}
              rubricObjects={{
                title: 'team_title_detail',
                description: 'team_description_detail',
                porcent: 'team_porcent_detail',
                value: 'team_value_detail'
              }}
              defaultObjects={{
                defaultTitle: 'Desempeño Colectivo', 
                defaultPorcent: 12.5
              }}
              setFieldValue={setFieldValue}
            />
          </AccordionTab>
          <AccordionTab header={tabHeader('Autoevaluación')}>
            <TopicCreateRubricSectionFormApp 
                values={values}
                field={'autoevaluation'}
                errors={errors}
                rubricObjects={{
                  title: 'autoevaluation_title_detail',
                  description: 'autoevaluation_description_detail',
                  porcent: 'autoevaluation_porcent_detail',
                  value: 'autoevaluation_value_detail'
                }}
                defaultObjects={{
                  defaultTitle: 'Autoevaluación', 
                  defaultPorcent: 12.5
                }}
                setFieldValue={setFieldValue}
              />
          </AccordionTab>
          <AccordionTab header={tabHeader('Coevaluación')}>
            <TopicCreateRubricSectionFormApp 
              values={values}
              field={'coevaluation'}
              errors={errors}
              rubricObjects={{
                title: 'coevaluation_title_detail',
                description: 'coevaluation_description_detail',
                porcent: 'coevaluation_porcent_detail',
                value: 'coevaluation_value_detail'
              }}
              defaultObjects={{
                defaultTitle: 'Coevaluación', 
                defaultPorcent: 12.5
              }}
              setFieldValue={setFieldValue}
            />
          </AccordionTab>
        </Accordion>
      </div>
    </>
  )
});
