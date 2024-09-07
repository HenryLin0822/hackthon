const { exec } = require('child_process');

// Function to run Python script with input as argument
function runPythonScript(question, stationName) {
    // Escape the input to prevent command injection
    const escapedQuestion = question.replace(/["'\\]/g, '');
    const escapedStation = stationName.replace(/["'\\]/g, '');

    // Run the Python script with the question and station name as arguments
    exec(`python3 inference.py "${escapedQuestion}" "${escapedStation}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return;
        }

        // Ignore stderr warnings unless critical
        if (stderr && !stderr.includes('check_gcp_environment')) {
            console.error(`Error in Python script: ${stderr}`);
            return;
        }

        console.log(stdout);  // Output from Python script
    });
}

// Example: Call the function with a question and station name
runPythonScript('請介紹大安森林公園', '大安森林公園');
