// ============================================================
// SATlab — Practice
// ============================================================


// ============================================================
// PRACTICE PAPERS
// ============================================================

const practiceData = [

    {
        id: "practice-87",
        paperNumber: 87,
        version: "Medium",
        type: "Practice Test",
        peopleTook: 731,
        lastScore: "Not taken"
    }

];


// ============================================================
// ICONS
// ============================================================

const icons = {

    document: `
        <svg viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">

            <path
                d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
            />

            <path
                d="M14 2V8H20"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
            />

            <path
                d="M8 13H16M8 17H16"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
            />

        </svg>
    `,


    book: `
        <svg viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">

            <path
                d="M3 5.5C5.5 4 8.5 4 12 6V20C8.5 18 5.5 18 3 19.5V5.5Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
            />

            <path
                d="M21 5.5C18.5 4 15.5 4 12 6V20C15.5 18 18.5 18 21 19.5V5.5Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
            />

        </svg>
    `,


    play: `
        <svg viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">

            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="1.8"
            />

            <path
                d="M10 8L16 12L10 16V8Z"
                fill="currentColor"
            />

        </svg>
    `,


    chat: `
        <svg viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">

            <path
                d="M20 11.5C20 15.64 16.42 19 12 19C10.65 19 9.38 18.68 8.27 18.12L4 20L5.55 16.2C4.58 14.92 4 13.28 4 11.5C4 7.36 7.58 4 12 4C16.42 4 20 7.36 20 11.5Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
            />

            <path
                d="M8 11.5H8.01M12 11.5H12.01M16 11.5H16.01"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
            />

        </svg>
    `

};


// ============================================================
// CREATE PAPER CARD
// ============================================================

function createPracticeCard(data) {

    const card = document.createElement("div");

    card.className = "practice-card";

    card.id = data.id;


    card.innerHTML = `

        <!-- CARD HEADER -->

        <div class="card-header">

            <div class="card-icon-box">
                ${icons.document}
            </div>

            <div class="card-title">
                Paper #${data.paperNumber}
            </div>

        </div>


        <!-- BADGES -->

        <div class="card-badges">

            <div class="badge badge-version">

                <span class="dot"></span>

                <span>
                    Version ${data.version}
                </span>

            </div>


            <div class="badge badge-type">

                ${icons.book}

                <span>
                    ${data.type}
                </span>

            </div>

        </div>


        <!-- STATISTICS -->

        <div class="card-stats">


            <div class="stat-box">

                <p class="stat-label">
                    People took
                </p>

                <p class="stat-value">
                    ${data.peopleTook}
                </p>

            </div>


            <div class="stat-box">

                <p class="stat-label">
                    Your last score
                </p>

                <p class="stat-value">
                    ${data.lastScore}
                </p>

            </div>


        </div>


        <!-- BUTTONS -->

        <div class="card-actions">


            <button
                class="btn btn-primary"
                type="button"
                onclick="startPractice('${data.id}')"
            >

                ${icons.play}

                <span>
                    Start Test
                </span>

            </button>


            <button
                class="btn btn-outline"
                type="button"
                onclick="discussPractice('${data.id}')"
            >

                ${icons.chat}

                <span>
                    Discuss
                </span>

            </button>


        </div>

    `;


    return card;
}


// ============================================================
// RENDER ALL PAPERS
// ============================================================

function renderPracticeCards() {

    const container =
        document.getElementById("papersContainer");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    practiceData.forEach(function(data) {

        const card =
            createPracticeCard(data);

        container.appendChild(card);

    });

}


// ============================================================
// START TEST
// ============================================================

function startPractice(id) {

    const test =
        practiceData.find(function(item) {

            return item.id === id;

        });


    if (!test) {
        return;
    }


    // Paper raqamini test sahifasiga yuboradi

    window.location.href =
        "test.html?paper=" + test.paperNumber;

}


// ============================================================
// DISCUSS
// ============================================================

function discussPractice(id) {

    const test =
        practiceData.find(function(item) {

            return item.id === id;

        });


    if (!test) {
        return;
    }


    alert(
        "Paper #" +
        test.paperNumber +
        " discussion will be available soon."
    );

}


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderPracticeCards();

    }
);