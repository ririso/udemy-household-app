import { Box } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import Calendar from "../components/Calendar";
import MonthlySummary from "../components/MonthlySummary";
import TransactionMenForm from "../components/TransactionMenForm";
import TransactionMenu from "../components/TransactionMenu";
import { Transaction } from "../types";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = format(new Date(), "yyyy-mm-dd");
  const [currentDay, setCurrentDay] = useState("");

  // 1日分のデータを表示
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });

  return (
    <Box sx={{ display: "flex" }}>
      // 左側コンテンツ
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
        />
      </Box>
      // 右側コンテンツ
      <Box>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
        />
        <TransactionMenForm />
      </Box>
    </Box>
  );
};

export default Home;
