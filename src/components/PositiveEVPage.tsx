import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaMoneyBillWave, FaCalendarAlt, FaPercentage } from 'react-icons/fa';
import { PageContainer } from "@/components/layout/PageContainer";

const sportsbooks = [
  'DraftKings', 'FanDuel', 'BetMGM', 'Caesars', 'PointsBet',
  'BetRivers', 'Unibet', 'WynnBET', 'FOX Bet', 'Barstool'
];

const fakePositiveEVBets = {
  DraftKings: [
    { event: 'Lakers vs Warriors', bet: 'Warriors +5.5', odds: '+110', ev: '3.2%', impliedProbability: '47.6%', fairProbability: '50.8%' },
    { event: 'Red Sox vs Yankees', bet: 'Over 8.5', odds: '-105', ev: '2.8%', impliedProbability: '51.2%', fairProbability: '54.0%' },
    { event: 'Nadal vs Djokovic', bet: 'Nadal to win', odds: '+150', ev: '4.1%', impliedProbability: '40.0%', fairProbability: '44.1%' },
    { event: 'Chiefs vs Broncos', bet: 'Chiefs -7', odds: '-110', ev: '2.5%', impliedProbability: '52.4%', fairProbability: '54.9%' },
    { event: 'McGregor vs Poirier', bet: 'Poirier by KO', odds: '+200', ev: '3.7%', impliedProbability: '33.3%', fairProbability: '37.0%' },
    { event: 'Bucks vs Heat', bet: 'Bucks -4', odds: '-120', ev: '3.0%', impliedProbability: '54.5%', fairProbability: '57.0%' },
  ],
  FanDuel: [
    { event: 'Celtics vs Nets', bet: 'Celtics -3', odds: '-108', ev: '3.5%', impliedProbability: '51.9%', fairProbability: '55.4%' },
    { event: 'Dodgers vs Padres', bet: 'Dodgers ML', odds: '-150', ev: '2.9%', impliedProbability: '60.0%', fairProbability: '62.9%' },
    { event: 'Federer vs Murray', bet: 'Murray +2.5 sets', odds: '+120', ev: '3.8%', impliedProbability: '45.5%', fairProbability: '49.3%' },
    { event: 'Packers vs Vikings', bet: 'Over 51.5', odds: '-115', ev: '3.1%', impliedProbability: '53.5%', fairProbability: '56.6%' },
    { event: 'Joshua vs Fury', bet: 'Fight goes distance', odds: '+180', ev: '4.2%', impliedProbability: '35.7%', fairProbability: '39.9%' },
    { event: 'Mets vs Braves', bet: 'Mets ML', odds: '+130', ev: '4.5%', impliedProbability: '43.5%', fairProbability: '48.0%' },
  ],
  BetMGM: [
    { event: 'Rams vs 49ers', bet: 'Rams +3', odds: '+110', ev: '2.5%', impliedProbability: '47.6%', fairProbability: '50.0%' },
    { event: 'Celtics vs Heat', bet: 'Celtics -5', odds: '-105', ev: '3.2%', impliedProbability: '51.2%', fairProbability: '54.0%' },
  ],
  Caesars: [
    { event: 'Liverpool vs Man City', bet: 'Draw', odds: '+250', ev: '5.0%', impliedProbability: '28.6%', fairProbability: '32.0%' },
    { event: 'Knicks vs Bulls', bet: 'Knicks -2', odds: '-110', ev: '3.8%', impliedProbability: '52.4%', fairProbability: '55.0%' },
    { event: 'UFC Fight Night', bet: 'Fighter A to win', odds: '+150', ev: '4.1%', impliedProbability: '40.0%', fairProbability: '44.1%' },
  ],
  PointsBet: [
    { event: 'Bulls vs Heat', bet: 'Bulls -4', odds: '-110', ev: '3.0%', impliedProbability: '54.5%', fairProbability: '57.0%' },
    { event: 'Giants vs Dodgers', bet: 'Giants ML', odds: '+120', ev: '2.5%', impliedProbability: '45.5%', fairProbability: '48.0%' },
  ],
  BetRivers: [
    { event: 'Packers vs Bears', bet: 'Packers -3', odds: '-120', ev: '3.2%', impliedProbability: '52.4%', fairProbability: '55.0%' },
    { event: 'Yankees vs Red Sox', bet: 'Yankees ML', odds: '+150', ev: '4.0%', impliedProbability: '40.0%', fairProbability: '44.0%' },
  ],
  Unibet: [
    { event: 'Celtics vs Raptors', bet: 'Celtics -5', odds: '-105', ev: '3.5%', impliedProbability: '51.9%', fairProbability: '55.4%' },
    { event: 'Mets vs Phillies', bet: 'Mets -1.5', odds: '+130', ev: '4.2%', impliedProbability: '43.5%', fairProbability: '48.0%' },
  ],
  WynnBET: [
    { event: 'Cowboys vs Eagles', bet: 'Cowboys +3', odds: '+110', ev: '2.8%', impliedProbability: '47.6%', fairProbability: '50.0%' },
    { event: 'Lakers vs Clippers', bet: 'Lakers ML', odds: '-150', ev: '3.1%', impliedProbability: '60.0%', fairProbability: '62.9%' },
  ],
  'FOX Bet': [
    { event: 'Warriors vs Suns', bet: 'Warriors -2', odds: '-110', ev: '3.0%', impliedProbability: '54.5%', fairProbability: '57.0%' },
    { event: 'Braves vs Marlins', bet: 'Braves ML', odds: '+120', ev: '2.5%', impliedProbability: '45.5%', fairProbability: '48.0%' },
  ],
  Barstool: [
    { event: 'Steelers vs Ravens', bet: 'Steelers +4', odds: '+110', ev: '3.2%', impliedProbability: '47.6%', fairProbability: '50.0%' },
    { event: 'Red Sox vs Yankees', bet: 'Over 9.5', odds: '-105', ev: '2.9%', impliedProbability: '51.2%', fairProbability: '54.0%' },
  ],
};

