"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaClipboardList } from 'react-icons/fa';
import { Input } from "@/components/ui/input";

const SurveyQuestion = ({ question, id, value, onChange }: { question: string; id: string; value: number; onChange: (value: number) => void }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-3 text-white">{question}</h3>
    <div className="flex justify-between" role="group" aria-labelledby={`${id}-label`}>
      {[1, 2, 3, 4, 5].map((num) => (
        <Button
          key={num}
          onClick={(e) => {
            e.preventDefault();
            onChange(num); 
          }}
          type="button"
          variant={value === num ? "default" : "outline"}
          className={`w-14 h-14 rounded-full text-lg font-bold text-white ${
            value === num 
              ? 'bg-blue-500 hover:bg-blue-600 border-none' 
              : 'bg-[#1E1E1E] hover:bg-[#2A2A2A] border-blue-500/20'
          }`}
          aria-label={`Rate ${num}`}
          aria-pressed={value === num}
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
    "Dashboard": 0,
    "Positive EV": 0,
    "Arbitrage Bets": 0,
    "Parlay Builder": 0,
    "Bet Tracker": 0,
    "Calculators": 0,
    "Most Useful Feature": "",
    "Desired Changes": "",
    "Feedback": ""
  });
  const [showThankYou, setShowThankYou] = useState(false);

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
          content: null,
          embeds: [{
            title: `Survey Response from ${surveyData.name}`,
            color: 0x0099ff,
            fields: [
              { name: "Ratings", value: "\u200B", inline: false },
              { name: "Dashboard", value: `${surveyData["Dashboard"]}/5`, inline: true },
              { name: "Positive EV", value: `${surveyData["Positive EV"]}/5`, inline: true },
              { name: "Arbitrage Bets", value: `${surveyData["Arbitrage Bets"]}/5`, inline: true },
              { name: "Parlay Builder", value: `${surveyData["Parlay Builder"]}/5`, inline: true },
              { name: "Bet Tracker", value: `${surveyData["Bet Tracker"]}/5`, inline: true },
              { name: "Calculators", value: `${surveyData["Calculators"]}/5`, inline: true },
              { name: "Feedback", value: "\u200B", inline: false },
              { name: "Most Useful Feature", value: surveyData["Most Useful Feature"] || "No response", inline: false },
              { name: "Desired Changes", value: surveyData["Desired Changes"] || "No response", inline: false },
              { name: "Additional Feedback", value: surveyData["Feedback"] || "No response", inline: false },
            ],
            timestamp: new Date().toISOString(),
          }],
        }),
      });

      if (response.ok) {
        console.log('Survey submitted successfully');
        // Reset form to initial state
        setSurveyData({
          name: "",
          "Dashboard": 0,
          "Positive EV": 0,
          "Arbitrage Bets": 0,
          "Parlay Builder": 0,
          "Bet Tracker": 0,
          "Calculators": 0,
          "Most Useful Feature": "",
          "Desired Changes": "",
          "Feedback": ""
        });
        setShowThankYou(true);
      } else {
        console.error('Failed to submit survey');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="bg-[#1C1C1C] border-none p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Feature Feedback Survey</h2>
              <p className="text-gray-400 mt-2">Help us improve your experience</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <FaClipboardList className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-12">
              <label htmlFor="name" className="block text-lg font-semibold mb-3 text-white">Your Name</label>
              <Input
                type="text"
                id="name"
                value={surveyData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-[#1E1E1E] text-white border-blue-500/20 focus:border-blue-500 h-12 text-lg"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Rating Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 mb-12">
              <SurveyQuestion 
                question="How would you rate the Dashboard?"
                id="Dashboard"
                value={surveyData["Dashboard"]}
                onChange={(value) => handleChange("Dashboard", value)}
              />
              <SurveyQuestion 
                question="How would you rate the Positive EV feature?"
                id="Positive EV"
                value={surveyData["Positive EV"]}
                onChange={(value) => handleChange("Positive EV", value)}
              />
              <SurveyQuestion 
                question="How would you rate the Arbitrage Bets?"
                id="Arbitrage Bets"
                value={surveyData["Arbitrage Bets"]}
                onChange={(value) => handleChange("Arbitrage Bets", value)}
              />
              <SurveyQuestion 
                question="How would you rate the Parlay Builder?"
                id="Parlay Builder"
                value={surveyData["Parlay Builder"]}
                onChange={(value) => handleChange("Parlay Builder", value)}
              />
              <SurveyQuestion 
                question="How would you rate the Bet Tracker?"
                id="Bet Tracker"
                value={surveyData["Bet Tracker"]}
                onChange={(value) => handleChange("Bet Tracker", value)}
              />
              <SurveyQuestion 
                question="How would you rate the Calculators?"
                id="Calculators"
                value={surveyData["Calculators"]}
                onChange={(value) => handleChange("Calculators", value)}
              />
            </div>

            {/* Text Input Questions */}
            <div className="space-y-8 bg-[#191919] p-6 rounded-xl">
              <div>
                <label htmlFor="most-useful-feature" className="block text-lg font-semibold mb-3 text-white">
                  What feature did you find most useful?
                </label>
                <Input
                  type="text"
                  id="most-useful-feature"
                  value={surveyData["Most Useful Feature"]}
                  onChange={(e) => handleChange("Most Useful Feature", e.target.value)}
                  className="bg-[#1E1E1E] text-white border-blue-500/20 focus:border-blue-500 h-12"
                  placeholder="Tell us about the most useful feature"
                  required
                />
              </div>

              <div>
                <label htmlFor="desired-changes" className="block text-lg font-semibold mb-3 text-white">
                  Is there anything you would like to see changed?
                </label>
                <Input
                  type="text"
                  id="desired-changes"
                  value={surveyData["Desired Changes"]}
                  onChange={(e) => handleChange("Desired Changes", e.target.value)}
                  className="bg-[#1E1E1E] text-white border-blue-500/20 focus:border-blue-500 h-12"
                  placeholder="Tell us what you'd like to see changed"
                  required
                />
              </div>

              <div>
                <label htmlFor="feedback" className="block text-lg font-semibold mb-3 text-white">
                  What do you like and don't like about the website?
                </label>
                <Input
                  type="text"
                  id="feedback"
                  value={surveyData["Feedback"]}
                  onChange={(e) => handleChange("Feedback", e.target.value)}
                  className="bg-[#1E1E1E] text-white border-blue-500/20 focus:border-blue-500 h-12"
                  placeholder="Share your likes and dislikes"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-lg text-lg transition-colors duration-300"
              disabled={isSubmitting || surveyData.name.trim() === "" || Object.values(surveyData).some(v => v === 0)}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Survey'}
            </Button>
          </form>
        </div>
      </Card>

      {/* Thank you card */}
      {showThankYou && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <Card className="bg-[#1C1C1C] border-blue-500/20 w-full max-w-md relative">
          <button 
            onClick={() => setShowThankYou(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✕
          </button>
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Thank You!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-center">
              Your feedback will help us improve your experience.
            </p>
          </CardContent>
        </Card>
        </div>
      )}
    </div>
  );
};

export default Survey;
