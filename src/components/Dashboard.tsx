import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  FaChartLine, FaPercent, FaDollarSign, FaFire } from 'react-icons/fa';
import { PageContainer } from "@/components/layout/PageContainer";

const Dashboard = () => {
  return (
    <PageContainer>
      <Card className="bg-[#1C1C1C] border-none p-6">
        <div className="space-y-6">
          {/* Header with Welcome Message */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Welcome back, user!</h2>
              <p className="text-gray-400">Your betting performance is looking strong!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">user</p>
              </div>
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://i.postimg.cc/K8RMcv4L/IMG-0232.jpg" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-[#1E1E1E] border border-blue-500/20 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Win Rate</p>
                    <p className="text-3xl font-bold">67.8%</p>
                    <p className="text-sm text-green-400">↑ 2.1% this week</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <FaPercent className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border border-green-500/20 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Monthly Profit</p>
                    <p className="text-3xl font-bold">$3,249</p>
                    <p className="text-sm text-green-400">↑ 15.3% vs last month</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <FaDollarSign className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border border-orange-500/20 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Streak</p>
                    <p className="text-3xl font-bold">7 Wins</p>
                    <p className="text-sm text-orange-400">Personal Best!</p>
                  </div>
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <FaFire className="h-6 w-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border border-purple-500/20 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">ROI</p>
                    <p className="text-3xl font-bold">23.4%</p>
                    <p className="text-sm text-purple-400">Last 30 days</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <FaChartLine className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="bg-[#191919] border-none text-white rounded-xl shadow-lg col-span-2 row-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">View All</button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'win', event: 'Lakers vs Warriors', amount: 350, odds: '+140', time: '2h ago' },
                    { type: 'win', event: 'Man City vs Arsenal', amount: 200, odds: '-110', time: '5h ago' },
                    { type: 'loss', event: 'Nadal vs Djokovic', amount: 100, odds: '+160', time: '8h ago' },
                    { type: 'win', event: 'Chiefs vs Bills', amount: 500, odds: '-120', time: '1d ago' },
                  ].map((bet, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${bet.type === 'win' ? 'bg-green-400' : 'bg-red-400'}`} />
                        <div>
                          <p className="font-medium">{bet.event}</p>
                          <p className="text-sm text-gray-400">{bet.odds} • {bet.time}</p>
                        </div>
                      </div>
                      <p className={`font-medium ${bet.type === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                        {bet.type === 'win' ? '+' : '-'}${bet.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card className="bg-[#191919] border-none text-white rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Chen', profit: 12420, winRate: 72, avatar: 'Sarah' },
                    { name: 'Mike Ross', profit: 8350, winRate: 68, avatar: 'Mike' },
                    { name: 'Alex Kim', profit: 6240, winRate: 65, avatar: 'Alex' },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${user.avatar}`} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{user.winRate}% WR</span>
                          <span>•</span>
                          <span className="text-green-400">+${user.profit}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">#{index + 1}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Bets */}
            <Card className="bg-[#191919] border-none text-white rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Upcoming Bets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { event: 'PSG vs Real Madrid', time: 'Today, 20:45', odds: '+130', amount: 200 },
                    { event: 'Celtics vs Nets', time: 'Tomorrow, 19:00', odds: '-110', amount: 150 },
                    { event: 'UFC 288: Main Event', time: 'Sat, 22:00', odds: '+145', amount: 300 },
                  ].map((bet, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">{bet.event}</p>
                        <span className="text-blue-400">{bet.odds}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{bet.time}</span>
                        <span>${bet.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Dashboard;