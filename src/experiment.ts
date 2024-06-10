export let round: number = 1;
export let totalRounds: number = 10;
export let currentStage: number = 1;
export let results: { round: number; choice: string; outcome: string; reward: number, rewardImage: string }[] = [];
export let points: number = 0;

// variables for game setting 1
const REWARD_1 = { points: 100, image: "img/gem-emerald.png" };
const REWARD_2 = { points: 0, image: "img/dust.png" };
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
    let outcome: string = '';
    let reward: number = 0;
    let rewardImage: string = '';

    if (round % 2 === 1) { // Stage 1: Option X or Y
        if (option === 'X') {
            outcome = Math.random() < 1.0 ? 'X' : 'Y';
        } else {
            outcome = Math.random() < 1.0 ? 'Y' : 'X';
        }
        // switch to stage 2 display, hide stage 1 display
        document.getElementById('stage-2-options')!.style.display = "block";
        // document.getElementById('stage-2-options')!.style.visibility = "visible";
        document.getElementById('stage-1-options')!.style.display = "none";
        // determine which set of options in stage 2 to display
        if (outcome === 'X') { 
            document.getElementById('planet-X-options')!.style.display = "block";
            // document.getElementById('planet-X-options')!.style.visibility = "visible";
            document.getElementById('planet-Y-options')!.style.display = "none";
        } else { // Option Y
            document.getElementById('planet-Y-options')!.style.display = "block";
            // document.getElementById('planet-Y-options')!.style.visibility = "visible";
            document.getElementById('planet-X-options')!.style.display = "none";
        };
        // document.getElementById('stage')!.innerText = "You have arrived to an alien planet: Choose between these two alien traders";
        // // Displaying images for stage 2
        // if (outcome === 'X') { 
        //     document.getElementById('task')!.innerHTML = `
        //     <img src="img/Stage2-alien-red-A.png" alt="Option A" onclick="chooseOption('A')" style="cursor: pointer;">
        //     <img src="img/Stage2-alien-red-B.png" alt="Option B" onclick="chooseOption('B')" style="cursor: pointer;">
        //     `;
        // } else { // Option Y
        //     document.getElementById('task')!.innerHTML = `
        //     <img src="img/Stage2-alien-purple-A.png" alt="Option C" onclick="chooseOption('C')" style="cursor: pointer;">
        //     <img src="img/Stage2-alien-purple-B.png" alt="Option D" onclick="chooseOption('D')" style="cursor: pointer;">
        //     `;
        // }
    } else { // Stage 2: Option A, B, C, or D
        console.log("option: " + option)
        // get stage2Options with only the user's choice at this step
            // e.g. likelihoods: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0]
        const choiceConfig = stage2Options[option as keyof typeof stage2Options];
        console.log("choiceConfig.likelihoods: " + choiceConfig.likelihoods)
        if (choiceConfig) {
            const likelihoods = choiceConfig.likelihoods;
            const currentLikelihood = likelihoods[round]; // pick the likelihood associated with this round
            
            if (Math.random() < currentLikelihood) {
                outcome = option;
                reward = REWARD_1.points;
                rewardImage = REWARD_1.image;
            } else {
                outcome = option;
                reward = REWARD_2.points;
                rewardImage = REWARD_2.image;
            }

            points += reward;
            document.getElementById('pointCounter')!.innerText = points.toString();
        } else {
            console.log("choiceConfig doesn't exist")
        }
        // Show Stage 1 Displays
        document.getElementById('stage-1-options')!.style.display = "block";
        // document.getElementById('stage-1-options')!.style.visibility = "visible";
        document.getElementById('stage-2-options')!.style.display = "none";
        // document.getElementById('stage')!.innerText = "You are on Earth. To launch into space and find gems, choose your rocket ship!";
        // document.getElementById('task')!.innerHTML = `
        // <img src="img/Stage1-rocket-A.png" alt="Option X" onclick="chooseOption('X')" style="cursor: pointer;">
        // <img src="img/Stage1-rocket-B.png" alt="Option Y" onclick="chooseOption('Y')" style="cursor: pointer;">
        // `;
    }

    document.getElementById('result')!.innerText = `You chose ${option}. Outcome: ${outcome}. Reward: ${reward}`;
    //document.getElementById('result').innerText = `You won a reward: ${reward}`; // this needs to be removed
    results.push({ round: round, choice: option, outcome: outcome, reward: reward, rewardImage: rewardImage });
    round++;
    document.getElementById('roundNumber')!.innerText = round.toString();
    
    // When finished with all rounds
    if (round > totalRounds) {
        // End of the task, save results to CSV
        saveResultsToCSV(results);
        // wipe the game display elements and notify participant of end of study
        document.getElementById('game-status')!.style.display = "block";
        document.getElementById('stage-1-options')!.style.display = "none";
        document.getElementById('stage-2-options')!.style.display = "none";
        // this resets the round and points but not reflected in the display until 1-2 rounds later
        round = 1;
        results = [];
        points = 0;
        // alert("Task completed! Thank you for participating.");
    }
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