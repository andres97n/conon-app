import moment from "moment";

import { getGenderLabel, getIdentificationTypeLabel } from "./person";


export const getStudentData = ( data, keys ) => {

    const student = {
        id: keys.student_id,
        person: {
            id: keys.person_id, 
            identification_type: getIdentificationTypeLabel(data.identification_type),
            identification: data.identification,
            name: data.name,
            last_name: data.last_name,
            gender: getGenderLabel(data.gender),
            age: data.age,
            phone: data.phone
        },
        user: {
            id: keys.user_id,
            username: data.username,
            email: data.email,
        },
        representative_name: data.representative_name,
        emergency_contact: data.emergency_contact,
        expectations: {},
        observations: data.observations || 'S/N'
    }

    return student

}

export const getTeacherData = ( data, keys ) => {
    
    return {
        id: keys.teacher_id,
        person: {
            id: keys.person_id, 
            identification_type: getIdentificationTypeLabel(data.identification_type),
            identification: data.identification,
            name: data.name,
            last_name: data.last_name,
            gender: getGenderLabel(data.gender),
            age: data.age,
            phone: data.phone
        },
        user: {
            id: keys.user_id,
            username: data.username,
            email: data.email,
        },
        title: data.title,
        objective: data.objective || 'S/N'
    }

}

export const getAreaData = ( data, area_id ) => {

    return {
        id: area_id,
        name: data.name,
        coordinator: data.coordinator,
        sub_coordinator: data.sub_coordinator,
        type: getAreaTypeLabel(data.type),
        objective: data.objective,
        observations: data.observations || 'S/N',
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }

}

export const getAsignatureData = ( data, asignature_id ) => {

    return {
        id: asignature_id,
        name: data.name,
        objective: data.objective,
        knowledge_area: data.knowledge_area,
        observations: data.observations || 'S/N',
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }

}

