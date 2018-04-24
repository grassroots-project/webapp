import Eth from 'ethjs';

export const CONTRACT_ADDRESS = '0x5e8a91d8186b67373c9f551fc62326ef66154f54';
export const CONTRACT_ABI = JSON.parse('[ { "constant": false, "inputs": [ { "name": "_attendee", "type": "address" } ], "name": "getTicket", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_TEMWallet", "type": "address" }, { "name": "_maxAttendees", "type": "uint256" }, { "name": "_startTime", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": true, "inputs": [], "name": "FEE", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "id2Addr", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "maxAttendees", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "startTime", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "TEMWallet", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "userAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "userId", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]')
export const CONTRACT_GAS_PRICE = Eth.toWei(5, 'Gwei');
export const CONTRACT_GAS_LIMIT = 100000;
export const CONTRACT_FEE = 0.015;
export const CONTRACT_INTERVAL_TIME = 1000;

// Tue Mar 13 2018 12:00:00 GMT+0800 (CST)
export const REGISTRATION_TIME = 1523385434464;

// When you change it please make sure you also set production on firebase by
// firebase functions:config:set general.production="1"
export const PRODUCTION = false;

export const NETWORK_ID = PRODUCTION ? '1' : '5777'; // 1 = mainnet, 3 = ropsten
export const NETWORK_NAME = PRODUCTION ? 'Mainnet' : 'Localhost';
export const ETHERSCAN_URL = PRODUCTION ?
  'https://etherscan.io' :
  '';
