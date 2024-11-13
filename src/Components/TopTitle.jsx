import { Typography } from '@mui/material'
import React from 'react'

const TopTitle = (props) => {
  return (
    <Typography sx={{
        color:'#EBA834',
        fontSize:'30px',
        fontWeight:'600',
    }}>{props.title}</Typography>
  )
}

export default TopTitle