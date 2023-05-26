

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let titleEx = urlParams.get('title');
// let description = urlParams.get('description');
let duration = urlParams.get('duration');
const h1 = document.getElementById('h1');
let temp;
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('questionContainer');
    const nav = document.createElement('nav');
    nav.classList.add('nav');

    const title = document.createElement('h2');
    title.innerHTML = `Exam Title :${titleEx}`
    nav.appendChild(title);
    const time = document.createElement('h2');
    time.classList.add('time');
    nav.appendChild(time);


    container.appendChild(nav)

    let totalMarks = 0;
    let outOfMark = 0;
    data.forEach(question => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('question');
      const innerQuestion = document.createElement('div');
      innerQuestion.classList.add('innerQuestion');

      const questionTitle = document.createElement('h3');
      questionTitle.textContent = `${question.id} ) ${question.title}`;
      innerQuestion.appendChild(questionTitle)

      questionElement.appendChild(innerQuestion);
      const markElement = document.createElement('p');
      markElement.textContent = `Mark:${question.mark}`;
      innerQuestion.appendChild(markElement)
      questionElement.appendChild(innerQuestion);



      if (question.type === 'radio' || question.type === 'checkbox') {
        const options = question.options;
        options.forEach(option => {
          const optionElement = document.createElement('label');
          const inputElement = document.createElement('input');
          inputElement.setAttribute('type', question.type);
          inputElement.setAttribute('name', `question-${question.id}`);
          inputElement.setAttribute('value', option);
          optionElement.appendChild(inputElement);
          optionElement.append(option);
          questionElement.appendChild(optionElement);
        });
      } else if (question.type === 'text') {
        const inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'text');
        inputElement.setAttribute('name', `question-${question.id}`);
        inputElement.setAttribute('placeholder', "write answer here...");
        questionElement.appendChild(inputElement);
      }
      questionElement.appendChild(document.createElement('hr'))

      container.appendChild(questionElement);
      const inputElements = questionElement.querySelectorAll('input');
      console.log("inputElements out", inputElements)

      inputElements.forEach(inputElement => {
        console.log("inputElements in", inputElement)

        inputElement.addEventListener('change', (event) => {
          const selectedAnswer = event.target.value;
          const questionId = parseInt(event.target.name.split('-')[1]);

          const question = data.find(q => q.id === questionId);
          if (question.type === 'checkbox') {
            question.selected = Array.from(document.querySelectorAll(`input[name="question-${questionId}"]:checked`)).map(element => element.value);
          } else {
            question.selected = selectedAnswer;
          }
        });
      });

    });
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    totalMarks = 0; // Reset total marks

    function calculate() {
      data.forEach(question => {
        outOfMark += question.mark
        if (question.type === 'radio' && question.selected === question.answer) {
          totalMarks += question.mark;
        } else if (question.type === 'checkbox') {
          const selectedOptions = question.selected;
          if (selectedOptions.length === question.answer.length && selectedOptions.every(option => question.answer.includes(option))) {
            totalMarks += question.mark;
          }
        } else if (question.type === 'text' && Array.isArray(question.answer) && question.answer.some(answer => answer.toLowerCase() === question.selected.toLowerCase())) {
          totalMarks += question.mark;
        }
      });
    }
    function redirect() {
      let url = new URL('http://127.0.0.1:5500/Result/Result.html');
      url.searchParams.set('getMark', totalMarks);
      url.searchParams.set('outOfMark', outOfMark)
      url.searchParams.set('idOfExam',id)

      window.location.href = url;
    }

    submitButton.addEventListener('click', () => {
      calculate();
      redirect();
    });


    const intervalID = setInterval(() => {
      duration--;

      const time = document.getElementsByClassName('time')[0];
      time.innerHTML = `Time : ${duration}`;
      if (duration <= 0) {
        clearInterval(intervalID);
        calculate();
        redirect();

      }
    }, 1000);


    container.appendChild(submitButton);
  })
  .catch(error => {
    console.error(error);
    // Handle any errors that occur during the fetch request
  });
