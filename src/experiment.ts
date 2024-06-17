export let round: number = 1;
// export let totalRounds: number = 10; // for debugging
export let totalRounds: number = 10;
export let currentStage: string = "welcome"; // [welcome, instructions1, instructions2, instructions3, practice-stage1, practice-stage2, instructionsFinal, stage1, stage2]
export let results: { round: number; choice: string; outcome: string; reward: number, rewardImage: string }[] = [];
export let points: number = 0;
let inputAllowed: boolean = true; // Flag to control input

// variables for game setting 1
const REWARD_1 = { points: 100, image: "reward-img-gem", message: "Yay! You found a gem of 100 points! You will now fly back to Earth..."};
const REWARD_2 = { points: 0, image: "reward-img-dirt", message: "Aw, you found only some dirt (no points)! You will now fly back to Earth..."};
// // variables for game setting 2
// const REWARD_1 = { points: 100, image: "img/gem-sapphire.png" };
// const REWARD_2 = { points: 100, image: "img/gem-ruby.png" };

// likelihoods for game setting 1
const stage2Options = {
    "A": { likelihoods: [1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
    "B": { likelihoods: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0] },
    "C": { likelihoods: [1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0] },
    "D": { likelihoods: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0] },
}
// // likelihoods for game setting 2
// const stage2Options = {
//     "A": { likelihoods: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7] },
//     "B": { likelihoods: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3] },
//     "C": { likelihoods: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7] },
//     "D": { likelihoods: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3] },
// }

export function chooseOption(option: string): void {
    if (!inputAllowed) return; // Ignore keyboard input if not allowed

    let outcome: string = '';
    let reward: number = 0;
    let rewardImage: string = '';
    let rewardMessage: string = '';

    if (currentStage === "stage1" ) { // Stage 1: Option X or Y
        if (option === 'X') {
            outcome = Math.random() < 1.0 ? 'X' : 'Y';
        } else {
            outcome = Math.random() < 1.0 ? 'Y' : 'X';
        }
        currentStage = "stage2";
        
        // Show Stage 2 Options, hide stage 1 display
        document.getElementById('stage-2-options')!.style.display = "block";
        document.getElementById('stage-1-options')!.style.display = "none";

        // determine which set of options in stage 2 to display
        if (outcome === 'X') { 
            document.getElementById('planet-X-options')!.style.display = "block";
            document.getElementById('planet-Y-options')!.style.display = "none";
        } else { // Option Y
            document.getElementById('planet-Y-options')!.style.display = "block";
            document.getElementById('planet-X-options')!.style.display = "none";
        };
        
    } else if (currentStage === "stage2" ) { // Stage 2: Option A, B, C, or D
        console.log("option: " + option)
        // get stage2Options with only the user's choice at this step
            // e.g. likelihoods: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0]
        const userChoice = stage2Options[option as keyof typeof stage2Options];
        console.log("choiceConfig.likelihoods: " + userChoice.likelihoods)
        if (userChoice) {
            const likelihoods = userChoice.likelihoods;
            const currentLikelihood = likelihoods[round]; // pick the likelihood associated with this round
            
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
            
            inputAllowed = false;

            // reward message and image displayed for 0.3 seconds
            document.getElementById('stage-2-instructions')!.style.display = 'none';
            document.getElementById('reward-message')!.innerText = rewardMessage;
            document.getElementById('reward-message')!.style.display = 'block';
            document.getElementById(rewardImage)!.style.display = 'block';
            
            // do this only after temporary reward display shows
            setTimeout(function() {
                points += reward;
                document.getElementById('pointCounter')!.innerText = points.toString();
                document.getElementById('reward-message')!.style.display = 'none';
                document.getElementById(rewardImage)!.style.display = 'none';
                round++;
                console.log("round: " + round)
                
                // check if at the end of game
                if (round <= totalRounds) {
                    currentStage = "stage1";
                    // Show Stage 1 Displays
                    document.getElementById('stage-1-options')!.style.display = "block";
                    document.getElementById('stage-2-instructions')!.style.display = 'block';
                    document.getElementById('stage-2-options')!.style.display = "none";
                } else {
                    endTask();
                }

                inputAllowed = true;

            }, 2000);
            
        } else {
            console.log("choiceConfig doesn't exist")
        }



    }
    document.getElementById('roundNumber')!.innerText = round.toString();
    
    // Save user choices into data object
    results.push({ round: round, choice: option, outcome: outcome, reward: reward, rewardImage: rewardImage });

    // Choice Result Display (mostly for debugging)
    // document.getElementById('result')!.innerText = `You chose ${option}. Outcome: ${outcome}. Reward: ${reward}`;
    //document.getElementById('result').innerText = `You won a reward: ${reward}`; // this needs to be removed
        
}

// Event listener for instructions screen
const handleKeydown = function(event: KeyboardEvent) {
    console.log("key event logged")
    
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
        document.getElementById('instructions-final')!.style.display = 'block';
        currentStage = "practice-stage1";
        // Remove the event listener after continuing to the practice session
        document.removeEventListener('keydown', handleKeydown);
    }
}
document.addEventListener('keydown', handleKeydown);

// Event listener for making key presses in Stage 1 and Stage 2
document.addEventListener('keydown', function(event) {
    event.preventDefault(); // Prevent default scrolling behavior of arrow keys
    
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        let choice;
        if (currentStage === 'stage1') {
            choice = event.key === 'ArrowLeft' ? 'X' : 'Y';
            chooseOption(choice);
        } else if (currentStage === 'stage2' ) {
            choice = event.key === 'ArrowLeft' ? 'A' : 'B';
            if (document.getElementById('planet-Y-options')?.style.display === 'block') {
                choice = event.key === 'ArrowLeft' ? 'C' : 'D';
            }
            chooseOption(choice);
        }
        
    }
});

export function endTask() {
    // End of the task, save results to CSV
    saveResultsToCSV(results);
    // wipe the game display elements and notify participant of end of study
    document.getElementById('game-status')!.style.display = "block";
    document.getElementById('game-display')!.style.display = "none";
    
    // this resets the round and points but not reflected in the display until 1-2 rounds later
    round = 1;
    results = [];
    points = 0;
    // alert("Task completed! Thank you for participating.");
}

export function saveResultsToCSV(results: { round: number; choice: string; outcome: string; reward: number, rewardImage: string  }[]): void {
    let subjectId: string = getParameterByName('subject_id', window.location.href) || 'UnknownSubject';
    // alternative: let subjectId: string = getParameterByName('subject_id', window.location.href) ?? 'UnknownSubject';
    let timestamp: string = new Date().toISOString().replace(/:/g, '-');
    let filename: string = `data/two_step_task_results_${subjectId}_${timestamp}.csv`;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Round,Choice,Outcome,Reward\n";
    results.forEach(function(result) {
        let row: string = result.round + "," + result.choice + "," + result.outcome + "," + result.reward + "\n";
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