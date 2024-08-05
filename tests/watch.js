import { spawn } from "child_process";
// This import allows us to execute shell commands from our Node.js script.
// We use it to run our test script as a separate process.

import { fileURLToPath } from "url";
import { dirname, join } from "path";
// These imports are used for working with file paths.
// They're necessary because we're using ES modules (indicated by "type": "module" in package.json).
// In ES modules, __dirname is not available, so we need to recreate it.

const __filename = fileURLToPath(import.meta.url);
// This converts the URL of the current module to a file path.

const __dirname = dirname(__filename);
// This gets the directory name of the current file.
// We need this to construct the full path to run_test.js later.

function runScript() {
  // This function is responsible for running our test script.

  const scriptPath = join(__dirname, "run_test.js");
  // This constructs the full path to run_test.js
  // join() is used to create a path that works on any operating system.

  console.log("Attempting to run script:", scriptPath);

  const child = spawn("node", [scriptPath], { stdio: "inherit" });
  // This line creates a new Node.js process to run run_test.js
  // 'node' is the command to run
  // [scriptPath] is an array of arguments (in this case, just the path to run_test.js)
  // { stdio: 'inherit' } means the child process will use the same standard IO as the parent process

  child.on("close", (code) => {
    console.log(`Script execution completed with code ${code}`);
  });
  // This sets up an event listener for when the child process closes
  // It logs the exit code, which can be useful for debugging

  child.on("error", (error) => {
    console.error(`Error during script execution: ${error.message}`);
  });
  // This sets up an event listener for any errors that occur while spawning the process
  // It logs any error messages
}

console.log("watch.js is running");
runScript();
// This immediately runs the test script when watch.js is executed.
