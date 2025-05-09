import "../style/components/BurgerButton.css"
import {IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const BurgerButton = (props) => {
  return (
    <div className={"burger-button"}>
      <IconButton
        onClick={() => {
          props.setIsSideBarVisible(!props.isSideBarVisible)
        }}
      >
        <MenuIcon />
      </IconButton>
    </div>
  )
}

export default BurgerButton;