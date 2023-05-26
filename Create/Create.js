const examInfo = JSON.parse(localStorage.getItem('examInfo')) || [];

function createExam() {
  const examTitleInput = document.getElementById('examTitle');
  const examDurationInput = document.getElementById('examDuration');
  const examDescriptionInput = document.getElementById('examDescription');

  const examTitle = examTitleInput.value.trim();
  const examDuration = examDurationInput.value.trim();
  const examDescription = examDescriptionInput.value.trim();

  // Check if any field is empty
  if (examTitle === '' || examDuration === '' || examDescription === '') {
    alert('Please fill in all fields');
    return;
  }

  // Check if exam title already exists
  const existingExam = examInfo.find((exam) => exam.title === examTitle);
  if (existingExam) {
   alert("exam already exits")
    return;
  }

  // Check if exam duration is less than 10
  if (parseInt(examDuration) < 10) {
    alert('exam duration is greater then 10 seconds')
    return;
  }

  // Create new exam object
  let id=Date.now().toString();
  const newExam = {
    title: examTitle,
    duration: examDuration,
    description: examDescription,
    ExamButton:"Start",
    id:id,
  };

  // Add new exam to the array

  examInfo.push(newExam);

  // Save updated array to local storage
  localStorage.setItem('examInfo', JSON.stringify(examInfo));
  // Reset form inputs
  examTitleInput.value = '';
  examDurationInput.value = '';
  examDescriptionInput.value = '';
  

//   Close the modal
  const modal = document.getElementById('exampleModal');
  const bootstrapModal = bootstrap.Modal.getInstance(modal);
  bootstrapModal.hide();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: ' Exam Created Successfully',
    showConfirmButton: false,
    timer: 1500
  })
  
}


