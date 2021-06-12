import '../css/components.css';
import { getJoke } from './http.service';

const body = document.body;
let btnAnotherJoke, olList, divLoader;

const loading = () => {
  const preload = `
      <div class="col-md-12 d-flex justify-content-center mt-2">
        <div class="loader loader--style1" title="0" style="display: none">
          <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
          <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
            s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
            c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
          <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
            C22.32,8.481,24.301,9.057,26.013,10.047z">
            <animateTransform attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="0.5s"
              repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
      </div>
    `;

  const divLoader = document.createElement('div');
  divLoader.classList.add('row');
  divLoader.innerHTML = preload;
  body.append(divLoader);
};

const createJokesHtml = () => {
  const html = `
        <h1 class="mt-5">Chuck Norris jokes</h1>
        <hr>

        <button class="btn btn-primary">Load joke</button>
        <ol class="mt-5 list-group list-group-numbered">
        </ol>
    `;

  const divJokes = document.createElement('div');
  divJokes.innerHTML = html;

  body.append(divJokes);
};

// Joke: { id, value }
const drawJoke = ({ icon_url, id, value }) => {
  const olItem = document.createElement('li');
  olItem.classList.add('d-flex');
  olItem.innerHTML = 
        `<div class="ms-2">
            ${value}
          </div>
        `;

  // Agregamos clases de estilos
  olItem.classList.add('list-group-item', 'list-group-item-dark');
  olList.append(olItem); // Agregamos el 'li' en el 'ol'.

  // Agregamos la url de la imagen
  const img = document.createElement('img');
  img.src = icon_url;
  img.setAttribute('width', '60px');
  img.setAttribute('height', '60px');
  olItem.insertBefore(img, olItem.firstChild); // Agregamos la imagen al 'li'.
};

const events = () => {
  // Preload insert
  loading();

  olList = document.querySelector('ol');
  btnAnotherJoke = document.querySelector('button');
  divLoader = document.querySelector('.loader');

  btnAnotherJoke.addEventListener('click', async () => {

    divLoader.style.display = 'block'; // Enable loader

    btnAnotherJoke.disabled = true; // Desactivamos el botón para evitar doble click
    drawJoke(await getJoke());
    btnAnotherJoke.disabled = false;
    
    divLoader.style.display = 'none'; // Disable loader
  });
};

export const init = () => {
  createJokesHtml();
  events();
};
