"use client";

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaChartLine } from "react-icons/fa";

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Fake data for bets
const bets = [
  { date: new Date(2023, 5, 1), profit: 50 },
  { date: new Date(2023, 5, 3), profit: -20 },
  { date: new Date(2023, 5, 5), profit: 30 },
  { date: new Date(2023, 5, 10), profit: -15 },
  { date: new Date(2023, 5, 15), profit: 100 },
];

const BetTracker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events = bets.map(bet => ({
    start: bet.date,
    end: bet.date,
    title: `$${bet.profit > 0 ? '+' : ''}${bet.profit}`,
    profit: bet.profit,
  }));

  const handleSelectEvent = (event: any) => {
    setSelectedDate(event.start);
  };

  const eventStyleGetter = (event: any) => {
    const style = {
      backgroundColor: event.profit > 0 ? '#4CAF50' : '#F44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '2px 5px',
    };
    return { style };
  };

  const selectedDateProfit = selectedDate
    ? bets.find(bet => bet.date.getTime() === selectedDate.getTime())?.profit
    : null;

  return (
    <div className="w-full p-4">
      <Card className="bg-[#1E1E1E] border-none text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <FaChartLine className="h-8 w-8 text-blue-400" />
            <CardTitle className="text-2xl font-bold">Bet Tracker</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            formats={{
              dayFormat: 'D',
              dayHeaderFormat: (date: Date) => moment(date).format('ddd'),
            }}
            views={['month']}
            className="custom-calendar"
          />
          {selectedDate && (
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">
                Selected Date: {moment(selectedDate).format('MMMM D, YYYY')}
              </h3>
              <p className="text-xl font-bold">
                Profit/Loss: ${selectedDateProfit !== null ? selectedDateProfit : 'No bets'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BetTracker;
