import React, { Fragment } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableRow, TableHead, Breadcrumbs, Link } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import { web3, getBlock } from '../../services/web3';

const BLock = ({ number, block }) => {
  return (    
    <Container maxWidth="md">
      <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: 30 }}>
        <Link color="inherit" href="/">
          <HomeIcon />
        </Link>
      </Breadcrumbs>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Block  #{number}
        </Typography>
      </Box>
      {!block && <Typography>Block number is invalid</Typography>}
      {block && (
        <Fragment>
          <Box my={2}>
            <Typography variant="h5" style={{ marginBottom: 10 }}>Block Information</Typography>
            <Table size="small" aria-label="block detail table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Number of transactions
                  </TableCell>
                  <TableCell align="right"><strong>{block.transactions.length}</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Miner
                  </TableCell>
                  <TableCell align="right"><strong>{block.miner}</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Total difficulty
                  </TableCell>
                  <TableCell align="right"><strong>{block.totalDifficulty}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box my={4}>
            <Typography variant="h5">Transactions</Typography>
            <Table size="small" aria-label="block detail table">
              <TableHead>
                <TableRow>
                  <TableCell>Txn Hash</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Gas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {block.transactions
                  .sort((a, b) => {
                    const aValue = Number.parseFloat(web3.utils.fromWei(a.value, "ether"));
                    const bValue = Number.parseFloat(web3.utils.fromWei(b.value, "ether"));
                    return bValue - aValue;
                  })
                  .map(t => {
                    return (
                      <TableRow key={t.blockHash}>
                        <TableCell component="th" scope="row">
                          {t.blockHash}
                        </TableCell>
                        <TableCell align="right"><strong>{Number.parseFloat(web3.utils.fromWei(t.value, "ether")).toFixed(5)}</strong></TableCell>
                        <TableCell align="right"><strong>{t.gas}</strong></TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </Box>
        </Fragment>
      )}
    </Container>
  );
}
export async function getServerSideProps(context) {
  const { res, req, query } = context;

  const { number } = query;

  let block = null;
  try {
    // get block data
    block = await getBlock(number);
  } catch {
    //
  }
  return {
    props: {
      number,
      block
    }
  };
}

export default BLock;