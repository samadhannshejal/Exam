const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let examTitle = urlParams.get("title");
let duration = urlParams.get("duration");
const h1 = document.getElementById("h1");
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("questionContainer");
    const nav = document.createElement("nav");
    nav.classList.add("nav");
    const title = document.createElement("h2");
    title.innerHTML = `Exam Title :${examTitle}`;
    nav.appendChild(title);
    const time = document.createElement("h2");
    time.classList.add("time");
    nav.appendChild(time);
    container.appendChild(nav);
    let totalMarks = 0;
    let outOfMark = 0;
    data.forEach((question) => {
      const questionElement = document.createElement("div");
      questionElement.classList.add("question");
      const innerQuestion = document.createElement("div");
      innerQuestion.classList.add("innerQuestion");
      const questionTitle = document.createElement("h3");
      questionTitle.textContent = `${question.id} ) ${question.title}`;
      innerQuestion.appendChild(questionTitle);
      questionElement.appendChild(innerQuestion);
      const markElement = document.createElement("p");
      markElement.textContent = `Mark:${question.mark}`;
      innerQuestion.appendChild(markElement);
      questionElement.appendChild(innerQuestion);
      if (question.type === "radio" || question.type === "checkbox") {
        const options = question.options;
        options.forEach((option) => {
          const optionElement = document.createElement("label");
          const inputElement = document.createElement("input");
          inputElement.setAttribute("type", question.type);
          inputElement.setAttribute("name", `question-${question.id}`);
          inputElement.setAttribute("value", option);
          optionElement.appendChild(inputElement);
          optionElement.append(option);
          questionElement.appendChild(optionElement);
        });
      } else if (question.type === "text") {
        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("name", `question-${question.id}`);
        inputElement.setAttribute("placeholder", "write answer here...");
        inputElement.classList.add("inputTag");
        questionElement.appendChild(inputElement);
      }
      questionElement.appendChild(document.createElement("hr"));
      container.appendChild(questionElement);
      const inputElements = questionElement.querySelectorAll("input");
      inputElements.forEach((inputElement) => {
        inputElement.addEventListener("change", (event) => {
          const selectedAnswer = event.target.value;
          const questionId = parseInt(event.target.name.split("-")[1]);
          const question = data.find((q) => q.id === questionId);
          if (question.type === "checkbox") {
            question.selected = Array.from(
              document.querySelectorAll(
                `input[name="question-${questionId}"]:checked`
              )
            ).map((element) => element.value);
          } else {
            question.selected = selectedAnswer;
          }
        });
      });
    });
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    function radioTypeOption(question) {
      if (question.type === "radio" && question.selected === question.answer)
        return true;
    }
    function checkboxTypeOption(question) {
      if (
        question.type === "checkbox" &&
        question.answer.length === question.selected.length &&
        question.answer.every((option) => question.selected.includes(option))
      ) {
        return true;
      }
    }
    function textTypeOption(question) {
      if (
        question.type === "text" &&
        new Set(question.answer.map((answer) => answer.toLowerCase())).has(
          question.selected.toLowerCase()
        )
      )
        return true;
    }
    function calculate() {
      totalMarks = data.reduce((marks, question) => {
        console.log("mark", question.mark);
        outOfMark += question.mark;
        if (radioTypeOption(question)) {
          return marks + question.mark;
        } else if (checkboxTypeOption(question)) {
          return marks + question.mark;
        } else if (textTypeOption(question)) {
          return marks + question.mark;
        }
        return marks;
      }, 0);
      return { outOfMark, totalMarks };
    }
    function redirect() {
      let url = new URL("http://127.0.0.1:5500/Result/Result.html");
      url.searchParams.set("studentMark", totalMarks);
      url.searchParams.set("outOfMark", outOfMark);
      url.searchParams.set("idOfExam", id);
      window.location.href = url;
    }
    submitButton.addEventListener("click", () => {
      calculate();
      redirect();
    });
    const intervalID = setInterval(() => {
      duration--;
      const time = document.getElementsByClassName("time")[0];
      time.innerHTML = `Time : ${duration}`;
      if (duration <= 0) {
        clearInterval(intervalID);
        calculate();
        redirect();
      }
    }, 1000);
    container.appendChild(submitButton);
  })
  .catch((error) => {
    console.error(error);
  });
