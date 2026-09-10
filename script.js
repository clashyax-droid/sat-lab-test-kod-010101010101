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
}

navItems.forEach(item => {

  item.addEventListener("click", () => {

    const target = item.getAttribute("data-page");

    showPage(target);

  });

});


/* PRACTICE BUTTON */

document.getElementById("practiceBtn").addEventListener("click", () => {
  showPage("practice");
});


/* VALUES */

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


/* INITIAL */

updateScores();