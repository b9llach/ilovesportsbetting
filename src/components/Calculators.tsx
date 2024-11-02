"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaCalculator } from "react-icons/fa";

const Calculators = () => {
  // Odds Calculator
  const [stake, setStake] = useState<string>("");
  const [odds, setOdds] = useState<string>("");
  const [potentialWin, setPotentialWin] = useState<number | null>(null);

  // Hedge Calculator
  const [originalStake, setOriginalStake] = useState<string>("");
  const [originalOdds, setOriginalOdds] = useState<string>("");
  const [hedgeOdds, setHedgeOdds] = useState<string>("");
  const [hedgeAmount, setHedgeAmount] = useState<number | null>(null);

  // Hold Calculator
  const [homeOdds, setHomeOdds] = useState<string>("");
  const [awayOdds, setAwayOdds] = useState<string>("");
  const [bookmakerHold, setBookmakerHold] = useState<number | null>(null);

  // Parlay Calculator
  const [parlayOdds1, setParlayOdds1] = useState<string>("");
  const [parlayOdds2, setParlayOdds2] = useState<string>("");
  const [parlayStake, setParlayStake] = useState<string>("");
  const [parlayPayout, setParlayPayout] = useState<number | null>(null);

  // Kelly Calculator
  const [probability, setProbability] = useState<string>("");
  const [kellyOdds, setKellyOdds] = useState<string>("");
  const [bankroll, setBankroll] = useState<string>("");
  const [kellyStake, setKellyStake] = useState<number | null>(null);

  const calculatePotentialWin = () => {
    const stakeNum = parseFloat(stake);
    const oddsNum = parseFloat(odds);
    if (stakeNum && oddsNum) {
      if (oddsNum > 0) {
        setPotentialWin((stakeNum * (oddsNum / 100)) + stakeNum);
      } else {
        setPotentialWin((stakeNum * (100 / Math.abs(oddsNum))) + stakeNum);
      }
    }
  };

  const calculateHedge = () => {
    const stake = parseFloat(originalStake);
    const odds1 = parseFloat(originalOdds);
    const odds2 = parseFloat(hedgeOdds);
    
    if (stake && odds1 && odds2) {
      const potential = odds1 > 0 
        ? stake * (odds1 / 100) + stake
        : stake * (100 / Math.abs(odds1)) + stake;
      
      setHedgeAmount(potential / ((odds2 > 0 ? odds2/100 : 100/Math.abs(odds2)) + 1));
    }
  };

  const calculateHold = () => {
    const home = parseFloat(homeOdds);
    const away = parseFloat(awayOdds);
    
    if (home && away) {
      const homeProb = home > 0 ? 100/(home + 100) : Math.abs(home)/(Math.abs(home) + 100);
      const awayProb = away > 0 ? 100/(away + 100) : Math.abs(away)/(Math.abs(away) + 100);
      setBookmakerHold(((homeProb + awayProb) - 1) * 100);
    }
  };

  const calculateParlay = () => {
    const odds1 = parseFloat(parlayOdds1);
    const odds2 = parseFloat(parlayOdds2);
    const stake = parseFloat(parlayStake);
    
    if (odds1 && odds2 && stake) {
      const decimal1 = odds1 > 0 ? (odds1/100) + 1 : (100/Math.abs(odds1)) + 1;
      const decimal2 = odds2 > 0 ? (odds2/100) + 1 : (100/Math.abs(odds2)) + 1;
      setParlayPayout(stake * decimal1 * decimal2);
    }
  };

  const calculateKelly = () => {
    const prob = parseFloat(probability) / 100;
    const odds = parseFloat(kellyOdds);
    const bank = parseFloat(bankroll);
    
    if (prob && odds && bank) {
      const decimal = odds > 0 ? odds/100 : 100/Math.abs(odds);
      const kelly = ((prob * decimal) - (1 - prob)) / decimal;
      setKellyStake(kelly * bank);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-black to-[#17153B] text-white min-h-screen">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Odds Calculator */}
        <Card className="bg-[#191919] border-none text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2 border-b border-gray-700">
            <FaCalculator className="h-6 w-6 text-blue-400 mr-2" />
            <CardTitle>Odds Calculator</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <Input
              type="number"
              placeholder="Stake"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Input
              type="number"
              placeholder="American Odds (e.g. +150 or -110)"
              value={odds}
              onChange={(e) => setOdds(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Button
              onClick={calculatePotentialWin}
              className="w-full bg-blue-400 hover:bg-blue-500"
            >
              Calculate
            </Button>
            {potentialWin !== null && (
              <div className="text-center pt-2">
                <p className="text-lg font-bold text-green-400">
                  Potential Win: ${potentialWin.toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hedge Calculator */}
        <Card className="bg-[#191919] border-none text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2 border-b border-gray-700">
            <FaCalculator className="h-6 w-6 text-blue-400 mr-2" />
            <CardTitle>Hedge Calculator</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <Input
              type="number"
              placeholder="Original Stake"
              value={originalStake}
              onChange={(e) => setOriginalStake(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Input
              type="number"
              placeholder="Original Odds"
              value={originalOdds}
              onChange={(e) => setOriginalOdds(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Input
              type="number"
              placeholder="Hedge Odds"
              value={hedgeOdds}
              onChange={(e) => setHedgeOdds(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Button
              onClick={calculateHedge}
              className="w-full bg-blue-400 hover:bg-blue-500"
            >
              Calculate
            </Button>
            {hedgeAmount !== null && (
              <div className="text-center pt-2">
                <p className="text-lg font-bold text-green-400">
                  Hedge Amount: ${hedgeAmount.toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hold Calculator */}
        <Card className="bg-[#191919] border-none text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2 border-b border-gray-700">
            <FaCalculator className="h-6 w-6 text-blue-400 mr-2" />
            <CardTitle>Hold Calculator</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <Input
              type="number"
              placeholder="Home Odds"
              value={homeOdds}
              onChange={(e) => setHomeOdds(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Input
              type="number"
              placeholder="Away Odds"
              value={awayOdds}
              onChange={(e) => setAwayOdds(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Button
              onClick={calculateHold}
              className="w-full bg-blue-400 hover:bg-blue-500"
            >
              Calculate
            </Button>
            {bookmakerHold !== null && (
              <div className="text-center pt-2">
                <p className="text-lg font-bold text-green-400">
                  Bookmaker Hold: {bookmakerHold.toFixed(2)}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Parlay Calculator */}
        <Card className="bg-[#191919] border-none text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2 border-b border-gray-700">
            <FaCalculator className="h-6 w-6 text-blue-400 mr-2" />
            <CardTitle>Parlay Calculator</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <Input
              type="number"
              placeholder="Parlay Odds 1"
              value={parlayOdds1}
              onChange={(e) => setParlayOdds1(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Input
              type="number"
              placeholder="Parlay Odds 2"
              value={parlayOdds2}
              onChange={(e) => setParlayOdds2(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Input
              type="number"
              placeholder="Parlay Stake"
              value={parlayStake}
              onChange={(e) => setParlayStake(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Button
              onClick={calculateParlay}
              className="w-full bg-blue-400 hover:bg-blue-500"
            >
              Calculate
            </Button>
            {parlayPayout !== null && (
              <div className="text-center pt-2">
                <p className="text-lg font-bold text-green-400">
                  Parlay Payout: ${parlayPayout.toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Kelly Calculator */}
        <Card className="bg-[#191919] border-none text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2 border-b border-gray-700">
            <FaCalculator className="h-6 w-6 text-blue-400 mr-2" />
            <CardTitle>Kelly Calculator</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <Input
              type="number"
              placeholder="Probability"
              value={probability}
              onChange={(e) => setProbability(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Input
              type="number"
              placeholder="Kelly Odds"
              value={kellyOdds}
              onChange={(e) => setKellyOdds(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Input
              type="number"
              placeholder="Bankroll"
              value={bankroll}
              onChange={(e) => setBankroll(e.target.value)}
              className="bg-[#2D2D2D] border-none text-white"
            />
            <Button
              onClick={calculateKelly}
              className="w-full bg-blue-400 hover:bg-blue-500"
            >
              Calculate
            </Button>
            {kellyStake !== null && (
              <div className="text-center pt-2">
                <p className="text-lg font-bold text-green-400">
                  Kelly Stake: ${kellyStake.toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calculators;
