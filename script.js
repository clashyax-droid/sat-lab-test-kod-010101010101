/* SIDEBAR */

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});


/* NAVIGATION */

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

function showPage(target){

  navItems.forEach(item => {
    item.classList.toggle(
      "active",
      item.getAttribute("data-page") === target
    );
  });

  pages.forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById("page-" + target).classList.add("active");

  if(target === "practice"){
    renderPracticeList();
  }

}

navItems.forEach(item => {

  item.addEventListener("click", () => {

    const target = item.getAttribute("data-page");

    showPage(target);

  });

});


/* HOME "Practice on Platform" BUTTON */

document.getElementById("practiceBtn").addEventListener("click", () => {
  showPage("practice");
});


/* VALUES (SAT calculator) */

const values = {
  rwM1:14,
  rwM2:14,
  mathM1:11,
  mathM2:11
};


/* ELEMENTS */

const ranges = {
  rwM1:document.getElementById("rwM1Range"),
  rwM2:document.getElementById("rwM2Range"),
  mathM1:document.getElementById("mathM1Range"),
  mathM2:document.getElementById("mathM2Range")
};


/* COUNTER BUTTONS */

document.querySelectorAll(".counter-btn").forEach(button => {

  button.addEventListener("click", () => {

    const target = button.getAttribute("data-target");
    const change = Number(button.getAttribute("data-change"));

    let value = values[target] + change;

    const max = target.startsWith("rw") ? 27 : 22;

    value = Math.max(0, Math.min(max, value));

    values[target] = value;

    ranges[target].value = value;

    updateScores();

  });

});


/* SLIDERS */

Object.keys(ranges).forEach(key => {

  ranges[key].addEventListener("input", () => {

    values[key] = Number(ranges[key].value);

    updateScores();

  });

});


/* SCORE CALCULATION */

function calculateSection(m1, max1, m2, max2){

  const firstPercentage = m1 / max1;

  const hard = firstPercentage >= 0.70;

  let weighted;

  if(hard){

    weighted =
      (m1 / max1) * 0.42 +
      (m2 / max2) * 0.58;

  }else{

    weighted =
      (m1 / max1) * 0.58 +
      (m2 / max2) * 0.42;

  }

  let score = 200 + weighted * 600;

  score = Math.round(score / 10) * 10;

  score = Math.max(200, Math.min(800, score));

  return {
    score:score,
    hard:hard
  };

}


/* UPDATE SCORES */

function updateScores(){

  const rw1 = values.rwM1;
  const rw2 = values.rwM2;

  const math1 = values.mathM1;
  const math2 = values.mathM2;


  /* RW */

  document.getElementById("rwM1Big").textContent = rw1;
  document.getElementById("rwM2Big").textContent = rw2;

  document.getElementById("rwM1Label").textContent =
    rw1 + " / 27";

  document.getElementById("rwM2Label").textContent =
    rw2 + " / 27";


  /* MATH */

  document.getElementById("mathM1Big").textContent = math1;
  document.getElementById("mathM2Big").textContent = math2;

  document.getElementById("mathM1Label").textContent =
    math1 + " / 22";

  document.getElementById("mathM2Label").textContent =
    math2 + " / 22";


  /* SCORE */

  const rw = calculateSection(rw1,27,rw2,27);
  const math = calculateSection(math1,22,math2,22);

  const total = rw.score + math.score;


  /* DISPLAY */

  document.getElementById("rwScore").textContent = rw.score;
  document.getElementById("mathScore").textContent = math.score;
  document.getElementById("totalScore").textContent = total;


  /* RW ADAPTIVE */

  const rwBadge = document.getElementById("rwRouteBadge");
  const rwRoute = document.getElementById("rwRouteText");

  if(rw.hard){

    rwBadge.textContent = "HARD";
    rwRoute.textContent = "Module 2 → Hard";

  }else{

    rwBadge.textContent = "STANDARD";
    rwRoute.textContent = "Module 2 → Standard";

  }


  /* MATH ADAPTIVE */

  const mathBadge = document.getElementById("mathRouteBadge");
  const mathRoute = document.getElementById("mathRouteText");

  if(math.hard){

    mathBadge.textContent = "HARD";
    mathRoute.textContent = "Module 2 → Hard";

  }else{

    mathBadge.textContent = "STANDARD";
    mathRoute.textContent = "Module 2 → Standard";

  }


  /* SCORE MESSAGE */

  const overallCard = document.getElementById("overallCard");
  const message = document.getElementById("scoreMessage");

  overallCard.classList.remove("dice-on");

  if(total >= 1400){

    overallCard.classList.add("dice-on");

    message.textContent =
      "Amazing! 1400+ — excellent work!";

  }
  else if(total >= 1200){

    message.textContent =
      "Great! 1200+ — keep pushing for 1400!";

  }
  else if(total >= 1000){

    message.textContent =
      "Good start — keep practicing!";

  }
  else{

    message.textContent =
      "Keep practicing — you can improve.";

  }

}


/* INITIAL (home page) */

updateScores();


/* ============================================= */
/* PRACTICE SECTION                               */
/* ============================================= */

/*
  Yangi test qo'shmoqchi bo'lsangiz, shunchaki quyidagi
  massivga yangi obyekt qo'shing. Boshqa kodni
  o'zgartirish shart emas.

  id            -> unique kalit (localStorage uchun)
  title         -> "Paper #1" kabi nom
  difficulty    -> "Easy" / "Medium" / "Hard"
  basePeople    -> boshlang'ich "people took" soni
  questions     -> savollar massivi (hozircha 1 tadan qo'yilgan)
*/

