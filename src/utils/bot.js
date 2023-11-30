import nlp from "compromise";

const PRIMER_MENSAJE_ENTRANTE = "Hola quiero registrarme, mi nombre es";
const KEYWORD_1 = "quiero";
const KEYWORD_2 = "registrarme";
const KEYWORD_3 = "nombre";

export const chatInicio = (text) => {
  const doc = nlp(text);

  if (doc.has(KEYWORD_1) && doc.has(KEYWORD_2) && doc.has(KEYWORD_3)) {
      let name = doc.people().first().text();
      if (!name || /^\s*$/.test(name)) {
         throw new Error("Nombre no reconocido");
      } else {
        name = name.toLowerCase();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
      }   
  }
};
