import React, { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: 1,
  borderColor: "transparent",
  boxShadow: 24,
  borderRadius: "20px",
  p: 3,
};

interface Props {
  isVisible: boolean;
  setIsVisible: (status: boolean) => void;
}

export const BasicModal = ({
  isVisible,
  setIsVisible,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Modal
      open={isVisible}
      onClose={() => setIsVisible(false)}
      disableEnforceFocus
    >
      <Box sx={style}>{props.children}</Box>
    </Modal>
  );
};
