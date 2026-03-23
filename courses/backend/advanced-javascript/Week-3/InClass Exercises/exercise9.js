import fs from "fs";

// Callback version
function readJsonFile(path, callback) {
  fs.readFile(path, "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    try {
      const parsed = JSON.parse(data);
      callback(null, parsed);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

// Convert to Promise version
function readJsonFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      try {
        const parsed = JSON.parse(data);
        resolve(parsed);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

// Test it:
readJsonFilePromise("./test.json")
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));
