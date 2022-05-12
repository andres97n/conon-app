
export const getCoordinatoStrategyObject = ( data, teamDetailAc ) => {
  if (Array.isArray(data)) {
    return data.map( strategy => ({
      team_detail_ac: teamDetailAc,
      strategy: strategy.item,
      active: true,
    }));
  }
  return [];
}