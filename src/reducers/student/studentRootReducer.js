import { combineReducers } from "redux";

import { topicReducer } from "../admin/topic/topicReducer";
import { glossaryReducer } from "../admin/school/glossaryReducer";
import { duaReducer } from "../teacher/dua/duaReducer";
import { activityReducer } from "../teacher/dua/activityReducer";
import { studentActivityReducer } from "../teacher/dua/studentActivityReducer";
import { abpReducer } from "../teacher/abp/abpReducer";
import { teamAbpReducer } from "../teacher/abp/teamAbpReducer";
import { rubricAbpRuducer } from "../teacher/abp/rubricAbpReducer";
import { evaluationAbpReducer } from "../teacher/abp/evaluationAbpReducer";
import { opinionStepOneAbpReducer } from "./abp/opinionStepOneAbpReducer";
import { questionStepOneAbpReducer } from "./abp/questionStepOneAbpReducer";
import { studentIdeaStepTwoAbpReducer } from "./abp/studentIdeaStepTwoAbpReducer";
import { learnedConceptStepThreeAbpReducer } from "./abp/learnedConceptStepThreeAbpReducer";
import { unknownConceptStepFourAbpReducer } from "./abp/unknownConceptStepFourAbpReducer";
import { performActionStepFiveAbpReducer } from "./abp/performActionStepFiveAbpReducer";
import { problemDefinitionStepSixAbpReducer } from "./abp/problemDefinitionStepSixAbpReducer";
import { getInformationStepSevenAbpReducer } from "./abp/getInformationStepSevenAbpReducer";
import { 
    problemResolutionStepEightAbpReducer 
} from "./abp/problemResolutionStepEightAbpReducer";
import { topicStudentEvaluationReducer } from "./school/topicStudentEvaluationReducer";
import { teamAcReducer } from "../teacher/ac/teamAcReducer";
import { acReducer } from "../teacher/ac/acReducer";
import { rubricAcReducer } from "../teacher/ac/rubricAcReducer";


export const studentRootReducer = combineReducers({
    topic:                      topicReducer,
    dua:                        duaReducer,
    activity:                   activityReducer,
    studentActivity:            studentActivityReducer,
    abp:                        abpReducer,
    teamAbp:                    teamAbpReducer,
    rubricAbp:                  rubricAbpRuducer,
    questionStepOne:            questionStepOneAbpReducer,
    opinionStepOne:             opinionStepOneAbpReducer,
    studentIdeaStepTwo:         studentIdeaStepTwoAbpReducer,
    learnedConceptStepThree:    learnedConceptStepThreeAbpReducer,
    unknownConceptStepFour:     unknownConceptStepFourAbpReducer,
    performActionStepFive:      performActionStepFiveAbpReducer,
    problemDefinitionStepSix:   problemDefinitionStepSixAbpReducer,
    getInformationStepSeven:    getInformationStepSevenAbpReducer,
    problemResolutionStepEight: problemResolutionStepEightAbpReducer,
    evaluationAbp:              evaluationAbpReducer,
    topicStudentEvaluation:     topicStudentEvaluationReducer,
    glossary:                   glossaryReducer,
    ac:                         acReducer,
    teamAc:                     teamAcReducer,
    rubricAc:                   rubricAcReducer,
});