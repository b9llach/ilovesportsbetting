"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaBalanceScale, FaCalendarAlt } from 'react-icons/fa';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";


const sportsbooks = [
  'DraftKings', 'FanDuel', 'BetMGM', 'Caesars', 'PointsBet',
  'BetRivers', 'Unibet', 'WynnBET', 'FOX Bet', 'Barstool'
];

const fakeArbitrageBets = {
  DraftKings: [
    { event: 'Lakers vs Warriors', bet1: 'Lakers ML', odds1: '-110', book1: 'DraftKings', bet2: 'Warriors ML', odds2: '+130', book2: 'FanDuel', profit: '2.8%' },
    { event: 'Red Sox vs Yankees', bet1: 'Over 8.5', odds1: '-105', book1: 'DraftKings', bet2: 'Under 8.5', odds2: '+110', book2: 'BetMGM', profit: '2.3%' },
    { event: 'Nadal vs Djokovic', bet1: 'Nadal to win', odds1: '+150', book1: 'DraftKings', bet2: 'Djokovic to win', odds2: '-130', book2: 'Caesars', profit: '3.1%' },
  ],
  FanDuel: [
    { event: 'Celtics vs Nets', bet1: 'Celtics -3', odds1: '-108', book1: 'FanDuel', bet2: 'Nets +3', odds2: '+112', book2: 'PointsBet', profit: '1.9%' },
    { event: 'Dodgers vs Padres', bet1: 'Dodgers ML', odds1: '-150', book1: 'FanDuel', bet2: 'Padres ML', odds2: '+170', book2: 'BetRivers', profit: '2.5%' },
  ],
  BetMGM: [
    { event: 'Rams vs 49ers', bet1: 'Rams +3', odds1: '+110', book1: 'BetMGM', bet2: '49ers -3', odds2: '-105', book2: 'Unibet', profit: '2.2%' },
  ],
  Caesars: [
    { event: 'Liverpool vs Man City', bet1: 'Liverpool ML', odds1: '+180', book1: 'Caesars', bet2: 'Man City ML', odds2: '+190', book2: 'WynnBET', profit: '2.7%' },
    { event: 'Knicks vs Bulls', bet1: 'Knicks -2', odds1: '-110', book1: 'Caesars', bet2: 'Bulls +2', odds2: '+115', book2: 'FOX Bet', profit: '2.1%' },
  ],
  PointsBet: [
    { event: 'Bulls vs Heat', bet1: 'Bulls ML', odds1: '+130', book1: 'PointsBet', bet2: 'Heat ML', odds2: '-120', book2: 'Barstool', profit: '2.4%' },
  ],
  BetRivers: [],
  Unibet: [
    { event: 'Packers vs Bears', bet1: 'Packers -3', odds1: '-120', book1: 'Unibet', bet2: 'Bears +3', odds2: '+125', book2: 'DraftKings', profit: '2.0%' },
  ],
  WynnBET: [],
  'FOX Bet': [
    { event: 'Warriors vs Suns', bet1: 'Warriors -2', odds1: '-110', book1: 'FOX Bet', bet2: 'Suns +2', odds2: '+115', book2: 'FanDuel', profit: '2.3%' },
  ],
  Barstool: [
    { event: 'Steelers vs Ravens', bet1: 'Steelers +4', odds1: '+110', book1: 'Barstool', bet2: 'Ravens -4', odds2: '-105', book2: 'BetMGM', profit: '2.6%' },
  ],
};

const ArbitrageBetsPanel = () => {
    const [selectedSportsbooks, setSelectedSportsbooks] = useState<string[]>([sportsbooks[0]]);
    const [showDropdown, setShowDropdown] = useState(false);
  
    const bets = selectedSportsbooks.flatMap(book => 
      fakeArbitrageBets[book as keyof typeof fakeArbitrageBets] || []
    );
  
    const toggleSportsbook = (sportsbook: string) => {
      setSelectedSportsbooks(prev => 
        prev.includes(sportsbook)
          ? prev.filter(b => b !== sportsbook)
          : [...prev, sportsbook]
      );
    };
  
    return (
      <div className="w-full p-4 rounded-xl">
        <Card className="bg-[#191919] border-none text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <FaBalanceScale className="h-8 w-8 text-blue-400" />
              <CardTitle className="text-2xl font-bold">Arbitrage Bets</CardTitle>
            </div>
            <div className="relative">
              <Button
                onClick={() => setShowDropdown(!showDropdown)}
                variant="outline"
                className="w-[280px] justify-between bg-[#2D2D2D] text-white border-none focus:ring-2 focus:ring-blue-400"
              >
                {selectedSportsbooks.length > 0
                  ? `${selectedSportsbooks.length} selected`
                  : "Select sportsbooks..."}
              </Button>
              {showDropdown && (
                <Card className="absolute z-10 w-[280px] mt-2 bg-[#2D2D2D] border-none">
                  <ScrollArea className="h-[200px]">
                    {sportsbooks.map((sportsbook) => (
                      <div key={sportsbook} className="flex items-center space-x-2 p-2">
                        <Checkbox
                          id={sportsbook}
                          checked={selectedSportsbooks.includes(sportsbook)}
                          onCheckedChange={() => toggleSportsbook(sportsbook)}
                          className="border-white data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
                        />
                        <label
                          htmlFor={sportsbook}
                          className="text-sm font-medium leading-none text-white cursor-pointer"
                        >
                          {sportsbook}
                        </label>
                      </div>
                    ))}
                  </ScrollArea>
                </Card>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSportsbooks.map((book) => (
                <Badge 
                  key={book} 
                  variant="secondary"
                  className="bg-blue-400 text-white"
                >
                  {book}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 p-0 h-auto text-white hover:bg-transparent"
                    onClick={() => toggleSportsbook(book)}
                  >
                    ×
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[400px] overflow-y-auto">
              {bets.length > 0 ? (
                bets.map((bet, index) => (
                  <Card key={index} className="bg-[#2D2D2D] border-none text-white hover:bg-[#3D3D3D] transition-colors duration-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                        <FaCalendarAlt className="text-blue-400" />
                        <span>{bet.event}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="flex justify-between">
                          <span className="text-gray-400">Bet 1:</span>
                          <span className="font-semibold">{bet.bet1} ({bet.odds1})</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-400">Book 1:</span>
                          <span className="font-semibold">{bet.book1}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-400">Bet 2:</span>
                          <span className="font-semibold">{bet.bet2} ({bet.odds2})</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-400">Book 2:</span>
                          <span className="font-semibold">{bet.book2}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-400">Profit:</span>
                          <span className="font-semibold text-green-400">{bet.profit}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-lg font-semibold">No arbitrage bets available for the selected sportsbooks at the moment.</p>
                  <p className="text-sm text-gray-500 mt-2">Check back later for new opportunities!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default ArbitrageBetsPanel;