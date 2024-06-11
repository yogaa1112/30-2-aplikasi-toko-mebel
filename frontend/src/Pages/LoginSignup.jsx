import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const Loginsignup = () => {
  if(localStorage.getItem('auth-token')){
    window.location.href = '/';
  }
  // Nyambungin ke backend
  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
}

  const login = async () =>{
    
    console.log("Login Success");
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
    if(responseData.succes){
      localStorage.setItem('auth-token',responseData.token);
      console.log(responseData.url);
      if(responseData.url){
        window.location.href = responseData.url
        return 0
      }
      else{
        window.location.replace("/");
      }
    }
    else{
      alert(responseData.error)
    }


  }

  const signup = async () =>{
    console.log("Signup Sucses",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
    if(responseData.succes){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }

  }
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state==="Sign up"?<input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign up"?<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login Here</span></p> : <p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign up")}}>Click Here</span></p>}
        <div className='loginsignup-agree'>
          <input type='checkbox' id='terms' />
          <label htmlFor='terms'>By Continue, I agree to the terms of use & privacy.</label>
        </div>
      </div>
    </div>
  );
};

export default Loginsignup;
