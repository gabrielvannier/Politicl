import * as React from "react";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import {
  winningTitle,
  winningDescription,
  failedTitle,
  failedDescription,
  guideTitle,
  guideDescription,
  blue,
} from "../../utils/constants";
import { Person } from "../../utils/types";
import { Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ShareButton, getResultToShare } from "./ShareButton";

export function PopUp({
  title,
  description,
  displayStartButton,
  allowedToClose,
}: {
  title: React.ReactElement;
  description: React.ReactElement;
  displayStartButton: boolean;
  allowedToClose: boolean;
}) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const handleCloseAndDisableGuide = () => {
    setOpen(false);
    localStorage.setItem("hasSeenGuide", "true");
  };

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={allowedToClose ? handleClose : () => {}}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent style={{ width: "clamp(200px,70%,400px)" }}>
          {title}
          {description}
          <ModalContentDescription style={{ textAlign: "center" }}>
            {displayStartButton && (
              <Button
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
                onClick={handleCloseAndDisableGuide}
                style={{ backgroundColor: blue }}
              >
                Commencer
              </Button>
            )}
          </ModalContentDescription>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.7);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: antiquewhite;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
  `
);

const ModalContentTitle = styled("h2")(css`
  margin: 0;
  line-height: 1.5rem;
  margin-bottom: 8px;
  text-align: center;
`);

const ModalContentDescription = styled("div")(
  ({ theme }) => css`
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
    margin-bottom: 4px;
  `
);

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
      displayStartButton={false}
      allowedToClose={false}
    />
  );
}

export function GuidePopUp() {
  const ContentTitle = <ModalContentTitle>{guideTitle}</ModalContentTitle>;

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
    </ModalContentDescription>
  );
  return (
    <PopUp
      title={ContentTitle}
      description={ContentDescription}
      displayStartButton={true}
      allowedToClose={true}
    />
  );
}
