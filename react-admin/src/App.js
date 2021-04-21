import React, { useState, useEffect } from 'react';
import { Admin, Resource } from "react-admin";
import buildHasuraProvider from "ra-data-hasura";
import { FirebaseAuthProvider } from "react-admin-firebase";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { UserList, UserShow, UserEdit} from "./users";
import LoginPage from './login/LoginPage';

// SET THESE WITH YOUR FIREBASE VALUES
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const firebaseOptions = {
  persistence: "session", // Authentication persistence, options are 'session' | 'local' | 'none'
  logging: false
};

const firebaseAuthProvider = FirebaseAuthProvider(firebaseConfig, firebaseOptions);

const App = () => {
  const [jwt, setJwt] = useState('');
  const [dataProvider, setDataProvider] = useState(null);
  const [applicationReady, setApplicationReady] = useState(false);

  useEffect(() => {
    firebaseAuthProvider.getJWTToken().then(setJwt);
  }, []);

  useEffect(() => {
    let appReady = false;
    const headers = {};
    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
      appReady = true;
    }

    const hasuraClient = new ApolloClient({
      cache: new InMemoryCache(),
      uri: process.env.REACT_APP_HASURA_URL,
      headers
    });

    buildHasuraProvider({ client: hasuraClient }).then((dataProvider) => {
      setDataProvider(() => dataProvider);
      setApplicationReady(appReady);
    });
  }, [jwt]);

  if (!dataProvider) {
    return <p>Loading...</p>;
  }

  if (!applicationReady) {
    return <LoginPage />
  }

  return (
    <Admin
      loginPage={LoginPage}
      dataProvider={dataProvider}
      authProvider={firebaseAuthProvider}
    >
      <Resource name="users" list={UserList} show={UserShow} edit={UserEdit}/>
    </Admin>
  );
};

export default App;
