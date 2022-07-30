const END_POINT="http://localhost:4000"
function addPost(){
    let title=document.getElementById("title").value;
    let body=document.getElementById("mytextarea").value;
    

    PostRequest(`${END_POINT}/post/addlist/`,{
        title,
        body
    });
    
}

function PostRequest(URL,data){
    fetch(URL,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res);
        window.location.href = `http://127.0.0.1:5500/post.html`;
    })
    .catch(err=>{
        console.log(err);
    });
}

