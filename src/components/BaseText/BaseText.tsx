import React, { PropsWithChildren } from "react";
import {
  Typography,
  TypographyProps,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Colors } from "../../config/Colors";

interface Props extends TypographyProps {
  bold?: boolean;
  size?: number;
  color?: string;
}

export const BaseText = ({
  bold,
  size,
  color,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Typography
      {...props}
      style={{
        fontWeight: bold ? "500" : "200",
        fontSize: size || 12,
        fontFamily: "Roboto",
        paddingBottom: 12,
        color: color || Colors.gray,
      }}
    >
      {props.children}
    </Typography>
  );
};
