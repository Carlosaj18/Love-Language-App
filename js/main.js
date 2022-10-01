class User {
  constructor(email, nombre, edad, genero) {
    let loveLanguages = [
      "physicalTouch",
      "actosOfService",
      "qualityTime",
      "wordsOfAffirmation",
      "receivingGifts",
    ];

    let profileLoveLanguage = [];

    this.email = email;
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
    this.loveLanguages = loveLanguages;
    this.profileLoveLanguage = profileLoveLanguage;
  }

  loveLanguageProfile(user, languageProfile) {
    let profile = {
      nombre: user.nombre,
      edad: user.edad,
      genero: user.genero,
      physicalTouch: languageProfile[0],
      actosOfService: languageProfile[1],
      qualityTime: languageProfile[2],
      wordsOfAffirmation: languageProfile[3],
      receivingGifts: languageProfile[4],
    };

    alert(`Este es el perfil del usuario: \n 
                name: ${profile.nombre} 
                edad: ${profile.edad} 
                genero: ${profile.genero} 
                languages: [
                    ${profile.physicalTouch} 
                    ${profile.actosOfService}
                    ${profile.qualityTime} 
                    ${profile.wordsOfAffirmation} 
                    ${profile.receivingGifts} 
                ]`);

    console.log(`Este es el perfil del usuario: \n 
                name: ${profile.nombre} 
                edad: ${profile.edad} 
                genero: ${profile.genero} 
                languages: [
                    ${profile.physicalTouch} 
                    ${profile.actosOfService}
                    ${profile.qualityTime} 
                    ${profile.wordsOfAffirmation} 
                    ${profile.receivingGifts} 
                ]`);
  }

  orderLanguagePorcent(languageProfile) {
    return languageProfile.sort(function (a, b) {
      if (a.languageDelAmor == b.languageDelAmor) {
        return 0;
      }
      if (a.languageDelAmor > b.languageDelAmor) {
        return -1;
      }
      return 1;
    });
  }

  testLenguagesDelAmor(user) {
    //debugger;
    let languageProfile = [];
    this.loveLanguages.forEach(function (language) {
      let porcentaje = parseFloat(
        prompt(`Ingresa el porcentaje de amor para ${language}:`)
      );
      let obj = { [language]: porcentaje };

      let str = JSON.stringify(obj);

      languageProfile.push(str);

      /** Creacion con una lista del perfil con el lenguaje y su %
       * languageProfile.push([language, porcentaje]);
       */
    });

    /*console.log("Estos son los porcentajes del usuario ", languageProfile);*/
    this.loveLanguageProfile(user, languageProfile);
  }
}

function exit() {
  alert("Gracias por usar nuestros servicios");
}

function verLenguages() {
  let lenguages =
    "Los 5 lenguajes del amor son: \n" +
    "1) Physical Touch \n " +
    "2) Words of wordsOfAffirmation \n" +
    "3) Quality Time \n " +
    "4) Receiving Gifts \n " +
    "5) Acts of Service \n ";

  let respuesta = prompt(
    `Ingresa el lenguaje del amor que queires aprender: \n  ${lenguages}`
  );

  switch (parseInt(respuesta)) {
    case 1:
      alert(
        "To this person, nothing speaks more deeply than appropriate physical touch."
      );
      console.log(
        "To this person, nothing speaks more deeply than appropriate physical touch."
      );
      break;
    case 2:
      alert("This language uses words to affirm other people.");
      console.log("This language uses words to affirm other people.");
      break;
    case 3:
      alert(
        "This language is all about giving the other person your undivided attention."
      );
      console.log(
        "This language is all about giving the other person your undivided attention."
      );
      break;
    case 4:
      alert(
        "For some people, receiving a heartfelt gift is what makes them feel most loved."
      );
      console.log(
        "For some people, receiving a heartfelt gift is what makes them feel most loved."
      );
      break;
    case 5:
      alert("For these people, actions speak louder than words.");
      console.log("For these people, actions speak louder than words.");
      break;
    default:
      console.error("Debes seleccionar alguno de los 5 lenguajes del amor.");
  }

  let continuar = confirm("¿Deseas conocer algun otro lenguaje del amor?");
  if (continuar) {
    verLenguages();
  } else {
    exit();
  }
}

function crearUser() {
  let email = prompt("Ingresa tu email");
  let nombre = prompt("Ingresa tu nombre").toUpperCase();
  let edad = parseInt(prompt("Ingresa tu edad"));
  let genero = prompt("Ingresa tu genero");

  const user = new User(email, nombre, edad, genero);
  console.log("El usuario se ha creado, con la siguiente informacion: ", user);

  let examen = confirm(
    "¿Usted quiere tomar el examen de los lenguages del amor? Vaya a este link https://sisuparejas.com/test-los-5-lenguajes-del-amor/"
  );

  if (examen) {
    user.testLenguagesDelAmor(user);
  } else {
    exit();
  }
}
