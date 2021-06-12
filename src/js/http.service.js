import '../css/components.css';
const jokeURL = 'https://api.chucknorris.io/jokes/random';

/*
    Códigos de error:
      - 200: Ok
      - 201: Registro realizado correctamente (Ok).
      - 400: Enviamos algo mal.
      - 404: No se encontró el recurso (peticiones erradas).
      - 500: Problemas del lado del servidor.

    body: ReadableStream
      - ReadableStream: cuerpo de la petición (JSON).
      - resp.json: Al hacer esto indicamos al resp que 
                   extraiga el body en formatos JSON (Es una promesa).
      


fetch(jokeURL).then((resp) => {
  resp.json().then(({id, value}) => {
      console.log(id);
      console.log(value);
  });
});

fetch(jokeURL)
  .then((resp) => resp.json())
  .then(({ id, value }) => console.log(id, value));

*/
const getJoke = async () => {
  try {

    const resp = await fetch(jokeURL);
    if (!resp.ok) throw 'No se pudo realizar la petición';

    const { icon_url, id, value } = await resp.json();
    
    return { icon_url, id, value };

  } catch (error) {
    throw error;
  }
};

export { getJoke };
