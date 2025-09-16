
export default function Sidenav({ handleAddSection } : { handleAddSection : (string) => void}) {

  function handleCreateSection() {
    const uniqueId = crypto.randomUUID();

    handleAddSection(uniqueId);
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
