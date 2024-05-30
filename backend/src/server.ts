import "dotenv/config";
import express from "express";
import { NFT } from "./types/NFT";
import axios from "axios";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/api/nfts", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({
      error: "Missing required parameter 'address'",
    });
  }

  const nfts = await fetchNFTData(address as string);
  res.json(nfts);
});

async function fetchNFTData(address: string) {
  const url = `https://api.opensea.io/api/v2/chain/ethereum/account/${address}/nfts`;

  const { data } = await axios<NFT>(url, {
    headers: { "X-API-KEY": process.env.OPENSEA_API_KEY! },
  });

  return data.nfts.filter(
    (asset) =>
      asset.contract.toLowerCase() ===
      process.env.PUDGY_PENGUINS_CONTRACT_ADDRESS?.toLocaleLowerCase(),
  );
}

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
