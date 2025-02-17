import { ethers } from "ethers";
import contractABI from "./contract/MyNFT.json"

const CONTRACT_ADDRESS = "0x74b0037127AAF81AabbA211457652618d6641C08";

export const getContract = (signerOrProvider) => {
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signerOrProvider);
};
