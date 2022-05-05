
export const getStudentLabelRole = ( type ) => {
  if (type === 1) {
    return 'Coordinador';
  } else if (type === 2) {
    return 'Portavoz';
  } else if (type === 3) {
    return 'Organizador';
  } else if (type === 4) {
    return 'Secretario';
  }
}

export const getStudentRoleIcon = ( type ) => {
  if (type === 1) {
    return 'fas fa-user-cog';
  } else if (type === 2) {
    return 'fas fa-bullhorn';
  } else if (type === 3) {
    return 'fas fa-hand-pointer';
  } else if (type === 4) {
    return 'fas fa-address-book';
  }
}