
export const getSpokesmanQuestionsObject = ( data, teamDetailAc ) => {
    if (Array.isArray(data)) {
      return data.map( field => ({
        team_detail_ac: teamDetailAc,
        spokesman_question: field.item,
        active: true,
      }));
    }
    return [];
  }