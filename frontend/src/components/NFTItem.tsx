import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";
import { NFT } from "../types/NFT";
import NFTModal from "./NFTModal";
import { useSnackbar } from "../context/SnackbarContext";

interface NFTItemProps {
  nft: NFT;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const NFTCard = styled(Card)(({ theme }) => ({
  position: "relative",
  transition: "transform 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
}));

const NFTItem: React.FC<NFTItemProps> = ({ nft, setIsLoading }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // simple in memory cache to store metadata
  const [cache, setCache] = useState<{ [key: string]: any }>({});
  const [metadata, setMetadata] = useState<any | null>(null);
  const { showSnackbar } = useSnackbar();

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleOpen = () => {
    setIsLoading(true);

    if (cache[nft.id]) {
      setMetadata(cache[nft.id]);
      setOpen(true);
      setIsLoading(false);
    } else {
      if (Object.keys(cache).length > 20) {
        delete cache[Object.keys(cache)[0]];
      }
      fetchMetadata();
    }
  };

  const fetchMetadata = async () => {
    try {
      const response = await fetch(nft.metadata_url!);
      if (!response.ok) {
        throw new Error("Failed to fetch metadata");
      }

      const metadata = await response.json();
      setCache((prevCache) => ({ ...prevCache, [nft.id]: metadata }));
      setMetadata(metadata);
      setOpen(true);
    } catch (error) {
      showSnackbar("Failed to fetch metadata", "error");
      console.error("Error fetching metadata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NFTCard onClick={handleOpen}>
        {loading && (
          <Box
            justifyContent="center"
            alignContent="center"
            sx={{ padding: "1rem", height: "200px" }}
          >
            <CircularProgress />
          </Box>
        )}
        <CardMedia
          component="img"
          alt={nft.name}
          height="200"
          image={nft.image}
          onLoad={handleImageLoad}
          sx={{ display: loading ? "none" : "block" }}
        />
        <Overlay className="overlay">
          <Typography variant="h6" component="div">
            {nft.name}
          </Typography>
          <Typography variant="body2">ID: {nft.id}</Typography>
        </Overlay>
      </NFTCard>
      <NFTModal open={open} setOpen={setOpen} nft={nft} metadata={metadata} />
    </>
  );
};

export default NFTItem;
