import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../Context/Notes/noteContext";
import EachNoteComment from "./EachNoteComment";

export default function MyNotesComment() {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { commentNote,} = context;

  useEffect(()=>{
    console.log(commentNote)
    console.log(commentNote.comments)
  },[])
  return (
    <>
      <div className="row">
        <div
          className="col-lg-4"
          style={{
            fontWeight: "bolder",
            marginLeft: "20px",
            fontSize: "27px",
            marginTop: "10px",
            position: "fixed",
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
            marginLeft: "300px",
            // position:"fixed",zIndex:"998",
          }}
        >
          {" "}
          COMMENTS:
        </div>
      </div>
      <div className="row" style={{ margin: "20px" }}>
        <div
          className="card col-lg-4"
          style={{
            width: "20%",
            height: "auto",
            position: "fixed",
            border: "2px solid black",
          }}
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
          {commentNote && commentNote.category && (
            <>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {commentNote.category.toUpperCase()}
                <span class="visually-hidden">unread messages</span>
              </span>
              <div className="card-body">
                <h3 className="card-title">
                  {commentNote.title.toUpperCase()}
                </h3>
                <p className="card-text">{commentNote.description}</p>
              </div>
              <div
                className="row"
                style={{
                  marginLeft: "4px",
                  marginRight: "4px",
                  marginBottom: "0px",
                }}
              >
                <i
                  class="fa-solid fa-arrow-left"
                  style={{
                    backgroundColor: "aquamarine",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/myNotes");
                  }}
                >
                  &nbsp;BACK
                </i>
                &nbsp;
              </div>
            </>
          )}
        </div>
        <div className="col-lg-1"></div>
        <div
          className="col-lg-8"
          style={{
            border: "2px solid black",
            padding: "15px",
            marginLeft: "300px",
            backgroundColor: "wheat",
          }}
        >

          <div className="row">

            {commentNote && commentNote.comments.length > 0 ? (
  commentNote.comments.map((a) => { return (<EachNoteComment key={a._id} n={a} />)})
) : (
  <div className="col-lg-8 d-flex align-items-center justify-content-center">
    <div className="row">
      <div className="col-lg-12">
        <h1 style={{ fontFamily: "monospace" }}>NO COMMENTS TO SHOW</h1>
        <img
          src="http://localhost:5000/images/teddy.jpg"
          alt="No Comments"
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "auto",
            marginLeft: "30px",
          }}
        />
      </div>
    </div>
  </div>
)}

          </div>
        </div>
      </div>
    </>
  );
}
