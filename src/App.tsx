import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css"; //利用しない
import AppLayout from "./components/layout/AppLayout";
import { db } from "./firebase";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Report from "./pages/Report";
import { theme } from "./theme/theme";
import { Transaction } from "./types";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fecheTransactions = async () => {
      try {
        const querySnapShot = await getDocs(collection(db, "Transactions"));
        // querySnapShot.docs.map((doc) => {
        //   console.log(doc.id, " => ", doc.data());
        // });

        const transactionsData = querySnapShot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });

        console.log(transactionsData);
        setTransactions(transactionsData);
      } catch (err) {
        // error
      }
    };
    fecheTransactions();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
