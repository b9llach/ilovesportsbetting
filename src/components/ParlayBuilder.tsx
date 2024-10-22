"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaCalculator, FaPlus, FaTimes } from 'react-icons/fa';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Expanded fake data structure
const sportsbooks = [
  {
    id: 1,
    name: 'DraftKings',
    availableBets: [
      { id: 101, event: 'Lakers vs Warriors', bet: 'Lakers ML', odds: '+150' },
      { id: 102, event: 'Lakers vs Warriors', bet: 'Warriors ML', odds: '-180' },
      { id: 103, event: 'Lakers vs Warriors', bet: 'Over 220.5', odds: '-110' },
      { id: 104, event: 'Lakers vs Warriors', bet: 'Under 220.5', odds: '-110' },
      { id: 105, event: 'Red Sox vs Yankees', bet: 'Red Sox ML', odds: '+130' },
      { id: 106, event: 'Red Sox vs Yankees', bet: 'Yankees ML', odds: '-150' },
      { id: 107, event: 'Red Sox vs Yankees', bet: 'Over 8.5', odds: '-115' },
      { id: 108, event: 'Red Sox vs Yankees', bet: 'Under 8.5', odds: '-105' },
      { id: 109, event: 'Chiefs vs Ravens', bet: 'Chiefs +3.5', odds: '-110' },
      { id: 110, event: 'Chiefs vs Ravens', bet: 'Ravens -3.5', odds: '-110' },
    ]
  },
  {
    id: 2,
    name: 'FanDuel',
    availableBets: [
      { id: 201, event: 'Celtics vs Nets', bet: 'Celtics -3', odds: '-105' },
      { id: 202, event: 'Celtics vs Nets', bet: 'Nets +3', odds: '-115' },
      { id: 203, event: 'Celtics vs Nets', bet: 'Over 218.5', odds: '-110' },
      { id: 204, event: 'Celtics vs Nets', bet: 'Under 218.5', odds: '-110' },
      { id: 205, event: 'Dodgers vs Padres', bet: 'Dodgers ML', odds: '-150' },
      { id: 206, event: 'Dodgers vs Padres', bet: 'Padres ML', odds: '+130' },
      { id: 207, event: 'Dodgers vs Padres', bet: 'Over 7.5', odds: '-120' },
      { id: 208, event: 'Dodgers vs Padres', bet: 'Under 7.5', odds: '+100' },
      { id: 209, event: 'Packers vs Lions', bet: 'Packers +2.5', odds: '-110' },
      { id: 210, event: 'Packers vs Lions', bet: 'Lions -2.5', odds: '-110' },
    ]
  },
  {
    id: 3,
    name: 'BetMGM',
    availableBets: [
      { id: 301, event: 'Bucks vs 76ers', bet: 'Bucks ML', odds: '-130' },
      { id: 302, event: 'Bucks vs 76ers', bet: '76ers ML', odds: '+110' },
      { id: 303, event: 'Bucks vs 76ers', bet: 'Over 225.5', odds: '-110' },
      { id: 304, event: 'Bucks vs 76ers', bet: 'Under 225.5', odds: '-110' },
      { id: 305, event: 'Astros vs Braves', bet: 'Astros ML', odds: '+120' },
      { id: 306, event: 'Astros vs Braves', bet: 'Braves ML', odds: '-140' },
      { id: 307, event: 'Astros vs Braves', bet: 'Over 9.5', odds: '-105' },
      { id: 308, event: 'Astros vs Braves', bet: 'Under 9.5', odds: '-115' },
      { id: 309, event: 'Cowboys vs Eagles', bet: 'Cowboys +1.5', odds: '-110' },
      { id: 310, event: 'Cowboys vs Eagles', bet: 'Eagles -1.5', odds: '-110' },
    ]
  },
  {
    id: 4,
    name: 'Caesars',
    availableBets: [
      { id: 401, event: 'Heat vs Knicks', bet: 'Heat ML', odds: '+140' },
      { id: 402, event: 'Heat vs Knicks', bet: 'Knicks ML', odds: '-160' },
      { id: 403, event: 'Heat vs Knicks', bet: 'Over 210.5', odds: '-110' },
      { id: 404, event: 'Heat vs Knicks', bet: 'Under 210.5', odds: '-110' },
      { id: 405, event: 'Cubs vs Cardinals', bet: 'Cubs ML', odds: '+125' },
      { id: 406, event: 'Cubs vs Cardinals', bet: 'Cardinals ML', odds: '-145' },
      { id: 407, event: 'Cubs vs Cardinals', bet: 'Over 8.5', odds: '-115' },
      { id: 408, event: 'Cubs vs Cardinals', bet: 'Under 8.5', odds: '-105' },
      { id: 409, event: '49ers vs Seahawks', bet: '49ers -4.5', odds: '-110' },
      { id: 410, event: '49ers vs Seahawks', bet: 'Seahawks +4.5', odds: '-110' },
    ]
  },
  {
    id: 5,
    name: 'PointsBet',
    availableBets: [
      { id: 501, event: 'Suns vs Nuggets', bet: 'Suns ML', odds: '+135' },
      { id: 502, event: 'Suns vs Nuggets', bet: 'Nuggets ML', odds: '-155' },
      { id: 503, event: 'Suns vs Nuggets', bet: 'Over 228.5', odds: '-110' },
      { id: 504, event: 'Suns vs Nuggets', bet: 'Under 228.5', odds: '-110' },
      { id: 505, event: 'Mets vs Phillies', bet: 'Mets ML', odds: '-120' },
      { id: 506, event: 'Mets vs Phillies', bet: 'Phillies ML', odds: '+100' },
      { id: 507, event: 'Mets vs Phillies', bet: 'Over 7.5', odds: '-115' },
      { id: 508, event: 'Mets vs Phillies', bet: 'Under 7.5', odds: '-105' },
      { id: 509, event: 'Bills vs Dolphins', bet: 'Bills -2.5', odds: '-110' },
      { id: 510, event: 'Bills vs Dolphins', bet: 'Dolphins +2.5', odds: '-110' },
    ]
  }
];

