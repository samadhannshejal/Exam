const url = new URLSearchParams(window.location.search);
const studentMark = url.get('studentMark');
const fullMark = url.get('outOfMark');
const marksValue = document.getElementById('marksValue');
const fullMarksValue = document.getElementById('fullMarksValue');
marksValue.textContent = studentMark;
fullMarksValue.textContent = fullMark;
if (studentMark >= fullMark * 0.5) {
  marksValue.classList.add('passed');
} else {
  marksValue.classList.add('failed');
}
const retryBtn=document.getElementById('retry');
retryBtn.addEventListener('click',(e)=>{
  e.preventDefault()
  history.back();
})
