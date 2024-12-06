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
var outcome;
var reward = 0;
var planetImage = "";
var rewardImage = "";
var dataSaved = false; // Track if data has already been saved for the task session
var keyInputAllowed = true; // Flag to control input
var intertrialInterval1 = 0;
var intertrialInterval2 = 0;
var rewardDisplayInterval = 2000;
var probabilityStage1 = 0.8; // set as fixed percent, e.g. 0.8 = 80 percent that the rocket user chosen = the rocket taken
var probabilityStage2; // changes every trial as specified in 'stage2Options'
var stage2Conditions = [
    {
        "A": { likelihoods: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5] },
        "B": { likelihoods: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4] },
        "C": { likelihoods: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2] },
        "D": { likelihoods: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8] },
    },
    {
        "A": { likelihoods: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2] },
        "B": { likelihoods: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8] },
        "C": { likelihoods: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5] },
        "D": { likelihoods: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4] },
    },
    {
        "A": { likelihoods: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8] },
        "B": { likelihoods: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2] },
        "C": { likelihoods: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4] },
        "D": { likelihoods: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5] },
    }
];
// Select random condition 
var randomIndex = Math.floor(Math.random() * stage2Conditions.length);
var stage2Options = stage2Conditions[randomIndex];
var stage2ChosenCondition = randomIndex + 1;
console.log("randomIndex ", randomIndex);
console.log("stage2Options ", stage2Options);
var REWARD_1 = { points: 100, image: "reward-img-gem", message: "You found a gem (+100 points)!" };
var REWARD_2 = { points: 0, image: "reward-img-dirt", message: "You found dirt (no points)!" };
var subjectId = ''; // Declare globally so it can be used in other functions
var startTime = null; // For storing the absolute start datetime of the task
function getAlienLikelihoods(trial) {
    var trialIndex = trial - 1;
    var aliens = ["A", "B", "C", "D"];
    var likelihoods = [];
    aliens.forEach(function (alien) {
        likelihoods.push(stage2Options[alien].likelihoods[trialIndex]);
    });
    return likelihoods;
}
var results = [];
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
function resetSelectionBoxes() {
    // Hide or reset all selection boxes (rockets and aliens)
    rockets.forEach(function (rocket) { return rocket.classList.remove('selected'); });
    aliens.forEach(function (alien) { return alien.classList.remove('selected'); });
    // Reset any other visual elements as needed
    document.getElementById('stage-1-main-instructions').style.display = "none";
    document.getElementById('stage-2-main-instructions').style.display = "none";
}
function addData(choiceMade) {
    if (choiceMade === void 0) { choiceMade = ""; }
    if (!startTime) {
        console.error('Start time is not set.');
        return;
    }
    // Calculate the relative time by subtracting the start time from the current time
    var currentTime = new Date();
    var relativeTime = (currentTime.getTime() - startTime.getTime()) / 1000; // Relative time in seconds
    results.push({
        stage: currentStage,
        round: round,
        choice: choiceMade,
        outcome: outcome,
        reward: reward,
        points: points,
        planetImage: planetImage,
        rewardImage: rewardImage,
        relativeTime: relativeTime.toFixed(2), // Relative timestamp in seconds with 2 decimals
        absoluteTime: currentTime.toISOString(), // Optionally, save the current absolute timestamp as well
        rewardDisplayInterval: rewardDisplayInterval,
        intertrialInterval1: intertrialInterval1,
        intertrialInterval2: intertrialInterval2,
        probabilityStage1: probabilityStage1,
        probabilityStage2: probabilityStage2
    });
}
function chooseOption(optionChosen) {
    if (!keyInputAllowed)
        return; // Ignore keyboard input if not allowed
    var rewardMessage = '';
    // NOTE: Do not put round counter here because not updated until much later stage
    if (currentStage === "mainStage1" || currentStage === "practiceStage1") { // Stage 1: Option X or Y
        intertrialInterval1 = [400, 600, 800][Math.floor(Math.random() * 3)]; // milliseconds
        intertrialInterval2 = 0;
        if (optionChosen === 'X') {
            outcome = Math.random() < probabilityStage1 ? 'X' : 'Y';
        }
        else { // optionChosen Y
            outcome = Math.random() < probabilityStage1 ? 'Y' : 'X';
        }
        // NOTE: Do not put round counter here because not updated until much later stage
        addData(optionChosen);
        // Introduce intertrialInterval delay between Stage 1 user choice and Stage 2 display
        setTimeout(function () {
            // Hide previous selection boxes and elements
            resetSelectionBoxes();
            // Determine which key options to display (practice vs. main trials)
            if (currentStage === "mainStage1") {
                // Switch main stages
                currentStage = "mainStage2";
                // Show Stage 2 Options, hide stage 1 display
                document.getElementById('stage-1-main-instructions').style.display = "none";
                document.getElementById('stage-2-main-instructions').style.display = "block";
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
                planetImage = "planet_purple.png";
            }
            else { // Option Y
                document.getElementById('planet-Y-options').style.display = "block";
                document.getElementById('planet-X-options').style.display = "none";
                planetImage = "planet_green.png";
            }
            ;
            addData(); // log start of trial
            keyInputAllowed = true; // Re-allow keyboard input after intertrial interval ends
        }, intertrialInterval1);
    }
    else if (currentStage === "mainStage2" || currentStage === "practiceStage2") { // Stage 2: Option A, B, C, or D
        intertrialInterval2 = [400, 600, 800][Math.floor(Math.random() * 3)]; // 500, 1000, or 1500 millisecond
        var userChoice = stage2Options[optionChosen];
        if (userChoice) {
            probabilityStage2 = getAlienLikelihoods(round); // this is for saving alien probabilities data
            var currentLikelihood = userChoice.likelihoods[round - 1]; // pick the likelihood associated with this round (minus one for array index)
            // console.log("currentLikelihood: " + currentLikelihood)
            // select reward from user choice
            if (Math.random() < currentLikelihood) {
                outcome = optionChosen;
                reward = REWARD_1.points;
                rewardImage = REWARD_1.image;
                rewardMessage = REWARD_1.message;
            }
            else {
                outcome = optionChosen;
                reward = REWARD_2.points;
                rewardImage = REWARD_2.image;
                rewardMessage = REWARD_2.message;
            }
            // This stuff happens IMMEDIATELY AFTER participant makes a key choice
            points += reward; // needs to happen BEFORE data is saved for the round
            // Save user choices into data object
            addData(optionChosen);
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
                        addData(); // log start of trial or start of session
                    }
                    else { // end the session
                        if (currentStage == "practiceStage1" || currentStage == "practiceStage2") {
                            points = 0;
                            round = 1;
                            transitionToMainStudy();
                        }
                        else { // if currently in the main study
                            currentStage = "endTask";
                            endTask();
                        }
                        addData(); // log end of session or end of task
                    }
                    // Re-allow keyboard input after reward display ends
                    keyInputAllowed = true;
                    // console.log("intertrialInterval2 before timeout: " + intertrialInterval2)
                }, rewardDisplayInterval);
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
// Attach the event listener to the form's submit event
window.addEventListener('DOMContentLoaded', function () {
    var intakeForm = document.getElementById('intake-form');
    if (intakeForm) {
        intakeForm.addEventListener('submit', handleParticipantIDSubmit);
    }
});
function handleParticipantIDSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    var subjectIdInput = document.getElementById('subject-id');
    subjectId = subjectIdInput ? subjectIdInput.value : '';
    if (subjectId.trim() === '') {
        alert('Please enter a valid subject ID.');
        return;
    }
    console.log('Subject ID:', subjectId); // Log subject ID or use it as needed
    // Hide intake screen and show the welcome screen
    document.getElementById('intake-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    currentStage = "welcome";
    // Save the absolute start time of the task
    startTime = new Date();
    console.log('Task start time (absolute):', startTime.toISOString());
    addData(); // log start of the task
    // Make the entire screen full-screen
    requestFullScreen();
}
// Function to play the instructional video and proceed after it ends
function playInstructionalVideo() {
    var video = document.getElementById('instructional-video');
    video.play();
    // Event listener for when the video ends
    video.onended = function () {
        document.getElementById('video-screen').style.display = 'none';
        document.getElementById('before-practice-screen').style.display = 'block';
        currentStage = "beforePractice";
        addData(); // log start of stage
    };
}
// Event listener for instructions screen
var handleKeydown = function (event) {
    if (event.key === ' ' || event.key === 'Spacebar') {
        console.log("first key event logged");
        if (currentStage == "welcome") {
            document.getElementById('welcome-screen').style.display = 'none';
            document.getElementById('instructions-screen-1').style.display = 'block';
            currentStage = "instructions1";
            addData(); // log start of stage
            document.addEventListener('keydown', handleKeydown);
        }
        else if (currentStage == "instructions1") {
            document.getElementById('instructions-screen-1').style.display = 'none';
            document.getElementById('instructions-screen-2').style.display = 'block';
            currentStage = "instructions2";
            addData(); // log start of stage
        }
        else if (currentStage == "instructions2") {
            document.getElementById('instructions-screen-2').style.display = 'none';
            document.getElementById('instructions-screen-3').style.display = 'block';
            currentStage = "instructions3";
            addData(); // log start of stage
        }
        else if (currentStage == "instructions3") {
            document.getElementById('instructions-screen-3').style.display = 'none';
            document.getElementById('video-screen').style.display = 'block';
            currentStage = "videoPlaying";
            addData(); // log start of stage
            playInstructionalVideo();
        }
        else if (currentStage === "beforePractice") {
            document.getElementById('before-practice-screen').style.display = 'none';
            document.getElementById('game-display').style.display = 'block';
            currentStage = "practiceStage1";
            addData(); // log start of stage
            // Remove this event listener after continuing to the practice session
            document.removeEventListener('keydown', handleKeydown);
        }
        else if (currentStage == "instructionsFinal") {
            addData(); // log start of stage
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
    if (currentStage === "intake") {
        return;
    }
    ;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); // Prevent default scrolling behavior of arrow keys
        console.log(event.key);
        var optionChosen = void 0;
        if (currentStage === 'mainStage1' || currentStage === 'practiceStage1') {
            console.log("key input done for stage 1");
            optionChosen = event.key === 'ArrowLeft' ? 'X' : 'Y';
            console.log("choice: " + optionChosen);
            // display black selection box
            if (event.key === "ArrowLeft") {
                updateSelectedRocket(0);
            }
            else {
                updateSelectedRocket(1);
            }
            // implement logic for user choice
            chooseOption(optionChosen);
            // stop all key inputs after user makes a choice
            keyInputAllowed = false;
        }
        else if (currentStage === 'mainStage2' || currentStage === 'practiceStage2') {
            console.log("key input done for stage 2");
            // identify user's key selection choice based on which planet they are on
            if (((_a = document.getElementById('planet-X-options')) === null || _a === void 0 ? void 0 : _a.style.display) === 'block') {
                optionChosen = event.key === 'ArrowLeft' ? 'A' : 'B';
                console.log("choice: " + optionChosen);
                // display black selection box
                if (event.key === "ArrowLeft") {
                    updateSelectedAlien(0);
                }
                else {
                    updateSelectedAlien(1);
                }
            }
            else {
                optionChosen = event.key === 'ArrowLeft' ? 'C' : 'D';
                console.log("choice: " + optionChosen);
                // display black selection box
                if (event.key === "ArrowLeft") {
                    updateSelectedAlien(2);
                }
                else {
                    updateSelectedAlien(3);
                }
            }
            // implement logic for user choice
            chooseOption(optionChosen);
            // stop all key inputs after user makes a choice
            keyInputAllowed = false;
        }
    }
});
function transitionToMainStudy() {
    currentStage = "instructionsFinal";
    addData(); // log start of stage
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
    addData(); // log start of trial
}
// Add redirect links
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
// Allow the data to be saved whenever user exits the window/screen
window.addEventListener('beforeunload', function (event) {
    saveResultsToCSV(results);
    // // (Note that modern browsers may ignore this and show their own message)
    // const message = "Are you sure you want to leave?";
    // event.returnValue = message; // For most browsers
    // return message; // For some older browsers
});
function saveResultsToCSV(results) {
    if (dataSaved) {
        return;
    } // If data has already been saved for this round, exit
    var formattedStartTime;
    if (startTime) {
        formattedStartTime = startTime.toISOString().replace(/:/g, '-');
    }
    else {
        console.log("This line should never be printed. If it is being printed, check timestamp saving in 'saveResultsToCSV' function");
        formattedStartTime = new Date().toISOString().replace(/:/g, '-');
    }
    var filename = "data/two_step_task_results_".concat(subjectId, "_").concat(formattedStartTime, ".csv");
    // Updated CSV header to include Timestamp
    var csvHeader = "SubjectID,Stage,Round,Choice,Outcome,Reward,TotalPoints,PlanetImage,RewardImage,RelativeTime,AbsoluteTime,RewardDisplay,intertrialInterval1,intertrialInterval2,probabilityStage1,probabilityAlienGems";
    // Include the Timestamp in each row of the results
    var csvRows = results.map(function (result) {
        return "".concat(subjectId, ",").concat(result.stage, ",").concat(result.round, ",").concat(result.choice, ",").concat(result.outcome, ",").concat(result.reward, ",").concat(result.points, ",").concat(result.planetImage, ",").concat(result.rewardImage, ",").concat(result.relativeTime, ",").concat(result.absoluteTime, ",").concat(result.rewardDisplayInterval, ",").concat(result.intertrialInterval1, ",").concat(result.intertrialInterval2, ",").concat(result.probabilityStage1, ",").concat(result.probabilityStage2);
    }).join("\n");
    var csvContent = "data:text/csv;charset=utf-8,".concat(csvHeader, "\n").concat(csvRows);
    var encodedUri = encodeURI(csvContent);
    // Automatically downloads CSV file to local machine
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    // Set dataSaved to be true
    dataSaved = true;
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
window.chooseOption = chooseOption;
