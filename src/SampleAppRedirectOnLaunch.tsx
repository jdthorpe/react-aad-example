import * as React from "react";
import { authProvider } from "./authProvider";
import {
  AzureAD,
  LoginType,
  AuthenticationState,
  IAzureADFunctionProps
} from "react-aad-msal";

import GetAccessTokenButton from "./GetAccessTokenButton";
import GetIdTokenButton from "./GetIdTokenButton";

// Import the authentication provider which holds the default settings
const SampleAppRedirectOnLaunch = () => {

  // Change the login type to execute in a Redirect
  const options = authProvider.getProviderOptions();
  if (options.loginType !== LoginType.Redirect) {
    options.loginType = LoginType.Redirect
    authProvider.setProviderOptions(options);
  }


  return (
    <AzureAD provider={authProvider} >
      {({ login, logout, authenticationState }: IAzureADFunctionProps) => {
        const isInProgress =
          authenticationState === AuthenticationState.InProgress;
        const isAuthenticated =
          authenticationState === AuthenticationState.Authenticated;
        const isUnauthenticated =
          authenticationState === AuthenticationState.Unauthenticated;

        if (isAuthenticated) {
          return (
            <React.Fragment>
              <p>You're logged in!</p>
              <button onClick={logout} className="Button">
                Logout
              </button>
              <GetAccessTokenButton provider={authProvider} />
              <GetIdTokenButton provider={authProvider} />
            </React.Fragment>
          );
        } else if (isUnauthenticated || isInProgress) {
          return (
            <div>
              <button onClick={login} className="Button">
                Login
              </button>
            </div>
          );
        }
      }}
    </AzureAD>
  );
};

export default SampleAppRedirectOnLaunch;