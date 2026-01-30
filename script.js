
const questions = [
    {
        question: "1. CSS stands for?",
        options: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
        answer: 2

    },

    {
        question: "2. Which CSS property is used to change text color?",
        options: ["font-color", "text-color", "color", "fgcolor"],
        answer: 2
    },

    {
        question: "3. Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        answer: 2

    },

    {
        question: "4. Which symbol is used for class selector in CSS?",
        options: ["#", ".", "*", "$"],
        answer: 1
    },

    {
        question: "5. Which CSS property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "background-style"],
        answer: 2

    },

    {
        question: "6. Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "float"],
        answer: 0
    },

    {
        question: "7. Which symbol is used for single-line comments in JavaScript?",
        options: ["<!-- -->", "//", "/* */", "#"],
        answer: 1
    },

    {
        question: "8. Which method is used to display an alert box?",
        options: ["msg()", "alert()", "prompt()", "display()"],
        answer: 1
    },

    {
        question: "9. Which data type is NOT supported by JavaScript?",
        options: ["String", "Boolean", "Undefined", "Character"],
        answer: 3
    },

    {
        question: "10. Which operator is used for strict equality?",
        options: ["==", "=", "===", "!="],
        answer: 2

    }
];

let currentQ = 0;
let userAnswers = Array(questions.length).fill(null);

const quizBox = document.getElementById("quiz-box");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

// ✅ Function to load question
function loadQuestion() {
    const q = questions[currentQ];

    // Clear quiz box
    quizBox.innerHTML = "";

    // Add question
    const questionEl = document.createElement("h5");
    questionEl.textContent = q.question;
    quizBox.appendChild(questionEl);

    // Add options
    q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "form-check mt-2";

        const input = document.createElement("input");
        input.className = "form-check-input";
        input.type = "radio";
        input.name = "option";
        input.id = `opt${i}`;
        input.value = i;
        if (userAnswers[currentQ] === i) input.checked = true;

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.setAttribute("for", `opt${i}`);
        label.textContent = opt;   // ✅ Safe text (tags dikhai denge)

        div.appendChild(input);
        div.appendChild(label);
        quizBox.appendChild(div);
    });

    // Buttons
    backBtn.disabled = currentQ === 0;
    nextBtn.classList.toggle("d-none", currentQ === questions.length - 1);
    submitBtn.classList.toggle("d-none", currentQ !== questions.length - 1);
}

// ✅ Save selected option
function saveAnswer() {
    const selected = document.querySelector("input[name='option']:checked");
    if (selected) {
        userAnswers[currentQ] = parseInt(selected.value);
    }
}

// ✅ Next button
nextBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQ < questions.length - 1) {
        currentQ++;
        loadQuestion();
    }
});

// ✅ Back button
backBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQ > 0) {
        currentQ--;
        loadQuestion();
    }
});

// ✅ Submit button
submitBtn.addEventListener("click", () => {
    saveAnswer();
    let score = 0;
    questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) score++;
    });
    quizBox.innerHTML = "";
    backBtn.style.display = "none";
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
    result.innerHTML = `🎉 Your Score: ${score} / ${questions.length}`;
});

// ✅ First question load
loadQuestion();
