var Election = artifacts.require("./Election.sol");

module.exports = function (deployer) {
	deployer.deploy(Election, "NepalVotes", 1620264635, 1620266435);
};
