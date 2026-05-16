const chalk = require("chalk");

/**
 * CYBERENAFUL Custom Logger System
 * @param {string} data - যে মেসেজটি প্রিন্ট করতে চান
 * @param {string} type - লগের ক্যাটাগরি বা টাইপ (যেমন: [ STARTING ], [ ERROR ])
 */
module.exports = (data, type) => {
  const systemName = "[ CYBERENAFUL ]";
  
  switch (type) {
    case "[ STARTING ]":
      console.log(chalk.cyan(`${systemName} ${type} ${data}`));
      break;
    case "[ LOGIN ]":
      console.log(chalk.yellow(`${systemName} ${type} ${data}`));
      break;
    case "[ SUCCESS ]":
      console.log(chalk.green(`${systemName} ${type} ${data}`));
      break;
    case "[ ERROR ]":
    case "[ CRASH ]":
      console.log(chalk.red(`${systemName} ${type} ${data}`));
      break;
    case "[ RESTART ]":
      console.log(chalk.magenta(`${systemName} ${type} ${data}`));
      break;
    case "[ STOPPED ]":
      console.log(chalk.bgRed.white(`${systemName} ${type} ${data}`));
      break;
    default:
      // যদি কোনো নির্দিষ্ট টাইপ না দেওয়া হয়, তবে এটি নরমাল লগ হিসেবে প্রিন্ট হবে
      console.log(chalk.blue(`${systemName} ${type || "[ INFO ]"} ${data}`));
      break;
  }
};

module.exports.error = (data, type) => {
  console.log(chalk.red(`[ CYBERENAFUL ] ${type || "[ ERROR ]"} ${data}`));
};
