import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import '../style/footer.scss'
const Footer:React.FC = () => {
  return (
    <div className="footer">
      <div className="footer_container">
        <h4>My SocialMedia</h4>
        <div className="footer_container_upperSide">
          <a href="https://www.linkedin.com/in/adrian-lewek-5b53061a1/" rel="noreferrer" target="_blank" className="item">
            <AiFillLinkedin/>
          </a>
          <a href="https://github.com/Adrian-Lewek" rel="noreferrer" target="_blank" className="item">
            <AiFillGithub/>
          </a>
        </div>
        <hr/>
        <div className="footer_container_downSide">
          &copy; 2023 - Adrian Lewek All Rights Reserved
          <br/>
          The site was created using the Riot Games API
        </div>
      </div>
    </div>
  )
}
export default Footer;