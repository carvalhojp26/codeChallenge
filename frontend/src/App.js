import { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import MintNFT from "./components/MintNFT";

function App () {
	const [ signer, setSigner ] = useState(null);

	return (
		<div>
			<ConnectWallet setSigner={setSigner} />
			{signer && <MintNFT signer={signer} />}
		</div>
	)
}

export default App;