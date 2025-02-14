// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {
    uint256 private _nextTokenId;
    
    constructor() ERC721("MyNFT", "NFT") {}

    function MintNFT(address user, string memory tokenURI) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(user, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }
}