require("@nomicfoundation/hardhat-toolbox");

const { TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD } = require("hardhat/builtin-tasks/task-names");
const path = require("path");

subtask(TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD, async (args, hre, runSuper) => {
  // v0.8.9 is Hardhat's latest supported version of Solidity
  if (args.solcVersion === "0.8.9") {
    const compilerPath = path.join(__dirname, "soljson-v0.8.9");

    return {
      compilerPath,
      isSolcJs: true, // if you are using a native compiler, set this to false
      version: args.solcVersion,
      // this is used as extra information in the build-info files, but other than
      // that is not important
      longVersion: "0.8.9+commit.e5eed63a"
    }
  }

  // we just use the default subtask if the version is not 0.8.5
  return runSuper();
})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
};
