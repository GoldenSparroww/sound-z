import {Box} from "@mui/material";

const CenterBox = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      {props.children}
    </Box>
  )
}

export default CenterBox;