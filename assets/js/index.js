const driver = ["Lewis Hamilton", "George Russell", "Max Verstappen", "", "Fernando Alonso"];
let driversCount = 0;
let position = 0;
const drivers = ["Lewis Hamilton", "George Russell", "Max Verstappen", "", "Fernando Alonso"];

function shuffleArray(drivers) {
    for (let index = drivers.length - 1; index > 0; index--) {
        let driverIndex = Math.floor(Math.random() * (index + 1));
        [drivers[index], drivers[driverIndex]] = [drivers[driverIndex], drivers[index]];
    }
}

function resetAnswers() {
    let shuffledArray = [];
    do {
        shuffleArray(drivers);
        shuffledArray = [drivers[0], drivers[1], drivers[2]];
    } while (shuffledArray.includes(driver[driversCount]));
    shuffledArray.push(driver[driverCount]);
    shuffleArray(shuffledArray);
    $(".answer-driver-a").text(shuffledArray[0]);
    $(".answer-driver-b").text(shuffledArray[1]);
    $(".answer-driver-c").text(shuffledArray[2]);
    $(".answer-driver-d").text(shuffledArray[3]);
}

function renderNextQuestion() {
    resetAnswers();
    resetButtons();
    nextFlag();
    endGame();
}

function evaluateAnswer(incrementScore) {
    setTimeout(function () {
        if (incrementScore === true) {
            score++;
        }
        driversCount++;
        changeCounters();
        renderNextQuestion();
    }, 2000);
}

function startGame() {
    $(".answer-button").attr("disabled", true);
    let answer = driver[driversCount];
    if ($(this).text().match(answer)) {
        $(this).css("background-color", "green");
        evaluateAnswer(true);
    } else {
        $(this).css("background-color", "red");
        $(".answer-button:contains('" + answer + "')").css("background-color",
            "green");
        evaluateAnswer(false);
    }
}

function changeCounters() {
    $(".flag-count").text("driver: " + driversCount + "/" + driver.length);
    $(".position").text("position: " + position);
}

function followingdriver() {
    $(".driver").attr("src", "assets/images/" + driver[driversCount] + "Lewis Hamilton.jpg");
}
function resetButtons() {
    $(".answer-button").css("background-color", "#df9a57");
    $(".answer-button").attr("disabled", false);
}

function endGame() {
    if (driversCount === driver.length) {
        $(".driver").attr("src", "assets/images/" + flags[0] + "George Russel.jpg");
        if (score < flags.length / 2) {
            $(".end-modal-title").text("You Lost!");
        } else {
            $(".end-modal-title").text("Congratulations you know your F1 Drivers!");
        }
        $(".end-modal-score").text("position: " + position + " /" +
            driver.length);
        $("#endModal").modal("show");
    }
}

/**
 * Resets the game.
 */
function resetGame() {
    driversCount = 0;
    position = 0;
    changeCounters();
    renderNextQuestion();
}

function initializeGame() {
    changeCounters();
    $("#startModal").modal("show");
    $(".reset-button").on("click", resetGame);
    $(".answer-button").on("click", playGame);
    renderNextQuestion();
}

$(document).ready(initializeGame);