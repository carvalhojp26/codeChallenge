import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../contract"; 
import "../styles.css"

export default function MintNFT({ signer, setSigner }) {
    const [tokenURI, setTokenURI] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (!window.ethereum) return;

        const handleNetworkChange = async () => {
            await window.ethereum.request({ method: "eth_requestAccounts" }); 
            const newProvider = new BrowserProvider(window.ethereum);
            const newSigner = await newProvider.getSigner();
            setSigner(newSigner);
        };

        window.ethereum.on("chainChanged", handleNetworkChange);
        return () => window.ethereum.removeListener("chainChanged", handleNetworkChange);
    }, [setSigner]);

    const mintNFT = async () => {
        if (!signer) {
            alert("Connect your Metamask wallet first!");
            return;
        }

        if (!tokenURI) {
            alert("Please enter a valid Token URI (e.g., ipfs://...)");
            return;
        }

        try {
            const network = await signer.provider.getNetwork();
            const chainId = Number(network.chainId);

            if (chainId !== 11155111) { // Sepolia network chainId
                alert(`Please connect your Metamask to the Sepolia network! (Current: ${chainId})`);
                return;
            }

            const contract = getContract(signer);

            setStatus("Minting NFT...");
            const userAddress = await signer.getAddress();
            const tx = await contract.MintNFT(userAddress, tokenURI);
            await tx.wait();

            setStatus(`NFT Minted!`);
            alert(`[View on Etherscan](https://sepolia.etherscan.io/tx/${tx.hash})`)
        } catch (error) {
            setStatus("Error minting NFT!");
        }
    };

    return (
        <div className="container">
            <h2 className="title-style">Mint NFT on Sepolia</h2>
            <input
                className="input-style"
                type="text"
                placeholder="Token URI (e.g., ipfs://...)"
                value={tokenURI}
                onChange={(e) => setTokenURI(e.target.value)}
            />
            <button className="button" onClick={mintNFT} disabled={!signer}>
                {signer ? "Mint NFT" : "Connect Metamask"}
            </button>
            <p>{status}</p>
        </div>
    );
}
