import moment from "moment";
import { DateTime } from 'luxon';

// GET ABP STEPS DATA

export const getOpinionStepOneAbpData = ( data, opinionId ) => {
    return {
        id: opinionId,
        team_detail_abp: data.team_detail_abp,
        opinion: data.opinion,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getOpinionStepOneAbpErrorMessage = ( detail ) => {
    if ( detail.team_detail_abp ) {
        return detail.team_detail_abp[0]
    } else if ( detail.opinion ) {
        return detail.opinion[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getManyOpinionStepOneAbpDetailErrorMessage = ( detail ) => {
    if (Array.isArray(detail)) {
        if ( detail[0].team_detail_abp ) {
            return detail[0].team_detail_abp[0]
        } else if ( detail[0].opinion ) {
            return detail[0].opinion[0]
        } else if ( detail[0].active ) {
            return detail[0].active[0]
        } else {
            return 'Error, consulte con el Administrador.';
        }
    } else {
        return detail;
    }
}

export const getQuestionAbpData = ( data, questionStepOneId ) => {
    return {
        id: questionStepOneId,
        team_abp: data.team_abp,
        moderator_question: data.moderator_question,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getQuestionAbpDataErrorMessage = ( detail ) => {
    if ( detail.team_abp ) {
        return detail.team_abp[0]
    } else if ( detail.moderator_question ) {
        return detail.moderator_question[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getAnswerAbpDataErrorMessage = ( detail ) => {
    if ( detail.teacher_answer ) {
        return detail.teacher_answer[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else if ( detail.question_step_one_abp ) {
        return detail.question_step_one_abp[0]
    } else if ( detail.user ) {
        return detail.user[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getInteractionStepOneAbpDetailErrorMessage = ( detail ) => {
    if ( detail.opinion_step_one_abp ) {
        return detail.opinion_step_one_abp[0]
    } else if ( detail.user ) {
        return detail.user[0]
    } else if ( detail.opinion_interaction ) {
        return detail.opinion_interaction[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getStudentIdeaStepTwoAbpData = ( data, studentIdeaId ) => {
    let teamDetailId;
    if (typeof data.team_detail_abp === 'object') {
        teamDetailId = data.team_detail_abp.id;
    } else{
        teamDetailId = data.team_detail_abp;
    }
    return {
        id: studentIdeaId,
        team_detail_abp: teamDetailId,
        student_idea: data.student_idea,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getStudentIdeaAbpDataErrorMessage = ( detail ) => {
    if ( detail.team_detail_abp ) {
        return detail.team_detail_abp[0]
    } else if ( detail.student_idea ) {
        return detail.student_idea[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getStudentIdeaAbpDataManyErrorMessage = ( detail ) => {
    if (Array.isArray(detail)) {
        if ( detail[0].team_detail_abp ) {
            return detail[0].team_detail_abp[0]
        } else if ( detail[0].student_idea ) {
            return detail[0].student_idea[0]
        } else if ( detail[0].active ) {
            return detail[0].active[0]
        } else {
            return 'Error, consulte con el Administrador.';
        }
    } else {
        return detail;
    }
}

export const getRateStudentIdeaAbpDataErrorMessage = ( detail ) => {
    if ( detail.student_idea_step_two_abp ) {
        return detail.student_idea_step_two_abp[0]
    } else if ( detail.user ) {
        return detail.user[0]
    } else if ( detail.rate_student_idea ) {
        return detail.rate_student_idea[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getLearnedConceptStepThreeAbpData = ( data, learnedConceptAbpId ) => {
    let teamId;
    if (typeof data.team_abp === 'object') {
        teamId = data.team_abp.id;
    } else{
        teamId = data.team_abp;
    }
    return {
        id: learnedConceptAbpId,
        team_abp: teamId,
        learned_concept: data.learned_concept,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getLearnedConceptAbpDataErrorMessage = ( detail ) => {
    if ( detail.team_abp ) {
        return detail.team_abp[0]
    } else if ( detail.learned_concept ) {
        return detail.learned_concept[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getLearnedConceptAbpDataManyErrorMessage = ( detail ) => {
    if (Array.isArray(detail)) {
        if ( detail[0].team_abp ) {
            return detail[0].team_abp[0]
        } else if ( detail[0].learned_concept ) {
            return detail[0].learned_concept[0]
        } else if ( detail[0].active ) {
            return detail[0].active[0]
        } else {
            return 'Error, consulte con el Administrador.';
        }
    } else {
        return detail;
    }
}

export const getLearnedConceptReferenceStepThreeAbpData = ( 
    data, userName, learnedConceptReferenceAbpId 
) => {
    return {
        id: learnedConceptReferenceAbpId,
        user: {
            id: data.user,
            name: userName
        },
        url_reference: data.url_reference,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getLearnedConceptReferenceAbpDataErrorMessage = ( detail ) => {
    if ( detail.learned_concept_step_three_abp ) {
        return detail.learned_concept_step_three_abp[0]
    } else if ( detail.user ) {
        return detail.user[0]
    } else if ( detail.url_reference ) {
        return detail.url_reference[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getUnknownConceptStepFourAbpData = ( data, unknownConceptAbpId ) => {
    return {
        id: unknownConceptAbpId,
        team_abp: data.team_abp,
        unknown_concept: data.unknown_concept,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getUnknownConceptAbpDataErrorMessage = ( detail ) => {
    if ( detail.team_abp ) {
        return detail.team_abp[0]
    } else if ( detail.unknown_concept ) {
        return detail.unknown_concept[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getUnknownConceptAbpDataManyErrorMessage = ( detail ) => {
    if (Array.isArray(detail)) {
        if ( detail[0].team_abp ) {
            return detail[0].team_abp[0]
        } else if ( detail[0].unknown_concept ) {
            return detail[0].unknown_concept[0]
        } else if ( detail[0].active ) {
            return detail[0].active[0]
        } else {
            return 'Error, consulte con el Administrador.';
        }
    } else {
        return detail;
    }
}

export const getUnknownConceptReferenceStepFourAbpData = ( 
    data, userName, unknownConceptReferenceAbpId 
) => {
    return {
        id: unknownConceptReferenceAbpId,
        user: {
            id: data.user,
            name: userName
        },
        url_reference: data.url_reference,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getUnknownConceptReferenceAbpDataErrorMessage = ( detail ) => {
    if ( detail.unknown_concept_step_four_abp ) {
        return detail.unknown_concept_step_four_abp[0]
    } else if ( detail.user ) {
        return detail.user[0]
    } else if ( detail.url_reference ) {
        return detail.url_reference[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getPerformActionStepFiveAbpData = ( data, performActionId ) => {
    return {
        id: performActionId,
        action: data.action,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getPerformActionAbpDataErrorMessage = ( detail ) => {
    if ( detail.team_detail_abp ) {
        return detail.team_detail_abp[0]
    } else if ( detail.action ) {
        return detail.action[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getPerformActionAbpDataManyErrorMessage = ( detail ) => {
    if (Array.isArray(detail)) {
        if ( detail[0].team_detail_abp ) {
            return detail[0].team_detail_abp[0]
        } else if ( detail[0].action ) {
            return detail[0].action[0]
        } else if ( detail[0].active ) {
            return detail[0].active[0]
        } else {
            return 'Error, consulte con el Administrador.';
        }
    } else {
        return detail;
    }
}

export const getRatePerformActionStepFiveAbpData = ( data, ratePerformActionId ) => {
    return {
        id: ratePerformActionId,
        user: data.user,
        rate_perform_action: data.rate_perform_action,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getRatePerformActionAbpDataErrorMessage = ( detail ) => {
    if ( detail.perform_action_step_five_abp ) {
        return detail.perform_action_step_five_abp[0]
    } else if ( detail.user ) {
        return detail.user[0]
    } else if ( detail.rate_perform_action ) {
        return detail.rate_perform_action[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getProblemDefinitionStepSixAbpData = ( data, problemDefinitionId ) => {
    return {
        id: problemDefinitionId,
        team_abp: data.team_abp,
        problem_definition: data.problem_definition,
        observations: data.observations || '',
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getProblemDefinitionAbpDataErrorMessage = ( detail ) => {
    if ( detail.team_abp ) {
        return detail.team_abp[0]
    } else if ( detail.problem_definition ) {
        return detail.problem_definition[0]
    } else if ( detail.observations ) {
        return detail.observations[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getProblemDefinitionReferenceStepSixAbpData = ( 
    data, definitionReferenceId, userName 
) => {
    return {
        id: definitionReferenceId,
        user: {
            id: data.user,
            name: userName
        },
        problem_reference: data.problem_reference,
        active: data.active || true,
        created_at: data.created_at || new Date()
    }
}

export const getProblemDefinitionReferenceAbpDataErrorMessage = ( detail ) => {
    if ( detail.team_abp ) {
        return detail.team_abp[0]
    } else if ( detail.user ) {
        return detail.user[0]
    } else if ( detail.problem_reference ) {
        return detail.problem_reference[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getGetInformationStepSevenAbpData = ( data, getInformationId ) => {
    return {
        id: getInformationId,
        team_abp: data.team_abp,
        get_information: data.get_information,
        observations: data.observations || '',
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getGetInformationAbpDataErrorMessage = ( detail ) => {
    if ( detail.team_abp ) {
        return detail.team_abp[0]
    } else if ( detail.get_information ) {
        return detail.get_information[0]
    } else if ( detail.observations ) {
        return detail.observations[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getInformationReferenceStepSevenAbpData = ( data, referenceId, name ) => {
    return {
        id: referenceId,
        team_abp: data.team_abp,
        user: {
            id: data.user,
            name
        },
        information_reference: data.information_reference || '',
        active: data.active || true,
        created_at: data.created_at || new DateTime.now()
    }
}

export const getInformationReferenceAbpDataErrorMessage = ( detail ) => {
    if ( detail.team_abp ) {
        return detail.team_abp[0]
    } else if ( detail.user ) {
        return detail.user[0]
    } else if ( detail.information_reference ) {
        return detail.information_reference[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getProblemResolutionStepEightAbpData = ( data, resolutionId ) => ({
    id: resolutionId,
    team_abp: data.team_abp,
    problem_resolution: data.problem_resolution,
    video_url: data.video_url || '',
    image_references: data.image_references || [],
    observations: data.observations || '',
    active: data.active || true,
    created_at: data.created_at || moment().format('DD-MM-YYYY')
})

export const getProblemResolutionAbpDataErrorMessage = ( detail ) => {
    if ( detail.team_abp ) {
        return detail.team_abp[0]
    } else if ( detail.problem_resolution ) {
        return detail.problem_resolution[0]
    } else if ( detail.video_url ) {
        return detail.video_url[0]
    }else if ( detail.image_references ) {
        return detail.image_references[0]
    } else if ( detail.observations ) {
        return detail.observations[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

// ------------------------------------------------

export const changeObjectDate = ( data ) => {
    return DateTime.fromISO( data ).toISODate(); 
    // return moment(data).format('DD-MM-YYYY');
}

export const getModeratorQuestionObjects = ( moderatorQuestions, teamId ) => {
    return moderatorQuestions.map( data => ({
        team_abp: teamId,
        moderator_question: data.question
    }));
}

export const getModeratorQuestionsError = ( moderatorQuestions ) => {
    let isValid = true;
    moderatorQuestions.forEach( data => {
        if (!data.question) {
            isValid = false;
        }
    });
    return isValid;
}

// OPINION STEP ONE ABP

// For to reducer
export const getInteractionStepOne = ( opinions, opinionId, interactionId, value ) => {
    const currentOpinion = opinions.filter( data => data.opinion.id === opinionId);
    if (currentOpinion.length === 1) {
        return currentOpinion.map( opinion => ({
            ...opinion,
            interactions: opinion.interactions.map( 
                interaction => interaction.id === interactionId
                    ? ({
                        ...interaction,
                        opinion_interaction: setOpinionInteractionValue(value),
                    })
                    : (interaction)
            )
        }))[0];
    } else {
        return null;
    }
}

// For database
export const getInteractionStepOneDatabaseObject = ( 
    interactions, opinionId, interactionId, value 
) => {
    const currentOpinion = interactions.filter( data => data.opinion === opinionId);
    if ( currentOpinion && currentOpinion.length === 1 ) {
        const currentOpinionId = currentOpinion[0].opinion;
        const currentInteraction = currentOpinion[0].interactions.filter(
            data => data.interaction === interactionId
        ); 
        if (currentInteraction && currentInteraction.length === 1) {
            return {
                id: currentInteraction[0].interaction,
                user: currentInteraction[0].user,
                opinion_step_one_abp: currentOpinionId,
                opinion_interaction: setOpinionInteractionValue(value)
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}

export const setOpinionInteractionValue = ( opinion_interaction ) => {
    if (opinion_interaction === null) {
        return 0;
    } else if (opinion_interaction === false) {
        return 1;
    } else if (opinion_interaction === true){
        return 2;
    }
}

// -----------------------------------

// STUDENT IDEA STEP TWO

export const getManyStudentIdeaObjects = ( ideas, teamDetailId ) => {
    return ideas.map( idea => ({
        team_detail_abp: teamDetailId,
        student_idea: idea,
        active: true
    }));
};

// For to reducer
export const getStudentIdeaStepTwoObject = ( ideas, ideaId, ratingId, value ) => {
    const currentIdea = ideas.filter( data => data.student_idea.id === ideaId);
    if (currentIdea.length === 1) {
        return currentIdea.map( student_idea => ({
            ...student_idea,
            rate_student_ideas: student_idea.rate_student_ideas.map( 
                rating => rating.id === ratingId
                    ? ({
                        ...rating,
                        rate_student_idea: value,
                    })
                    : (rating)
            )
        }))[0];
    } else {
        return null;
    }
}

// For to database
export const getRatingStepTwoDatabaseObject = ( 
    ideas, studentIdeaId, ratingId, value 
) => {
    const currentIdea = ideas.filter( idea => idea.student_idea === studentIdeaId );
    if (currentIdea?.length === 1) {
        const currentRating = currentIdea[0].rate_student_ideas.filter( 
            data => data.rating === ratingId 
        );
        if (currentRating?.length === 1) {
            return {
                id: currentRating[0].rating,
                student_idea_step_two_abp: currentIdea[0].student_idea,
                user: currentRating[0].user,
                rate_student_idea: value
            }
        } else {
            return null;
        }
    } else {
        return null;
    }
}

// -----------------------------------

// STUDENT STEP THREE ABP

export const isValidHttpUrl = (url) =>  {
    let urlObject;

    try {
      urlObject = new URL(url);
    } catch (error) {
      return false;  
    }
  
    const protocol = urlObject.protocol;
    const protocol_position = url.lastIndexOf( protocol );
    const domain_extension_position = url.lastIndexOf( '.' );

    return (
        protocol_position === 0 &&
        [ 'http:', 'https:', 'ftp:', 'ftps:' ].indexOf( protocol ) !== - 1 &&
        domain_extension_position > 2 && url.length - domain_extension_position > 2
    );
    // return url.protocol === "http:" || url.protocol === "https:";
}

// export const validUrl = ( url ) => {
//     const resp = url.match(/^(http|https|ftp|ftps):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/);
//     return ( resp !== null );
// }

// -----------------------------------

// STUDENT STEP EIGHT ABP

// export const getEditorImages = ( field ) => {
//     let imagesEditor = {};
//     for (let index = 0; index < 2; index++) {
//         const image = localStorage.getItem(`${field}${index + 1}`);
//         if (image) {
//         imagesEditor = { ...imagesEditor, [`image${index + 1}`]: image }
//         }
//     }
//     return imagesEditor;
// }

export const clearStoragePathsStepEight = () => {
    const firstImageEditor = localStorage.getItem('problem_resolution1');
    const secondImageEditor = localStorage.getItem('problem_resolution2');
    const firstImagePath = localStorage.getItem('image_references.firstImageUrlPath');
    const secondImagePath = localStorage.getItem('image_references.secondImageUrlPath');

    if (firstImageEditor) {
        localStorage.removeItem('problem_resolution1');
    }
    if (secondImageEditor) {
        localStorage.removeItem('problem_resolution2');
    }
    if (firstImagePath) {
        localStorage.removeItem('image_references.firstImageUrlPath');
    }
    if (secondImagePath) {
        localStorage.removeItem('image_references.secondImageUrlPath');
    }
}