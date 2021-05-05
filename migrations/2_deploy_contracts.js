var Election = artifacts.require("./Election.sol");

module.exports = function(deployer) {
  deployer.deploy(Election, 'NepalVotes', 1620140402, 1620141302);
};
