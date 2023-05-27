const examInfo = JSON.parse(localStorage.getItem("examInfo")) || [];
const tableBodyOfCreatedExams = document.getElementById("tableBody");
window.addEventListener("storage", (event) => {
  if (event.storageArea === localStorage) {
    location.reload();
  }
});
for (let i = 0; i < examInfo.length; i++) {
  var row = tableBodyOfCreatedExams.insertRow();
  row.insertCell(0).innerHTML = examInfo[i].id;
  row.insertCell(1).innerHTML = examInfo[i].title;
  row.insertCell(2).innerHTML = examInfo[i].description;
  row.insertCell(3).innerHTML = examInfo[i].duration;
  let startExam = row.insertCell(4);
  let startExamButton = document.createElement("button");
  startExamButton.innerHTML = "Start Exam";
  startExamButton.classList.add("btn", "btn-success", "startExam");
  startExamButton.addEventListener("click", function () {
    const url = new URL("http://127.0.0.1:5500/Exam/Paper/Paper.html");
    url.searchParams.set("id", examInfo[i].id);
    url.searchParams.set("title", examInfo[i].title);
    url.searchParams.set("duration", examInfo[i].duration);
    window.open(url.href, "_blank");
  });

  startExam.appendChild(startExamButton);
}
