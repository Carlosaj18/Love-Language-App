const users = [];
const usersFavorite = [];
const datosGenero = [];
const datosTagsFamilia = [];
const datosLenguajes = [];
//const datosPreguntas = [];
let newArrIdeasLenguajes = [];
let newArrPreguntasTest = [];
let contador = 1;
let radioValueCheck = [];

let valuePhysicalTouch = 0;
let valueActosOfService = 0;
let valueQualityTime = 0;
let valueWordsOfAffirmation = 0;
let valueReceivingGifts = 0;

const loveLanguages = {
  physicalTouch: 0,
  actosOfService: 0,
  qualityTime: 0,
  wordsOfAffirmation: 0,
  receivingGifts: 0,
};

const datosPreguntas = [
  {
    id: "1",
    targetLanguage: "physicalTouch",
    pregunta:
      "Si tienen un altercado con tu pareja, ¿Cómo te gustaría que se arreglaran?",
    respuestas: {
      P: "Que me diga que me extraña.",
      A: "Que me invite a conversar sobre lo sucedido.",
      Q: "Que me den un obsequio.",
      W: "Que me ayuden en la tareas del hogar.",
      R: "Que se acerque a darme un abrazo.",
    },
    status: false,
  },
  {
    id: "2",
    targetLanguage: "physicalTouch",
    pregunta: "Hoy es tu cumpleaños, ¿Cómo te gustaría celebrar con tu pareja?",
    respuestas: {
      P: "Me gustaría que me felicitara con un profundo mensaje de amor.",
      A: "Me gustaría que tuviéramos una cena romántica.",
      Q: "Prefiero que me compre un regalo muy especial.",
      W: "Quisiera que me apoyara haciendo cosas del hogar.",
      R: "Que me diera muchos besos y abrazos.",
    },
    status: false,
  },
  {
    id: "3",
    targetLanguage: "physicalTouch",
    pregunta: "¿Cómo es la cita perfecta para ti?",
    respuestas: {
      P: "Una en la que me exprese sus sentimientos.",
      A: "Me gustaría hiciéramos una actividad nueva que nos guste a ambos.",
      Q: "En la que me sorprenda con un detalle pensado para mí.",
      W: "En la que mi pareja cocine y me haga sentir atendida.",
      R: "En la que prepare una noche intima y especial ",
    },
    status: false,
  },
  {
    id: "4",
    targetLanguage: "physicalTouch",
    pregunta: "¿Qué te emocionaba al principio de la relación?",
    respuestas: {
      P: "Sus llamadas y mensajes inesperados para decirme que me extrañaba.",
      A: "Cuando teníamos nuestras primeras citas ",
      Q: "Aquellos regalos, flores, chocolates y presentes Que me obsequie detalles.",
      W: "Que estaba atento a lo que necesitaba.",
      R: "Cuando me besaba, acariciaba y abrazaba.",
    },
    status: false,
  },
  {
    id: "5",
    targetLanguage: "physicalTouch",
    pregunta: "¿Qué es lo más importante que esperas de tu pareja?",
    respuestas: {
      P: "Que me diga lo mucho que me ama con sus palabras.",
      A: "Que me dedique tiempo sin distracciones.",
      Q: "Que me obsequie detalles.",
      W: "Que me ayude en las cosas que necesito hacer.",
      R: "Que nunca falte entre nosotros el afecto físico.",
    },
    status: false,
  },
  {
    id: "6",
    targetLanguage: "physicalTouch",
    pregunta:
      "Si te toca planificar una celebración con tu pareja, ¿Qué prefieres?",
    respuestas: {
      P: "Un intercambio de cartas manifestando todo lo que sentimos",
      A: "Tener una velada romántica.",
      Q: "Comprarle lo que tanto desea tener.",
      W: "Prepararle una cena de lo que más le gusta.",
      R: "Darle todos los abrazos y besos que quiera.",
    },
    status: false,
  },
  {
    id: "8",
    targetLanguage: "physicalTouch",
    pregunta: "¿Qué es el amor para ti?",
    respuestas: {
      P: "Expresar lo mucho que sea ama con toda sinceridad.",
      A: "Tener tiempo de calidad con la pareja.",
      Q: "Comprar regalos y detalles que nos hagan felices.",
      W: "Estar pendiente de lo que el otro necesita.",
      R: "Tener alta conexión física y emocional.",
    },
    status: false,
  },
  {
    id: "8",
    targetLanguage: "physicalTouch",
    pregunta: "Para ti, ¿Cuál es el regalo ideal?",
    respuestas: {
      P: "Escuchar o leer sus palabras de amor.",
      A: "Tener tiempo exclusivo para nosotros.",
      Q: "Un detalle pensando especialmente para mi.",
      W: "Que me ayude en mis proyectos.",
      R: "Su presencia, besos, abrazos y caricias.",
    },
    status: false,
  },
  {
    id: "9",
    targetLanguage: "physicalTouch",
    pregunta: " ¿Cómo manifiestas tu amor cotidianamente? ",
    respuestas: {
      P: "Diciéndole lo que siento por él/ella cada mañana y cada noche.",
      A: "Esperándolo para comer con él o ella.",
      Q: "Dándole detalles cada vez que puedo.",
      W: "Atendiéndole en lo que necesite.",
      R: "Con contacto físico.",
    },
    status: false,
  },
  {
    id: "10",
    targetLanguage: "physicalTouch",
    pregunta: "¿Qué es lo más importante que esperas de tu pareja? ",
    respuestas: {
      P: "Cuando habla de sus sentimientos.",
      A: "Cuando charlamos y pasamos tiempo juntos.",
      Q: "Cuando me sorprende con obsequios.",
      W: "Que nos ayudamos el uno al otro.",
      R: "Que me hace sentir deseado/a",
    },
    status: false,
  },
  {
    id: "11",
    targetLanguage: "physicalTouch",
    pregunta: "Si quieres manifestar amor a tu pareja, ¿Cómo lo expresas?",
    respuestas: {
      P: "Diciéndole lo mucho que la/o amo",
      A: "Preparando tiempo solo para nosotros",
      Q: "Invierto en lo que le hace feliz",
      W: "Le ayudo en lo que me pide",
      R: "Le hago sentir lo mucho que me gusta",
    },
    status: false,
  },
  {
    id: "12",
    targetLanguage: "physicalTouch",
    pregunta: "Cuando alcanzas una meta, ¿Cómo te gusta que te feliciten?",
    respuestas: {
      P: "Diciéndome que están orgullosos de mi.",
      opcion2: "Que me preparen una celebración.",
      Q: "Que me den regalos.",
      W: "Que me apoyen en nuevas metas.",
      R: "Abrazos y más abrazos.",
    },
    status: false,
  },
];
