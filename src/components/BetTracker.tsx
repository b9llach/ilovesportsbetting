"use client";

import React, { useState } from 'react';
import moment from 'moment';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaChartLine, FaEdit } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/layout/PageContainer";

// Fake data for bets
const initialBets = [
  { date: new Date(2024, 2, 1), profit: 50 },
  { date: new Date(2024, 2, 3), profit: -20 },
  { date: new Date(2024, 2, 5), profit: 30 },
  { date: new Date(2024, 2, 10), profit: -15 },
  { date: new Date(2024, 2, 15), profit: 100 },
];

const BetTracker = () => {
  const [bets, setBets] = useState(initialBets);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState("");

  // Generate all days for the current month
  const getDaysInMonth = () => {
    const startOfMonth = moment(currentMonth).startOf('month');
    const endOfMonth = moment(currentMonth).endOf('month');
    const days = [];

    for (let date = startOfMonth.clone(); date.isSameOrBefore(endOfMonth); date.add(1, 'days')) {
      const existingBet = bets.find(bet => 
        moment(bet.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
      );

      days.push({
        date: date.toDate(),
        profit: existingBet?.profit || 0,
        hasBet: !!existingBet
      });
    }
    return days;
  };

  const handleEditBet = (date: Date) => {
    setSelectedDate(date);
    const bet = bets.find(b => 
      moment(b.date).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD')
    );
    setEditValue(bet?.profit?.toString() || "0");
    setEditMode(true);
  };

  const handleSaveBet = () => {
    if (selectedDate && editValue) {
      const existingBetIndex = bets.findIndex(b => 
        moment(b.date).format('YYYY-MM-DD') === moment(selectedDate).format('YYYY-MM-DD')
      );

      if (existingBetIndex >= 0) {
        const newBets = [...bets];
        newBets[existingBetIndex].profit = parseFloat(editValue);
        setBets(newBets);
      } else {
        setBets([...bets, { date: selectedDate, profit: parseFloat(editValue) }]);
      }
      setEditMode(false);
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <FaChartLine className="h-8 w-8 text-blue-400" />
          Bet Tracker
        </h2>

        <Card className="bg-[#191919] border-none text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => setCurrentMonth(moment(currentMonth).subtract(1, 'month'))}
                className="text-blue-400 hover:text-blue-300"
              >
                Previous
              </Button>
              <span className="text-lg font-semibold">
                {currentMonth.format('MMMM YYYY')}
              </span>
              <Button
                variant="ghost"
                onClick={() => setCurrentMonth(moment(currentMonth).add(1, 'month'))}
                className="text-blue-400 hover:text-blue-300"
              >
                Next
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ScrollArea className="h-[600px]">
              <div className="grid grid-cols-7 gap-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-400 pb-2">
                    {day}
                  </div>
                ))}
                {getDaysInMonth().map((day) => (
                  <Card 
                    key={day.date.getTime()} 
                    className={`bg-[#2D2D2D] border-none text-white hover:bg-[#3D3D3D] transition-colors duration-200 cursor-pointer
                      ${!day.hasBet ? 'opacity-60' : ''}`}
                    onClick={() => handleEditBet(day.date)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{moment(day.date).format('D')}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <FaEdit className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className={`text-lg font-bold mt-1 ${
                        day.profit > 0 
                          ? 'text-green-400' 
                          : day.profit < 0 
                            ? 'text-red-400' 
                            : 'text-gray-400'
                      }`}>
                        ${day.profit > 0 ? '+' : ''}{day.profit}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            {editMode && selectedDate && (
              <div className="mt-6 bg-[#2D2D2D] p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Edit Profit/Loss for {moment(selectedDate).format('MMMM D, YYYY')}
                </h3>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="bg-[#3D3D3D] border-none text-white"
                    placeholder="Enter profit/loss"
                  />
                  <Button
                    onClick={handleSaveBet}
                    className="bg-blue-400 hover:bg-blue-500 text-white"
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default BetTracker;
