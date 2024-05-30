import React from "react";
import { TextField, InputAdornment, styled } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInput-root": {
    backgroundColor: "#f0f0f0",
    borderRadius: theme.shape.borderRadius,
    "& fieldset": {
      border: "none",
    },
    "&.Mui-focused": {
      "& .MuiSvgIcon-root": {
        fill: theme.palette.primary.main,
      },
      "& .MuiInputAdornment-root": {
        color: theme.palette.primary.main,
      },
    },
  },
  "& .MuiInputAdornment-root": {
    marginLeft: "8px",
    "& .MuiSvgIcon-root": {
      transition: "color 0.5s",
    },
  },
  "& .MuiInputLabel-root": {
    transform: "translate(0, -0.5rem) scale(0.75)",
  },
}));

interface CustomTextFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextFieldComponent: React.FC<CustomTextFieldProps> = ({
  value,
  onChange,
}) => {
  return (
    <CustomTextField
      label="Wallet Address"
      fullWidth
      value={value}
      onChange={onChange}
      variant="standard"
      className="wallet-input"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ marginLeft: "8px" }}>
            <AccountBalanceWalletIcon />
          </InputAdornment>
        ),
        disableUnderline: true,
        style: {
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          border: "none",
        },
      }}
    />
  );
};

export default CustomTextFieldComponent;
