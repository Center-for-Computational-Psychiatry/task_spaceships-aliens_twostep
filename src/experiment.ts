let round: number = 1;
let practiceRounds: number = 10;
let mainRounds: number = 150; 
let totalRounds: number = practiceRounds;
let points: number = 0;
let currentStage: string = "welcome"; // [welcome, instructions1, instructions2, instructions3, practiceStage1, practiceStage2, instructionsFinal, mainStage1, mainStage2]
let results: { stage: string, round: number; choice: string; outcome: string; reward: number, points: number; rewardImage: string }[] = [];
let keyInputAllowed: boolean = true; // Flag to control input
let stage1Probability: number = 0.8;

let intertrialInterval1: number = 0;
let intertrialInterval2: number = 0;
// console.log("intertrialInterval1: " + intertrialInterval1)
// console.log("intertrialInterval2: " + intertrialInterval2)

// variables for game setting 1
const REWARD_1 = { points: 100, image: "reward-img-gem", message: "You found a gem (+100 points)!"};
const REWARD_2 = { points: 0, image: "reward-img-dirt", message: "You found dirt (no points)!"};
// // variables for game setting 2
// const REWARD_1 = { points: 100, image: "img/gem-sapphire.png" };
// const REWARD_2 = { points: 100, image: "img/gem-ruby.png" };

// likelihoods for game setting 1
const stage2Options = {
    "A": { likelihoods: [0.7,0.6,0.7,0.6,0.6,0.6,0.5,0.5,0.5,0.5,0.5,0.6,0.6,0.6,0.7,0.7,0.7,0.7,0.7,0.6,0.6,0.6,0.5,0.5,0.4,0.5,0.5,0.4,0.4,0.5,0.4,0.4,0.5,0.4,0.4,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.4,0.3,0.3,0.4,0.4,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.4,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.4,0.4,0.4,0.4,0.5,0.5,0.5,0.5,0.5,0.6,0.6,0.6,0.5,0.5,0.6,0.5,0.5,0.5,0.5,0.5,0.4,0.5,0.5,0.6,0.6,0.6,0.5,0.5,0.5,0.5,0.6,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.7,0.6,0.5,0.5,0.5,0.5,0.5,0.7,0.6,0.6,0.6,0.5,0.5,0.5,0.5,0.5,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4] },
    "B": { likelihoods: [0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.6,0.6,0.6,0.6,0.6,0.7,0.7,0.6,0.6,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.6,0.6,0.7,0.6,0.6,0.6,0.5,0.5,0.4,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.5,0.5,0.5,0.4,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.6,0.6,0.6,0.6,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.6,0.6,0.6,0.5,0.5,0.5,0.5,0.5,0.5,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.5,0.5,0.5,0.5,0.4,0.4,0.4,0.4,0.3,0.3,0.3,0.3,0.4,0.4,0.4,0.5,0.4,0.4,0.3,0.3,0.3,0.3,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.5,0.4,0.4,0.5,0.5,0.5,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4] },
    "C": { likelihoods: [0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.6,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.4,0.4,0.4,0.4,0.5,0.5,0.6,0.6,0.5,0.6,0.6,0.7,0.7,0.7,0.7,0.7,0.6,0.6,0.6,0.7,0.6,0.6,0.7,0.7,0.6,0.6,0.6,0.6,0.6,0.7,0.7,0.7,0.7,0.6,0.7,0.6,0.6,0.6,0.6,0.6,0.6,0.5,0.6,0.5,0.5,0.4,0.5,0.5,0.4,0.4,0.4,0.4,0.5,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.5,0.5,0.5,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.5,0.5,0.5,0.5,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.7,0.6,0.7,0.7,0.6,0.6,0.6,0.7,0.7,0.7,0.6,0.6,0.6,0.6,0.5,0.5,0.5,0.4,0.4,0.3,0.3,0.4,0.4,0.4,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3] },
    "D": { likelihoods: [0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.4,0.3,0.3,0.3,0.3,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.4,0.4,0.4,0.4,0.3,0.4,0.4,0.3,0.4,0.4,0.3,0.4,0.3,0.3,0.3,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.4,0.3,0.3,0.3,0.4,0.4,0.3,0.4,0.4,0.4,0.4,0.4,0.5,0.4,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.4,0.4,0.4,0.4,0.3,0.3,0.5,0.5,0.6,0.6,0.6,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.6,0.6,0.6,0.7,0.6,0.6,0.6,0.6,0.7,0.7,0.7,0.7,0.7,0.7,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.6,0.6,0.5,0.6,0.6,0.6,0.6,0.5,0.5,0.5,0.5,0.5,0.6,0.6] },
}


