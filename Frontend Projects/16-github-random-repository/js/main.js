const container = document.querySelector('.container');
const lnSelect = document.querySelector('.select');
const display = document.querySelector('.default');
const button = document.querySelector('.refresh');

const urlLang =
  'https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json';

display.innerHTML = '<p class="first">Please Select a Language</p>';
getLangData();

let lastSearch;
let button2;

async function getLangData() {
  try {
    const gotLang = await fetch(urlLang);
    const langData = await gotLang.json();
    display.classList.remove('error');
    addData(langData);
  } catch (err) {
    display.innerHTML = '<p>Failed to load languages!</p>';
    display.classList.add('error');
  }
}

function addData(lnData) {
  lnSelect.innerHTML = lnData
    .map((lang, i) => {
      return `<option id="lang${i}" >${lang.title}</option>`;
    })
    .join('');
}

async function langSelect(e) {
  display.innerHTML = '<p class="loading">Loading...</p>';
  const urlSearch = `https://api.github.com/search/repositories?q=language:${e.target.value}&sort=stars&order=desc`;
  console.log(urlSearch);
  try {
    const gotSearch = await fetch(urlSearch);
    const data = await gotSearch.json();
    lastSearch = data;
    displayData(data);
    display.classList.remove('error');
    //throw new error('Error');
  } catch (err) {
    display.innerHTML = '<p>Error fetching repositories</p><br>';
    display.classList.add('error');
    button2 = document.createElement('button');
    button2.classList.add('error');
    button2.innerHTML = 'Refresh';
    button2.addEventListener('click', () => langdaata());
    container.appendChild(button2);
    button.classList.add('none');
  }
}

function displayData(objects) {
  if (!objects || !objects.items) {
    objects = lastSearch;
  }
  console.log(objects);
  const toShow = Math.floor(Math.random() * objects.items.length);
  const repo = objects.items[toShow];

  console.log(repo);
  display.innerHTML = `<p class='repoName'>Repository Name:<br> ${repo.name}</p>
  <p class='repoDes'>Repository Description:<br> ${
    repo.description || 'No Description Available'
  }</p>
  <p class='repoUrl'><a href='${
    repo.html_url
  }' target='_blank'>To Repository</a></p>`;
  button.classList.remove('none');
}

lnSelect.addEventListener('change', langSelect);
button.addEventListener('click', () => displayData(lastSearch));

