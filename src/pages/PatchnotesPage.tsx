import { useEffect, useState } from "react";
import '../style/patchnotes.scss'
import { HOST } from "../interfaces";
import { useParams } from "react-router-dom";

interface IPatch {
  result: {
    data: {
      all: {
        nodes: {
          title: string,
          data: string
          description: string,
          banner: {
            url: string
          }
          patch_notes_body: {
            patch_notes: {
              html: string,
            }
          }[]
        }[]
        
      }
    }
  }
}
const PatchnotesPage:React.FC = () =>{
  const [patchInfo, setPatchInfo] = useState<IPatch>()
  const {version} = useParams()
  const versionsData = version?.split('.').slice(0,2).join('-');
  useEffect(() => {
    fetch(HOST + 'patchnotes/'+ versionsData)
    .then(response => {
      if(response.ok) return response.json();
      throw response
    })
    .then(data => {
      setPatchInfo(data)
    })
    .catch(error => console.log(error))
  },[])
  return (
    <>
    { !patchInfo  ? <div className="cont-loader"><div className="loader"></div></div> : 
    <div className="patchnotes">
      <div className="banner">
        <img src={patchInfo.result.data.all.nodes[0].banner.url} alt="tft banner" />
        <div className="banner_downside"/>
      </div>
      <div className="patchnotes_container">
        <div className="patchnotes_container_header">
          <h1>{patchInfo.result.data.all.nodes[0].title}</h1>
        </div>
        <div dangerouslySetInnerHTML={{__html: patchInfo.result.data.all.nodes[0].patch_notes_body[0].patch_notes.html}}>
        </div>
      </div>
    </div>
    }
    </>
  )
}
export default PatchnotesPage