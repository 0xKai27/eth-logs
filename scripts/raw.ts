import { ethers } from "hardhat";

let provider: any;
let currentBlock: number;
let rawLogs: any;

async function main() {
    await getProvider();
    await getCurrentBlock();
    await getLogs();
    await processLogsWithInterface();
}

async function getProvider() {
  console.log(`Configuring provider...`);

  provider = ethers.getDefaultProvider('homestead'); // connect to the mainnet

}

async function getCurrentBlock() {
  console.log(`Getting latest block number...`);

  currentBlock = await provider.getBlockNumber();
  console.log(`Latest block number: ${currentBlock}`);
}

async function getLogs() {
    console.log(`Getting the PunkTransfer events...`);

    const cryptopunkContractAddress: string = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'; 

    const eventSignature: string = 'PunkTransfer(address,address,uint256)';
    const eventTopic: string = ethers.utils.id(eventSignature); // Get the data hex string

    rawLogs = await provider.getLogs({
        address: cryptopunkContractAddress,
        topics: [eventTopic],
        fromBlock: currentBlock - 10000, 
        toBlock: currentBlock
    });
}

async function processLogsWithInterface() {
    const abi: string = '[{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"punkIndex","type":"uint256"}],"name":"PunkTransfer","type":"event"}]';

    const intrfc = new ethers.utils.Interface(abi);

    rawLogs.forEach((log: any) => {
        console.log(`BEFORE PARSING:`);
        console.debug(log);
        console.log(`\n`);

        console.log(`AFTER PARSING:`);
        let parsedLog = intrfc.parseLog(log);
        console.debug(parsedLog);
        console.log('************************************************');
    })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
