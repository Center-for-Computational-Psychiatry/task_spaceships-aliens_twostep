// import { handleClientLoad, appendDataToSheet } from './googleSheets'

let round: number = 1;
let practiceRounds: number = 10;
let mainRounds: number = 150;
let totalRounds: number = practiceRounds;
let points: number = 0;
let currentStage: string = "intake"; // [intake, welcome, instructions1, instructions2, instructions3, practiceStage1, practiceStage2, instructionsFinal, mainStage1, mainStage2]
let option: string;
let choice: string;
let outcome: string;
let reward: number;
let rewardImage: string;

let results: {
    stage: string;
    round: number;
    choice: string;
    outcome: string;
    reward: number;
    points: number;
    rewardImage: string;
    timestamp: string;
}[] = [];
let keyInputAllowed: boolean = true; // Flag to control input
let stage1Probability: number = 0.8;

let intertrialInterval1: number = 0;
let intertrialInterval2: number = 0;
let subjectId: string = ''; // Declare globally so it can be used in other functions


// variables for game setting 1
const REWARD_1 = { points: 100, image: "reward-img-gem", message: "You found a gem (+100 points)!" };
const REWARD_2 = { points: 0, image: "reward-img-dirt", message: "You found dirt (no points)!" };

// likelihoods for game setting 1
const stage2Options = {
    "A": { likelihoods: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5] },
    "B": { likelihoods: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4] },
    "C": { likelihoods: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2] },
    "D": { likelihoods: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8] },
}
// Initialize Google Sheets API for data saving
// handleClientLoad();

// References to HTML rockets and aliens
const rockets = document.querySelectorAll('.rocket-img');
const aliens = document.querySelectorAll('.alien-img');
let selectedRocket: HTMLElement | null = null;
let selectedAlien: HTMLElement | null = null;

// Function to update the selected rocket visual
function updateSelectedRocket(index: number) {
    // Remove the selected class from the previously selected rocket
    if (selectedRocket) {
        selectedRocket.classList.remove('selected');
    }
    // Add the selected class to the new rocket
    selectedRocket = rockets[index] as HTMLElement;
    selectedRocket.classList.add('selected');
}

// Function to update the selected alien visual
function updateSelectedAlien(index: number) {
    // Remove the selected class from the previously selected alien
    if (selectedAlien) {
        selectedAlien.classList.remove('selected');
    }
    // Add the selected class to the new alien
    selectedAlien = aliens[index] as HTMLElement;
    selectedAlien.classList.add('selected');
}

function resetSelectionBoxes() {
    // Hide or reset all selection boxes (rockets and aliens)
    rockets.forEach(rocket => rocket.classList.remove('selected'));
    aliens.forEach(alien => alien.classList.remove('selected'));

    // Reset any other visual elements as needed
    document.getElementById('stage-1-main-instructions')!.style.display = "none";
    document.getElementById('stage-2-main-instructions')!.style.display = "none";
}

function addData() {
    results.push({
        stage: currentStage,
        round: round,
        choice: option,
        outcome: outcome,
        reward: reward,
        points: points,
        rewardImage: rewardImage,
        timestamp: new Date().toISOString() // Add timestamp here
    });
}