export const getAsignatureDetailData = ( data, asignature_detail_id ) => {
    return {
        id: asignature_detail_id,
        classroom: {
            id: data.classroom.id,
            name: data.classroom.name
        },
        teacher: {
            id: data.teacher.id,
            name: data.teacher.name
        },
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getSchoolPeriodData = ( data, school_period_id ) => {
    return {
        id: school_period_id,
        name: data.name,
        init_date: getDate(data.init_date, 'DD-MM-YYYY'),
        end_date: getDate(data.end_date, 'DD-MM-YYYY'),
        school_end_date: getDate(data.school_end_date, 'DD-MM-YYYY'),
        state: 'Abierto',
        observations: data.observations || 'S/N',
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }

}

export const getClassroomData = ( data, classroom_id ) => {
    return {
        id: classroom_id,
        name: data.name,
        school_period: data.school_period,
        curse_level: getDropdownValue(curse_level_choices, data.curse_level, true),
        capacity: data.capacity,
        created_at: data.created_at || moment().format('DD-MM-YYYY'),
    }
}

export const getTopicData = ( data, topic_id ) => {
    return {
        id: topic_id,
        title: data.title,
        description: data.description,
        objective: data.objective,
        type: data.type,
        start_at: data.start_at,
        end_at: data.end_at,
        active: data.active,
        observations: data.observations,
        owner: {
            id: data.owner.id,
            name: data.owner.name
        },
        created_at: data.created_at
    }
} 

export const getGlossaryData = ( data, glossary_id) => {

    if ( data.state === 1 ) {
        data.state = 'Abierto';
    } else {
        data.state = 'Cerrado';
    }

    return {
        id: glossary_id,
        asignature_classroom: {
            id: data.asignature_classroom.id,
            classroom: {
                id: data.asignature_classroom.classroom.id,
                name: data.asignature_classroom.classroom.name
            },
            asignature: {
                id: data.asignature_classroom.asignature.id,
                name: data.asignature_classroom.asignature.name
            },
            teacher: {
                id: data.asignature_classroom.teacher.id,
                name: data.asignature_classroom.teacher.name
            }
        },
        state: data.state,
        observations: data.observations,
        created_at: data.created_at
    }
}

export const getGlossaryDetailData = ( data, glossary_detail_id) => {

    if ( data.state === 1 ) {
        data.state = 'Abierto';
    } else {
        data.state = 'Cerrado';
    }

    return {
        id: glossary_detail_id,
        title: data.title,
        description: data.description,
        image: data.image,
        url: data.url,
        state: data.state,
        observation: data.observation,
        created_at: data.created_at,
        updated_at: data.updated_at
    }
}

export const getError = ( detail, errorFunction ) => {
    if ( detail ) {
        if (typeof detail === 'string') {
            return detail;
        } else if (typeof detail === 'object'){
            return errorFunction(detail);
        }
    } else {
        return null;
    }
    
}

export const verifySaveTeacher = ( teacher_keys ) => {
    if ( !teacher_keys.teacher_id ) {
        if ( teacher_keys.person_id ) {
            
        }
    } else {
        
    }
}

export const getStudentErrorMessage = ( detail ) => {

    if ( detail.person ) {
        return detail.person[0]
    } else if ( detail.representative_name ) {
        return detail.representative_name[0]
    } else if ( detail.expectations ) {
        return detail.expectations[0]
    } else if ( detail.emergency_contact ) {
        return detail.emergency_contact[0]
    } else if ( detail.observations ) {
        return detail.observations[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }

}

export const getTeacherErrorMessage = ( detail ) => {
    if ( detail.person ) {
        return detail.person[0]
    } else if ( detail.title ) {
        return detail.title[0]
    } else if ( detail.objective ) {
        return detail.objective[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getStudentsKeys = ( data ) => {

    let students = [] 
    let persons = [] 
    let users = []

    data.forEach( value => {
        if ( value.id ) {
            students.push(value.id);
            if ( value.person ) {
                persons.push(value.person.id);
                if ( value.user ) {
                    users.push(value.user.id)
                }
            }
        }
    });

    return {
        students: students,
        persons: persons,
        users: users
    }

}

export const getTeachersKeys = ( data ) => {

    let teachers = [] 
    let persons = [] 
    let users = []

    data.forEach( value => {
        if ( value.id ) {
            teachers.push(value.id);
            if ( value.person ) {
                persons.push(value.person.id);
                if ( value.user ) {
                    users.push(value.user.id)
                }
            }
        }
    });

    return {
        teachers: teachers,
        persons: persons,
        users: users
    }

}

export const validateSaveSchoolPeriod = ( school_periods ) => {

    let school_period;

    school_periods.forEach( data => {
        if ( data.state === 'Abierto' ) {
            school_period = data
        }
    });
    
    if ( school_period ) {
        return false;
    } else {
        return true;
    }
}

export const toCapitalize = ( word ) => {

    const arr = word.split(" ");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > 2) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
    
    }
    return arr.join(" ");

}

export const setNewDate = ( data ) => {

    return data.forEach( conon_object => {
        moment(conon_object.created_at).format("MM-DD-YYYY");
    });

}

export const getAreaErrorMessage = ( detail ) => {
    
    if ( detail.name ) {
        return detail.name[0]
    } else if ( detail.coordinator ) {
        return detail.coordinator[0]
    } else if ( detail.sub_coordinator ) {
        return detail.sub_coordinator[0]
    } else if ( detail.type ) {
        return detail.type[0]
    } else if ( detail.objective ) {
        return detail.objective[0]
    } else if ( detail.teachers ) {
        return detail.teachers[0] 
    } else {
        return 'Error, consulte con el Desarrollador.';
    }

}

export const getAsignatureErrorMessage = ( detail ) => {

    if ( detail.name ) {
        return detail.name[0];
    } else if ( detail.knowledge_area ) {
        return detail.knowledge_area[0];
    } else if ( detail.objective ) {
        return detail.objective[0];
    } else {
        return 'Error, consulte con el Desarrollador.';
    }

}

export const getAsignatureDetailErrorMessage = ( detail ) => {

    if ( detail.classroom ) {
        return detail.classroom[0];
    } else if ( detail.asignature ) {
        return detail.asignature[0];
    } else if ( detail.teacher ) {
        return detail.teacher[0];
    } else {
        return 'Error, consulte con el Desarrollador.';
    }

}

export const getSchoolPeriodErrorMessage = ( detail ) => {

    if ( detail.name ) {
        return detail.name[0];
    } else if ( detail.init_date ) {
        return detail.init_date[0];
    } else if ( detail.end_date ) {
        return detail.end_date[0];
    } else if ( detail.school_end_date ) {
        return detail.school_end_date[0];
    } else if ( detail.state ) {
        return detail.state[0];
    } else {
        return 'Error, consulte con el Desarrollador.';
    }

}

export const getClassroomErrorMessage = ( detail ) => {

    if ( detail.name ) {
        return detail.name[0];
    } else if ( detail.school_period ) {
        return detail.school_period[0];
    } else if ( detail.curse_level ) {
        return detail.curse_level[0];
    } else if ( detail.capacity ) {
        return detail.capacity[0];
    } else {
        return 'Error, consulte con el Desarrollador.';
    }
}

// TODO: Terminar método
export const getGlossaryErrorMessage = () => {

}

export const getAutocompleteSelectedData = ( values, name ) => {
    let selectedData;
    values.forEach( data => {
        if ( data.name === name  ) {
            selectedData = data;
        }
    });

    return selectedData;
}

export const getSingleModelKeys = ( keys ) => {

    return keys.map( data => {
        return data.id
        // model_keys.push(data.id)
    });
    // const model_keys = [];
    
    // return model_keys;
}

export const changeDate = ( data ) => {
    for (let index = 0; index < data.length; index++) {
        data[index].created_at = moment(data[index].created_at).format('DD-MM-YYYY');

        if (typeof(data[index].state) !== 'undefined') {
            if ( data[index].state === 'Open' ) {
                data[index].state = 'Abierto';
            } else if ( data[index].state === 'Close' ) {
                data[index].state = 'Cerrado';
            }
        }

        if (typeof(data[index].active) !== 'undefined'){
            if (data[index].active) {
                data[index].active = 'Activo'
            }else if (data[index].active === false) {
                data[index].active = 'Bloqueado'
            }
        }

        if (typeof(data[index].updated_at) !== 'undefined') {
            data[index].updated_at = moment(data[index].updated_at).format('DD-MM-YYYY');
        }
    }
    return data;
}

export const changeAreaType = ( data ) => {
    for (let index = 0; index < data.length; index++) {
        if (data[index].type) {
            switch (data[index].type) {
                
                case 'Ciencias':
                    data[index].type = 'Ciencias Naturales';
                    break;
            
                case 'Matematicas':
                    data[index].type = 'Matemáticas';
                    break;
                
                case 'Interdisciplinar':
                data[index].type = 'Interdisciplinar';
                break;

                case 'Otro':
                data[index].type = 'Otro';
                break;

                default:
                    break;
            }
        }
    }
    return data;
}

export const getDate = ( data, format ) => {
    return moment(data).format(format);
}

export const transformToDateObject = ( date ) => {
    if ( moment(date).isValid() ) {
        return moment(date).toDate();
    }
    return date;
}

export const getDataIdsForModel = ( dataContent ) => {
    return dataContent.map( data => {
        return data.id
      });
}


export const getTeachersForAreas = ( teachers, teachers_by_area ) => {
    return teachers.filter( 
        teacher => !teachers_by_area.includes(teacher.id)
    );
}

export const curse_level_choices = [
    { label: 'Primero', value: 1 },
    { label: 'Segundo', value: 2  },
    { label: 'Tercero', value: 3  }
];

export const getDropdownValue = ( choices, data, label ) => {
    let result = null;
    choices.forEach( choice => {
        if ( label ) {
            if (choice.value === data) {
                result = choice.label
            }
        } else {
            if (choice.label === data) {
                result = choice.value
            }
        }
    });
    return result;
}

export const setRangeNumberInput = ( value, max, min ) => {
    if ( value > max ) {
        value = max
    } else if ( value < min ){
        value = min
    }
    return value;
};

export const setClassroomDropdown = ( values ) => {
    return values.map( value => ({
        name: value.name,
        value: value.id  
    }));
}

export const setTeacherDropdown = ( values ) => {
    return values.map( value => {
        return {
            name: value.teacher.name,
            value: value.teacher.id  
        }
    });
}

export const setAsignatureDropdown = ( values ) => {
    return values.map( asignature_detail => {
        return {
            name: asignature_detail.asignature.name,
            value: asignature_detail.asignature.id
        }
    });
}

export const setSelectedClassroomDefault = ( values ) => {
    let selectedClassroom;
    if (values.length) {
        // values.forEach( data => {
        //     selectedClassroom = data.id
        // });
        selectedClassroom = values[0].id
    } else {
        selectedClassroom = null;
    }
    return selectedClassroom;
}

export const area_types_choices = [
    { label: 'Ciencias Naturales', value: 1 },
    { label: 'Matemáticas', value: 2  },
    { label: 'Interdisciplinar', value: 3  },
    { label: 'Otro', value: 4  }
]; 

export const getAreaTypeValue = ( data ) => {
    let result = null;
    area_types_choices.forEach( area => {
        if (area.label === data) {
            result = area.value
        }
    });
    return result;
}

export const getAreaTypeLabel = ( data ) => {
    let result = null;
    area_types_choices.forEach( type => {
        if (type.value === data) {
            result = type.label;
        }
    });
    return result
}

export const getMethodologyTypeList = (asignatures_detail, asignature_id) => {

    let field;

    asignatures_detail.forEach( asignature_detail => {
            if (asignature_detail.asignature.id === asignature_id) {
                field = asignature_detail.asignature.type;
            }
        }  
    );

    if ( field ) {
        switch (field) {
            case 'Matematicas':
                return [
                    {name: 'Diseño Universal de Aprendizaje', value: 1},
                    {name: 'Aprendizaje Basado en Problemas', value: 2},
                ];
        
            case 'Ciencias':
                return [
                    {name: 'Diseño Universal de Aprendizaje', value: 1},
                    {name: 'Aprendizaje Cooperativo', value: 3},
                ];
    
            case 'Interdisciplinar':
                return [
                    {name: 'Diseño Universal de Aprendizaje', value: 1},
                    {name: 'Aprendizaje Basado en Problemas', value: 2},
                ];
    
            case 'Otro':
                return [
                    {name: 'Diseño Universal de Aprendizaje', value: 1}
                ];
            default:
                return [
                    {name: 'Diseño Universal de Aprendizaje', value: 1}
                ];
        }
    } else {
        return [];
    }

} 

export const getTopicResumeData = ( 
    classrooms, 
    asignatures_detail, 
    methodologyChoice,
    classroom_id,
    asignature_detail_id 
) => {
    let classroom;
    let asignature_detail;
    let methodology;

    classrooms.forEach( data => {
        if ( data.id === classroom_id ) {
            classroom = data;
        }
    });

    asignatures_detail.forEach( data => {
        if ( data.asignature.id === asignature_detail_id ) {
            asignature_detail = data;
        }
    });

    switch (methodologyChoice) {
        case 1:
            methodology = 'Diseño Universal de Aprendizaje'
            break;

        case 2:
            methodology = 'Aprendizaje Basado en Problemas'
            break;

        case 3:
            methodology = 'Aprendizaje Cooperativo'
            break;

        default:
            break;
    }

    return { classroom, asignature_detail, methodology }

}
