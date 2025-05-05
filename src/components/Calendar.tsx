import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import jaLocale from "@fullcalendar/core/locales/ja";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import "../calendar.css";
import { Balance, CalendarContent, Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";

interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const Calendar = ({ monthlyTransactions, setCurrentMonth }: CalendarProps) => {
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

  const createCalendarEvents = (
    dailyBalances: Record<string, Balance>
  ): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };

  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  const calendarEvents = createCalendarEvents(dailyBalances);
  console.log(calendarEvents);

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

  const handlDateSet = (datesetInfo: DatesSetArg) => {
    console.log(datesetInfo);
    setCurrentMonth(datesetInfo.view.currentStart);
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
      events={calendarEvents}
      eventContent={renderEventContent}
      initialView="dayGridMonth"
      datesSet={handlDateSet}
    />
  );
};

export default Calendar;
