# Ethereum Logs Sample Project with Ethers.js

This project provides a hands-on experience with Ethereum logs by guiding the user through 2 scenarios:
* Processing raw logs (to understand how logs are stored and queried)
* Processing logs using the ethers.js contract function

To run the scripts, run the following commands:
```
npm install
npx hardhat run scripts/raw.ts
npx hardhat run scripts/convenience.ts
```
Note that if no logs are returned, you might need to widen the block range in the filter.