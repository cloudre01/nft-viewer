import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomTextFieldComponent from "./components/CustomTextField";
import NFTItem from "./components/NFTItem";
import { useSnackbar } from "./context/SnackbarContext";
import "./styles.css";
import { NFT } from "./types/NFT";
import { isValidAddress } from "./utils";

const initialNfts: NFT[] = [
  {
    id: "4047",
    collection: "wandernauts",
    contract: "0x793daf78b74aadf1eda5cc07a558fed932360a60",
    token_standard: "erc721",
    name: "Captain Hawk Segin",
    description:
      "No one gets the job done or target eliminated as easily and efficiently as you. You're an infamous bounty hunter who once defeated five whale-sized bavarian mountain hounds. But you never did get the ETH you were promised for that mission. For a while, you had to take a job as a chief industrial designer to pay the bills. Sometimes you wish you still did that. There'd be less bloodshed, that's for sure. The Syndicate have a bounty on your head but no one has the guts to try to collect it.",
    image: "https://assets.wanderers.ai/file/wandernauts/png/4047.png",
    metadata_url: "https://assets.wanderers.ai/file/wandernauts/metadata/4047",
    opensea_url:
      "https://opensea.io/assets/ethereum/0x793daf78b74aadf1eda5cc07a558fed932360a60/4047",
  },
];

const App: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [nfts, setNfts] = useState<NFT[]>(initialNfts);
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const fetchNFTs = async () => {
    if (!isValidAddress(walletAddress)) {
      showSnackbar("Invalid wallet address", "error");
      return;
    }

    try {
      const response = await fetch(`/api/nfts?address=${walletAddress}`);
      if (!response.ok) {
        throw new Error("Failed to fetch NFTs");
      }

      const data: NFT[] = await response.json();
      setNfts(data);
    } catch (error) {
      showSnackbar("Failed to fetch NFTs", "error");
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && (
        <LinearProgress
          sx={{ position: "fixed", top: 0, width: "100%", marginLeft: "-8px" }}
        />
      )}
      <Container maxWidth="sm" className="app-container">
        <Box mb={4}>
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Ethereum NFT Viewer
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="darkslategrey"
            gutterBottom
          >
            Enter your Ethereum wallet address to view your Pudgy Penguin NFTs.
          </Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            textAlign: "center",
            borderRadius: "0.5rem",
            marginBottom: 4,
          }}
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <CustomTextFieldComponent
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={fetchNFTs}
              className="view-button"
            >
              View NFTs
            </Button>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            padding: "1.25rem 2rem 2.25rem 2rem",
            textAlign: "center",
            borderRadius: "0.5rem",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
            mb={3}
          >
            Your NFTs
          </Typography>
          <Grid container spacing={3} className="nft-list">
            {nfts.map((nft) => (
              <Grid item xs={12} sm={6} md={4} key={nft.id}>
                <NFTItem nft={nft} setIsLoading={setIsLoading} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default App;
