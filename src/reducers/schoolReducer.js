import { combineReducers } from "redux";
// import reduceReducers from 'reduce-reducers';

import { asignatureReducer } from "./admin/school/asignatureReducer";
import { classroomReducer } from "./admin/school/classroomReducer";
import { conversationReducer } from "./admin/school/conversationReducer";
import { glossaryReducer } from "./admin/school/glossaryReducer";
import { topicReducer } from "./admin/topic/topicReducer";
import { studentReducer } from "./admin/user/studentReducer";
import { getInformationStepSevenAbpReducer } from "./student/abp/getInformationStepSevenAbpReducer";
import { learnedConceptStepThreeAbpReducer } from "./student/abp/learnedConceptStepThreeAbpReducer";
import { opinionStepOneAbpReducer } from "./student/abp/opinionStepOneAbpReducer";
import { performActionStepFiveAbpReducer } from "./student/abp/performActionStepFiveAbpReducer";
import { problemDefinitionStepSixAbpReducer } from "./student/abp/problemDefinitionStepSixAbpReducer";
import { problemResolutionStepEightAbpReducer } from "./student/abp/problemResolutionStepEightAbpReducer";
import { questionStepOneAbpReducer } from "./student/abp/questionStepOneAbpReducer";
import { studentIdeaStepTwoAbpReducer } from "./student/abp/studentIdeaStepTwoAbpReducer";
import { unknownConceptStepFourAbpReducer } from "./student/abp/unknownConceptStepFourAbpReducer";
import { topicStudentEvaluationReducer } from "./student/school/topicStudentEvaluationReducer";
import { abpReducer } from "./teacher/abp/abpReducer";
import { evaluationAbpReducer } from "./teacher/abp/evaluationAbpReducer";
import { rubricAbpRuducer } from "./teacher/abp/rubricAbpReducer";
import { teamAbpReducer } from "./teacher/abp/teamAbpReducer";
import { acReducer } from "./teacher/ac/acReducer";
import { evaluationAcReducer } from "./teacher/ac/evaluationAcReducer";
import { rubricAcReducer } from "./teacher/ac/rubricAcReducer";
import { teamAcReducer } from "./teacher/ac/teamAcReducer";
import { activityReducer } from "./teacher/dua/activityReducer";
import { duaReducer } from "./teacher/dua/duaReducer";
import { studentActivityReducer } from "./teacher/dua/studentActivityReducer";
import { answerStepOneAbpReducer } from "./teacher/abp/answerStepOneAbpReducer";
import { adminReducer } from "./admin/user/adminReducer";
import { areaReducer } from "./admin/school/areaReducer";
import { schoolPeriodReducer } from "./admin/school/schoolPeriodReducer";
import { teacherReducer } from "./admin/user/teacherReducer";
import { coordinatorAcReducer } from "./student/ac/coordinatorAcReducer";
import { organizerAcReducer } from "./student/ac/organizerAcReducer";
import { spokesmanAcReducer } from "./student/ac/spokesmanAcReducer";
import { secretaryAcReducer } from "./student/ac/secretaryAcReducer";


export const schoolReducer = combineReducers({
  admin:                      adminReducer,
  area:                       areaReducer,
  school_period:              schoolPeriodReducer,
  teacher:                    teacherReducer,
  topic:                      topicReducer,
  dua:                        duaReducer,
  abp:                        abpReducer,
  ac:                         acReducer,
  activity:                   activityReducer,
  studentActivity:            studentActivityReducer,
  teamAbp:                    teamAbpReducer,
  teamAc:                     teamAcReducer,
  rubricAbp:                  rubricAbpRuducer,
  rubricAc:                   rubricAcReducer,
  evaluationAbp:              evaluationAbpReducer,
  evaluationAc:               evaluationAcReducer,
  questionStepOne:            questionStepOneAbpReducer,
  answerStepOne:              answerStepOneAbpReducer,
  opinionStepOne:             opinionStepOneAbpReducer,
  studentIdeaStepTwo:         studentIdeaStepTwoAbpReducer,
  learnedConceptStepThree:    learnedConceptStepThreeAbpReducer,
  unknownConceptStepFour:     unknownConceptStepFourAbpReducer,
  performActionStepFive:      performActionStepFiveAbpReducer,
  problemDefinitionStepSix:   problemDefinitionStepSixAbpReducer,
  getInformationStepSeven:    getInformationStepSevenAbpReducer,
  problemResolutionStepEight: problemResolutionStepEightAbpReducer,
  coordinatorAc:              coordinatorAcReducer,
  organizerAc:                organizerAcReducer,
  spokesmanAc:                spokesmanAcReducer,
  secretaryAc:                secretaryAcReducer,
  topicStudentEvaluation:     topicStudentEvaluationReducer,
  student:                    studentReducer,
  asignature:                 asignatureReducer,
  classroom:                  classroomReducer,
  glossary:                   glossaryReducer,
  conversation:               conversationReducer,
});