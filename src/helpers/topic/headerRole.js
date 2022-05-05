
export const isRoleFormValid = ( switches ) => {
  let isValid = true;
  let roleValidator = {
    coordinator: 0,
    spokeman: 0,
    organizer: 0,
    secretary: 0,
  };
  switches.forEach( role => {
    if (role.studentSwitch === 'coordinator') {
      roleValidator.coordinator ++;
    } else if (role.studentSwitch === 'spokeman') {
      roleValidator.spokeman ++;
    } else if (role.studentSwitch === 'organizer') {
      roleValidator.organizer ++;
    } else if (role.studentSwitch === 'secretary') {
      roleValidator.secretary ++;
    }
  });
  Object.values(roleValidator).forEach( 
    value => (value !== 1) && ( isValid = false ) 
  );
  return isValid;
}

export const getTeamDetailsAc = ( switches ) => {
  return switches.map( data => ({
    owner: data.id,
    role_type: getRoleNumber(data.studentSwitch),
    active: true
  }));
}

export const getRoleNumber = ( role ) => {
  if (role === 'coordinator') {
    return 1;
  } else if (role === 'spokeman') {
    return 2;
  } else if (role === 'organizer') {
    return 3;
  } else if (role === 'secretary') {
    return 4;
  }
}