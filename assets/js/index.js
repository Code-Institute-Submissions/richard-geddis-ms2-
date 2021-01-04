const driver = ["Lewis Hamilton", "George Russell", "Max Verstappen", "", "Fernando Alonso"];
let driverCount = 0;
let position = 0;
const grid = ["Lewis Hamilton", "George Russell", "Max Verstappen", "", "Fernando Alonso"];

function shuffleArray(grid) {
    for (let index = grid.length - 1; index > 0; index--) {
        let gridIndex = Math.floor(Math.random() * (index + 1));
        [grid[index], grid[gridIndex]] = [grid[gridIndex], grid[index]];
    }
}
function resetAnswers() {
    let shuffledArray = [];
    do {
        shuffleArray(grid);
        shuffledArray = [grid[0], grid[1], grid[2]];
    } while (shuffledArray.includes(driver[driverCount]));
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
    nextDriver();
    endGame();
}

function evaluateAnswer(incrementPosition) {
    setTimeout(function () {
        if (incrementPosition === true) {
            position++;
        }
        driverCount++;
        changeCounters();
        renderNextQuestion();
    }, 2000);
}

function startGame() {
    $(".answer-button").attr("disabled", true);
    let answer = driver[driverCount];
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
    $(".driver-count").text("driver: " + driverCount + "/" + driver.length);
    $(".position").text("position: " + position);
}

function followingdriver() {
    $(".driver").attr("src", "assets/images/" + driver[driverCount] + "Lewis Hamilton.jpg");
}
function resetButtons() {
    $(".answer-button").css("background-color", "#df9a57");
    $(".answer-button").attr("disabled", false);
}

function endGame() {
    if (driverCount === driver.length) {
        $(".driver").attr("src", "assets/images/" + driver[0] + "George Russel.jpg");
        if (position < driver.length / 2) {
            $(".end-title").text("You Lost!");
        } else {
            $(".end-modal-title").text("Congratulations you know your F1 Drivers!");
        }
        $(".end-position").text("position: " + position + " /" +
            driver.length);
        $("#endModal").modal("show");
    }
}

function resetGame() {
    driverCount = 0;
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