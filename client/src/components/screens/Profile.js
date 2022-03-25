import { useEffect, useState } from "react"
import { NavLink, Outlet ,useSearchParams,useLocation} from "react-router-dom"

const Profile = ()=>{


const[posts,setPosts] = useState([])

let [serachParams , setSeacrchParams] = useSearchParams([]) 

let location  = useLocation()

console.log(location)

console.log("from serach params" +serachParams )

useEffect(()=>{

fetch("https://jsonplaceholder.typicode.com/posts")
.then((res)=>res.json())
.then((json)=>{

setPosts(json)
 

})


},[])


return(

<div style={{display : "flex"}}>

<nav style={{
borderRight:"solid 1px",
padding:"0.5rem",
backgroundColor: "white",


}}>

<input
 value = {serachParams.get("skip") || ""}
 onChange = {(event)=>{

let filter = event.target.value
if(filter){

setSeacrchParams({skip:filter},'push')

}
else{
setSeacrchParams({})

}



 }}


 ></input>   

 
<input
 value = {serachParams.get("skip2") || ""}
 onChange = {(event)=>{

let filter = event.target.value
if(filter){

setSeacrchParams({skip2:filter},'push')

}
else{
setSeacrchParams({})

}



 }}


 ></input>  

{ posts.length >0 ? <p>{posts.filter((p)=>{ 

let filter = serachParams.get("skip")
if(!filter){
    return true
}
let postName = p.title.toLowerCase() 
return postName.startsWith(filter.toLocaleLowerCase())


}).map((p)=>(<NavLink  to={`/posts/${p.id}` + location.search} style={({isActive})=>{

 return {

    display :"block" ,
    margin :"1rem 0",
    color : isActive ? "green" : "blue"

 }

}} >{p.title}</NavLink>))}</p> : <p>Data is loading</p>}   
</nav>

<Outlet></Outlet>
</div>



)

}

export default Profile