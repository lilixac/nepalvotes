var Election = artifacts.require("./Election.sol");

module.exports = function (deployer) {
	deployer.deploy(Election, "NepalVotes", 1620351900, 1620352500);
};
