const PRIMER_MENSAJE_ENTRANTE = "Hola quiero registrarme, mi nombre es: ";

export const chatInicio = (msje) => {
  if (msje === PRIMER_MENSAJE_ENTRANTE) return true;
  else return false;
};
