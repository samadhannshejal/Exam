const examInfo = JSON.parse(localStorage.getItem('examInfo')) || [];
const tableBody = document.getElementById('tableBody');
window.addEventListener('storage',(event)=>{
  if (event.storageArea === localStorage) {
    location.reload();
}
})
for (let i = 0; i < examInfo.length; i++) {
  var row = tableBody.insertRow();
  row.insertCell(0).innerHTML = examInfo[i].id;
  row.insertCell(1).innerHTML = examInfo[i].title;
  row.insertCell(2).innerHTML = examInfo[i].description;
  row.insertCell(3).innerHTML = examInfo[i].duration;

  let startExam = row.insertCell(4);
  let startExamButton = document.createElement('button');
  startExamButton.innerHTML = 'Start Exam';
  startExamButton.classList.add('btn', 'btn-success', 'startExam');

  // Attach a click event listener to the "Start Exam" button
  startExamButton.addEventListener('click', function() {
    // Generate the URL with exam data as parameters
    const url = new URL('http://127.0.0.1:5500/Exam/Paper/Paper.html');
    url.searchParams.set('id', examInfo[i].id);
    url.searchParams.set('title', examInfo[i].title);
    url.searchParams.set('description', examInfo[i].description);
    url.searchParams.set('duration', examInfo[i].duration);

    // Open the target page with the URL containing the parameters
    window.open(url.href, '_blank');
  });

  startExam.appendChild(startExamButton);
}
