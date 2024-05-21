import { chooseOption, getParameterByName, saveResultsToCSV, round, points, rewardA, rewardB, results, totalRounds } from '../src/experiment';

describe('chooseOption function', () => {
  test('should handle stage 1 correctly', () => {
    document.body.innerHTML = `
      <div id="stage"></div>
      <div id="task"></div>
      <div id="result"></div>
      <div id="roundNumber"></div>
      <div id="pointCounter"></div>
    `;
    
    chooseOption('A');
    
    const stage = document.getElementById('stage')!.innerText;
    const task = document.getElementById('task')!.innerHTML;

    expect(stage).toBe("Stage 2: Choose between these two options");
    expect(task).toMatch(/img/); // Ensure images are displayed
  });

  // Add more tests for different stages and conditions
});

describe('getParameterByName function', () => {
  test('should return correct parameter value', () => {
    const url = 'http://example.com?subject_id=12345';
    const paramName = 'subject_id';
    const result = getParameterByName(paramName, url);
    expect(result).toBe('12345');
  });
  
  test('should return null if parameter not found', () => {
    const url = 'http://example.com';
    const paramName = 'subject_id';
    const result = getParameterByName(paramName, url);
    expect(result).toBe(null);
  });
});

describe('saveResultsToCSV function', () => {
  // Mock saveResultsToCSV if necessary, or test its components separately
});

