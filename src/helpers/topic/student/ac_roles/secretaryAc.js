
export const getSecretaryInformationObject = ( data, teamAc ) => {
    if (Array.isArray(data)) {
      return data.map( path => ({
        team_ac: teamAc,
        external_path: path.item,
        active: true,
      }));
    }
    return [];
  }