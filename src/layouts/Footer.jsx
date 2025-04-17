function Footer(props) {
  return (
    <div id={props.id}>
      {props.children}
    </div>
  )
}

export default Footer;