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


function App() {
  const mode = useSelector((state)=> state.globalstate.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode])

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={ <Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={ <Products /> } />
              <Route path="/customers" element={<Customers />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
