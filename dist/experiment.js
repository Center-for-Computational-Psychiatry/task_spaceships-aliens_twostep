"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParameterByName = exports.saveResultsToCSV = exports.endTask = exports.startMainStudy = exports.transitionToMainStudy = exports.chooseOption = exports.intertrialInterval2 = exports.intertrialInterval1 = exports.stage1Probability = exports.keyInputAllowed = exports.results = exports.currentStage = exports.points = exports.totalRounds = exports.mainRounds = exports.practiceRounds = exports.round = void 0;
exports.round = 1;
exports.practiceRounds = 10;
exports.mainRounds = 150;
exports.totalRounds = exports.practiceRounds;
exports.points = 0;
exports.currentStage = "welcome"; // [welcome, instructions1, instructions2, instructions3, practiceStage1, practiceStage2, instructionsFinal, mainStage1, mainStage2]
exports.results = [];
exports.keyInputAllowed = true; // Flag to control input
exports.stage1Probability = 0.8;
exports.intertrialInterval1 = 0;
exports.intertrialInterval2 = 0;
console.log("intertrialInterval1: " + exports.intertrialInterval1);
console.log("intertrialInterval2: " + exports.intertrialInterval2);
// variables for game setting 1
var REWARD_1 = { points: 100, image: "reward-img-gem", message: "You found a gem (+100 points)! You return to Earth..." };
var REWARD_2 = { points: 0, image: "reward-img-dirt", message: "You found some dirt (no points)! You return to Earth..." };
// // variables for game setting 2
// const REWARD_1 = { points: 100, image: "img/gem-sapphire.png" };
// const REWARD_2 = { points: 100, image: "img/gem-ruby.png" };
// likelihoods for game setting 1
var stage2Options = {
    "A": { likelihoods: [0.7, 0.6, 0.7, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.6, 0.6, 0.6, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6, 0.5, 0.5, 0.4, 0.5, 0.5, 0.4, 0.4, 0.5, 0.4, 0.4, 0.5, 0.4, 0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.3, 0.3, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.6, 0.6, 0.6, 0.5, 0.5, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.5, 0.5, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.7, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.7, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4] },
    "B": { likelihoods: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6, 0.6, 0.6, 0.7, 0.7, 0.6, 0.6, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 0.7, 0.6, 0.6, 0.6, 0.5, 0.5, 0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.5, 0.5, 0.5, 0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.6, 0.6, 0.6, 0.6, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.5, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.5, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.5, 0.4, 0.4, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4] },
    "C": { likelihoods: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6, 0.6, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.5, 0.5, 0.6, 0.6, 0.5, 0.6, 0.6, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6, 0.7, 0.6, 0.6, 0.7, 0.7, 0.6, 0.6, 0.6, 0.6, 0.6, 0.7, 0.7, 0.7, 0.7, 0.6, 0.7, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.5, 0.6, 0.5, 0.5, 0.4, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.5, 0.5, 0.5, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.7, 0.6, 0.7, 0.7, 0.6, 0.6, 0.6, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.4, 0.4, 0.3, 0.3, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3] },
    "D": { likelihoods: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.4, 0.3, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.4, 0.3, 0.4, 0.4, 0.3, 0.4, 0.4, 0.3, 0.4, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3, 0.4, 0.4, 0.3, 0.4, 0.4, 0.4, 0.4, 0.4, 0.5, 0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.3, 0.3, 0.5, 0.5, 0.6, 0.6, 0.6, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6, 0.7, 0.6, 0.6, 0.6, 0.6, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.5, 0.6, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.6, 0.6] },
};
function chooseOption(option) {
    if (!exports.keyInputAllowed)
        return; // Ignore keyboard input if not allowed
    var outcome = '';
    var reward = 0;
    var rewardImage = '';
    var rewardMessage = '';
    // NOTE: Do not put round counter here because not updated until much later stage
    if (exports.currentStage === "mainStage1" || exports.currentStage === "practiceStage1") { // Stage 1: Option X or Y
        exports.intertrialInterval1 = [500, 1000, 1500][Math.floor(Math.random() * 3)]; // 500, 1000, or 1500 millisecond
        exports.intertrialInterval2 = 0;
        console.log("intertrialInterval1: " + exports.intertrialInterval1);
        console.log("intertrialInterval2: " + exports.intertrialInterval2);
        if (option === 'X') {
            outcome = Math.random() < exports.stage1Probability ? 'X' : 'Y';
        }
        else { // option Y
            outcome = Math.random() < exports.stage1Probability ? 'Y' : 'X';
        }
        // NOTE: Do not put round counter here because not updated until much later stage
        exports.results.push({ stage: exports.currentStage, round: exports.round, choice: option, outcome: outcome, reward: reward, points: exports.points, rewardImage: rewardImage });
        // Introduce intertrialInterval delay between Stage 1 user choice and Stage 2 display
        setTimeout(function () {
            // Determine which key options to display (practice vs. main trials)
            if (exports.currentStage === "mainStage1") {
                // Switch main stages
                exports.currentStage = "mainStage2";
                // Show Stage 2 Options, hide stage 1 display
                document.getElementById('stage-1-main-instructions').style.display = "none";
                document.getElementById('stage-2-main-instructions').style.display = "block";
            }
            else { // currentStage === practiceStage1
                // Switch practice stages
                exports.currentStage = "practiceStage2";
                // Show Stage 2 Practice Options, hide stage 1 practice display
                document.getElementById('stage-1-practice-instructions').style.display = "none";
                document.getElementById('stage-2-practice-instructions').style.display = "block";
            }
            // Show Stage 2 Options, hide stage 1 display (same for both main and practice)
            document.getElementById('stage-2-options').style.display = "block";
            document.getElementById('stage-1-options').style.display = "none";
            // Determine which Planet in Stage 2 to display
            if (outcome === 'X') {
                document.getElementById('planet-X-options').style.display = "block";
                document.getElementById('planet-Y-options').style.display = "none";
            }
            else { // Option Y
                document.getElementById('planet-Y-options').style.display = "block";
                document.getElementById('planet-X-options').style.display = "none";
            }
            ;
            console.log("intertrialInterval1 before timeout: " + exports.intertrialInterval1);
            exports.keyInputAllowed = true; // Re-allow keyboard input after intertrial interval ends
        }, exports.intertrialInterval1); // 0.5 or 1.0 seconds
    }
    else if (exports.currentStage === "mainStage2" || exports.currentStage === "practiceStage2") { // Stage 2: Option A, B, C, or D
        exports.intertrialInterval2 = [500, 1000, 1500][Math.floor(Math.random() * 3)]; // 500, 1000, or 1500 millisecond
        console.log("intertrialInterval1: " + exports.intertrialInterval1);
        console.log("intertrialInterval2: " + exports.intertrialInterval2);
        console.log("option: " + option);
        // get stage2Options with only the user's choice at this step
        // e.g. likelihoods: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0]
        var userChoice = stage2Options[option];
        console.log("choiceConfig.likelihoods: " + userChoice.likelihoods);
        if (userChoice) {
            var likelihoods = userChoice.likelihoods;
            var currentLikelihood = likelihoods[exports.round - 1]; // pick the likelihood associated with this round (minu one for array index)
            console.log("currentLikelihood: " + currentLikelihood);
            // select reward from user choice
            if (Math.random() < currentLikelihood) {
                outcome = option;
                reward = REWARD_1.points;
                rewardImage = REWARD_1.image;
                rewardMessage = REWARD_1.message;
            }
            else {
                outcome = option;
                reward = REWARD_2.points;
                rewardImage = REWARD_2.image;
                rewardMessage = REWARD_2.message;
            }
            // This stuff happens IMMEDIATELY AFTER participant makes a key choice
            exports.points += reward; // needs to happen BEFORE data is saved for the round
            // Save user choices into data object
            exports.results.push({ stage: exports.currentStage, round: exports.round, choice: option, outcome: outcome, reward: reward, points: exports.points, rewardImage: rewardImage });
            // NOTE: Do not put round counter here because not updated until much later stage
            setTimeout(function () {
                // Show reward message
                // Replace instructions text with reward message + image, keep stage 2 planet + aliens
                document.getElementById('stage-2-main-instructions').style.display = 'none';
                document.getElementById('stage-2-practice-instructions').style.display = 'none';
                document.getElementById('reward-message').innerText = rewardMessage;
                document.getElementById('reward-message').style.display = 'block';
                document.getElementById(rewardImage).style.display = 'block';
                document.getElementById('pointCounter').innerText = exports.points.toString(); // this updates the point counter as soon as reward is selected, correctly for the practice trials at least
                setTimeout(function () {
                    // Hide reward message, hide stage 2 planet + aliens
                    document.getElementById('reward-message').style.display = 'none';
                    document.getElementById(rewardImage).style.display = 'none';
                    document.getElementById('stage-2-options').style.display = "none";
                    exports.round++;
                    // Continue to next round or end the session
                    if (exports.round <= exports.totalRounds) { // continue to next round
                        document.getElementById('stage-1-options').style.display = "block";
                        document.getElementById('roundNumber').innerText = exports.round.toString(); // update round display
                        if (exports.currentStage === "mainStage2") {
                            // Show Stage 1 Main Displays
                            exports.currentStage = "mainStage1";
                            document.getElementById('stage-1-main-instructions').style.display = "block";
                            document.getElementById('stage-2-main-instructions').style.display = 'none';
                        }
                        else { // currentStage === "practiceStage2"
                            // Show Stage 1 Practice Displays
                            exports.currentStage = "practiceStage1";
                            document.getElementById('stage-1-practice-instructions').style.display = "block";
                            document.getElementById('stage-2-practice-instructions').style.display = 'none';
                        }
                    }
                    else { // end the session
                        exports.round = 1;
                        exports.points = 0;
                        if (exports.currentStage == "practiceStage1" || exports.currentStage == "practiceStage2") {
                            transitionToMainStudy();
                        }
                        else { // if currently in the main study
                            endTask();
                        }
                    }
                    // Re-allow keyboard input after reward display ends
                    exports.keyInputAllowed = true;
                    console.log("intertrialInterval2 before timeout: " + exports.intertrialInterval2);
                }, 2000);
            }, exports.intertrialInterval2);
        }
        else {
            console.log("choiceConfig doesn't exist");
        }
    }
}
exports.chooseOption = chooseOption;
// Event listener for instructions screen
var handleKeydown = function (event) {
    console.log("first key event logged");
    // if (event.target && (event.target as HTMLElement).id !== 'instructions-screen') return; // Ignore keydown events outside the instructions screen
    if (exports.currentStage == "welcome") {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('instructions-screen-1').style.display = 'block';
        exports.currentStage = "instructions1";
        document.addEventListener('keydown', handleKeydown);
    }
    else if (exports.currentStage == "instructions1") {
        document.getElementById('instructions-screen-1').style.display = 'none';
        document.getElementById('instructions-screen-2').style.display = 'block';
        exports.currentStage = "instructions2";
    }
    else if (exports.currentStage == "instructions2") {
        document.getElementById('instructions-screen-2').style.display = 'none';
        document.getElementById('instructions-screen-3').style.display = 'block';
        exports.currentStage = "instructions3";
    }
    else if (exports.currentStage == "instructions3") {
        document.getElementById('instructions-screen-3').style.display = 'none';
        document.getElementById('game-display').style.display = 'block';
        exports.currentStage = "practiceStage1";
        // Remove this event listener after continuing to the practice session
        document.removeEventListener('keydown', handleKeydown);
    }
    else if (exports.currentStage == "instructionsFinal") {
        startMainStudy();
        // Remove this event listener after continuing to the main session
        document.removeEventListener('keydown', handleKeydown);
    }
};
document.addEventListener('keydown', handleKeydown);
// Event listener for making key presses in Stage 1 and Stage 2
document.addEventListener('keydown', function (event) {
    var _a;
    if (!exports.keyInputAllowed)
        return; // Ignore keyboard input if not allowed
    console.log("second key event logged");
    event.preventDefault(); // Prevent default scrolling behavior of arrow keys
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        var choice = void 0;
        if (exports.currentStage === 'mainStage1' || exports.currentStage === 'practiceStage1') {
            console.log("key input stopped for stage 1");
            choice = event.key === 'ArrowLeft' ? 'X' : 'Y';
            chooseOption(choice);
            exports.keyInputAllowed = false; // Don't allow key press input after first key press in stage 1
        }
        else if (exports.currentStage === 'mainStage2' || exports.currentStage === 'practiceStage2') {
            console.log("key input stopped for stage 2");
            choice = event.key === 'ArrowLeft' ? 'A' : 'B';
            if (((_a = document.getElementById('planet-Y-options')) === null || _a === void 0 ? void 0 : _a.style.display) === 'block') {
                choice = event.key === 'ArrowLeft' ? 'C' : 'D';
            }
            chooseOption(choice);
            exports.keyInputAllowed = false; // Don't allow key press input after first key press in stage 2
        }
    }
});
function transitionToMainStudy() {
    exports.currentStage = "instructionsFinal";
    exports.totalRounds = exports.mainRounds;
    document.getElementById('instructions-final').style.display = "block";
    document.getElementById('game-display').style.display = "none";
    document.addEventListener('keydown', handleKeydown);
}
exports.transitionToMainStudy = transitionToMainStudy;
function startMainStudy() {
    document.getElementById('instructions-final').style.display = 'none';
    document.getElementById('roundNumber').innerText = exports.round.toString(); // needs to be here in order for first trial to render correct values
    document.getElementById('pointCounter').innerText = exports.points.toString(); // needs to be here in order for first trial to render correct values
    document.getElementById('game-display').style.display = 'block';
    document.getElementById('stage-1-options').style.display = 'block';
    document.getElementById('stage-1-practice-instructions').style.display = 'none';
    document.getElementById('stage-1-main-instructions').style.display = 'block';
    document.getElementById('stage-2-options').style.display = 'none';
    exports.currentStage = "mainStage1";
}
exports.startMainStudy = startMainStudy;
function endTask() {
    saveResultsToCSV(exports.results);
    document.getElementById('game-status').style.display = "block";
    document.getElementById('game-display').style.display = "none";
}
exports.endTask = endTask;
function saveResultsToCSV(results) {
    var subjectId = getParameterByName('subject_id', window.location.href) || 'UnknownSubject';
    // alternative: let subjectId: string = getParameterByName('subject_id', window.location.href) ?? 'UnknownSubject';
    var timestamp = new Date().toISOString().replace(/:/g, '-');
    var filename = "data/two_step_task_results_".concat(subjectId, "_").concat(timestamp, ".csv");
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Stage,Round,Choice,Outcome,Reward,TotalPoints\n";
    results.forEach(function (result) {
        var row = result.stage + "," + result.round + "," + result.choice + "," + result.outcome + "," + result.reward + "," + result.points + "\n";
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
