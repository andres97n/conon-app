import { getEvaluationObject } from "./school";

export const getEvaluationAbpObject = ( 
    abpId, teamDetailId, evaluationSize, evaluation, evaluationGrade, 
) => ({
    abp: abpId,
    team_detail_abp: teamDetailId,
    description: evaluationSize > 0 ? evaluation.description : '',
    final_grade: evaluationSize > 0 
    ? evaluation.final_grade + evaluationGrade 
    : evaluationGrade,
    observations: evaluationSize > 0 ? evaluation.observations : '',
    state: 1
});

export const getEvaluationDetailAbpObject = ( 
    rubric, data, isModerator, evaluationQuestions, type, evaluationGrade
) => ({
    title_evaluation_detail: rubric.rubric_detail_abp.title,
    evaluation_description: rubric.rubric_detail_abp.description,
    detail_body: getEvaluationObject( data, isModerator, evaluationQuestions, type ),
    grade_percentage: rubric.rubric_detail_abp.grade_percentage,
    rating_value: evaluationGrade,
    active: true
});