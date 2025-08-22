const input = document.querySelector('.temp-input');
const selection = document.querySelectorAll('.select');
const select1 = selection[0];
const select2 = selection[1];
const button = document.querySelector('.submit');
const results = document.querySelector('.results');

console.log(input.value);
function calculation(e) {
  e.preventDefault();
  const temp = parseFloat(input.value);
  const unit1 = select1.value;
  const unit2 = select2.value;
  const result1 =
    unit1 === unit2
      ? temp
      : unit1 === 'F' && unit2 === 'C'
      ? (temp - 32) * (5 / 9)
      : unit1 === 'F' && unit2 === 'K'
      ? (temp - 32) * (5 / 9) + 273.15
      : unit1 === 'C' && unit2 === 'F'
      ? (temp * 9) / 5 + 32
      : unit1 === 'C' && unit2 === 'K'
      ? temp + 273.15
      : unit1 === 'K' && unit2 === 'F'
      ? (temp - 273.15) * (9 / 5) + 32
      : unit1 === 'K' && unit2 === 'C'
      ? temp - 273.15
      : NaN;
  const result2 = Math.round(result1 * 100) / 100;
  if (isNaN(result2) || unit1 === 'fr1' || unit2 === 'fr1') {
    results.classList.add('error');
    results.textContent = 'Invalid Input';
  } else {
    results.classList.remove('error');
    results.textContent = `${temp}${
      unit1 === 'C' || unit1 === 'F' ? '°' : ''
    }${unit1} is ${result2}${
      unit2 === 'C' || unit2 === 'F' ? '°' : ''
    }${unit2}`;
  }
}

button.addEventListener('click', calculation);
