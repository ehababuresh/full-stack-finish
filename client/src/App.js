
import React from "react";
import "./App.css";
import Layout from "./layout/Layout";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./users/providers/UserProvider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SnackbarProvider>
          <UserProvider>
            <Layout>
              <Router />
            </Layout>
          </UserProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
