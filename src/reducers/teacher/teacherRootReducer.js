import { combineReducers } from "redux";

import { asignatureReducer } from "../admin/school/asignatureReducer";
import { classroomReducer } from "../admin/school/classroomReducer";
import { conversationReducer } from "../admin/school/conversationReducer";
import { glossaryReducer } from "../admin/school/glossaryReducer";
import { topicReducer } from "../admin/topic/topicReducer";
import { studentReducer } from "../admin/user/studentReducer";
import { abpReducer } from "./abp/abpReducer";
import { evaluationAbpReducer } from "./abp/evaluationAbpReducer";
import { rubricAbpRuducer } from "./abp/rubricAbpReducer";
import { teamAbpReducer } from "./abp/teamAbpReducer";
import { acReducer } from "./ac/acReducer";
import { rubricAcReducer } from "./ac/rubricAcReducer";
import { teamAcReducer } from "./ac/teamAcReducer";
import { activityReducer } from "./dua/activityReducer";
import { duaReducer } from "./dua/duaReducer";
import { studentActivityReducer } from "./dua/studentActivityReducer";
import { evaluationAcReducer } from "./ac/evaluationAcReducer";
import { questionStepOneAbpReducer } from "../student/abp/questionStepOneAbpReducer";

export const teacherRootReducer = combineReducers({
    topic:               topicReducer,
    dua:                 duaReducer,
    abp:                 abpReducer,
    ac:                  acReducer,
    activity:            activityReducer,
    studentActivity:     studentActivityReducer,
    teamAbp:             teamAbpReducer,
    teamAc:              teamAcReducer,
    rubricAbp:           rubricAbpRuducer,
    rubricAc:            rubricAcReducer,
    evaluationAbp:       evaluationAbpReducer,
    evaluationAc:        evaluationAcReducer,
    student:             studentReducer,
    asignature:          asignatureReducer,
    classroom:           classroomReducer,
    glossary:            glossaryReducer,
    conversation:        conversationReducer,
    questionStepOneAbp:  questionStepOneAbpReducer,
});


// export const teacherRootReducer = reduceReducers(
//     topicReducer,
//     duaReducer,
//     abpReducer,
//     acReducer,
//     activityReducer,
//     studentActivityReducer,
//     teamAbpReducer,
//     teamAcReducer,
//     rubricAbpRuducer,
//     rubricAcReducer,
//     evaluationAbpReducer,
//     studentReducer,
//     asignatureReducer,
//     classroomReducer,
//     glossaryReducer,
//     conversationReducer
// );