
export default function Sidenav() {

  function handleCreateSection() {
    const uniqueId = crypto.randomUUID();

  }

  return(
    <>
      <ul>
        <li>Elements</li>
        <li><button type="button" onClick={handleCreateSection}>Section</button></li>
        <li>Pages</li>
        <li>Media</li>
      </ul>
    </>
  )

}
