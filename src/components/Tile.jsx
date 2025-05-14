import "../style/components/Tile.css"

const Tile = (props) => {
  return (
    <div id={props.id} className={`${props.class} tile-general-attributes`} onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default Tile;