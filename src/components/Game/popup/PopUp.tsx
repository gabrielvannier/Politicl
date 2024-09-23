import * as React from "react";

import {
  Modal,
  ModalContent,
  ModalContentDescription,
  ModalContentTitle,
  StyledBackdrop,
} from "./PopUpUtils";
import {
  winningTitle,
  winningDescription,
  failedTitle,
  failedDescription,
  guideTitle,
  guideDescription,
  blue,
} from "../../../utils/constants";
import { Person } from "../../../utils/types";
import { Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ShareButton, getResultToShare } from "../ShareButton";

export function PopUp({
  title,
  description,
  open,
  handleClose,
}: {
  title: React.ReactElement;
  description: React.ReactElement;
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent style={{ width: "clamp(200px,70%,400px)" }}>
          {title}
          {description}
        </ModalContent>
      </Modal>
    </div>
  );
}

export function FinishedPopUp({
  isWinned,
  expectedPerson,
  dayNumber,
  guesses,
  imgUrl,
}: {
  isWinned: boolean;
  expectedPerson: Person;
  dayNumber: number;
  guesses: Person[];
  imgUrl: string | null;
}) {
  const contentTitle = (
    <ModalContentTitle>
      {isWinned ? winningTitle : failedTitle}
    </ModalContentTitle>
  );

  const contentDescription = (
    <ModalContentDescription>
      <div style={{ textAlign: "center" }}>
        <div>
          {isWinned ? winningDescription : failedDescription}
          {dayNumber}
        </div>
        <div style={{ color: isWinned ? "green" : "red", fontWeight: "bold" }}>
          {expectedPerson.name}
        </div>
        {imgUrl && (
          <img
            src={imgUrl}
            alt={expectedPerson.name}
            style={{ maxWidth: "130px", marginTop: "10px" }}
          />
        )}
        <div
          style={{
            whiteSpace: "pre-wrap",
            fontSize: 30,
            letterSpacing: 5,
            lineHeight: 1.15,
          }}
        >
          {getResultToShare(guesses, expectedPerson)}
        </div>
        <div style={{ marginTop: "20px" }}>
          <ShareButton
            expectedPerson={expectedPerson}
            guesses={guesses}
            dayNumber={dayNumber}
          />
        </div>
      </div>
    </ModalContentDescription>
  );
  return (
    <PopUp
      title={contentTitle}
      description={contentDescription}
      handleClose={() => {}}
      open={true}
    />
  );
}

export function GuidePopUp() {
  const ContentTitle = <ModalContentTitle>{guideTitle}</ModalContentTitle>;
  const [open, setOpen] = React.useState<boolean>(true);
  const handleCloseAndDisableGuide = () => {
    setOpen(false);
    localStorage.setItem("hasSeenGuide", "true");
  };

  const ContentDescription = (
    <ModalContentDescription>
      <ul>
        {guideDescription.map((value, index, array) => {
          return (
            <li style={{ marginTop: "25px", lineHeight: 1.1 }} key={index}>
              {value}
            </li>
          );
        })}
      </ul>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          onClick={handleCloseAndDisableGuide}
          style={{ backgroundColor: blue }}
        >
          Commencer
        </Button>
      </div>
    </ModalContentDescription>
  );
  return (
    <PopUp
      title={ContentTitle}
      description={ContentDescription}
      handleClose={handleCloseAndDisableGuide}
      open={open}
    />
  );
}