const ParlayBuilder = () => {
  const [selectedSportsbook, setSelectedSportsbook] = useState(sportsbooks[0]);
  const [selectedBets, setSelectedBets] = useState<typeof sportsbooks[0]['availableBets']>([]);

  const addBet = (bet: typeof sportsbooks[0]['availableBets'][0]) => {
    if (!selectedBets.find(b => b.id === bet.id)) {
      setSelectedBets([...selectedBets, bet]);
    }
  };

  const removeBet = (betId: number) => {
    setSelectedBets(selectedBets.filter(bet => bet.id !== betId));
  };

  const calculateTotalOdds = () => {
    let totalOdds = 1;
    selectedBets.forEach(bet => {
      const odds = parseFloat(bet.odds);
      if (odds > 0) {
        totalOdds *= (odds / 100) + 1;
      } else {
        totalOdds *= (100 / Math.abs(odds)) + 1;
      }
    });
    return (totalOdds - 1) * 100;
  };

  const formatOdds = (odds: number) => {
    return odds > 0 ? `+${odds.toFixed(0)}` : odds.toFixed(0);
  };

  return (
    <div className="w-full p-4 rounded-xl">
      <Card className="bg-[#191919] border-none text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <FaCalculator className="h-8 w-8 text-blue-400" />
            <CardTitle className="text-2xl font-bold">Parlay Builder</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Available Bets</h3>
                <Select
                  onValueChange={(value) => setSelectedSportsbook(sportsbooks.find(sb => sb.id.toString() === value)!)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Sportsbook" />
                  </SelectTrigger>
                  <SelectContent>
                    {sportsbooks.map(sb => (
                      <SelectItem key={sb.id} value={sb.id.toString()}>{sb.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <ScrollArea className="h-[600px]">
                <div className="grid grid-cols-2 gap-4">
                  {selectedSportsbook.availableBets.map(bet => (
                    <Card key={bet.id} className="bg-[#2D2D2D] border-none text-white hover:bg-[#3D3D3D] transition-colors duration-200">
                      <CardContent className="p-3 flex flex-col justify-between h-full">
                        <div>
                          <p className="font-semibold text-sm">{bet.event}</p>
                          <p className="text-xs text-gray-400">{bet.bet}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-sm">{bet.odds}</span>
                          <Button
                            onClick={() => addBet(bet)}
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Parlay</h3>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {selectedBets.map(bet => (
                    <Card key={bet.id} className="bg-[#2D2D2D] border-none text-white">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{bet.event}</p>
                          <p className="text-sm text-gray-400">{bet.bet}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{bet.odds}</span>
                          <Button
                            onClick={() => removeBet(bet.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                          >
                            <FaTimes />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-6 bg-[#2D2D2D] p-4 rounded-lg">
                <p className="text-lg font-semibold">Total Odds:</p>
                <p className="text-3xl font-bold text-blue-400">
                  {selectedBets.length > 0 ? formatOdds(calculateTotalOdds()) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParlayBuilder;
