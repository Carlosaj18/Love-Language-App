class User {
  constructor({ id, imagen, nombre, favoritos, description, genero, languages }) {
    this.id = id;
    this.imagen = imagen;
    this.nombre = nombre;
    this.favoritos = favoritos;
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
      favoritos: user.favoritos,
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
}
