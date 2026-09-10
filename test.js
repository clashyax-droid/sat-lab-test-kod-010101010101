// ============================================================
// SATlab — Test Page
// ============================================================

// Hozircha demo savol.
// Keyinchalik haqiqiy SAT savollari shu yerga qo'shiladi.

const questions = [
    {
        question: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        choices: [
            "However,",
            "Therefore,",
            "For example,",
            "In addition,"
        ],
        answer: "A"
    },

    {
        question: "This is a demo question. The real SAT question will be added later.",
        choices: [
            "Choice A",
            "Choice B",
            "Choice C",
            "Choice D"
        ],
        answer: "B"
    }
];


// ============================================================
// CURRENT QUESTION
// ============================================================

let currentQuestion = 0;

const selectedAnswers = [];


// ============================================================
// ELEMENTS
// ============================================================

const questionText =
    document.getElementById("questionText");

const answersContainer =
    document.getElementById("answers");

const currentQuestionElement =
    document.getElementById("currentQuestion");

const totalQuestionsElement =
    document.getElementById("totalQuestions");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");


// ============================================================
// TOTAL QUESTIONS
// ============================================================

totalQuestionsElement.textContent = questions.length;


// ============================================================
// SHOW QUESTION
// ============================================================

function showQuestion() {

    const question = questions[currentQuestion];

    currentQuestionElement.textContent =
        currentQuestion + 1;

    questionText.textContent =
        question.question;

    answersContainer.innerHTML = "";


    question.choices.forEach(function(choice, index) {

        const letter =
            String.fromCharCode(65 + index);

        const button =
            document.createElement("button");

        button.className = "answer";

        button.innerHTML = `
            <span class="choice-letter">
                ${letter}
            </span>

            <span>
                ${choice}
            </span>
        `;


        // Oldin tanlangan javobni ko'rsatish
        if (selectedAnswers[currentQuestion] === letter) {
            button.classList.add("selected");
        }


        // Javob tanlash
        button.addEventListener("click", function() {

            selectedAnswers[currentQuestion] =
                letter;

            document
                .querySelectorAll(".answer")
                .forEach(function(item) {
                    item.classList.remove("selected");
                });

            button.classList.add("selected");

        });


        answersContainer.appendChild(button);

    });


    // Previous tugmasi
    if (currentQuestion === 0) {
        previousButton.disabled = true;
        previousButton.style.opacity = "0.5";
        previousButton.style.cursor = "not-allowed";
    } else {
        previousButton.disabled = false;
        previousButton.style.opacity = "1";
        previousButton.style.cursor = "pointer";
    }


    // Next tugmasi
    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Finish";
    } else {
        nextButton.textContent = "Next →";
    }

}


// ============================================================
// PREVIOUS
// ============================================================

previousButton.addEventListener("click", function() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

});


// ============================================================
// NEXT / FINISH
// ============================================================

nextButton.addEventListener("click", function() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        finishTest();

    }

});


// ============================================================
// FINISH TEST
// ============================================================

function finishTest() {

    let correct = 0;

    questions.forEach(function(question, index) {

        if (
            selectedAnswers[index] === question.answer
        ) {
            correct++;
        }

    });


    alert(
        "Test tugadi!\n\n" +
        "Correct: " + correct + "/" + questions.length
    );

}


// ============================================================
// START
// ============================================================

showQuestion();