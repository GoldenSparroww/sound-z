const Tile = (props) => {
  return (
    <div id={props.id} className={props.class}>
      {props.children}
    </div>
  )
}

export default Tile;