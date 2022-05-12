
export const getOrganizerActionObject = ( data, teamDetailAc ) => {
  if (Array.isArray(data)) {
    return data.map( field => ({
      team_detail_ac: teamDetailAc,
      action: field.item,
      active: true,
    }));
  }
  return [];
}

export const getOrganizerAssignActivityObject = ( data, teamDetailAc, memberId ) => {
  if (Array.isArray(data)) {
    return data.map( field => ({
      team_detail_ac: teamDetailAc,
      member_ac: memberId,
      member_activity: field.item,
      active: true,
    }));
  }
    return [];
  }