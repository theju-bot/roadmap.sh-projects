const calculate = (unit, value, from, to) => {
    let convertedValue = 0;
  if (unit === 'length') {
    convertedValue =
      from === 'meters' && to === 'kilometers'
        ? value / 1000
        : from === 'meters' && to === 'feet'
        ? value * 3.28084
        : from === 'meters' && to === 'miles'
        ? value / 1609.34
        : from === 'kilometers' && to === 'meters'
        ? value * 1000
        : from === 'kilometers' && to === 'feet'
        ? value * 3280.84
        : from === 'kilometers' && to === 'miles'
        ? value / 1.60934
        : from === 'feet' && to === 'meters'
        ? value / 3.28084
        : from === 'feet' && to === 'kilometers'
        ? value / 3280.84
        : from === 'feet' && to === 'miles'
        ? value / 5280
        : from === 'miles' && to === 'meters'
        ? value * 1609.34
        : from === 'miles' && to === 'kilometers'
        ? value * 1.60934
        : from === 'miles' && to === 'feet'
        ? value * 5280
        : value;
  } else if (unit === 'weight') {
    convertedValue =
      from === 'grams' && to === 'kilograms'
        ? value / 1000
        : from === 'grams' && to === 'pounds'
        ? value / 453.592
        : from === 'grams' && to === 'ounces'
        ? value / 28.3495
        : from === 'kilograms' && to === 'grams'
        ? value * 1000
        : from === 'kilograms' && to === 'pounds'
        ? value * 2.20462
        : from === 'kilograms' && to === 'ounces'
        ? value * 35.274
        : from === 'pounds' && to === 'grams'
        ? value * 453.592
        : from === 'pounds' && to === 'kilograms'
        ? value / 2.20462
        : from === 'pounds' && to === 'ounces'
        ? value * 16
        : from === 'ounces' && to === 'grams'
        ? value * 28.3495
        : from === 'ounces' && to === 'kilograms'
        ? value / 35.274
        : from === 'ounces' && to === 'pounds'
        ? value / 16
        : value;
  } else if (unit === 'temperature') {
    convertedValue =
      from === 'celsius' && to === 'fahrenheit'
        ? (value * 9) / 5 + 32
        : from === 'celsius' && to === 'kelvin'
        ? value + 273.15
        : from === 'fahrenheit' && to === 'celsius'
        ? ((value - 32) * 5) / 9
        : from === 'fahrenheit' && to === 'kelvin'
        ? ((value - 32) * 5) / 9 + 273.15
        : from === 'kelvin' && to === 'celsius'
        ? value - 273.15
        : from === 'kelvin' && to === 'fahrenheit'
        ? ((value - 273.15) * 9) / 5 + 32
        : value;
  }
  return convertedValue;
};

module.exports = calculate;
