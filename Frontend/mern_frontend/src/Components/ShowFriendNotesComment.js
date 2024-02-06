import React, { useContext, useState,useEffect ,useRef} from "react";
import friendContext from "../Context/Notes/friendContext";
import EachFriendComment from "./EachFriendComment";
import { useNavigate } from "react-router-dom";

export default function ShowFriendNotesComment() {
  const navigate=useNavigate()
  const context = useContext(friendContext);
  const { commentNote ,addComment,comments,editComment} = context;
  const [description,setDescription]=useState("")
  const ref=useRef(null)
  const change=(e)=>{
    setDescription(e.target.value)
  }
  const [comment,setComment]=useState({
    description:"",
    id:""
  })
  const up=(n)=>{
    setComment({
        description:n.description,
        id:n._id
    })
  }
  const changeComment=(event)=>{
    setComment({...comment,[event.target.name]:event.target.value})
  }
  return (
    <>
    <div
        class="modal fade"
        id="modal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{zIndex:"9999"}}
        ref={ref}
      >
        <div class="modal-dialog">
          <div class="modal-content" style={{backgroundColor: "black"}}>
            <div class="modal-header">
              <h5 class="modal-title text-white" id="exampleModalLabel">
                Update Comment
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
              <div class="mb-3">
                  <label class="form-label text-white">Description</label>
                  <br />
                  <textarea
                    onChange={changeComment}
                    class="form-control"
                    id="description"
                    name="description"
                    value={comment.description}
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
              <button type="button" class="btn btn-primary"   data-bs-dismiss="modal" onClick={()=>{
                editComment(comment.id,comment.description)
                setComment({id:"",description:""})
              }}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
     <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{zIndex:"9999"}}
        // ref={ref}
      >
        <div class="modal-dialog">
          <div class="modal-content" style={{backgroundColor: "black"}}>
            <div class="modal-header">
              <h5 class="modal-title text-white" id="exampleModalLabel">
                Enter Comment
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
                <div class="mb-3">
                  <label class="form-label text-white">Description</label>
                  <br />
                  <textarea
                    onChange={change}
                    class="form-control"
                    id="description"
                    name="description"
                    value={description}
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
              <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onClick={()=>{addComment(description) 
                setDescription("")}}>
                ADD COMMENT
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="col-lg-4"
          style={{
            fontWeight: "bolder",
            marginLeft: "20px",
            fontSize: "27px",
            marginTop: "10px",
            position:"fixed"
          }}
        >
          {" "}
          NOTE:
        </div>
        <div className="col-lg-1 text-white">&nbsp; great</div>
        <div
          className="col-lg-6"
          style={{
            fontWeight: "bolder",
            marginLeft: "20px",
            fontSize: "27px",
            marginTop: "10px",
            marginLeft:"300px",
            // position:"fixed",zIndex:"998",
          }}
        >
          {" "}
          COMMENTS:
        </div>
      </div>
      <div className="row" style={{ margin: "20px"}}>
        <div
          className="card col-lg-4"
          style={{ width: "20%", height: "auto" ,position:"fixed",border:"2px solid black"}}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "5px",
              marginTop: "3px",
            }}
          >
            {commentNote.gender === "Male" || commentNote.gender === "male" ? (
              <>
                <img
                  className=""
                  style={{ borderRadius: "50%", height: "50px", width: "50px" }}
                  src="http://localhost:5000/images/male.png"
                ></img>
                {commentNote.username}
              </>
            ) : (
              <>
                <img
                  className=""
                  style={{
                    borderRadius: "50%",
                    height: "50px",
                    width: "50px",
                    display: "flex",
                  }}
                  src="http://localhost:5000/images/female(1).png"
                ></img>
                {commentNote.username}
              </>
            )}
          </div>
          {commentNote && commentNote.category && <><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {commentNote.category.toUpperCase()}
            <span class="visually-hidden">unread messages</span>
          </span>
          <div className="card-body">
            <h3 className="card-title">{commentNote.title.toUpperCase()}</h3>
            <p className="card-text">{commentNote.description}</p>
          </div>
          <div className="row" style={{marginLeft:"4px",marginRight:"4px",marginBottom:"0px"}}>
        <i class="fa-solid fa-arrow-left" style={{backgroundColor:"aquamarine",padding:"10px",borderRadius:"10px",cursor:"pointer"}} onClick={()=>{
            navigate("/friendNotes") 
        }}>&nbsp;BACK</i>&nbsp;</div><div className="row" style={{marginLeft:"4px",marginRight:"4px",marginTop:"0px",marginBottom:"5px"}}>
        <i class="fas fa-comment" style={{backgroundColor:"aquamarine",padding:"10px",borderRadius:"10px",cursor:"pointer",marginBottom:"5px"}} data-bs-toggle="modal" data-bs-target="#exampleModal">ADD COMMENTS</i>
        </div>
          </>}
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-8" style={{border:"2px solid black",padding:"15px",marginLeft:"300px",backgroundColor:"wheat"}}>
            <div className="row">
                {(comments && comments.length==0?
                <>
                <div className='col-lg-8 d-flex align-items-center justify-content-center' style={{marginTop:"20px",marginLeft:"126px",backgroundColor:"white",borderRadius:"20px",padding:"10px"}}>
                    <div className='row'>
                        <div className='col-lg-12 '>
                            <h1 style={{ fontFamily: "monospace" }}>NO COMMENTS TO SHOW</h1>
                            <img className='d-flex align-items-center justify-content-center'
                                src="http://localhost:5000/images/teddy.jpg"
                                alt="Your Image Alt Text"
                                style={{ width: '100%', maxWidth: '400px', height: 'auto' ,marginLeft:"30px"}}
                            />
                        </div>
                    </div>
                </div>
            </>
                :
                    comments.map((a)=>{
                        return <EachFriendComment n={a} update={up}></EachFriendComment>
                    }))}
            {/* { comments && 
                comments.map((a)=>{
                    return <EachFriendComment n={a}></EachFriendComment>
                })
            } */}
            </div>
        </div>
      </div>
    </>
  );
}
