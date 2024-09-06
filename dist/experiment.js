"use strict";
// import { handleClientLoad, appendDataToSheet } from './googleSheets'
Object.defineProperty(exports, "__esModule", { value: true });
exports.endTask = void 0;
var round = 1;
var practiceRounds = 10;
var mainRounds = 150;
var totalRounds = practiceRounds;
var points = 0;
var currentStage = "intake"; // [intake, welcome, instructions1, instructions2, instructions3, practiceStage1, practiceStage2, instructionsFinal, mainStage1, mainStage2]
var results = [];
var keyInputAllowed = true; // Flag to control input
var stage1Probability = 0.8;
var intertrialInterval1 = 0;
var intertrialInterval2 = 0;
// variables for game setting 1
var REWARD_1 = { points: 100, image: "reward-img-gem", message: "You found a gem (+100 points)!" };
var REWARD_2 = { points: 0, image: "reward-img-dirt", message: "You found dirt (no points)!" };
// likelihoods for game setting 1
var stage2Options = {
    "A": { likelihoods: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5] },
    "B": { likelihoods: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4] },
    "C": { likelihoods: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2] },
    "D": { likelihoods: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8] },
};
// Initialize Google Sheets API for data saving
// handleClientLoad();
// References to HTML rockets and aliens
var rockets = document.querySelectorAll('.rocket-img');
var aliens = document.querySelectorAll('.alien-img');
var selectedRocket = null;
var selectedAlien = null;
// Function to update the selected rocket visual
function updateSelectedRocket(index) {
    // Remove the selected class from the previously selected rocket
    if (selectedRocket) {
        selectedRocket.classList.remove('selected');
    }
    // Add the selected class to the new rocket
    selectedRocket = rockets[index];
    selectedRocket.classList.add('selected');
}
// Function to update the selected alien visual
function updateSelectedAlien(index) {
    // Remove the selected class from the previously selected alien
    if (selectedAlien) {
        selectedAlien.classList.remove('selected');
    }
    // Add the selected class to the new alien
    selectedAlien = aliens[index];
    selectedAlien.classList.add('selected');
}
function chooseOption(option) {
    if (!keyInputAllowed)
        return; // Ignore keyboard input if not allowed
    var outcome = '';
    var reward = 0;
    var rewardImage = '';
    var rewardMessage = '';
    // NOTE: Do not put round counter here because not updated until much later stage
    if (currentStage === "mainStage1" || currentStage === "practiceStage1") { // Stage 1: Option X or Y
        intertrialInterval1 = [400, 600, 800][Math.floor(Math.random() * 3)]; // milliseconds
        intertrialInterval2 = 0;
        if (option === 'X') {
            outcome = Math.random() < stage1Probability ? 'X' : 'Y';
        }
        else { // option Y
            outcome = Math.random() < stage1Probability ? 'Y' : 'X';
        }
        // NOTE: Do not put round counter here because not updated until much later stage
        results.push({ stage: currentStage, round: round, choice: option, outcome: outcome, reward: reward, points: points, rewardImage: rewardImage });
        // Introduce intertrialInterval delay between Stage 1 user choice and Stage 2 display
        setTimeout(function () {
            // Determine which key options to display (practice vs. main trials)
            if (currentStage === "mainStage1") {
                // Switch main stages
                currentStage = "mainStage2";
                // Show Stage 2 Options, hide stage 1 display
                document.getElementById('stage-1-main-instructions').style.display = "none";
                document.getElementById('stage-2-main-instructions').style.display = "block";
                // document.getElementById('stage-2-key-instruction')!.style.display = 'block'; // needs to be here otherwise first trial of stage 2 doesn't have key instruction
            }
            else { // currentStage === practiceStage1
                // Switch practice stages
                currentStage = "practiceStage2";
                // Show Stage 2 Practice Options, hide stage 1 practice display
                document.getElementById('stage-1-practice-instructions').style.display = "none";
                document.getElementById('stage-2-practice-instructions').style.display = "block";
                document.getElementById('stage-2-key-instruction').style.display = 'block'; // needs to be here otherwise first trial of stage 2 doesn't have key instruction
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
            keyInputAllowed = true; // Re-allow keyboard input after intertrial interval ends
        }, intertrialInterval1);
    }
    else if (currentStage === "mainStage2" || currentStage === "practiceStage2") { // Stage 2: Option A, B, C, or D
        intertrialInterval2 = [400, 600, 800][Math.floor(Math.random() * 3)]; // 500, 1000, or 1500 millisecond
        var userChoice = stage2Options[option];
        if (userChoice) {
            var likelihoods = userChoice.likelihoods;
            var currentLikelihood = likelihoods[round - 1]; // pick the likelihood associated with this round (minus one for array index)
            // console.log("currentLikelihood: " + currentLikelihood)
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
            points += reward; // needs to happen BEFORE data is saved for the round
            // Save user choices into data object
            results.push({ stage: currentStage, round: round, choice: option, outcome: outcome, reward: reward, points: points, rewardImage: rewardImage });
            // NOTE: Do not put round counter here because not updated until much later stage
            setTimeout(function () {
                // Show reward message
                // Replace instructions text with reward message + image, keep stage 2 planet + aliens
                document.getElementById('stage-2-main-instructions').style.display = 'none';
                document.getElementById('stage-2-practice-instructions').style.display = 'none';
                document.getElementById('reward-message').innerText = rewardMessage;
                document.getElementById('reward-message').style.display = 'block';
                document.getElementById(rewardImage).style.display = 'block';
                document.getElementById('pointCounter').innerText = points.toString(); // this updates the point counter as soon as reward is selected, correctly for the practice trials at least
                document.getElementById('stage-2-key-instruction').style.display = 'none'; // dont need???
                setTimeout(function () {
                    // Hide reward message, hide stage 2 planet + aliens
                    document.getElementById('reward-message').style.display = 'none';
                    document.getElementById(rewardImage).style.display = 'none';
                    document.getElementById('stage-2-options').style.display = "none";
                    if (currentStage === "practiceStage2") {
                        document.getElementById('stage-2-key-instruction').style.display = 'block'; // Show key instruction after reward display for practice trials
                    }
                    round++;
                    // Continue to next round or end the session
                    if (round <= totalRounds) { // continue to next round
                        document.getElementById('stage-1-options').style.display = "block";
                        // document.getElementById('roundNumber')!.innerText = round.toString(); // update round display
                        if (currentStage === "mainStage2") {
                            // Show Stage 1 Main Displays
                            currentStage = "mainStage1";
                            document.getElementById('stage-1-main-instructions').style.display = "block";
                            document.getElementById('stage-2-main-instructions').style.display = 'none';
                        }
                        else { // currentStage === "practiceStage2"
                            // Show Stage 1 Practice Displays
                            currentStage = "practiceStage1";
                            document.getElementById('stage-1-practice-instructions').style.display = "block";
                            document.getElementById('stage-1-key-instruction').style.display = 'block';
                            document.getElementById('stage-2-practice-instructions').style.display = 'none';
                        }
                    }
                    else { // end the session
                        if (currentStage == "practiceStage1" || currentStage == "practiceStage2") {
                            points = 0;
                            round = 1;
                            transitionToMainStudy();
                        }
                        else { // if currently in the main study
                            endTask();
                        }
                    }
                    // Re-allow keyboard input after reward display ends
                    keyInputAllowed = true;
                    // console.log("intertrialInterval2 before timeout: " + intertrialInterval2)
                }, 2000);
            }, intertrialInterval2);
        }
        else {
            console.log("choiceConfig doesn't exist");
        }
    }
}
// Make user display in full screen mode upon opening the application
function requestFullScreen(element) {
    if (element === void 0) { element = document.documentElement; }
    // document.documentElement is the entire <html> element of the html,
    // meaning the entire html page (similar to <body> tag)
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    else if (element.mozRequestFullScreen) { // Older Firefox
        element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen) { // Older Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    }
    else if (element.msRequestFullscreen) { // Older IE/Edge
        element.msRequestFullscreen();
    }
    else {
        console.log("Fullscreen API is not supported.");
    }
}
// Event listener for instructions screen
var handleKeydown = function (event) {
    if (event.key === ' ' || event.key === 'Spacebar') {
        console.log("first key event logged");
        if (currentStage == "intake") {
            requestFullScreen(); // Make the entire screen full-screen
            document.getElementById('intake-screen').style.display = 'none';
            document.getElementById('welcome-screen').style.display = 'block';
            currentStage = "welcome";
        }
        else if (currentStage == "welcome") {
            document.getElementById('welcome-screen').style.display = 'none';
            document.getElementById('instructions-screen-1').style.display = 'block';
            currentStage = "instructions1";
            document.addEventListener('keydown', handleKeydown);
        }
        else if (currentStage == "instructions1") {
            document.getElementById('instructions-screen-1').style.display = 'none';
            document.getElementById('instructions-screen-2').style.display = 'block';
            currentStage = "instructions2";
        }
        else if (currentStage == "instructions2") {
            document.getElementById('instructions-screen-2').style.display = 'none';
            document.getElementById('instructions-screen-3').style.display = 'block';
            currentStage = "instructions3";
        }
        else if (currentStage == "instructions3") {
            document.getElementById('instructions-screen-3').style.display = 'none';
            document.getElementById('game-display').style.display = 'block';
            currentStage = "practiceStage1";
            // Remove this event listener after continuing to the practice session
            document.removeEventListener('keydown', handleKeydown);
        }
        else if (currentStage == "instructionsFinal") {
            startMainStudy();
            // Remove this event listener after continuing to the main session
            document.removeEventListener('keydown', handleKeydown);
        }
    }
};
document.addEventListener('keydown', handleKeydown);
// Event listener for making key presses in Stage 1 and Stage 2
document.addEventListener('keydown', function (event) {
    var _a;
    if (!keyInputAllowed)
        return; // Ignore keyboard input if not allowed
    event.preventDefault(); // Prevent default scrolling behavior of arrow keys
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        console.log(event.key);
        var choice = void 0;
        if (currentStage === 'mainStage1' || currentStage === 'practiceStage1') {
            console.log("key input done for stage 1");
            choice = event.key === 'ArrowLeft' ? 'X' : 'Y';
            // display black selection box
            if (event.key === "ArrowLeft") {
                updateSelectedRocket(0);
            }
            else {
                updateSelectedRocket(1);
            }
            // implement logic for user choice
            chooseOption(choice);
            // stop all key inputs after user makes a choice
            keyInputAllowed = false;
        }
        else if (currentStage === 'mainStage2' || currentStage === 'practiceStage2') {
            console.log("key input done for stage 2");
            // identify user's key selection choice based on which planet they are on
            if (((_a = document.getElementById('planet-X-options')) === null || _a === void 0 ? void 0 : _a.style.display) === 'block') {
                choice = event.key === 'ArrowLeft' ? 'A' : 'B';
            }
            else {
                choice = event.key === 'ArrowLeft' ? 'C' : 'D';
            }
            // display black selection box
            if (event.key === "ArrowLeft") {
                updateSelectedAlien(0);
            }
            else {
                updateSelectedAlien(1);
            }
            // implement logic for user choice
            chooseOption(choice);
            // stop all key inputs after user makes a choice
            keyInputAllowed = false;
        }
    }
});
function transitionToMainStudy() {
    currentStage = "instructionsFinal";
    totalRounds = mainRounds;
    document.getElementById('instructions-final').style.display = "block";
    document.getElementById('game-display').style.display = "none";
    document.addEventListener('keydown', handleKeydown);
}
function startMainStudy() {
    document.getElementById('instructions-final').style.display = 'none';
    document.getElementById('stage-1-key-instruction').style.display = 'none';
    document.getElementById('stage-2-key-instruction').style.display = 'none';
    // document.getElementById('roundNumber')!.innerText = round.toString(); // needs to be here in order for first trial to show correct values
    document.getElementById('pointCounter').innerText = points.toString(); // needs to be here in order for first trial to show correct values
    document.getElementById('game-display').style.display = 'block';
    document.getElementById('stage-1-options').style.display = 'block';
    document.getElementById('stage-1-practice-instructions').style.display = 'none';
    document.getElementById('stage-1-main-instructions').style.display = 'block';
    document.getElementById('stage-2-options').style.display = 'none';
    currentStage = "mainStage1";
}
function endTask() {
    saveResultsToCSV(results);
    document.getElementById('game-status').style.display = "block";
    document.getElementById('status').innerText = "Game complete! You earned a total of " + points.toString() + " points. Thank you for participating!";
    document.getElementById('game-display').style.display = "none";
    // setTimeout(() => { 
    //     let redirect_url = "http://prolific.com/completion_code_here";
    //     document.location.assign(redirect_url);
    // }, 5000);
}
exports.endTask = endTask;
function saveResultsToCSV(results) {
    var subjectId = getParameterByName('subject_id', window.location.href) || 'UnknownSubject';
    var timestamp = new Date().toISOString().replace(/:/g, '-');
    var filename = "data/two_step_task_results_".concat(subjectId, "_").concat(timestamp, ".csv");
    var csvHeader = "Stage,Round,Choice,Outcome,Reward,TotalPoints";
    var csvRows = results.map(function (result) { return "".concat(result.stage, ",").concat(result.round, ",").concat(result.choice, ",").concat(result.outcome, ",").concat(result.reward, ",").concat(result.points); }).join("\n");
    var csvContent = "data:text/csv;charset=utf-8,".concat(csvHeader, "\n").concat(csvRows);
    var encodedUri = encodeURI(csvContent);
    // Append to Google Sheets
    // appendDataToSheet(results);
    // Automatically downloads CSV file to local machine
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
}
// Function to get URL parameter by name
function getParameterByName(name, url) {
    var paramName = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Attach the chooseOption function to the window object
window.chooseOption = chooseOption;
