# Spaceships and Aliens - Two Stage Task

Spaceships and Aliens game is an online implementation of the original two-stage task paradigm.

The two-step task, or the "two-stage" task, is an experiment designed to assess decision-making processes in the study of reinforcement learning (e.g. model-free and model-based inference approaches), and behavioral pathologies such as obsessive-compulsive disorder and gambling disorder.

Participants are tasked with navigating a two-stage decision-making process involving choices between different options, with the goal of maximizing point accumulation through strategic selections.

## Experimental Design

### Overview
The Two-Step Task Game simulates a resource-gathering mission where participants act as astronauts tasked with collecting valuable gems from alien traders. The game consists of two stages:

- **Rocket Selection (Stage 1)**
- **Alien Trader Selection (Stage 2)**

Participants will make 150 selections throughout the game, which are tracked to measure decision-making efficiency and adaptability.

### Stage 1: Rocket Selection
**Objective:** Choose between two rockets to travel to one of two planets.

**Mechanics:** Each rocket is associated with a probabilistic outcome of landing on one of the two planets. The association between rockets and planets is not fixed and varies probabilistically.

**Controls:**
LEFT ARROW key: Selects the left rocket. RIGHT ARROW key: Selects the right rocket.

### Stage 2: Alien Trader Selection
**Objective:** Upon arriving at a planet, choose between two alien traders. 

**Probability Likelihoods:** In stage 2, the player's choices (A, B, C, or D) influence the likelihood of different outcomes. The stage2Options object defines these likelihoods using arrays of probabilities.

**Rewards:** Players can either find a gem (+100 points) or dirt (0 points). 
The alien traders offer either valuable gems or non-valuable dirt. The distribution of gems and dirt varies over time, introducing dynamic changes to the trading environment. 

**Controls:** LEFT ARROW key: Selects the left alien trader. RIGHT ARROW key: Selects the right alien trader.

## Getting Started

For data collection: Visit the game linked in the project description.

To modify game specifications: Please refer to the [WIKI](https://github.com/Center-for-Computational-Psychiatry/task_spaceships-aliens_twostep/wiki) for making code modifications and deployment.

## Technical Details

For data collection purposes, this game is designed to be run on Google Chrome browser **only**. Automated data download feature will not work on other browsers (e.g. Safari). 

Data will be automatically downloaded to the user's local computer when exiting the screen/window/tab, or when the experiment is completed, whichever occurs first. 