const practiceTests = [
  {
    id:"paper-1",
    title:"Paper #1",
    difficulty:"Medium",
    basePeople:128,
    questions:[
      {
        question:"Siz developermisiz?",
        options:["Ha","Yo‘q"],
        correctIndex:1
      }
    ]
  }
];


/* STATE (joriy ochiq test) */

let currentTest = null;
let currentAnswered = false;


/* LOCAL STORAGE HELPERS */

function getTestStats(test){

  const raw = localStorage.getItem("satlab_" + test.id);

  if(raw){
    return JSON.parse(raw);
  }

  return {
    peopleTook:test.basePeople,
    lastScore:null
  };

}

function saveTestStats(test, stats){

  localStorage.setItem("satlab_" + test.id, JSON.stringify(stats));

}


/* ICONS */

const iconPaper = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
  <path d="M14 3v4h4"/>
</svg>`;

const iconBook = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v16H6.5A2.5 2.5 0 0 0 4 21z"/>
  <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v16h5.5a2.5 2.5 0 0 1 2.5 2.5z"/>
</svg>`;

const iconPlay = `
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M8 5v14l11-7z"/>
</svg>`;

const iconChat = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4L21 21l-4.1-1.1a8.5 8.5 0 1 1 4.1-8.4z"/>
</svg>`;

const iconBack = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 12H5"/>
  <path d="M11 18l-6-6 6-6"/>
</svg>`;


/* RENDER PRACTICE LIST */

function renderPracticeList(){

  const list = document.getElementById("practiceList");
  const quizView = document.getElementById("quizView");

  quizView.classList.remove("active");
  list.style.display = "grid";

  list.innerHTML = "";

  practiceTests.forEach(test => {

    const stats = getTestStats(test);

    const card = document.createElement("div");
    card.className = "paper-card";

    card.innerHTML = `
      <div class="paper-card-top">
        <div class="paper-icon">${iconPaper}</div>
        <div class="paper-title">${test.title}</div>
      </div>

      <div class="paper-badges">
        <span class="badge badge-difficulty">
          <span class="dot"></span> Version ${test.difficulty}
        </span>
        <span class="badge badge-type">
          ${iconBook} Practice Test
        </span>
      </div>

      <div class="paper-stats">
        <div class="paper-stat">
          <div class="paper-stat-label">People took</div>
          <div class="paper-stat-value">${stats.peopleTook}</div>
        </div>
        <div class="paper-stat">
          <div class="paper-stat-label">Your last score</div>
          <div class="paper-stat-value">${stats.lastScore ? stats.lastScore : "Not taken"}</div>
        </div>
      </div>

      <div class="paper-actions">
        <button class="start-btn" data-test="${test.id}">
          ${iconPlay} Start Test
        </button>
        <button class="discuss-btn">
          ${iconChat} Discuss
        </button>
      </div>
    `;

    list.appendChild(card);

  });


  /* START TEST BUTTONS */

  document.querySelectorAll(".start-btn").forEach(btn => {

    btn.addEventListener("click", () => {

      const testId = btn.getAttribute("data-test");
      const test = practiceTests.find(t => t.id === testId);

      startQuiz(test);

    });

  });


  /* DISCUSS BUTTONS (hozircha faqat vizual) */

  document.querySelectorAll(".discuss-btn").forEach(btn => {

    btn.addEventListener("click", () => {
      alert("Discuss bo‘limi tez orada qo‘shiladi.");
    });

  });

}


/* START QUIZ */

function startQuiz(test){

  currentTest = test;
  currentAnswered = false;

  const list = document.getElementById("practiceList");
  const quizView = document.getElementById("quizView");

  list.style.display = "none";
  quizView.classList.add("active");

  const question = test.questions[0];

  quizView.innerHTML = `
    <div class="quiz-card">

      <div class="quiz-progress">${test.title} · 1 / ${test.questions.length} savol</div>

      <div class="quiz-question">${question.question}</div>

      <div class="quiz-options" id="quizOptions">
        ${question.options.map((opt, i) => `
          <button class="quiz-option" data-index="${i}">${opt}</button>
        `).join("")}
      </div>

      <div class="quiz-result" id="quizResult"></div>

      <button class="quiz-back-btn" id="quizBackBtn" style="display:none;">
        ${iconBack} Ortga qaytish
      </button>

    </div>
  `;

  const optionButtons = quizView.querySelectorAll(".quiz-option");

  optionButtons.forEach(btn => {

    btn.addEventListener("click", () => {

      if(currentAnswered) return;

      currentAnswered = true;

      const chosenIndex = Number(btn.getAttribute("data-index"));
      const isCorrect = chosenIndex === question.correctIndex;

      optionButtons.forEach(b => {

        b.disabled = true;

        const bIndex = Number(b.getAttribute("data-index"));

        if(bIndex === question.correctIndex){
          b.classList.add("correct");
        }
        else if(bIndex === chosenIndex && !isCorrect){
          b.classList.add("wrong");
        }

      });

      const resultBox = document.getElementById("quizResult");
      resultBox.classList.add("show");

      const scoreText = isCorrect ? "1 / 1" : "0 / 1";

      if(isCorrect){
        resultBox.classList.add("pass");
        resultBox.textContent = "To‘g‘ri! Natija: " + scoreText;
      }else{
        resultBox.classList.add("fail");
        resultBox.textContent = "Xato. To‘g‘ri javob: " + question.options[question.correctIndex] + " — Natija: " + scoreText;
      }

      /* STATS SAVE */

      const stats = getTestStats(test);
      stats.peopleTook = stats.peopleTook + 1;
      stats.lastScore = scoreText;
      saveTestStats(test, stats);

      document.getElementById("quizBackBtn").style.display = "flex";

    });

  });

  document.getElementById("quizBackBtn").addEventListener("click", () => {
    renderPracticeList();
  });

}
