"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParameterByName = exports.saveResultsToCSV = exports.endTask = exports.chooseOption = exports.points = exports.results = exports.currentStage = exports.totalRounds = exports.round = void 0;
exports.round = 1;
// export let totalRounds: number = 10; // for debugging
exports.totalRounds = 10;
exports.currentStage = "instructions"; // [instructions, stage1, stage2]
exports.results = [];
exports.points = 0;
// variables for game setting 1
var REWARD_1 = { points: 100, image: "img/gem-emerald.png" };
var REWARD_2 = { points: 0, image: "img/dust.png" };
// // variables for game setting 2
// const REWARD_1 = { points: 100, image: "img/gem-sapphire.png" };
// const REWARD_2 = { points: 100, image: "img/gem-ruby.png" };
// likelihoods for game setting 1
var stage2Options = {
    "A": { likelihoods: [1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
    "B": { likelihoods: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0] },
    "C": { likelihoods: [1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
    "D": { likelihoods: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0] },
};
// // likelihoods for game setting 2
// const stage2Options = {
//     "A": { likelihoods: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7] },
//     "B": { likelihoods: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3] },
//     "C": { likelihoods: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7] },
//     "D": { likelihoods: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3] },
// }
function chooseOption(option) {
    var outcome = '';
    var reward = 0;
    var rewardImage = '';
    if (exports.currentStage === "stage1") { // Stage 1: Option X or Y
        if (option === 'X') {
            outcome = Math.random() < 1.0 ? 'X' : 'Y';
        }
        else {
            outcome = Math.random() < 1.0 ? 'Y' : 'X';
        }
        exports.currentStage = "stage2";
        // Show Stage 2 Options, hide stage 1 display
        document.getElementById('stage-2-options').style.display = "block";
        document.getElementById('stage-1-options').style.display = "none";
        // determine which set of options in stage 2 to display
        if (outcome === 'X') {
            document.getElementById('planet-X-options').style.display = "block";
            document.getElementById('planet-Y-options').style.display = "none";
        }
        else { // Option Y
            document.getElementById('planet-Y-options').style.display = "block";
            document.getElementById('planet-X-options').style.display = "none";
        }
        ;
    }
    else { // Stage 2: Option A, B, C, or D
        console.log("option: " + option);
        // get stage2Options with only the user's choice at this step
        // e.g. likelihoods: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0]
        var choiceConfig = stage2Options[option];
        console.log("choiceConfig.likelihoods: " + choiceConfig.likelihoods);
        if (choiceConfig) {
            var likelihoods = choiceConfig.likelihoods;
            var currentLikelihood = likelihoods[exports.round]; // pick the likelihood associated with this round
            if (Math.random() < currentLikelihood) {
                outcome = option;
                reward = REWARD_1.points;
                rewardImage = REWARD_1.image;
            }
            else {
                outcome = option;
                reward = REWARD_2.points;
                rewardImage = REWARD_2.image;
            }
            exports.points += reward;
            document.getElementById('pointCounter').innerText = exports.points.toString();
        }
        else {
            console.log("choiceConfig doesn't exist");
        }
        // move to the next round
        exports.round++;
        console.log("round: " + exports.round);
        // check if at the end of game
        if (exports.round <= exports.totalRounds) {
            exports.currentStage = "stage1";
            // Show Stage 1 Displays
            document.getElementById('stage-1-options').style.display = "block";
            document.getElementById('stage-2-options').style.display = "none";
        }
        else {
            endTask();
        }
    }
    // Choice Result Display (mostly for debugging)
    // document.getElementById('result')!.innerText = `You chose ${option}. Outcome: ${outcome}. Reward: ${reward}`;
    //document.getElementById('result').innerText = `You won a reward: ${reward}`; // this needs to be removed
    exports.results.push({ round: exports.round, choice: option, outcome: outcome, reward: reward, rewardImage: rewardImage });
    document.getElementById('roundNumber').innerText = exports.round.toString();
}
exports.chooseOption = chooseOption;
// Event listener for instructions screen
var handleKeydown = function (event) {
    console.log("key event logged");
    // if (event.target && (event.target as HTMLElement).id !== 'instructions-screen') return; // Ignore keydown events outside the instructions screen
    if (exports.currentStage == "instructions") {
        console.log("second key event logged");
        document.getElementById('instructions-screen').style.display = 'none';
        document.getElementById('game-display').style.display = 'block';
        exports.currentStage = "stage1";
    }
    // Remove the event listener after continuing from the instructions screen
    document.removeEventListener('keydown', handleKeydown);
};
document.addEventListener('keydown', handleKeydown);
// Event listener for making key presses in Stage 1 and Stage 2
document.addEventListener('keydown', function (event) {
    var _a;
    event.preventDefault(); // Prevent default scrolling behavior of arrow keys
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        var choice = void 0;
        if (exports.currentStage === 'stage1') {
            choice = event.key === 'ArrowLeft' ? 'X' : 'Y';
        }
        else {
            choice = event.key === 'ArrowLeft' ? 'A' : 'B';
            if (((_a = document.getElementById('planet-Y-options')) === null || _a === void 0 ? void 0 : _a.style.display) === 'block') {
                choice = event.key === 'ArrowLeft' ? 'C' : 'D';
            }
        }
        chooseOption(choice);
    }
});
function endTask() {
    // End of the task, save results to CSV
    saveResultsToCSV(exports.results);
    // wipe the game display elements and notify participant of end of study
    document.getElementById('game-status').style.display = "block";
    document.getElementById('game-display').style.display = "none";
    // this resets the round and points but not reflected in the display until 1-2 rounds later
    exports.round = 1;
    exports.results = [];
    exports.points = 0;
    // alert("Task completed! Thank you for participating.");
}
exports.endTask = endTask;
function saveResultsToCSV(results) {
    var subjectId = getParameterByName('subject_id', window.location.href) || 'UnknownSubject';
    // alternative: let subjectId: string = getParameterByName('subject_id', window.location.href) ?? 'UnknownSubject';
    var timestamp = new Date().toISOString().replace(/:/g, '-');
    var filename = "data/two_step_task_results_".concat(subjectId, "_").concat(timestamp, ".csv");
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Round,Choice,Outcome,Reward\n";
    results.forEach(function (result) {
        var row = result.round + "," + result.choice + "," + result.outcome + "," + result.reward + "\n";
        csvContent += row;
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
}
exports.saveResultsToCSV = saveResultsToCSV;
// Function to get URL parameter by name
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
exports.getParameterByName = getParameterByName;
// Attach the chooseOption function to the window object
window.chooseOption = chooseOption;
