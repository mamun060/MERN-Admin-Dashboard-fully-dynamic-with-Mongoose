import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "screens/layout/Layout";
import Dashboard from "screens/dashboard/Dashboard";
import Products from "screens/product/Products";
import Customers from "screens/customers/Customers";
import Transactions from "screens/transactions/Transactions";
import Geography from "screens/geography/Geography";
import Overview from "screens/overview/Overview";
import Daily from "screens/daily/Daily";
import Monthly from "screens/monthly/Monthly";
import Breakdown from "screens/breakdown/Breakdown";
import Admin from "screens/admins/Admin";
import Performance from "screens/performance/Performance";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
} from "@clerk/clerk-react";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key"
}


function App() {
  const mode = useSelector((state)=> state.globalstate.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode])

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route
              path="/sign-in/*"
              element={<SignIn routing="path" path="/sign-in" />}
            />
            <Route element={
              <>
              <SignedIn>
                <Layout />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              </>
            }>
              <Route path="/" element={ <Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={ <Products /> } />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={ <Transactions />} />
              <Route path="/geography" element={ <Geography />} />
              <Route path="/overview" element={ <Overview />} />
              <Route path="/daily" element={ <Daily />} />
              <Route path="/monthly" element={ <Monthly />} />
              <Route path="/breakdown" element={ <Breakdown />} />
              <Route path="/admin" element={ <Admin />} />
              <Route path="/performance" element={ <Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
