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
    Object.entries(this.languages).forEach(([key, value]) => {
      let result = parseFloat(prompt(`Ingresa el porcentaje de amor para ${key}:`));
      this.languages[key] = result;
    });

    let profile = this.loveLanguageProfile(user, this.languages);
    return  profile;
  }

  loveLanguageProfile(user, languages) {

    let profile = {
      id: user.id,
      imagen: user.image,
      nombre: user.nombre,
      description: user.description,
      genero: user.genero,
      languages,
    };
    return profile;
  }
}
