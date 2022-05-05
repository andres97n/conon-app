import { combineReducers } from 'redux';

import { adminReducer } from './user/adminReducer';
import { studentReducer } from './user/studentReducer';
import { teacherReducer } from './user/teacherReducer';
import { areaReducer } from './school/areaReducer';
import { asignatureReducer } from './school/asignatureReducer';
import { schoolPeriodReducer } from './school/schoolPeriodReducer';
import { classroomReducer } from './school/classroomReducer';
import { topicReducer } from './topic/topicReducer';
import { glossaryReducer } from './school/glossaryReducer';

export const adminRootReducer = combineReducers({
    admin:         adminReducer,
    area:          areaReducer,
    asignature:    asignatureReducer,
    classroom:     classroomReducer,
    glossary:      glossaryReducer,
    school_period: schoolPeriodReducer,
    student:       studentReducer,
    teacher:       teacherReducer,
    topic:         topicReducer,
});