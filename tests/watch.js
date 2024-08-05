import { exec } from "child_process";
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

  exec(`node ${scriptPath}`, (error, stdout, stderr) => {
    // This executes run_test.js as a separate process.
    // exec() runs a command in a shell and buffers the output.

    console.log("Script execution completed");

    if (error) {
      // If there's an error running the script, log it.
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      // If there's any output to stderr, log it.
      console.error(`Stderr: ${stderr}`);
    }
    // Log the standard output of the script.
    console.log(`Stdout: ${stdout}`);
  });
}

console.log("watch.js is running");
runScript();
// This immediately runs the test script when watch.js is executed.
