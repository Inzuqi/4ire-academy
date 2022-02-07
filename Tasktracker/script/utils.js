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

export function filterArrayEl(array, itemToRemove) {
  return array.filter( (el) => el !== itemToRemove) 
}
