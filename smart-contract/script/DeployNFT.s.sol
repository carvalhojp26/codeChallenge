// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/MyNFT.sol";

contract DeployNFT is Script {
    function run() external {
        vm.startBroadcast();

        MyNFT myNFT = new MyNFT();
        console.log("NFT Contract deployed at:", address(myNFT));

        vm.stopBroadcast();
    }
}
