"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParameterByName = exports.saveResultsToCSV = exports.chooseOption = exports.points = exports.results = exports.totalRounds = exports.round = void 0;
exports.round = 1;
exports.totalRounds = 10;
exports.results = [];
exports.points = 0;
// export let rewardA: number[] = [1, 2]; // Rewards for choosing Option X in different worlds (80% and 20%)
// export let rewardB: number[] = [3, 4];  // Rewards for choosing Option Y in different worlds (80% and 20%)
var stage2Options = {
    "X": { likelihoods: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.1] },
    "Y": { likelihoods: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.1] },
    "Z": { likelihoods: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.1] },
    "W": { likelihoods: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.1] },
};
var GEM_REWARD = { points: 100, image: "img/gem-emerald.png" };
var DUST_REWARD = { points: 100, image: "img/dust.png" };
var GEM_A_REWARD = { points: 100, image: "img/gem-sapphire.png" };
var GEM_B_REWARD = { points: 100, image: "img/gem-ruby.png" };
function chooseOption(option) {
    var outcome = '';
    var reward = 0;
    var rewardImage = '';
    if (exports.round % 2 === 1) { // Stage 1: Choosing Option A and Option B
        if (option === 'A') {
            outcome = Math.random() < 0.7 ? 'A' : 'B';
        }
        else {
            outcome = Math.random() < 0.7 ? 'B' : 'A';
        }
        document.getElementById('stage').innerText = "You have arrived to an alien planet: Choose between these two alien traders";
        // Displaying images for stage 2
        if (outcome === 'A') {
            document.getElementById('task').innerHTML = "\n            <img src=\"img/Stage2-alien-red-A.png\" alt=\"Option X\" onclick=\"chooseOption('X')\" style=\"cursor: pointer;\">\n            <img src=\"img/Stage2-alien-red-B.png\" alt=\"Option Y\" onclick=\"chooseOption('Y')\" style=\"cursor: pointer;\">\n            ";
        }
        else {
            document.getElementById('task').innerHTML = "\n            <img src=\"img/Stage2-alien-purple-A.png\" alt=\"Option Z\" onclick=\"chooseOption('Z')\" style=\"cursor: pointer;\">\n            <img src=\"img/Stage2-alien-purple-B.png\" alt=\"Option W\" onclick=\"chooseOption('W')\" style=\"cursor: pointer;\">\n            ";
        }
    }
    else { // Stage 2: Choosing Option X, Y, Z, or W
        console.log("option: " + option);
        var choiceConfig = stage2Options[option];
        console.log("choiceConfig: " + choiceConfig);
        if (choiceConfig) {
            var likelihoods = choiceConfig.likelihoods;
            var currentLikelihood = likelihoods[Math.floor((exports.round - 1) / 2)];
            if (Math.random() < currentLikelihood) {
                outcome = option;
                reward = GEM_REWARD.points;
                rewardImage = GEM_REWARD.image;
            }
            else {
                outcome = option;
                reward = DUST_REWARD.points;
                rewardImage = DUST_REWARD.image;
            }
            exports.points += reward;
            document.getElementById('pointCounter').innerText = exports.points.toString();
        }
        document.getElementById('stage').innerText = "Stage 1: Choose between these two options";
        document.getElementById('task').innerHTML = "\n        <img src=\"img/Stage1-rocket-A.png\" alt=\"Option A\" onclick=\"chooseOption('A')\" style=\"cursor: pointer;\">\n        <img src=\"img/Stage1-rocket-B.png\" alt=\"Option B\" onclick=\"chooseOption('B')\" style=\"cursor: pointer;\">\n        ";
    }
    document.getElementById('result').innerText = "You chose ".concat(option, ". Outcome: ").concat(outcome, ". Reward: ").concat(reward);
    //document.getElementById('result').innerText = `You won a reward: ${reward}`; // this needs to be removed
    exports.results.push({ round: exports.round, choice: option, outcome: outcome, reward: reward, rewardImage: rewardImage });
    exports.round++;
    document.getElementById('roundNumber').innerText = exports.round.toString();
    if (exports.round > exports.totalRounds) {
        // End of the task, save results to CSV
        saveResultsToCSV(exports.results);
        // this resets the round and points but not reflected in the display until 1-2 rounds later
        exports.round = 1;
        exports.results = [];
        exports.points = 0;
        alert("Task completed! Thank you for participating.");
    }
}
exports.chooseOption = chooseOption;
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