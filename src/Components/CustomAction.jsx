import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import VIEW_ICON from "../Assets/loginimages/view.png";
import DELETE_ICON from "../Assets/loginimages/delete.png";
import EDIT_ICON from "../Assets/loginimages/edit.png";
import BLOCK_ICON from "../Assets/loginimages/block.png";
import UNBLOCK_ICON from "../Assets/loginimages/unblock.png";
import DISABLED from "../Assets/loginimages/disabled.png";
const CustomAction = (props) => {
  const {
    isDelete,
    isEdit,
    isView,
    showDelete,
    showEdit,
    showView,
    showBlock,
    isBlock,
    sx = {},
    showUnBlock,
    isUnBlock,
    disabled,
    isDisabled,
    isStatus,
    userId,
  } = props;


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gridGap: "10px",
      }}
    >
      {showView && (
        <IconButton
          sx={{
            backgroundcColor: "#ffffff",
            width: "30px",
            height: "30px",
          }}
          onClick={isView}
        >
          <img
            src={VIEW_ICON}
            alt="viewIcon"
            style={{
              width: "30px",
            }}
          />
        </IconButton>
      )}
      {showEdit && (
        <IconButton
          sx={{
            backgroundcColor: "#ffffff",
            width: "30px",
            height: "30px",
          }}
          onClick={isEdit}
        >
          <img
            src={EDIT_ICON}
            alt="editIcon"
            style={{
              width: "30px",
            }}
          />
        </IconButton>
      )}
      {showDelete && (
        <IconButton
          sx={{
            backgroundcColor: "#ffffff",
            width: "30px",
            height: "30px",
          }}
          onClick={isDelete}
        >
          <img
            src={DELETE_ICON}
            alt="deleteIcon"
            style={{
              width: "30px",
            }}
          />
        </IconButton>
      )}
      {showBlock && (
        <Tooltip title="Block">
          <IconButton
            sx={{
              backgroundcColor: "#ffffff",
              width: "30px",
              height: "30px",
              ...sx,
            }}
            onClick={() => isBlock(userId, isStatus)}
          >
            <img
              src={BLOCK_ICON}
              alt="blockicon"
              style={{
                width: "30px",
              }}
            />
          </IconButton>
        </Tooltip>
      )}
      {showUnBlock && (
        <Tooltip title="UnBlock">
          <IconButton
            sx={{
              backgroundcColor: "#ffffff",
              width: "30px",
              height: "30px",
            }}
            onClick={() => isUnBlock(userId, isStatus)}
          >
            <img
              src={UNBLOCK_ICON}
              alt="blockicon"
              style={{
                width: "30px",
              }}
            />
          </IconButton>
        </Tooltip>
      )}
      {disabled && (
        <IconButton
          sx={{
            backgroundcColor: "#ffffff",
            width: "30px",
            height: "30px",
          }}
          onClick={isDisabled}
        >
          <img
            src={DISABLED}
            alt="blockicon"
            style={{
              width: "30px",
            }}
          />
        </IconButton>
      )}
    </Box>
  );
};

export default CustomAction;
