import { Button, CircularProgress } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
const CustomButton = (props) => {
    const { sx = {}, title, onClick, type, Icon, loading } = props;
    return (
        <Button sx={{
            width: "100%",
            borderRadius: "15px",
            background: "#668B4B",
            padding: "12px 12px",
            fontWeight: "500",
            fontSize: "16px",
            color: "white",
            textTransform: "capitalize",
            "&:hover": {
                background: "#668B4B",
                color: "white",
            },
            ...sx
        }} onClick={onClick} type={type}> {loading ? (
            <CircularProgress
                size={32}
                sx={{
                    color: "#fff",
                }}
            />
        ) : (
            <>

                {Icon} {title}
            </>
        )}</Button>
    )
}

export default CustomButton