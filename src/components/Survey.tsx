"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaClipboardList } from 'react-icons/fa';
import { Input } from "@/components/ui/input";

const SurveyQuestion = ({ question, id, value, onChange }: { question: string; id: string; value: number; onChange: (value: number) => void }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-3">{question}</h3>
    <div className="flex justify-between">
      {[1, 2, 3, 4, 5].map((num) => (
        <Button
          key={num}
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            onChange(num);
          }}
          type="button" // Explicitly set type to "button"
          variant={value === num ? "default" : "outline"}
          className={`w-16 h-16 rounded-full text-lg font-bold ${
            value === num ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {num}
        </Button>
      ))}
    </div>
  </div>
);

const Survey = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [surveyData, setSurveyData] = useState({
    name: "",
    "live-bet-ease": 0,
    "bet-accuracy": 0,
    "withdrawal-satisfaction": 0 
  });

  const handleChange = (id: string, value: number | string) => {
    setSurveyData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const webhookUrl = 'https://discord.com/api/webhooks/1298121915180781568/bDd7VyuonsWfZs0f4c2DquTc0SqUzIi4hwtDEfXh2EXY2gmI9Nnv345TXCONMgBIrgU5';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [{
            title: 'Survey Submission',
            color: 0x0099ff,
            fields: Object.entries(surveyData).map(([key, value]) => ({
              name: key,
              value: value.toString(),
              inline: false,
            })),
            timestamp: new Date().toISOString(),
          }],
        }),
      });

      if (response.ok) {
        console.log('Survey submitted successfully');
        // Add success message or redirect here
      } else {
        console.error('Failed to submit survey');
        // Add error message here
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      // Add error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-none text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <FaClipboardList className="h-8 w-8 text-blue-400" />
            <CardTitle className="text-2xl font-bold">User Experience Survey</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label htmlFor="name" className="block text-lg font-semibold mb-3">Your Name</label>
              <Input
                type="text"
                id="name"
                value={surveyData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <SurveyQuestion 
              question="1. How easy was it to place a bet on a live sports event?"
              id="live-bet-ease"
              value={surveyData["live-bet-ease"]}
              onChange={(value) => handleChange("live-bet-ease", value)}
            />
            <SurveyQuestion 
              question="2. How confident do you feel that your bets are placed accurately?"
              id="bet-accuracy"
              value={surveyData["bet-accuracy"]}
              onChange={(value) => handleChange("bet-accuracy", value)}
            />
            <SurveyQuestion 
              question="3. Rate your satisfaction with the withdrawal process"
              id="withdrawal-satisfaction"
              value={surveyData["withdrawal-satisfaction"]}
              onChange={(value) => handleChange("withdrawal-satisfaction", value)}
            />
            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors duration-300"
              disabled={isSubmitting || surveyData.name.trim() === "" || Object.values(surveyData).some(v => v === 0)}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Survey'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Survey;
