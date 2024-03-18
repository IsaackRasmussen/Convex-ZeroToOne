import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { PrimeReactProvider } from 'primereact/api';
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <ClerkProvider publishableKey="pk_test_dHJ1ZS1iaXJkLTMxLmNsZXJrLmFjY291bnRzLmRldiQ">
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <PrimeReactProvider>
            <App />
          </PrimeReactProvider>
        </ConvexProviderWithClerk>
      </ClerkProvider>
  </StrictMode>,
);
