import React from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import './LoginPage.css';

const uiConfig = {
  signInFlow: 'popup', // popup signin flow rather than redirect flow
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ]
};


function SignInScreen() {
  return (
    <div id="sign-in">
      <h1>Admin Starter</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignInScreen
