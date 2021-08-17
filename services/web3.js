const Web3 = require('web3');
const web3 = new Web3(process.env.ETH_WSS_URL || Web3.givenProvider);

/**
 * Get Block Data from BlockHash or ID
 *
 * @param blockHashOrId
 * @returns {Object}
 */
 const getBlock = async (blockHashOrId) => {
  return await web3.eth.getBlock(blockHashOrId, true);
};

/**
* Get last block number
*
* @returns {Promise<number>}
*/
const getLastBlockNumber = async () => {
  return await web3.eth.getBlockNumber();
};

module.exports = {
  web3,
  getBlock,
  getLastBlockNumber,
};
