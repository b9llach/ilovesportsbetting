import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaTrophy, FaChartLine, FaPercent, FaDollarSign, FaHistory, FaUserFriends, FaMedal } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-black to-[#17153B] text-white min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {/* Last 5 Bets */}
        <Card className="bg-[#191919] border-none text-white h-64 w-64 flex flex-col items-center justify-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">Last 5 Bets</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center space-x-2">
            {['W', 'L', 'W', 'W', 'L'].map((result, index) => (
              <div key={index} className={`w-10 h-10 rounded-full flex items-center justify-center ${result === 'W' ? 'bg-green-500' : 'bg-red-500'} text-lg font-bold`}>
                {result}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Total Profit */}
        <Card className="bg-[#191919] border-none text-white h-64 w-64 flex flex-col items-center justify-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Total Profit</CardTitle>
            <FaDollarSign className="h-6 w-6 text-green-400 mt-2" />
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold text-green-400">$2,000</div>
            <p className="text-sm text-gray-400 mt-2">+15% from last month</p>
          </CardContent>
        </Card>

        {/* Win Rate */}
        <Card className="bg-[#191919] border-none text-white h-64 w-64 flex flex-col items-center justify-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Win Rate</CardTitle>
            <FaPercent className="h-6 w-6 text-yellow-400 mt-2" />
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold text-yellow-400">62</div>
            <p className="text-sm text-gray-400 mt-2">Last 100 bets</p>
          </CardContent>
        </Card>

        {/* Active Bets */}
        <Card className="bg-[#191919] border-none text-white h-64 w-64 flex flex-col items-center justify-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Active Bets</CardTitle>
            <FaChartLine className="h-6 w-6 text-blue-400 mt-2" />
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl font-bold text-blue-400">7</div>
            <p className="text-sm text-gray-400 mt-2">3 pending results</p>
          </CardContent>
        </Card>

        {/* Profit Chart Placeholder */}
        <Card className="bg-[#191919] border-none text-white h-64 w-64 flex flex-col items-center justify-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">Profit Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <p className="text-gray-400">Chart placeholder</p>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="bg-[#191919] border-none text-white h-64 w-64 flex flex-col items-center justify-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Top Bettors</CardTitle>
            <FaTrophy className="h-6 w-6 text-yellow-400 mt-2" />
          </CardHeader>
          <CardContent className="w-full">
            <div className="space-y-4">
              {[
                { name: 'John D.', profit: 5000, avatar: '1' },
                { name: 'Sarah M.', profit: 4200, avatar: '2' },
                { name: 'Mike R.', profit: 3800, avatar: '3' },
              ].map((bettor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${bettor.avatar}`} />
                      <AvatarFallback>{bettor.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{bettor.name}</span>
                  </div>
                  <span className="text-green-400">+${bettor.profit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Bets */}
        <Card className="bg-[#191919] border-none text-white h-64 w-64 flex flex-col items-center justify-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Recent Bets</CardTitle>
            <FaHistory className="h-6 w-6 text-gray-400 mt-2" />
          </CardHeader>
          <CardContent className="w-full">
            <div className="space-y-4">
              {[
                { event: 'Lakers vs. Warriors', bet: 'Lakers -5.5', result: 'Win', amount: 100 },
                { event: 'Man City vs. Chelsea', bet: 'Over 2.5 goals', result: 'Loss', amount: 50 },
                { event: 'Nadal vs. Djokovic', bet: 'Nadal to win', result: 'Win', amount: 75 },
              ].map((bet, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="font-medium">{bet.event}</div>
                    <div className="text-sm text-gray-400">{bet.bet}</div>
                  </div>
                  <div className={`text-sm ${bet.result === 'Win' ? 'text-green-400' : 'text-red-400'}`}>
                    {bet.result === 'Win' ? `+$${bet.amount}` : `-$${bet.amount}`}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Friends Activity */}
        <Card className="bg-[#191919] border-none text-white h-64 w-64 flex flex-col items-center justify-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Friends Activity</CardTitle>
            <FaUserFriends className="h-6 w-6 text-purple-400 mt-2" />
          </CardHeader>
          <CardContent className="text-center w-full">
            <div className="space-y-4">
              {[
                { name: 'Alice', action: 'placed a bet on NFL' },
                { name: 'Bob', action: 'won $500 on NBA' },
                { name: 'Charlie', action: 'joined a new league' },
              ].map((activity, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{activity.name}</span> {activity.action}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-[#191919] border-none text-white h-64 w-64 flex flex-col items-center justify-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Achievements</CardTitle>
            <FaMedal className="h-6 w-6 text-amber-400 mt-2" />
          </CardHeader>
          <CardContent className="text-center w-full">
            <div className="space-y-4">
              {[
                { name: 'Hot Streak', description: '5 wins in a row' },
                { name: 'Big Winner', description: 'Won over $1000 in a single bet' },
                { name: 'Diverse Bettor', description: 'Bet on 5 different sports' },
              ].map((achievement, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">{achievement.name}</div>
                  <div className="text-gray-400">{achievement.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;