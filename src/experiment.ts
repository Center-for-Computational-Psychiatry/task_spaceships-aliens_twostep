export let round: number = 1;
export let practiceRounds: number = 10;
export let mainRounds: number = 15; 
export let totalRounds: number = practiceRounds;
export let points: number = 0;
export let currentStage: string = "welcome"; // [welcome, instructions1, instructions2, instructions3, practiceStage1, practiceStage2, instructionsFinal, mainStage1, mainStage2]
export let results: { stage: string, round: number; choice: string; outcome: string; reward: number, points: number; rewardImage: string }[] = [];
export let keyInputAllowed: boolean = true; // Flag to control input

export let intertrialInterval1: number = 0;
export let intertrialInterval2: number = 0;
console.log("intertrialInterval1: " + intertrialInterval1)
console.log("intertrialInterval2: " + intertrialInterval2)

// variables for game setting 1
const REWARD_1 = { points: 100, image: "reward-img-gem", message: "You found a gem (+100 points)! You return to Earth..."};
const REWARD_2 = { points: 0, image: "reward-img-dirt", message: "You found some dirt (no points)! You return to Earth..."};
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
// // likelihoods for game setting 2
// const stage2Options = {
//     "A": { likelihoods: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7] },
//     "B": { likelihoods: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3] },
//     "C": { likelihoods: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7] },
//     "D": { likelihoods: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3] },
// }

export function chooseOption(option: string): void {
    if (!keyInputAllowed) return; // Ignore keyboard input if not allowed

    let outcome: string = '';
    let reward: number = 0;
    let rewardImage: string = '';
    let rewardMessage: string = '';
    
    // NOTE: Do not put round counter here because not updated until much later stage

    if (currentStage === "mainStage1" || currentStage === "practiceStage1" ) { // Stage 1: Option X or Y
        intertrialInterval1 = [500, 1000, 1500][Math.floor(Math.random() * 3)]; // 500, 1000, or 1500 millisecond
        intertrialInterval2 = 0;
        console.log("intertrialInterval1: " + intertrialInterval1)
        console.log("intertrialInterval2: " + intertrialInterval2)

        if (option === 'X') {
            outcome = Math.random() < 0.8 ? 'X' : 'Y';
        } else { // option Y
            outcome = Math.random() < 0.8 ? 'Y' : 'X';
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
            } else { // currentStage === practiceStage1
                // Switch practice stages
                currentStage = "practiceStage2"; 
                // Show Stage 2 Practice Options, hide stage 1 practice display
                document.getElementById('stage-1-practice-instructions')!.style.display = "none";
                document.getElementById('stage-2-practice-instructions')!.style.display = "block";    
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
            console.log("intertrialInterval1 before timeout: " + intertrialInterval1)
            keyInputAllowed = true; // Re-allow keyboard input after intertrial interval ends

        }, intertrialInterval1); // 0.5 or 1.0 seconds
        
    } else if (currentStage === "mainStage2" || currentStage === "practiceStage2") { // Stage 2: Option A, B, C, or D
        intertrialInterval2 = [500, 1000, 1500][Math.floor(Math.random() * 3)]; // 500, 1000, or 1500 millisecond
        console.log("intertrialInterval1: " + intertrialInterval1)
        console.log("intertrialInterval2: " + intertrialInterval2)

        console.log("option: " + option)
        // get stage2Options with only the user's choice at this step
            // e.g. likelihoods: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0]
        const userChoice = stage2Options[option as keyof typeof stage2Options];
        console.log("choiceConfig.likelihoods: " + userChoice.likelihoods)
        
        if (userChoice) {
            const likelihoods = userChoice.likelihoods;
            const currentLikelihood = likelihoods[round-1]; // pick the likelihood associated with this round (minu one for array index)
            console.log("currentLikelihood: " + currentLikelihood)

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
                
                setTimeout(() => { // This stuff happens AFTER the 2 second reward display interval
                    
                    // Hide reward message, hide stage 2 planet + aliens
                    document.getElementById('reward-message')!.style.display = 'none';
                    document.getElementById(rewardImage)!.style.display = 'none';
                    document.getElementById('stage-2-options')!.style.display = "none";
                    round++;

                    // Continue to next round or end the session
                    if (round <= totalRounds) { // continue to next round
                        document.getElementById('stage-1-options')!.style.display = "block";
                        document.getElementById('roundNumber')!.innerText = round.toString(); // update round display

                        if (currentStage === "mainStage2") {
                            // Show Stage 1 Main Displays
                            currentStage = "mainStage1";
                            document.getElementById('stage-1-main-instructions')!.style.display = "block";
                            document.getElementById('stage-2-main-instructions')!.style.display = 'none';
                        } else { // currentStage === "practiceStage2"
                            // Show Stage 1 Practice Displays
                            currentStage = "practiceStage1";
                            document.getElementById('stage-1-practice-instructions')!.style.display = "block";
                            document.getElementById('stage-2-practice-instructions')!.style.display = 'none';
                        }
                    } else { // end the session
                        round = 1;
                        points = 0;
                        
                        if (currentStage == "practiceStage1" || currentStage == "practiceStage2") {
                            transitionToMainStudy();
                        } else { // if currently in the main study
                            endTask();
                        }
                    }
                    
                    // Re-allow keyboard input after reward display ends
                    keyInputAllowed = true;

                    console.log("intertrialInterval2 before timeout: " + intertrialInterval2)
                    
                }, 2000);

            }, intertrialInterval2);
            
        } else {
            console.log("choiceConfig doesn't exist")
        }

    }

}


