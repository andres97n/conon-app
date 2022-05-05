import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { getMethodologyNameType } from '../../helpers/topic';
import { changeObjectFullDate } from '../../helpers/topic/student/ac/acCoordinator';


export const TopicStudentInfoApp = React.memo(({
    selectedTopic,
    backStudentTopicList
}) => {

    const { 
        classroom, 
        owner, 
        asignature,
        description,
        objective,
        start_at,
        end_at,
        type
    } = selectedTopic;
    const { currentTeam, loadingTeamAbp } = useSelector(state => state.dashboard.teamAbp);
    const [accordationState, setAccordationState] = useState([]);
    const toast = useRef(null);

    const headerAccordationTemplate = ( title ) => (
        <React.Fragment>
            <i className="fas fa-question-circle mr-2" />
            <span>{title}</span>
        </React.Fragment>
    );

    const cardBodyTemplate = (
        <React.Fragment>
            <div className='grid p-fluid mt-1'>
                <div className='col-4'>
                    <div className='card'>
                        <h5 className='text-center'>
                            <i className="fas fa-chalkboard mr-2" />
                            {classroom.name}
                        </h5>
                        <p className='text-center'>Aula</p>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card'>
                        <h5 className='text-center'>
                            <i className="fas fa-book-open mr-2" />
                            {asignature.name}
                        </h5>
                        <p className='text-center'>Asignatura</p>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card'>
                        <h5 className='text-center'>
                            <i className="fas fa-chalkboard-teacher mr-2" />
                            {owner.name}
                        </h5>
                        <p className='text-center'>Docente</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

    useEffect(() => {
      if (!loadingTeamAbp && currentTeam.length > 0) {
        if (currentTeam[0].step === 1) {
            setAccordationState([0, 1, 2]);
        }
      }
    }, [loadingTeamAbp, currentTeam])
    

    useEffect(() => {
        if (type === 2 && toast.current?.state.messages?.length === 0) {
            toast.current.show({ 
                severity: 'info', 
                detail: 'Recuerde que en ABP el moderador es el que permite continuar ' +
                'con el proceso del equipo.', 
                life: 7000 
            });
        }
    }, [type]);

  return (
    <>
        <div className='card'>
            <div className='grid p-fluid mb-2'>
                <div className='col-2'>
                    <Button
                        label="Regresar" 
                        icon="fas fa-arrow-left" 
                        className="p-button-text p-button-prumary mr-2"
                        tooltip='Si desea regresar asegúrese de guardar los cambios.' 
                        tooltipOptions={{position:'right'}}
                        onClick={backStudentTopicList} 
                    />
                </div>
                <div className='col-8'>
                    <h4 className='text-center'>
                        <i className="fas fa-info-circle mr-2" />
                        Acerca del Tópico
                    </h4>
                    <h6 className='text-center'>
                        <i className="fas fa-file-alt mr-2" />
                        {type && getMethodologyNameType(type)}
                    </h6>
                </div>
            </div>
            {
                (type === 2)
                    && (
                        <Toast ref={toast} />
                    )
            }
            <Accordion 
                multiple
                activeIndex={accordationState}
                onTabChange={e => setAccordationState(e.index)}
            >
                <AccordionTab 
                    headerTemplate={
                        () => headerAccordationTemplate("Información Institucional")
                    }
                >
                    <h5 className='text-center'>
                        <i className="fas fa-laptop-house mr-2" />
                        Fue generado por ...
                    </h5>
                    {cardBodyTemplate}
                </AccordionTab>
                <AccordionTab 
                    headerTemplate={
                        () => headerAccordationTemplate("Descripción")
                    }
                >
                    <div className='card mt-2'>
                        <div className='grid p-fluid'>
                            <div className='col-12'>
                                <h5>
                                    <i className="fas fa-binoculars mr-2" />
                                    Se describe como ...
                                </h5>
                            </div>
                            <div className='col-12'>
                                <p style={{textAlign: 'justify'}}>{description}</p>
                            </div>
                        </div>
                    </div>
                </AccordionTab>
                <AccordionTab 
                    headerTemplate={
                        () => headerAccordationTemplate("Objetivo")
                    }
                >
                    <div className='card mt-2'>
                        <div className='grid p-fluid'>
                            <div className='col-12'>
                                <h5>
                                    <i className="fas fa-bullseye mr-2" />
                                    Su objetivo es ...
                                </h5>
                            </div>
                            <div className='col-12'>
                                <p>{objective}</p>
                            </div>
                        </div>
                    </div>
                </AccordionTab>
                <AccordionTab 
                    headerTemplate={
                        () => headerAccordationTemplate("Apertura y Cierre")
                    }
                >
                    <div className='grid p-fluid mt-1'>
                        <div className='col-6'>
                            <div className='card'>
                                <h5>
                                    <i className="fas fa-hourglass-start mr-2" />
                                    Empezó el ...
                                </h5>
                                <h5 className='text-end'>
                                    <i className="fas fa-calendar-day mr-2 icon-primary"/>
                                    {changeObjectFullDate(start_at)}
                                    <i className="fas fa-clock ml-2 mr-2 icon-primary"/>
                                </h5>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='card'>
                                <h5 className='text-end'>
                                    <i className="fas fa-hourglass-end mr-2" />
                                    Termina el ...
                                </h5>
                                <h5 className='text-start'>
                                    <i className="fas fa-calendar-alt mr-2 icon-primary" />
                                    {changeObjectFullDate(end_at)}
                                    <i className="fas fa-clock ml-2 mr-2 icon-primary" />
                                </h5>
                            </div>
                        </div>
                    </div>
                </AccordionTab>
            </Accordion>
        </div>
    </>
  );
});
