import React,{useState} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import M from 'materialize-css'

const Signup = () =>{
    const navigate = useNavigate()
    const[name,setName] = useState("")
    const[password,setPassword] = useState("")
    const[email,setEmail] = useState("")
    const PostData = ()=>{
            //used regular pattern function (regex) to validate email
         if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){   
            M.toast({html: "Invalid Email", classes:"#f44336 red"})
            return
         }

        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then (data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})
            }
            else{
                M.toast({html:data.message, classes:"#00e676 green accent-3"})
                navigate('/login')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="mycard">
            <div className="card auth-card .input-field input">
                <input type='text' 
                placeholder='name' 
                value={name} 
                onChange={(e)=>setName(e.target.value)}/>

                <input type='text' 
                placeholder='email'
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}/>
                

                <input type='password' 
                placeholder='password'
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
                
                
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}
                >
                    Signup
                </button>

                <h5>
                    <Link to="/login">Already have an account ?</Link>
                </h5>
    
            </div>
        </div>
    )
}

export default Signup