function chooseOption(option: string): void {
    if (!keyInputAllowed) return; // Ignore keyboard input if not allowed

    let rewardMessage: string = '';

    // NOTE: Do not put round counter here because not updated until much later stage

    if (currentStage === "mainStage1" || currentStage === "practiceStage1") { // Stage 1: Option X or Y
        intertrialInterval1 = [400, 600, 800][Math.floor(Math.random() * 3)]; // milliseconds
        intertrialInterval2 = 0;

        if (option === 'X') {
            outcome = Math.random() < stage1Probability ? 'X' : 'Y';
        } else { // option Y
            outcome = Math.random() < stage1Probability ? 'Y' : 'X';
        }
        // NOTE: Do not put round counter here because not updated until much later stage

        addData();

        // Introduce intertrialInterval delay between Stage 1 user choice and Stage 2 display
        setTimeout(() => {
            // Hide previous selection boxes and elements
            resetSelectionBoxes();

            // Determine which key options to display (practice vs. main trials)
            if (currentStage === "mainStage1") {
                // Switch main stages
                currentStage = "mainStage2";
                // Show Stage 2 Options, hide stage 1 display
                document.getElementById('stage-1-main-instructions')!.style.display = "none";
                document.getElementById('stage-2-main-instructions')!.style.display = "block";
                addData();
            } else { // currentStage === practiceStage1
                // Switch practice stages
                currentStage = "practiceStage2";
                // Show Stage 2 Practice Options, hide stage 1 practice display
                document.getElementById('stage-1-practice-instructions')!.style.display = "none";
                document.getElementById('stage-2-practice-instructions')!.style.display = "block";
                document.getElementById('stage-2-key-instruction')!.style.display = 'block'; // needs to be here otherwise first trial of stage 2 doesn't have key instruction
                addData();
            }
            // Show Stage 2 Options, hide stage 1 display (same for both main and practice)
            document.getElementById('stage-2-options')!.style.display = "block";
            document.getElementById('stage-1-options')!.style.display = "none";

            // Determine which Planet in Stage 2 to display
            if (outcome === 'X') {
                document.getElementById('planet-X-options')!.style.display = "block";
                document.getElementById('planet-Y-options')!.style.display = "none";
            } else { // Option Y
                document.getElementById('planet-Y-options')!.style.display = "block";
                document.getElementById('planet-X-options')!.style.display = "none";
            };

            keyInputAllowed = true; // Re-allow keyboard input after intertrial interval ends

        }, intertrialInterval1);

    } else if (currentStage === "mainStage2" || currentStage === "practiceStage2") { // Stage 2: Option A, B, C, or D
        intertrialInterval2 = [400, 600, 800][Math.floor(Math.random() * 3)]; // 500, 1000, or 1500 millisecond

        const userChoice = stage2Options[option as keyof typeof stage2Options];

        if (userChoice) {
            const likelihoods = userChoice.likelihoods;
            const currentLikelihood = likelihoods[round - 1]; // pick the likelihood associated with this round (minus one for array index)
            // console.log("currentLikelihood: " + currentLikelihood)

            // select reward from user choice
            if (Math.random() < currentLikelihood) {
                outcome = option;
                reward = REWARD_1.points;
                rewardImage = REWARD_1.image;
                rewardMessage = REWARD_1.message;
            } else {
                outcome = option;
                reward = REWARD_2.points;
                rewardImage = REWARD_2.image;
                rewardMessage = REWARD_2.message;
            }

            // This stuff happens IMMEDIATELY AFTER participant makes a key choice
            points += reward; // needs to happen BEFORE data is saved for the round

            // Save user choices into data object
            addData();

            // NOTE: Do not put round counter here because not updated until much later stage

            setTimeout(() => { // This stuff happens AFTER the intertrial interval

                // Show reward message
                // Replace instructions text with reward message + image, keep stage 2 planet + aliens
                document.getElementById('stage-2-main-instructions')!.style.display = 'none';
                document.getElementById('stage-2-practice-instructions')!.style.display = 'none';
                document.getElementById('reward-message')!.innerText = rewardMessage;
                document.getElementById('reward-message')!.style.display = 'block';
                document.getElementById(rewardImage)!.style.display = 'block';
                document.getElementById('pointCounter')!.innerText = points.toString(); // this updates the point counter as soon as reward is selected, correctly for the practice trials at least
                document.getElementById('stage-2-key-instruction')!.style.display = 'none'; // dont need???

                setTimeout(() => { // This stuff happens AFTER the 2 second reward display interval

                    // Hide reward message, hide stage 2 planet + aliens
                    document.getElementById('reward-message')!.style.display = 'none';
                    document.getElementById(rewardImage)!.style.display = 'none';
                    document.getElementById('stage-2-options')!.style.display = "none";
                    if (currentStage === "practiceStage2") {
                        document.getElementById('stage-2-key-instruction')!.style.display = 'block'; // Show key instruction after reward display for practice trials
                    }
                    round++;
                    addData();
                    // Continue to next round or end the session
                    if (round <= totalRounds) { // continue to next round
                        document.getElementById('stage-1-options')!.style.display = "block";
                        // document.getElementById('roundNumber')!.innerText = round.toString(); // update round display

                        if (currentStage === "mainStage2") {
                            // Show Stage 1 Main Displays
                            currentStage = "mainStage1";
                            document.getElementById('stage-1-main-instructions')!.style.display = "block";
                            document.getElementById('stage-2-main-instructions')!.style.display = 'none';
                        } else { // currentStage === "practiceStage2"
                            // Show Stage 1 Practice Displays
                            currentStage = "practiceStage1";
                            document.getElementById('stage-1-practice-instructions')!.style.display = "block";
                            document.getElementById('stage-1-key-instruction')!.style.display = 'block';
                            document.getElementById('stage-2-practice-instructions')!.style.display = 'none';
                        }
                    } else { // end the session
                        if (currentStage == "practiceStage1" || currentStage == "practiceStage2") {
                            points = 0;
                            round = 1;
                            transitionToMainStudy();

                        } else { // if currently in the main study
                            endTask();
                        }
                    }

                    // Re-allow keyboard input after reward display ends
                    keyInputAllowed = true;

                    // console.log("intertrialInterval2 before timeout: " + intertrialInterval2)

                }, 2000);

            }, intertrialInterval2);

        } else {
            console.log("choiceConfig doesn't exist")
        }

    }

}

