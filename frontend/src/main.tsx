import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { StoresTaskProvider } from "./stores/taskStoreContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <BrowserRouter>
        <StoresTaskProvider>
          <App />
        </StoresTaskProvider>
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
