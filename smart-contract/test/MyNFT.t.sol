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

    function testDuplicatedTokenURI() public {
        string memory testURI = "ipfs://test-uri";
        nft.MintNFT(user, testURI);

        vm.expectRevert("TokenURI already used");
        nft.MintNFT(user, testURI);
    }

    function testNullUser() public {
        address nullUser = address(0);

        string memory testURI = "ipfs://test-uri";
        
        vm.expectRevert("Invalid Address");
        nft.MintNFT(nullUser, testURI);
    }
}