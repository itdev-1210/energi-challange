import { getLastBlockNumber } from "../../services/web3"

export default (req, res) => {
  getLastBlockNumber()
    .then(blockNumber => {
      res.status(200).json({ data: blockNumber })
    })
    .catch(e => {
      console.log(e)
      res.status(500).json({ msg: 'failed' });
    });
}
