import React from 'react'

export default function FriendItemView(props) {
    const {username,id,image}=props
    const getImageUrl = () => {
        if (image && image.data) {
            const uint8Array = new Uint8Array(image.data.data);
            const base64Data = uint8Array.reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            );
            const imageUrl = `data:${image.contentType};base64,${btoa(base64Data)}`;
            return imageUrl;
          }
        return null;
      };
  return (
    <div>
      <div class="card d-flex align-items-center justify-content-center flex-column" style={{"width": "14rem"}}>
      {getImageUrl() && <img className="mx-3" src={getImageUrl()} style={{borderRadius:"50%",height:"200px",width:"200px"}} alt="Photo"/>}
  <div class="card-body">
    <p class="card-text">{username}</p>
  </div>
</div>
    </div>
  )
}
