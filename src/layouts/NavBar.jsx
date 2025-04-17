function NavBar(props) {
  return (
    <div id={props.id}>
      {props.children}
    </div>
  )
}

export default NavBar;