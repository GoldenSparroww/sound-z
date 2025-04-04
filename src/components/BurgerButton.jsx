import "../style/BurgerButton.css"

function BurgerButton(props) {
  if (props.visible) {
    return (
      <button
        className={"burger-button"}
        onClick={() => props.onPress()}>
        button
      </button>
    )
  } else {
    return (<></>)
  }
}

export default BurgerButton;