class User {
  constructor(id, imagen, nombre, description, genero, languages) {
    this.id = id;
    this.imagen = imagen;
    this.nombre = nombre;
    this.description = description;
    this.genero = genero;
    this.languages = languages;
  }

  asingacionPorcentajesLenguajes(user) {
    let languageScores = [];

    loveLanguages.forEach(function (language) {
      let porcentaje = parseFloat(
        prompt(`Ingresa el porcentaje de amor para ${language}:`)
      );
      let obj = { [language]: porcentaje };
      let str = JSON.stringify(obj);
      languageScores.push(str);
    });

    return this.loveLanguageProfile(user, languageScores);
  }

  loveLanguageProfile(user, languageScores) {
    let profile = {
      id: user.id,
      imagen: user.image,
      nombre: user.nombre,
      description: user.description,
      genero: user.genero,
      languages: {
        physicalTouch: languageScores[0],
        actosOfService: languageScores[1],
        qualityTime: languageScores[2],
        wordsOfAffirmation: languageScores[3],
        receivingGifts: languageScores[4],
      },
    };
    return profile;
  }
}
