import { EventContentArg } from "@fullcalendar/core";
import jaLocale from "@fullcalendar/core/locales/ja";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useTheme } from "@mui/material";
import React from "react";
import "../calendar.css";
import { Balance, CalendarContent, Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";

interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const Calendar = ({ monthlyTransactions, currentDay }: CalendarProps) => {
  const theme = useTheme();
  // 1.各日付の収支を計算する関数（呼び出し）🎃
  const dailyBalances = calculateDailyBalances(monthlyTransactions);

  // ***2.FullCalendar用のイベントを生成する関数📅
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
  // ******FullCalendar用のイベントを生成する関数ここまで**********

  const calendarEvents = createCalendarEvents(dailyBalances);

  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  };

  //カレンダーイベントの見た目を作る関数
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>

        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>

        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  //月の日付取得
  // const handleDateSet = (datesetInfo: DatesSetArg) => {
  //   const currentMonth = datesetInfo.view.currentStart;
  //   setCurrentMonth(currentMonth);
  //   const todayDate = new Date();
  //   if (isSameMonth(todayDate, currentMonth)) {
  //     setCurrentDay(today);
  //   }
  // };

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calendarEvents, backgroundEvent]}
      eventContent={renderEventContent}
      // datesSet={handleDateSet}
    />
  );
};

export default Calendar;
