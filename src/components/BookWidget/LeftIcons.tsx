import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import style from "./style.module.css";
import { Tooltip, Typography } from "@mui/material";
import React from "react";
const LeftIcons = () => {
  return (
    <>
      <Tooltip title={"Decrease Precision"}>
        <div className={style["precision-layout"]}>
          <Typography variant={"subtitle2"} color={"var(--clr-icon)"}>
            .0
          </Typography>
          <ArrowBackIcon sx={{ color: "var(--clr-icon)", fontSize: "1rem" }} />
        </div>
      </Tooltip>
      <Tooltip title={"Increase Precision"}>
        <div className={style["precision-layout"]}>
          <Typography variant={"subtitle2"} color={"var(--clr-icon)"}>
            .00
          </Typography>
          <ArrowForwardIcon
            sx={{ color: "var(--clr-icon)", fontSize: "1rem" }}
          />
        </div>
      </Tooltip>
      <Tooltip title={"Manage Price Alerts"}>
        <NotificationsIcon
          sx={{ color: "var(--clr-icon)", cursor: "pointer" }}
          fontSize="small"
        />
      </Tooltip>
      <Tooltip title={"Interface Setting For Order Book"}>
        <SettingsIcon
          sx={{ color: "var(--clr-icon)", cursor: "pointer" }}
          fontSize="small"
        />
      </Tooltip>
      <Tooltip title={"Zoom out book depth visualization"}>
        <ZoomOutIcon
          sx={{ color: "var(--clr-icon)", cursor: "pointer" }}
          fontSize="small"
        />
      </Tooltip>
      <Tooltip title={"Zoom in book depth visualization"}>
        <ZoomInIcon
          sx={{ color: "var(--clr-icon)", cursor: "pointer" }}
          fontSize="small"
        />
      </Tooltip>
    </>
  );
};
export default React.memo(LeftIcons);
