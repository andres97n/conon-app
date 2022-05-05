import moment from "moment";

export const getAbpData = ( data, abpId ) => {
    return {
        id: abpId,
        topic: data.topic,
        problem: data.problem,
        oral_explication: data.oral_explication,
        descriptive_image: data.descriptive_image,
        reference_url: data.reference_url,
        state: data.state || 1,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getAbpErrorMessage = ( detail ) => {
    if ( detail.topic ) {
        return detail.topic[0]
    } else if ( detail.problem ) {
        return detail.problem[0]
    } else if ( detail.oral_explication ) {
        return detail.oral_explication[0]
    } else if ( detail.descriptive_image ) {
        return detail.descriptive_image[0]
    } else if ( detail.reference_url ) {
        return detail.reference_url[0]
    } else if (detail.state) {
        return detail.state[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getTeamAbpData = ( data, teamAbpId ) => {
    return {
        id: teamAbpId,
        abp: data.abp,
        state: data.state || 1,
        observations: data.observations || '',
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getTeamAbpErrorMessage = ( detail ) => {
    if ( detail.abp ) {
        return detail.abp[0]
    } else if ( detail.state ) {
        return detail.state[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getTeamAbpDetailData = ( data, teamAbpDetailId ) => {
    return {
        id: teamAbpDetailId,
        team_abp: data.team_abp,
        user: data.user,
        is_moderator: data.is_moderator,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getTeamDetailsAbpWithTeamAbpId = ( teamDetailsAbp, teamAbpId ) => {
    return teamDetailsAbp.map( teamDetail => ({
      team_abp: teamAbpId,
      ...teamDetail
    }));
  }

export const getTeamDetailAbpForStep = ( data, step ) => ({
    id: data.id,
    step,
    team_detail_abp: data.team_detail_abp,
    user: data.user,
    is_moderator: data.is_moderator
});

export const getTeamAbpDetailErrorMessage = ( detail ) => {
    if ( detail.team_abp ) {
        return detail.team_abp[0]
    } else if ( detail.user ) {
        return detail.user[0]
    } else if ( detail.is_moderator ) {
        return detail.is_moderator[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getRubricAbpData = ( data, rubricAbpId ) => {
    return {
        id: rubricAbpId,
        abp: data.abp,
        description_rubric: data.description_rubric,
        abp_final_value: data.abp_final_value,
        state: data.state || 1,
        observations: data.observations,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getRubricAbpErrorMessage = ( detail ) => {
    if ( detail.abp ) {
        return detail.abp[0]
    } else if ( detail.description_rubric ) {
        return detail.description_rubric[0]
    } else if ( detail.abp_final_value ) {
        return detail.abp_final_value[0]
    } else if ( detail.state ) {
        return detail.state[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getRubricAbpDetailData = ( data, rubricAbpDetailId ) => {
    return {
        id: rubricAbpDetailId,
        rubric_abp: data.rubric_abp,
        title_detail: data.title_detail,
        description_detail: data.description_detail,
        grade_percentage: data.grade_percentage,
        rating_value: data.rating_value,
        active: data.active || true,
        observations_detail: data.observations_detail,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getRubricAbpDetailErrorMessage = ( detail ) => {
    if ( detail.rubric_abp ) {
        return detail.rubric_abp[0]
    } else if ( detail.title_detail ) {
        return detail.title_detail[0]
    } else if ( detail.description_detail ) {
        return detail.description_detail[0]
    } else if ( detail.grade_percentage ) {
        return detail.grade_percentage[0]
    } else if ( detail.rating_value ) {
        return detail.rating_value[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getRubricDetailsAbpWithRubricAbpId = ( rubricDetailsAbp, rubricAcId ) => {
    return rubricDetailsAbp.map( rubricDetail => ({
        rubric_abp: rubricAcId,
        ...rubricDetail
    }));
  }

export const getDeveplomentStepsAbp = () => ([
    { label: 'Analizar' },
    { label: 'Lluvia de Ideas' },
    { label: 'Conoce' },
    { label: 'Desconoce' },
    { label: 'Realizar' },
    { label: 'Definir' },
    { label: 'Obtener' },
    { label: 'Presentar' },
]);

export const getStudentStepsAbpObjects = ( step ) => {
    if (step === 0) {
        return {
            home: 'PASO 1',
            title: 'Leer y Analizar el escenario del problema',
            description: 'Buscamos que verifiquen su comprensión del escenario (problema), ' + 
            'mediante la discusión sobre el mismo dentro de su equipo de trabajo.'
        };
    } else if (step === 1) {
        return {
            home: 'PASO 2',
            title: 'Realizar una lluvia de ideas',
            description: 'Llegarán a tener teorías o hipótesis sobre las ' +
            'causas del problema o talvez ideas de cómo resolverlo; estas deben de ' +
            'enlistarse y serán aceptadas o rechazadas por el equipo, según se avance en ' + 
            'la investigación.'
        };
    } else if (step === 2) {
        return {
            home: 'PASO 3',
            title: 'Hacer una lista de aquello que se conoce',
            description: 'Tendrán que hacer una lista de todo aquello que el equipo conoce ' + 
            'acerca del problema o situación.'
        };
    } else if (step === 3) {
        return {
            home: 'PASO 4',
            title: 'Hacer una lista de aquello que se desconoce',
            description: 'Tendrán que hacer una lista con todo aquello que el equipo cree ' + 
            'se debe saber para resolver el problema. \n Podrán idear diversos tipos de ' + 
            'preguntas que pueden ser adecuadas; algunas pueden relacionarse con conceptos ' +
            'o principios que deben estudiarse para resolver la situación.'
        };
    } else if (step === 4) {
        return {
            home: 'PASO 5',
            title: 'Hacer una lista de aquello que necesita hacerse para resolver el problema',
            description: 'Deberán planear las estrategias de investigación. \n Es aconsejable ' +
            'que en el equipo elaboren una lista de las acciones que deben realizarse.'
        }
    } else if (step === 5) {
        return {
            home: 'PASO 6',
            title: 'Definir el problema',
            description: 'La definición del problema consiste en un par de declaraciones ' + 
            'que expliquen claramente lo que el equipo desea resolver, producir, responder, ' +
            'probar o demostrar.'
        }
    } else if (step === 6) {
        return {
            home: 'PASO 7',
            title: 'Obtener información',
            description: 'Localizarán, acopiarán, organizarán, analizarán e ' + 
            'interpretarán la información de diversas fuentes.'
        }
    } else if (step === 7) {
        return {
            home: 'PASO 8',
            title: 'Presentar resultados',
            description: 'Realizán una presentación en la ' +
            'cual se muestren las recomendaciones, predicciones, inferencias o aquello ' +
            'que sea conveniente en relación a la solución del problema.'
        }
    } else {
        return {};
    }
}

export const getUserIdModeratorFromTeam = ( team, uid ) => {
    if (team.length > 0) {
        const userTeam = team.filter( student => student.user.id === uid );
        console.log(userTeam);
        if (userTeam[0].is_moderator) {
            return true;
        } else {
            return false
        }
    } else {
        return false;
    }
}

export const getValueInteraction = ( interaction ) => {
    if ( interaction === 0 ) {
        return null;
    } else if ( interaction === 1 ) {
        return false;
    } else if ( interaction === 2 ) {
        return true;
    } else {
        return null;
    }
}

export const getToastMsg = ( toast, severity, detail, life = 4000 ) => {
    toast.current.show({ 
        severity, 
        summary: 'Conon Informa', 
        detail, 
        life 
    });
}

export const getInfoMsg = ( infoMsg, severity, detail, sticky, life = 4000 ) => {
    if (sticky) {
        infoMsg.current.show({
            severity, detail, sticky
        });
    } else {
        infoMsg.current.show({ 
            severity, detail, life 
        });
    }
}

//---- EVALUATION ABP ----

export const getEvaluationAbpData = ( data, evaluationAbp ) => {
    return {
        id: evaluationAbp,
        abp: data.abp,
        team_detail_abp: data.team_detail_abp,
        description: data.description,
        final_grade: data.final_grade,
        observations: data.observations,
        state: data.state || 1,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getEvaluationAbpErrorMessage = ( detail ) => {
    if ( detail.abp ) {
        return detail.abp[0]
    } else if ( detail.team_detail_abp ) {
        return detail.team_detail_abp[0]
    } else if ( detail.description ) {
        return detail.description[0]
    } else if ( detail.final_grade ) {
        return detail.final_grade[0]
    } else if ( detail.observations ) {
        return detail.observations[0]
    } else if ( detail.state ) {
        return detail.state[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getEvaluationDetailAbpData = ( data, evaluationDetailAbp ) => {
    return {
        id: evaluationDetailAbp,
        evaluation_abp: data.evaluation_abp,
        title_evaluation_detail: data.title_evaluation_detail,
        evaluation_description: data.evaluation_description,
        grade_percentage: data.grade_percentage,
        detail_body: data.detail_body,
        rating_value: data.rating_value,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getEvaluationDetailAbpErrorMessage = ( detail ) => {
    if ( detail.evaluation_abp ) {
        return detail.evaluation_abp[0]
    } else if ( detail.title_evaluation_detail ) {
        return detail.title_evaluation_detail[0]
    } else if ( detail.evaluation_description ) {
        return detail.evaluation_description[0]
    } else if ( detail.grade_percentage ) {
        return detail.grade_percentage[0]
    } else if ( detail.rating_value ) {
        return detail.rating_value[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

// --------------------------------------------------------

