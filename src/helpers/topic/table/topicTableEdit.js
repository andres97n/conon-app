
export const getMethodologyTypeTabs = ( type ) => {
  const mainForm = { 
    name: 'Información Principal', 
    icon: 'fas fa-file-signature mr-2', 
    tab: 1
  };
  if (type === 1) {
    return [
      { ...mainForm },
      { name: 'Conceptualización Escrita', icon: 'fas fa-pen mr-2', tab: 2 },
      { name: 'Ejemplo Demostrativo', icon: 'fas fa-edit mr-2', tab: 3 },
      { name: 'Finalización de DUA', icon: 'fas fa-photo-video mr-2', tab: 4 },
    ];
  } else if (type === 2) {
    return [
      { ...mainForm },
      { name: 'Planteamiento de Problema', icon: 'fas fa-pen mr-2', tab: 2 },
      { name: 'Finalización de ABP', icon: 'fas fa-edit mr-2', tab: 3 },
    ];
  } else {
    return [
      { ...mainForm },
      { name: 'Planteamiento de Problema', icon: 'fas fa-pen mr-2', tab: 2 },
      { name: 'Finalización de AC', icon: 'fas fa-edit mr-2', tab: 3 },
    ];
  }
} 

export const getMethodologyTypeLabel = ( type ) => {
  if (type === 1) {
    return 'Diseño Universal de Aprendizaje'
  } else if (type === 2) {
    return 'Aprendizaje Basado en Problemas';
  } else if (type === 3) {
    return 'Aprendizaje Cooperativo';
  }
}