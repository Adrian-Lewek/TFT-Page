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