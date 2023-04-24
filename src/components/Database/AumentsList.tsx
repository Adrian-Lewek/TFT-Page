type IProps = {
  img: string,
  name: string,
  desc: string,
}
const AugmentsList: React.FC<IProps> = ({img, name, desc}) => {
  return (
    <div className="augmentsContainer_augments_container">
      <div className="augmentsContainer_augments_container_img">
        <img src={img} alt="" />
      </div>
      <div className="augmentsContainer_augments_container_right">
        <div className="augmentsContainer_augments_container_title">{name}</div>
        <div className="augmentsContainer_augments_container_desc">{desc}</div>
      </div>
    </div>
  )
}
export default AugmentsList;