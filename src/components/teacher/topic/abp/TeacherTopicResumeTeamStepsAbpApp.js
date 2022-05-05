import React from 'react';

import { 
  ResumeTeamStepOneAbpApp 
} from '../../../student/abp/abpSteps/stepOne/ResumeTeamStepOneAbpApp';
import { 
  ResumeTeamStepTwoAbpApp 
} from '../../../student/abp/abpSteps/stepTwo/ResumeTeamStepTwoAbpApp';
import { 
  ResumeTeamStepThreeAbpApp 
} from '../../../student/abp/abpSteps/stepThree/ResumeTeamStepThreeAbpApp';
import { 
  ResumeTeamStepFourAbpApp 
} from '../../../student/abp/abpSteps/stepFour/ResumeTeamStepFourAbpApp';
import { 
  ResumeTeamStepFiveAbpApp 
} from '../../../student/abp/abpSteps/stepFive/ResumeTeamStepFiveAbpApp';
import { 
  ResumeTeamStepSixAbpApp 
} from '../../../student/abp/abpSteps/stepSix/ResumeTeamStepSixAbpApp';
import { 
  ResumeTeamStepSevenAbp 
} from '../../../student/abp/abpSteps/stepSeven/ResumeTeamStepSevenAbp';


export const TeacherTopicResumeTeamStepsAbpApp = React.memo(({
  stepTeam,
  teamId
}) => {

  const customHeaderSteps = ( title ) => (
    <React.Fragment>
      <i className="fas fa-brain mr-2" />
      <span>{ title }</span>
    </React.Fragment>
  )

  return (
    <>
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
          stepTeam === 8 && (
            <AccordionTab header={customHeaderSteps("Paso VII")}>
              <ResumeTeamStepSevenAbp
                teamId={teamId}
              />
            </AccordionTab>
          )
        }
      </Accordion>
    </>
  )
});
