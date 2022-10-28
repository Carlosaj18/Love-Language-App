class User {
  constructor({id, imagen, nombre, description, genero, languages}) {
    this.id = id;
    this.imagen = imagen;
    this.nombre = nombre;
    this.description = description;
    this.genero = genero;
    this.languages = languages;
  }

  asingacionPorcentajesLenguajes(user) {
    Object.entries(this.languages).forEach(([key]) => {
      let result = parseFloat(prompt(`Ingresa el porcentaje de amor para ${key}:`));
      this.languages[key] = result;
    });
    return this.loveLanguageProfile(user, this.languages);
  }

  loveLanguageProfile(user, languages) {
    let profile = {
      id: user.id,
      imagen: this.asignacionImageProfile(user.imagen, user.genero),
      nombre: user.nombre,
      description: user.description,
      genero: user.genero,
      languages,
    };
    return profile;
  }

  asignacionImageProfile(image, genero) {
    genero = genero.toUpperCase();
    if (image == "") {
      if (genero == "F") return (image = "👧");
      else if (genero == "M") return (image = "👦");
      else return "😄";
    }
  }

  sortLenguajesDelAmor(user) {
    this.languages = Object.keys(user.languages).sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });
    this.languages = this.toObject(this.languages);
    return this.languages;
  }

  toObject(arr) {
    var rv = loveLanguages;
    for (var i = 0; i < arr.length; ++i) rv[i] = arr[i];
    return rv;
  }
}
