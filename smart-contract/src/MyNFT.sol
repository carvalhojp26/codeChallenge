// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {
    uint256 private _nextTokenId = 1; // Start as 1 for convention
    mapping(string => bool) private _usedTokenURIs;
    
    constructor() ERC721("MyNFT", "NFT") {}

    function MintNFT(address user, string memory tokenURI) public returns (uint256) {
        require(!_usedTokenURIs[tokenURI], "TokenURI already used"); // Verify if TokenURI has already been used
        _usedTokenURIs[tokenURI] = true; // Mark TokenURI as used

        require(user != address(0), "Invalid Address"); // Verify if user is not null

        uint256 tokenId = ++_nextTokenId; // Minted before attributing to avoid race condition(two persons minting at the same time)
        _mint(user, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }
}