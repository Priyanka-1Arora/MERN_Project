import React, { useContext,useEffect ,useState,useRef} from 'react'
import noteContext from '../Context/Notes/noteContext'
import Navbar from './Navbar'
import SidePanel from './SidePanel'
import { useNavigate } from 'react-router-dom'
import EachNote from './EachNote'
import SuccessAlert from "./SuccessAlert";
import WarningAlert from "./WarningAlert";

export default function MyNotes() {
    const {getNotes,notes,editNote}=useContext(noteContext)
    const [note, setNote] = useState({
        id:"",
        description: "",
        title: "",
        category: "",
      });

      const [openSuccessModal,setOpenSuccessModal]=useState(false)
  const [hideSuccessModal,setHideSuccessModal]=useState(false)
  const [openWarningModal,setOpenWarningModal]=useState(false)
  const [hideWarningsModal,setHideWarningModal]=useState(false)
  const [message,setMessage]=useState("")

    const ref=useRef(null)
    const up=((currNote)=>{
        ref.current.click()
        setNote({description:currNote.description,id:currNote._id,title:currNote.title,category:currNote.category})
    })
      const change=(event)=>{
        setNote({...note,[event.target.name]:event.target.value})
    }
  const click= async (event)=>{
    event.preventDefault()
    const ans=await editNote(note.id,note.category,note.description,note.title)
    setMessage(ans.message)
    if(ans.success==true){
      setOpenSuccessModal(true)
    setTimeout(()=>{
      setOpenSuccessModal(false)
      setHideSuccessModal(true)
    },1000)
    }
    else{
      setOpenWarningModal(true)
      setTimeout(()=>{
        setOpenWarningModal(false)
        setHideWarningModal(true)
      },1000)
    }
}
    const history=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')!=null){
          getNotes()
        }
        else{
          history('/login')
        }
      },[])
  return (
    <>
    <SuccessAlert  openModal={openSuccessModal}   hideModal={hideSuccessModal}   message={message}/>
<WarningAlert openModal={openWarningModal}    hideModal={hideWarningsModal}   message={message}/>
     <Navbar />
      <div className=''>
        <div className='row'>
          <div className='col-lg-2' style={{width:"280px"}}>
            <SidePanel />
          </div>
          <div className='col-lg-9' style={{marginLeft:"-9px" ,width:"80%",marginTop:"150px"}}>


          <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{zIndex:"9999"}}
        ref={ref}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="mb-3">
                  <label class="form-label">Title</label>
                  <input
                    onChange={change}
                    type="text"
                    class="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    value={note.title}
                    // value={value.title}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Category</label>
                  <input
                    onChange={change}
                    type="text"
                    class="form-control"
                    id="category"
                    name="category"
                    value={note.category}
                    // value={value.category}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <br />
                  <textarea
                    onChange={change}
                    class="form-control"
                    id="description"
                    name="description"
                    value={note.description}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary"  onClick={click} data-bs-dismiss="modal">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>


          <div className='row'>
          {notes.length==0?
          <>
          <div className='col-lg-8 d-flex align-items-center justify-content-center' style={{marginTop:"20px",marginLeft:"126px"}}>
              <div className='row'>
                  <div className='col-lg-12 '>
                      <h1 style={{ fontFamily: "monospace" }}>NO NOTES TO SHOW</h1>
                      <img className='d-flex align-items-center justify-content-center'
                          src="http://localhost:5000/images/teddy.jpg"
                          alt="Your Image Alt Text"
                          style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
                      />
                  </div>
              </div>
          </div>
      </>
          :
          notes.map((n)=>{
            return <EachNote  key={n._id} value={n} updateNote={up}  setOpenSuccessModal={setOpenSuccessModal}
            setHideSuccessModal={setHideSuccessModal} setOpenWarningModal={setOpenWarningModal} setHideWarningModal={setHideWarningModal}
            setMessage={setMessage}></EachNote>
        })
          }  
          </div>
          </div>
          </div>
          </div> 
    </>
  )
}
