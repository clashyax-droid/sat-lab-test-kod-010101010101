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
    const change =
