import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Messages } from 'primereact/messages';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { QuestionsTeamStepOneApp } from './abpSteps/stepOne/QuestionsTeamStepOneApp';
import { StudentAbpStepOneApp } from './abpSteps/stepOne/StudentAbpStepOneApp';
import { StudentAbpStepTwoAbpApp } from './abpSteps/stepTwo/StudentAbpStepTwoAbpApp';
import { StudentAbpStepThreeAbpApp } from './abpSteps/stepThree/StudentAbpStepThreeAbpApp';
import { StudentStepFourAbpApp } from './abpSteps/stepFour/StudentStepFourAbpApp';
import { StudentStepFiveAbpApp } from './abpSteps/stepFive/StudentStepFiveAbpApp';
import { StudentStepSixAbpApp } from './abpSteps/stepSix/StudentStepSixAbpApp';
import { StudentStepSevenAbpApp } from './abpSteps/stepSeven/StudentStepSevenAbpApp';
import { StudentStepEightAbpApp } from './abpSteps/stepEight/StudentStepEightAbpApp';
import { EmptyTeamStepsDataAbpApp } from './abpSteps/EmptyTeamStepsDataAbpApp';

import { getDeveplomentStepsAbp, getStudentStepsAbpObjects } from '../../../helpers/abp';
import { startNextStepTeamAbp } from '../../../actions/teacher/teamAbp';

export const StudentAbpBodyApp = React.memo(({
    abpId,
    teamDetail,
    questionsStepOneAbp,
    selectedTopic,
    toast
}) => {

    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(null);
    const [stepAbpData, setStepAbpData] = useState({});
    const infoMsg = useRef(null);

    const { home, title, description } = stepAbpData;
    const currentTeamDetail = teamDetail[0] || [];
    const { 
        id = null, 
        is_moderator = null, 
        step = null 
    } = currentTeamDetail;

    const handleStepChange = () => {
        const teamAbp = {
            abp: abpId,
            step: step + 1,
            state: 1
        }
        //Guardar Progreso
        if (activeIndex < 8) {
            setStepAbpData(getStudentStepsAbpObjects(activeIndex + 1));
            setActiveIndex(oldState => oldState + 1);
        }
        infoMsg.current.clear();
        dispatch( startNextStepTeamAbp( teamAbp, id, toast ) );
        scrollTop();
    }

    const confirmNextStepAbp = () => {
        if (activeIndex < 7) {
            confirmDialog({
            message: 'Está seguro de que desea guardar el progreso del equipo y ' +
            'continuar al siguiente paso??',
            header: 'Confirmación de guardado',
            icon: 'fas fa-exclamation-triangle',
            acceptLabel: 'Sí, guardar y continuar',
            rejectLabel: 'No guardar',
            accept: () => handleStepChange(),
            });
        } else {
            confirmDialog({
                message: 'Está seguro de que desea terminar el Tópico ABP y ' +
                'continuar hacia la evaluación??',
                header: 'Confirmación de guardado',
                icon: 'fas fa-exclamation-triangle',
                acceptLabel: 'Sí, guardar y continuar',
                rejectLabel: 'No guardar',
                accept: () => handleStepChange(),
                });
        }
    };

    const handleSetStepAbpData = useCallback(
        ( step ) => {
          if (step >= 0 && step < 8) {
            setStepAbpData(getStudentStepsAbpObjects(step));
            setActiveIndex(step);
          }
        },
        [setStepAbpData, setActiveIndex],
    );

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const saveStepButtonTemplate = (
        <React.Fragment>
            <div className='outer mt-2'>
                <div className='col-4 inner'>
                    <Button
                        label={
                            (activeIndex < 7)
                                ? ('Guardar Progreso y Continuar')
                                : ('Terminar ABP')
                        }
                        icon={
                            <i className="fas fa-arrow-circle-right fa-lg mb-1"></i>
                        }
                        iconPos='top'
                        tooltip={
                            (activeIndex < 7)
                                ? ('Continuar al siguiente paso')
                                : ('Terminar ABP y Envíar')
                        }
                        tooltipOptions={{position: 'bottom'}}
                        className="p-button-raised p-button-success"
                        onClick={confirmNextStepAbp}
                    />
                </div>
            </div>
        </React.Fragment>
    );

    useEffect(() => {
      if (step) {
        handleSetStepAbpData( step - 1);
        // handleSetStep(step - 1);
      }
    }, [step, handleSetStepAbpData]);

    useEffect(() => {
        if ( description && infoMsg.current?.state.messages?.length === 0 ) {
            infoMsg.current.show({
                severity: 'info',
                detail: description || '',
                sticky: true
            });
        }
    }, [description]);

  return (
    <div className='card'>
        <div className='grid p-fluid'>
            <div className='col-12'>
                {
                    (is_moderator && activeIndex <= 4)
                        && (
                            <QuestionsTeamStepOneApp
                                teamId={id}
                                questionsStepOneAbp={questionsStepOneAbp}
                                toast={toast}
                            />
                        )
                }
            </div>
            <div className='col-12'>
                <h4 className='text-center'>
                    <i className="fas fa-walking mr-2" />
                    {home}
                </h4>
                <h5 className='text-center'>
                    {title}
                </h5>
            </div>
            <div className='col-12'>
                <Messages
                    ref={infoMsg}
                    className='align-justify'
                />
            </div>
            {
                (activeIndex === 0)
                    ? (
                        <StudentAbpStepOneApp
                            teamDetail={currentTeamDetail}
                            toast={toast}
                        />
                    )
                    : (activeIndex === 1)
                      ? (
                        <StudentAbpStepTwoAbpApp
                            teamDetail={currentTeamDetail}
                            toast={toast}
                        />
                      )
                      : (activeIndex === 2)
                        ? (
                            <StudentAbpStepThreeAbpApp
                                is_moderator={is_moderator}
                                teamDetail={currentTeamDetail}
                                toast={toast}
                            />
                        )
                        : (activeIndex === 3)
                            ? (
                                <StudentStepFourAbpApp 
                                    is_moderator={is_moderator}
                                    teamDetail={currentTeamDetail}
                                    toast={toast}
                                />
                            )
                            : (activeIndex === 4)
                                ? (
                                    <StudentStepFiveAbpApp 
                                        teamDetail={currentTeamDetail}
                                        toast={toast}
                                    />
                                )
                                : (activeIndex === 5)
                                    ? (
                                        <StudentStepSixAbpApp 
                                            teamDetail={currentTeamDetail}
                                            isModerator={is_moderator}
                                            toast={toast}
                                        />
                                    )
                                    : (activeIndex === 6)
                                        ? (
                                            <StudentStepSevenAbpApp 
                                                teamDetail={currentTeamDetail}
                                                selectedTopic={selectedTopic}
                                                isModerator={is_moderator}
                                                toast={toast}
                                            />
                                        )
                                        : (activeIndex === 7)
                                            ? (
                                                <StudentStepEightAbpApp 
                                                    teamDetail={currentTeamDetail}
                                                    selectedTopic={selectedTopic}
                                                    isModerator={is_moderator}
                                                    toast={toast}
                                                />
                                            )
                                            : (
                                                <EmptyTeamStepsDataAbpApp />
                                            )
            }
            {
                (is_moderator)
                    && (saveStepButtonTemplate)
            }
            <div className='col-12 mt-4'>
                <Steps
                    model={getDeveplomentStepsAbp()}
                    activeIndex={activeIndex}
                    onSelect={(e) => setActiveIndex(e.index)}
                    readOnly={true}
                />
            </div>
        </div>
    </div>
  )
});