function chooseOption(option: string): void {
    if (!keyInputAllowed) return; // Ignore keyboard input if not allowed

    let outcome: string = '';
    let reward: number = 0;
    let rewardImage: string = '';
    let rewardMessage: string = '';
    
    // NOTE: Do not put round counter here because not updated until much later stage

    if (currentStage === "mainStage1" || currentStage === "practiceStage1" ) { // Stage 1: Option X or Y
        intertrialInterval1 = [400, 600, 800][Math.floor(Math.random() * 3)]; // milliseconds
        intertrialInterval2 = 0;

        if (option === 'X') {
            outcome = Math.random() < stage1Probability ? 'X' : 'Y';
        } else { // option Y
            outcome = Math.random() < stage1Probability ? 'Y' : 'X';
        }
        // NOTE: Do not put round counter here because not updated until much later stage

        results.push({ stage: currentStage, round: round, choice: option, outcome: outcome, reward: reward, points: points, rewardImage: rewardImage });

        // Introduce intertrialInterval delay between Stage 1 user choice and Stage 2 display
        setTimeout(() => {
            // Determine which key options to display (practice vs. main trials)
            if (currentStage === "mainStage1") { 
                // Switch main stages
                currentStage = "mainStage2"; 
                // Show Stage 2 Options, hide stage 1 display
                document.getElementById('stage-1-main-instructions')!.style.display = "none";
                document.getElementById('stage-2-main-instructions')!.style.display = "block";
                // document.getElementById('stage-2-key-instruction')!.style.display = 'block'; // needs to be here otherwise first trial of stage 2 doesn't have key instruction
            } else { // currentStage === practiceStage1
                // Switch practice stages
                currentStage = "practiceStage2"; 
                // Show Stage 2 Practice Options, hide stage 1 practice display
                document.getElementById('stage-1-practice-instructions')!.style.display = "none";
                document.getElementById('stage-2-practice-instructions')!.style.display = "block";
                document.getElementById('stage-2-key-instruction')!.style.display = 'block'; // needs to be here otherwise first trial of stage 2 doesn't have key instruction
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
            const currentLikelihood = likelihoods[round-1]; // pick the likelihood associated with this round (minus one for array index)
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
            results.push({ stage: currentStage, round: round, choice: option, outcome: outcome, reward: reward, points: points, rewardImage: rewardImage });

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
function requestFullScreen(element: HTMLElement) {
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
const element = document.getElementById('element-id');
if (element) {
    requestFullScreen(element);
}

// Event listener for instructions screen
const handleKeydown = function(event: KeyboardEvent) {
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
document.addEventListener('keydown', function(event) {
    if (!keyInputAllowed) return; // Ignore keyboard input if not allowed
    
    event.preventDefault(); // Prevent default scrolling behavior of arrow keys

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        console.log(event.key)
        let choice;
        if (currentStage === 'mainStage1' || currentStage === 'practiceStage1') {
            console.log("key input done for stage 1")
            choice = event.key === 'ArrowLeft' ? 'X' : 'Y';
            chooseOption(choice);
            keyInputAllowed = false; // Don't allow key press input after first key press in stage 1
        } else if (currentStage === 'mainStage2' || currentStage === 'practiceStage2') {
            console.log("key input done for stage 2")
            choice = event.key === 'ArrowLeft' ? 'A' : 'B';
            if (document.getElementById('planet-Y-options')?.style.display === 'block') {
                choice = event.key === 'ArrowLeft' ? 'C' : 'D';
            }
            chooseOption(choice);
            keyInputAllowed = false; // Don't allow key press input after first key press in stage 2
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

function saveResultsToCSV(results: { stage: string; round: number; choice: string; outcome: string; reward: number, points: number; rewardImage: string  }[]): void {
    const subjectId: string = getParameterByName('subject_id', window.location.href) || 'UnknownSubject';
    const timestamp: string = new Date().toISOString().replace(/:/g, '-');
    const filename: string = `data/two_step_task_results_${subjectId}_${timestamp}.csv`;
    
    const csvHeader = "Stage,Round,Choice,Outcome,Reward,TotalPoints";
    const csvRows = results.map(result => `${result.stage},${result.round},${result.choice},${result.outcome},${result.reward},${result.points}`).join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${csvHeader}\n${csvRows}`;
    const encodedUri: string = encodeURI(csvContent);

    // Automatically downloads CSV file to local machine
    const link: HTMLAnchorElement = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
}

// Function to get URL parameter by name
function getParameterByName(name: string, url: string): string | null {
    const paramName = name.replace(/[\[\]]/g, "\\$&");
    const regex: RegExp = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Attach the chooseOption function to the window object
(window as any).chooseOption = chooseOption;