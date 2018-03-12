// Set initial variables
var correct = 0;
var incorrect = 0;
var notAnswered = 0;
var seconds = 60;
var intervalId;

// Trivia questions object
var triviaQuestions = [
    {
        question: "How long did the Hundred Years War last?",
        options: {
            a: "50 year",
            b: "100 years",
            c: "116 years",
            d: "124 years"
        },
        answer: "c"
    },

    {
        question: "Which country makes Panama Hats?",
        options: {
            a: "China",
            b: "Ecuador",
            c: "Panama",
            d: "Venezuela"
        },
        answer: "b"
    },

    {
        question: "In which month do Russians celebrate the October Revolution?",
        options: {
            a: "September",
            b: "October",
            c: "November",
            d: "December"
        },
        answer: "c"
    }

]

// Hide cards and done button at the start of the game
$("#done-game").hide();
$("#trivia-questions").hide();
$("#trivia-results").hide();

// On click event to start the game and finish the game
$("#start-game").on("click", showQuestions);
$("#done-game").on("click", showResults);

// Star game function
function showQuestions() {

    // Hide start button and show initial remaining time
    $("#start-game").hide();
    $("#trivia-questions").show();
    $("#done-game").show();
    $("#text-timer").text("Time Remaining: " + seconds + " seconds");

    // Create timer if one hasn't been created
    if (!intervalId) {
        intervalId = setInterval(timer, 1000);
    }

    // Loop through the triviaQuestions and output the html to the page
    for (var i = 0; i < triviaQuestions.length; i++) {
        // create div to hold the anwsers
        var optionDiv = $(`<div class="btn-group btn-group-toggle" data-toggle="buttons">`)
        // Loop through the answers object and append the html to the div above
        for (option in triviaQuestions[i].options) {
            optionDiv.append(
                `<label class="btn btn-secondary">
                    <input type="radio" name="question-${i}" autocomplete="off" value="${option}"> ${triviaQuestions[i].options[option]}
                </label>`);
        };
        // Append answers to each of the questions and the questions to the page
        $("#trivia-questions")
        .append(
            `<div class="card-body">
                <p class="card-text">${triviaQuestions[i].question}</p>
            </div>`)
        .append(optionDiv)
    }
};

// Display timer on screen
function timer() {

    // Decrease seconds remaining
    seconds--;

    // Display it on the screen
    $("#text-timer").text("Time Remaining: " + seconds + " seconds");

    if (seconds === 0) {
        showResults();
    }
};

function showResults() {

    $("#done-game").hide();
    $("#trivia-questions").hide();
    $("#text-timer").hide();
    $("#trivia-results").show();
    clearInterval(intervalId);

    // Evaluate the results
    var userAnswer = "";
    for (var i = 0; i < triviaQuestions.length; i++) {
        userAnswer = $(`input[name=question-${i}]:checked`).val()
        if (!userAnswer) {
            notAnswered++;
            console.log("undefined")
        } else if (userAnswer === triviaQuestions[i].answer){
            correct++;
            console.log("yes")
        } else {
            incorrect++;
        }
    };

    // Output html
    $("#trivia-results").append(
        `<div class="card-body">
                <h1 class="display-4">Results!</h1>
                <p class="card-text">Correct Answers: ${correct}</p>
                <p class="card-text">Incorrect Answers: ${incorrect}</p>
                <p class="card-text">Unanswered: ${notAnswered}</p>
        </div>`
    )

}


