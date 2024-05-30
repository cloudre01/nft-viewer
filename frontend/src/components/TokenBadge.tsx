import React from "react";
import { Chip, styled } from "@mui/material";

const CustomTokenBadge = styled(Chip)(({ theme }) => ({
  fontSize: "0.75rem",
  height: "24px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

interface TokenBadgeProps {
  tokenStandard: string;
}

const TokenBadge: React.FC<TokenBadgeProps> = ({ tokenStandard }) => {
  return <CustomTokenBadge label={tokenStandard.toUpperCase()} />;
};

export default TokenBadge;
