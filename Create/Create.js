const examInfo = JSON.parse(localStorage.getItem("examInfo")) || [];
function createExam() {
  const examTitleInput = document.getElementById("examTitle");
  const examDurationInput = document.getElementById("examDuration");
  const examDescriptionInput = document.getElementById("examDescription");
  const examTitle = examTitleInput.value.trim();
  const examDuration = examDurationInput.value.trim();
  const examDescription = examDescriptionInput.value.trim();
  if (examTitle === "" || examDuration === "" || examDescription === "") {
    alert("all feild required");
    return;
  }
  const existingExam = examInfo.find((exam) => exam.title === examTitle);
  if (existingExam) {
    alert("exam already exits");
    return;
  }
  if (parseInt(examDuration) < 10) {
    alert("exam duration is greater then 10 seconds");
    return;
  }
  let id = Date.now().toString();
  const newExam = {
    title: examTitle,
    duration: examDuration,
    description: examDescription,
    ExamButton: "Start",
    id: id,
  };
  examInfo.push(newExam);
  localStorage.setItem("examInfo", JSON.stringify(examInfo));
  examTitleInput.value = "";
  examDurationInput.value = "";
  examDescriptionInput.value = "";
  const modal = document.getElementById("exampleModal");
  const bootstrapModal = bootstrap.Modal.getInstance(modal);
  bootstrapModal.hide();
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: " Exam Created Successfully",
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: "swal-custom-class",
      backdrop: "swal-backdrop-class",
    },
  });
}
