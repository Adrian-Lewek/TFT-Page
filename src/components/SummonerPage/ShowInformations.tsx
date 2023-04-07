//component for showing information when u hover champion / trait / augment etc.
interface Props {
  name: string
}

const ShowInformations: React.FC<Props> = ({name}) => {
  return (
  <div className="showInformations">
    {name}
  </div>
  )
}
export default ShowInformations