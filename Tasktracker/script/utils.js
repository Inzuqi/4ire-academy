export function randomString() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substring(0, 6);
}

export function checkValue(value) {
  if (!value) {
    return 'Not set';
  }
  return value;
}

export function getCurrentDate() {
  let date = new Date();
  let datetime =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDay() +
    'T' +
    date.getHours() +
    date.getMinutes();
  return datetime;
}

export function filterArrayEl(array, element) {
    array = array.filter(function(el) {return el !== element})
}
