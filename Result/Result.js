const url = new URLSearchParams(window.location.search);
const getMark = url.get('getMark');
const fullMark = url.get('outOfMark');

const marksValue = document.getElementById('marksValue');
const fullMarksValue = document.getElementById('fullMarksValue');

marksValue.textContent = getMark;
fullMarksValue.textContent = fullMark;

if (getMark >= fullMark * 0.5) {
  marksValue.classList.add('passed');
} else {
  marksValue.classList.add('failed');
}
