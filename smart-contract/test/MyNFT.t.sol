// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Test.sol"; // Foundry test functions
import "../src/MyNFT.sol";

contract MyNFTTest is Test {
    MyNFT nft;
    address user = address(1); // Simulate user

    function setUp() public {
        nft = new MyNFT();
    }

    function testMintNFT() public {
        uint256 tokenId = nft.MintNFT(user, "ipfs://example-uri");

        assertEq(nft.ownerOf(tokenId), user);
        assertEq(nft.tokenURI(tokenId), "ipfs://example-uri");
    }
}