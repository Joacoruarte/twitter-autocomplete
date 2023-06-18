export function getLastWord(texto) {
  // Eliminar las etiquetas HTML del texto
  const deleteHTML = texto.replace(/<[^>]+>/g, '');

  // Obtener la última palabra del texto sin etiquetas HTML
  const words = deleteHTML.trim().split(/\s+/);
  const lastWord = words[words.length - 1];

  return lastWord;
}
