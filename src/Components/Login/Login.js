import React, { useContext, useState} from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework } from './LoginManager';

const Login = () => {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: ''
  })

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  
  
  
  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      
      const {displayName, email}  = res.user;
      const signedInUser = { 
        name: displayName,  
        email: email
      }
      setUser(signedInUser);
      setLoggedInUser(signedInUser);
      
     
    }).catch(function(error) {
      // Handle Errors here.
      
      var errorMessage = error.message;
      console.log(errorMessage);

    });
  }

  const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {

      const {displayName,  email} = result.user;
      const signedInUser = {name: displayName, email: email}
      setLoggedInUser(signedInUser);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      
      var errorMessage = error.message;
      console.log(errorMessage);

    });
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = (isPasswordValid && passwordHasNumber);
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      
    }
  }

  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if( newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch(error => {
        // Handle Errors here.
        const newUserInfo = {...user}
        newUserInfo.error = error.message;
        newUserInfo.success= false;
        setUser(newUserInfo);
        
        // ...
      });
    
    }
    if(!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log('sign in', res.user)
      })
      .catch(function(error) {
        const newUserInfo = {...user}
        newUserInfo.error = error.message;
        newUserInfo.success= false;
        setUser(newUserInfo);
      });
    }

    e.preventDefault();
    
  }
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    })
    .then(function() {
      console.log('User Name updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }

  return (
    <div style={{textAlign:'center'}}>
      <h2> Login </h2>
      <button onClick= {handleGoogleSignIn}> Google Sign In </button>
      <br/>
      <button onClick={handleFbSignIn}> Sign in using Facebook</button>

      <h1> Create a new account</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
      {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name"/>}
      <br/>
      <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
      <br/>
      <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required/>
      <br/>
      <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color:'red'}} > {user.error} </p>
      {user.success && <p style={{color:'green'}} >User { newUser ? 'Created' :'Logged In'} Successfully</p>}
    </div>
  );
};

export default Login;