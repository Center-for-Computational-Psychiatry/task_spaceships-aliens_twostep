export let round: number = 1;
export let totalRounds: number = 10;
export let results: { round: number; choice: string; outcome: string; reward: number }[] = [];
export let points: number = 0;

// export let rewardA: number[] = [1, 2]; // Rewards for choosing Option X in different worlds (80% and 20%)
// export let rewardB: number[] = [3, 4];  // Rewards for choosing Option Y in different worlds (80% and 20%)

const stage2Options = {
    X: { likelihoods: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.1] },
    Y: { likelihoods: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.1] },
    Z: { likelihoods: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.1] },
    W: { likelihoods: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.1] },
}

const GEM_REWARD = { points: 100, image: "img/gem-emerald.png" };
const DUST_REWARD = { points: 100, image: "img/dust.png" };
const GEM_A_REWARD = { points: 100, image: "img/gem-sapphire.png" };
const GEM_B_REWARD = { points: 100, image: "img/gem-ruby.png" };

export function chooseOption(option: string): void {
    let outcome: string = '';
    let reward: number = 0;
    let rewardImage: string = '';

    if (round % 2 === 1) { // Stage 1: Choosing between Option A and Option B
        if (option === 'A') {
            outcome = Math.random() < 0.7 ? 'A' : 'B';
        } else {
            outcome = Math.random() < 0.7 ? 'B' : 'A';
        }
        document.getElementById('stage')!.innerText = "You have arrived to an alien planet: Choose between these two alien traders";
        // Displaying images for stage 2
        if (outcome === 'A') {
            document.getElementById('task')!.innerHTML = `
            <img src="img/Stage2-alien-red-A.png" alt="Option A" onclick="chooseOption('X')" style="cursor: pointer;">
            <img src="img/Stage2-alien-red-B.png" alt="Option B" onclick="chooseOption('Y')" style="cursor: pointer;">
            `;
        } else {
            document.getElementById('task')!.innerHTML = `
            <img src="img/Stage2-alien-purple-A.png" alt="Option A" onclick="chooseOption('Z')" style="cursor: pointer;">
            <img src="img/Stage2-alien-purple-B.png" alt="Option B" onclick="chooseOption('W')" style="cursor: pointer;">
            `;
        }
    } else { // Stage 2: Choosing between Option X, Y, Z, or W
        console.log("option: " + option)
        const choiceConfig = stage2Options[option];
        console.log("choiceConfig: " + choiceConfig)
        if (choiceConfig) {
            const likelihoods = choiceConfig.likelihoods;
            const currentLikelihood = likelihoods[Math.floor((round - 1) / 2)];

            if (Math.random() < currentLikelihood) {
                outcome = option;
                reward = GEM_REWARD.points;
                rewardImage = GEM_REWARD.image;
            } else {
                outcome = getAlternativeOutcome(option);
                reward = DUST_REWARD.points;
                rewardImage = DUST_REWARD.image;
            }

            points += reward;
            document.getElementById('pointCounter')!.innerText = points.toString();
        }
        
        document.getElementById('stage')!.innerText = "Stage 1: Choose between these two options";
        document.getElementById('task')!.innerHTML = `
        <img src="img/Stage1-rocket-A.png" alt="Option A" onclick="chooseOption('A')" style="cursor: pointer;">
        <img src="img/Stage1-rocket-B.png" alt="Option B" onclick="chooseOption('B')" style="cursor: pointer;">
        `;
    }

    document.getElementById('result')!.innerText = `You chose ${option}. Outcome: ${outcome}. Reward: ${reward}`;
    //document.getElementById('result').innerText = `You won a reward: ${reward}`; // this needs to be removed
    results.push({ round: round, choice: option, outcome: outcome, reward: reward });
    round++;
    document.getElementById('roundNumber')!.innerText = round.toString();
    if (round > totalRounds) {
        // End of the task, save results to CSV
        saveResultsToCSV(results);
        // this resets the round and points but not reflected in the display until 1-2 rounds later
        round = 1;
        results = [];
        points = 0;
        alert("Task completed! Thank you for participating.");
    }
}

export function saveResultsToCSV(results: { round: number; choice: string; outcome: string; reward: number; rewardImage: string  }[]): void {
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
