import React from 'react';

import { Accordion, AccordionTab } from 'primereact/accordion';

import { ResumeTeamStepOneAbpApp } from './stepOne/ResumeTeamStepOneAbpApp';
import { ResumeTeamStepTwoAbpApp } from './stepTwo/ResumeTeamStepTwoAbpApp';
import { ResumeTeamStepThreeAbpApp } from './stepThree/ResumeTeamStepThreeAbpApp';
import { ResumeTeamStepFourAbpApp } from './stepFour/ResumeTeamStepFourAbpApp';
import { ResumeTeamStepFiveAbpApp } from './stepFive/ResumeTeamStepFiveAbpApp';
import { ResumeTeamStepSixAbpApp } from './stepSix/ResumeTeamStepSixAbpApp';
import { ResumeTeamStepSevenAbp } from './stepSeven/ResumeTeamStepSevenAbp';
import { ResumeTeamStepEightAbpApp } from './stepEight/ResumeTeamStepEightAbpApp';


export const ResumeTeamStepsAbpApp = React.memo(({
  stepTeam,
  teamId
}) => {

  const customHeaderSteps = ( title ) => (
    <React.Fragment>
      <i className="fas fa-brain mr-2" />
      <span>{ title }</span>
    </React.Fragment>
  );

  return (
    <div className='card'>
      <div className='grid p-fluid'>
        <div className='col-12'>
          <h4 className='text-center'>
            <i className="text-center fas fa-shoe-prints icon-primary" />
            <i className="text-center fas fa-shoe-prints icon-primary" />
          </h4>
          <h5 className='text-center'>
            Esto realizó el equipo en {
              stepTeam === 2 
                ? ('el paso anterior') 
                : ('los pasos anteriores')
            }...
          </h5>
        </div>
        <div className='col-12'>
          <Accordion>
            {
              stepTeam >= 2 && (
                <AccordionTab header={customHeaderSteps("Paso I")}>
                  <ResumeTeamStepOneAbpApp 
                    teamId={teamId}
                  />
                </AccordionTab>
              )
            }
            {
              stepTeam >= 3 && (
                <AccordionTab header={customHeaderSteps("Paso II")}>
                  <ResumeTeamStepTwoAbpApp 
                    teamId={teamId}
                  />
                </AccordionTab>
              )
            }
            {
              stepTeam >= 4 && (
                <AccordionTab header={customHeaderSteps("Paso III")}>
                  <ResumeTeamStepThreeAbpApp 
                    teamId={teamId}
                  />
                </AccordionTab>
              )
            }
            {
              stepTeam >= 5 && (
                <AccordionTab header={customHeaderSteps("Paso IV")}>
                  <ResumeTeamStepFourAbpApp 
                    teamId={teamId}
                  />
                </AccordionTab>
              )
            }
            {
              stepTeam >= 6 && (
                <AccordionTab header={customHeaderSteps("Paso V")}>
                  <ResumeTeamStepFiveAbpApp 
                    teamId={teamId}
                  />
                </AccordionTab>
              )
            }
            {
              stepTeam >= 7 && (
                <AccordionTab header={customHeaderSteps("Paso VI")}>
                  <ResumeTeamStepSixAbpApp 
                    teamId={teamId}
                  />
                </AccordionTab>
              )
            }
            {
              stepTeam >= 8 && (
                <AccordionTab header={customHeaderSteps("Paso VII")}>
                  <ResumeTeamStepSevenAbp 
                    teamId={teamId}
                  />
                </AccordionTab>
              )
            }
            {
              stepTeam >= 9 && (
                <AccordionTab header={customHeaderSteps("Paso VIII")}>
                  <ResumeTeamStepEightAbpApp
                    teamId={teamId}
                  />
                </AccordionTab>
              )
            }
          </Accordion>
        </div>
      </div>
    </div>
  )
});
