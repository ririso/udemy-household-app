import { EventContentArg } from "@fullcalendar/core";
import jaLocale from "@fullcalendar/core/locales/ja";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import "../calendar.css";
import { Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";

interface CalendarProps {
  monthlyTransactions: Transaction[];
}
const Calendar = ({ monthlyTransactions }: CalendarProps) => {
  const events = [
    { title: "Meeting", start: new Date() },
    {
      title: "Meeting",
      start: new Date(),
      income: 300,
      expense: 200,
      balance: 100,
    },
  ];

  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  console.log(dailyBalances);

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          <div>{eventInfo.event.extendedProps.income}</div>
        </div>

        <div className="money" id="event-expense">
          <div>{eventInfo.event.extendedProps.expense}</div>
        </div>

        <div className="money" id="event-balance">
          <div>{eventInfo.event.extendedProps.balance}</div>
        </div>
      </div>
    );
  };

  // const dailyBalances = {
  //   "2025-05-03": { income: 700, expense: 200, balance: 500 },
  //   "2025-05-04": { income: 0, expense: 500, balance: -500 },
  // };
  // const dailyBalances = calculateDailyBalances();

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      events={events}
      eventContent={renderEventContent}
      initialView="dayGridMonth"
    />
  );
};

export default Calendar;
