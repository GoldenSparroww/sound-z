import "../style/components/BurgerButton.css"

const BurgerButton = (props) => {
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