// Make user display in full screen mode upon opening the application
function requestFullScreen(element: HTMLElement = document.documentElement) {
    // document.documentElement is the entire <html> element of the html,
    // meaning the entire html page (similar to <body> tag)
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) { // Older Firefox
        (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) { // Older Chrome, Safari and Opera
        (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) { // Older IE/Edge
        (element as any).msRequestFullscreen();
    } else {
        console.log("Fullscreen API is not supported.");
    }
}

// Attach the event listener to the form's submit event
window.addEventListener('DOMContentLoaded', () => {
    const intakeForm = document.getElementById('intake-form') as HTMLFormElement;
    if (intakeForm) {
        intakeForm.addEventListener('submit', handleParticipantIDSubmit);
    }
});

function handleParticipantIDSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission

    const subjectIdInput = document.getElementById('subject-id') as HTMLInputElement;
    subjectId = subjectIdInput ? subjectIdInput.value : '';

    if (subjectId.trim() === '') {
        alert('Please enter a valid subject ID.');
        return;
    }

    console.log('Subject ID:', subjectId); // Log subject ID or use it as needed

    // Hide intake screen and show the welcome screen
    document.getElementById('intake-screen')!.style.display = 'none';
    document.getElementById('welcome-screen')!.style.display = 'block';
    currentStage = "welcome";

    // Make the entire screen full-screen
    requestFullScreen();
}

// Function to play the instructional video and proceed after it ends
function playInstructionalVideo() {
    const video = document.getElementById('instructional-video') as HTMLVideoElement;

    video.play();

    // Event listener for when the video ends
    video.onended = function () {
        document.getElementById('video-screen')!.style.display = 'none';
        document.getElementById('before-practice-screen')!.style.display = 'block';
        currentStage = "beforePractice";
    };
}

// Event listener for instructions screen
const handleKeydown = function (event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar') {
        console.log("first key event logged")

        if (currentStage == "welcome") {
            document.getElementById('welcome-screen')!.style.display = 'none';
            document.getElementById('instructions-screen-1')!.style.display = 'block';
            currentStage = "instructions1";
            document.addEventListener('keydown', handleKeydown);
        } else if (currentStage == "instructions1") {
            document.getElementById('instructions-screen-1')!.style.display = 'none';
            document.getElementById('instructions-screen-2')!.style.display = 'block';
            currentStage = "instructions2";
        } else if (currentStage == "instructions2") {
            document.getElementById('instructions-screen-2')!.style.display = 'none';
            document.getElementById('instructions-screen-3')!.style.display = 'block';
            currentStage = "instructions3";
        } else if (currentStage == "instructions3") {
            document.getElementById('instructions-screen-3')!.style.display = 'none';
            document.getElementById('video-screen')!.style.display = 'block';
            currentStage = "videoPlaying";
            playInstructionalVideo();
        } else if (currentStage === "beforePractice") {
            document.getElementById('before-practice-screen')!.style.display = 'none';
            document.getElementById('game-display')!.style.display = 'block';
            currentStage = "practiceStage1";
            // Remove this event listener after continuing to the practice session
            document.removeEventListener('keydown', handleKeydown);
        } else if (currentStage == "instructionsFinal") {
            startMainStudy();
            // Remove this event listener after continuing to the main session
            document.removeEventListener('keydown', handleKeydown);
        }
    }
}
document.addEventListener('keydown', handleKeydown);

