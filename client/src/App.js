import React from "react";
import "./App.css";
import Layout from "./layout/Layout";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { UserProvider, useUser } from "./users/providers/UserProvider"; 

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SnackbarProvider>
          <UserProvider>
            <Layout>
              <div className="app-content">
                <Router />
                <LoggedInStatus /> 
              </div>
            </Layout>
          </UserProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

function LoggedInStatus() {
  const { user } = useUser(); 

  if (user) {
    return <p className="status connected">מחובר {user.name}</p>; 
  } else {
    return <p className="status not-connected"></p>; 
  }
}
export default App;