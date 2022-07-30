const END_POINT="http://localhost:4000"
let section2=document.getElementsByClassName("section2")[0];

function updateLikeRealTime(id,data){
    let counter = document.getElementsByClassName(id)[0];
    counter.innerHTML=data;
    // console.log(counter);
}

function textProcessor(str){
    let prefix=["<br><pre class='code-block'><code>","</code></pre><br>"];
    let ind=0;

    while(str.search("```") > 0){
        str=str.replace("```",prefix[ind]);
        ind=(ind+1)%2;
    }
    return str;
}
function incrementLike(e){
    const post_id = e.target.id;
    const END_POINT_LIKE=`${END_POINT}/post/like/`;
    PostUpdateLike(post_id,true,END_POINT_LIKE);
}

function decrementLike(e){
    const post_id = e.target.id;
    const END_POINT_LIKE=`${END_POINT}/post/like/`;
    PostUpdateLike(post_id,false,END_POINT_LIKE);
}


function createPost({title,body,like,_id}){
    body = textProcessor(body);
    let section2Post=document.createElement("div");
    section2Post.classList.add("section2__post");

    let section2Post1=document.createElement("div");
    section2Post1.classList.add("section2__post__1");
    section2Post1.innerHTML=title;

    let section2Post2=document.createElement("div");
    section2Post2.classList.add("section2__post__2");
    section2Post2.innerHTML=body;

    let spanCounter=document.createElement("span");
    spanCounter.innerHTML=like;
    spanCounter.classList.add("counter")
    spanCounter.classList.add(_id);
    

    let spanIncrement=document.createElement("span");
    spanIncrement.innerHTML="+";
    spanIncrement.classList.add("increment");
    spanIncrement.setAttribute("id",_id);
    spanIncrement.setAttribute("onclick","incrementLike(event)");


    let spanDecrement=document.createElement("span");
    spanDecrement.innerHTML="-";
    spanDecrement.classList.add("decrement")
    spanDecrement.setAttribute("id",_id);
    spanDecrement.setAttribute("onclick","decrementLike(event)");

    let section2Post3=document.createElement("div");
    section2Post3.classList.add("section2__post__3");
    section2Post3.appendChild(spanIncrement);
    section2Post3.appendChild(spanCounter);
    section2Post3.appendChild(spanDecrement);

    section2Post.appendChild(section2Post1);
    section2Post.appendChild(section2Post2);
    section2Post.appendChild(section2Post3);

    
    return section2Post;
}


// console.log(createPost(posts[0]));



function showPosts(data){
    data.map(post=>{
        section2.appendChild(createPost(post));
    })
    console.log(data);
}

function GetRequest(link){
    fetch(link)
    .then(res=>res.json())
    .then(res=>{
        showPosts(res.data);
    })
    .catch(err=>{
        console.log(err);
    })
}

function PostUpdateLike(id,status,link){
    fetch(link,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            post_id:id,
            status:status
        })
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res.data);
        if(typeof(res.data)=="object") updateLikeRealTime(id,0);
        else    updateLikeRealTime(id,res.data);
    }).catch(err=>{
        console.log(err);
    })
}

window.onload = () => {
    GetRequest(`${END_POINT}/post/lists/`);
}