import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  CardMedia,
  CircularProgress,
  Fade,
  Grid,
  IconButton,
  Modal,
  Typography,
  styled,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { Metadata, NFT } from "../types/NFT";
import TokenBadge from "./TokenBadge";

interface NFTModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  nft: NFT;
  metadata: Metadata | null;
}

const ModalBox = styled(Box)(({ theme }) => ({
  maxHeight: "80vh",
  width: 400,
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #000",
  borderRadius: "0.5rem",
  padding: theme.spacing(2, 4, 3),
  "&:focus-visible": {
    outline: "none",
  },
  overflow: "auto",
}));

const ScrollIndicator = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(9),
  left: "calc(50% - 7px)",
  transform: "translateX(-50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.text.secondary,
  animation: "bounce 1.5s infinite",
  "@keyframes bounce": {
    "0%, 20%, 50%, 80%, 100%": {
      transform: "translateY(0)",
    },
    "40%": {
      transform: "translateY(-10px)",
    },
    "60%": {
      transform: "translateY(-5px)",
    },
  },
}));

const NFTModal: React.FC<NFTModalProps> = ({
  open,
  setOpen,
  nft,
  metadata,
}: NFTModalProps) => {
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScroll = () => {
    if (modalContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = modalContentRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setAtBottom(isAtBottom);
    }
  };

  const handleModal = useCallback(
    (node: HTMLDivElement | null) => {
      if (open && node) {
        modalContentRef.current = node;
        const isContentScrollable = node.scrollHeight > node.clientHeight;
        setIsScrollable(isContentScrollable);
        node.addEventListener("scroll", handleScroll);
      } else if (modalContentRef.current) {
        modalContentRef.current.removeEventListener("scroll", handleScroll);
      }
    },
    [open],
  );

  useEffect(() => {
    return () => {
      if (modalContentRef.current) {
        modalContentRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-labelledby="nft-modal-title"
      aria-describedby="nft-modal-description"
    >
      <Fade in={open}>
        <ModalBox ref={handleModal}>
          <Typography variant="h6" component="h2">
            {nft.name}{" "}
            <IconButton
              component="a"
              size="small"
              href={nft.opensea_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on OpenSea"
            >
              <OpenInNewIcon sx={{ height: 16, width: 16 }} />
            </IconButton>
          </Typography>
          <Typography fontWeight="bold" sx={{ mt: 2 }}>
            Token Standard:
          </Typography>
          <TokenBadge tokenStandard={nft.token_standard} />
          <Typography fontWeight="bold" sx={{ mt: 2 }}>
            Description:
          </Typography>
          <Typography sx={{ mt: 1 }} variant="body2">
            {nft.description}
          </Typography>
          {loading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
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
            sx={{ marginTop: 2, display: loading ? "none" : "block" }}
          />
          <Box display="flex" justifyContent="flex-end" mt={2}></Box>
          {metadata ? (
            <>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" fontWeight="bold" component="div">
                  Attributes
                </Typography>
                <Grid container spacing={1}>
                  {metadata.attributes.map((attr) => (
                    <Grid item xs={6} key={attr.trait_type}>
                      <Box
                        sx={{
                          border: "1px solid #ccc",
                          backgroundColor: "#f9f9f9",
                          borderRadius: "4px",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          textTransform="uppercase"
                          fontSize="0.75rem"
                        >
                          {attr.trait_type}
                        </Typography>
                        <Typography variant="body1" component="div">
                          {attr.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          ) : (
            <Typography variant="h6" component="h2">
              Loading...
            </Typography>
          )}
          {isScrollable && !atBottom && (
            <ScrollIndicator>
              <Typography variant="body2">▼</Typography>
            </ScrollIndicator>
          )}
        </ModalBox>
      </Fade>
    </Modal>
  );
};
export default NFTModal;