// Event listener for instructions screen
const handleKeydown = function(event: KeyboardEvent) {
    console.log("first key event logged")
    
    // if (event.target && (event.target as HTMLElement).id !== 'instructions-screen') return; // Ignore keydown events outside the instructions screen
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
document.addEventListener('keydown', handleKeydown);

// Event listener for making key presses in Stage 1 and Stage 2
document.addEventListener('keydown', function(event) {
    if (!keyInputAllowed) return; // Ignore keyboard input if not allowed
    console.log("second key event logged")
    event.preventDefault(); // Prevent default scrolling behavior of arrow keys

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        let choice;
        if (currentStage === 'mainStage1' || currentStage === 'practiceStage1') {
            console.log("key input stopped for stage 1")
            choice = event.key === 'ArrowLeft' ? 'X' : 'Y';
            chooseOption(choice);
            keyInputAllowed = false; // Don't allow key press input after first key press in stage 1
        } else if (currentStage === 'mainStage2' || currentStage === 'practiceStage2') {
            console.log("key input stopped for stage 2")
            choice = event.key === 'ArrowLeft' ? 'A' : 'B';
            if (document.getElementById('planet-Y-options')?.style.display === 'block') {
                choice = event.key === 'ArrowLeft' ? 'C' : 'D';
            }
            chooseOption(choice);
            keyInputAllowed = false; // Don't allow key press input after first key press in stage 2
        }
    }
});

export function transitionToMainStudy() {
    currentStage = "instructionsFinal"
    totalRounds = mainRounds
    document.getElementById('instructions-final')!.style.display = "block";
    document.getElementById('game-display')!.style.display = "none";
    document.addEventListener('keydown', handleKeydown);
}

export function startMainStudy() {
    document.getElementById('instructions-final')!.style.display = 'none';
    document.getElementById('roundNumber')!.innerText = round.toString(); // needs to be here in order for first trial to render correct values
    document.getElementById('pointCounter')!.innerText = points.toString(); // needs to be here in order for first trial to render correct values
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
    document.getElementById('game-display')!.style.display = "none";   
}

export function saveResultsToCSV(results: { stage: string; round: number; choice: string; outcome: string; reward: number, points: number; rewardImage: string  }[]): void {
    let subjectId: string = getParameterByName('subject_id', window.location.href) || 'UnknownSubject';
    // alternative: let subjectId: string = getParameterByName('subject_id', window.location.href) ?? 'UnknownSubject';
    let timestamp: string = new Date().toISOString().replace(/:/g, '-');
    let filename: string = `data/two_step_task_results_${subjectId}_${timestamp}.csv`;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Stage,Round,Choice,Outcome,Reward,TotalPoints\n";
    results.forEach(function(result) {
        let row: string = result.stage + "," + result.round + "," + result.choice + "," + result.outcome + "," + result.reward + "," + result.points + "\n";
        csvContent += row;
    });
    var encodedUri: string = encodeURI(csvContent);
    var link: HTMLAnchorElement = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
}

// Function to get URL parameter by name
export function getParameterByName(name: string, url: string): string | null {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex: RegExp = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results: RegExpExecArray | null = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Attach the chooseOption function to the window object
(window as any).chooseOption = chooseOption;