// Event listener for making key presses in Stage 1 and Stage 2
document.addEventListener('keydown', function (event) {
    if (!keyInputAllowed) return; // Ignore keyboard input if not allowed

    if (currentStage === "intake") {
        return
    };

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); // Prevent default scrolling behavior of arrow keys
        console.log(event.key)

        if (currentStage === 'mainStage1' || currentStage === 'practiceStage1') {
            console.log("key input done for stage 1")
            choice = event.key === 'ArrowLeft' ? 'X' : 'Y';
            console.log("choice: " + choice)
            // display black selection box
            if (event.key === "ArrowLeft") { updateSelectedRocket(0); } else { updateSelectedRocket(1); }
            // implement logic for user choice
            chooseOption(choice);
            // stop all key inputs after user makes a choice
            keyInputAllowed = false;
        } else if (currentStage === 'mainStage2' || currentStage === 'practiceStage2') {
            console.log("key input done for stage 2")
            // identify user's key selection choice based on which planet they are on
            if (document.getElementById('planet-X-options')?.style.display === 'block') {
                choice = event.key === 'ArrowLeft' ? 'A' : 'B';
                console.log("choice: " + choice)
                // display black selection box
                if (event.key === "ArrowLeft") { updateSelectedAlien(0); } else { updateSelectedAlien(1); }
            } else {
                choice = event.key === 'ArrowLeft' ? 'C' : 'D';
                console.log("choice: " + choice)
                // display black selection box
                if (event.key === "ArrowLeft") { updateSelectedAlien(2); } else { updateSelectedAlien(3); }
            }

            // implement logic for user choice
            chooseOption(choice);
            // stop all key inputs after user makes a choice
            keyInputAllowed = false;
        }
    }
});

function transitionToMainStudy() {
    currentStage = "instructionsFinal"
    totalRounds = mainRounds
    document.getElementById('instructions-final')!.style.display = "block";
    document.getElementById('game-display')!.style.display = "none";
    document.addEventListener('keydown', handleKeydown);
}

function startMainStudy() {
    document.getElementById('instructions-final')!.style.display = 'none';
    document.getElementById('stage-1-key-instruction')!.style.display = 'none';
    document.getElementById('stage-2-key-instruction')!.style.display = 'none';
    // document.getElementById('roundNumber')!.innerText = round.toString(); // needs to be here in order for first trial to show correct values
    document.getElementById('pointCounter')!.innerText = points.toString(); // needs to be here in order for first trial to show correct values
    document.getElementById('game-display')!.style.display = 'block';
    document.getElementById('stage-1-options')!.style.display = 'block';
    document.getElementById('stage-1-practice-instructions')!.style.display = 'none';
    document.getElementById('stage-1-main-instructions')!.style.display = 'block';
    document.getElementById('stage-2-options')!.style.display = 'none';
    currentStage = "mainStage1"
}

export function endTask() {
    saveResultsToCSV(results);
    document.getElementById('game-status')!.style.display = "block";
    document.getElementById('status')!.innerText = "Game complete! You earned a total of " + points.toString() + " points. Thank you for participating!";
    document.getElementById('game-display')!.style.display = "none";

    // setTimeout(() => { 
    //     let redirect_url = "http://prolific.com/completion_code_here";
    //     document.location.assign(redirect_url);
    // }, 5000);

}
// Allow the data to be saved whenever user exits the window/screen
window.addEventListener('beforeunload', (event) => {
    saveResultsToCSV(results);

    // // (Note that modern browsers may ignore this and show their own message)
    // const message = "Are you sure you want to leave?";
    // event.returnValue = message; // For most browsers
    // return message; // For some older browsers
});

function saveResultsToCSV(results: {
    stage: string;
    round: number;
    choice: string;
    outcome: string;
    reward: number;
    points: number;
    rewardImage: string;
    timestamp: string; // Add timestamp here
}[]): void {
    const timestamp: string = new Date().toISOString().replace(/:/g, '-');
    const filename: string = `data/two_step_task_results_${subjectId}_${timestamp}.csv`;

    // Updated CSV header to include Timestamp
    const csvHeader = "SubjectID,Stage,Round,Choice,Outcome,Reward,TotalPoints,RewardImage,Timestamp";

    // Include the Timestamp in each row of the results
    const csvRows = results.map(result =>
        `${subjectId},${result.stage},${result.round},${result.choice},${result.outcome},${result.reward},${result.points},${result.rewardImage},${result.timestamp}`
    ).join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${csvHeader}\n${csvRows}`;
    const encodedUri: string = encodeURI(csvContent);

    // Automatically downloads CSV file to local machine
    const link: HTMLAnchorElement = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
}

// Function to get URL parameter by name (for online studies only - Note: Needs to be connected to save data function)
// function getParameterByName(name: string, url: string): string | null {
//     const paramName = name.replace(/[\[\]]/g, "\\$&");
//     const regex: RegExp = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)");
//     const results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

// Attach the chooseOption function to the window object
(window as any).chooseOption = chooseOption;