const PositiveEVPanel = () => {
    const [selectedSportsbook, setSelectedSportsbook] = useState(sportsbooks[0]);
    const bets = fakePositiveEVBets[selectedSportsbook as keyof typeof fakePositiveEVBets];
  
    return (
      <PageContainer>
        <Card className="bg-[#1C1C1C] border-none p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold flex items-center gap-2 text-white">
                <FaPercentage className="h-8 w-8 text-green-400" />
                Positive EV Bets
              </h2>
              <Select onValueChange={setSelectedSportsbook} defaultValue={selectedSportsbook}>
                <SelectTrigger className="w-[180px] bg-[#2D2D2D] text-white border-none focus:ring-2 focus:ring-green-400">
                  <SelectValue placeholder="Select Sportsbook" />
                </SelectTrigger>
                <SelectContent className="bg-[#2D2D2D] text-white border-none">
                  {sportsbooks.map((book) => (
                    <SelectItem key={book} value={book} className="hover:bg-[#3D3D3D]">{book}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bets.map((bet, index) => (
                <Card key={index} className="bg-[#2D2D2D] border-none text-white hover:bg-[#3D3D3D] transition-colors duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                      <FaCalendarAlt className="text-blue-400" />
                      <span>{bet.event}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="flex items-center space-x-2">
                        <FaMoneyBillWave className="text-green-400" />
                        <span className="font-medium">{bet.bet}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Odds:</span>
                        <span className="font-semibold">{bet.odds}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">EV:</span>
                        <span className="font-semibold text-green-400">{bet.ev}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Implied Prob:</span>
                        <span className="font-semibold">{bet.impliedProbability}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Fair Prob:</span>
                        <span className="font-semibold">{bet.fairProbability}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </PageContainer>
    );
};

export default PositiveEVPanel;