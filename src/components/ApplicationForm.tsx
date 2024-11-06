"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from 'next/image';
import ShinyButton from "@/components/magicui/shiny-button";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  discord: z.string().min(2, "Discord username must be at least 2 characters"),
  game: z.string().min(1, "Please select a game"),
  twitch: z.string().min(1, "Please enter your Twitch username"),
  tiktok: z.string().optional(),
  twitter: z.string().optional(),
  youtube: z.string().optional(),
  xbox: z.string().optional(),
  playstation: z.string().optional(),
  epicGames: z.string().optional(),
  steam: z.string().optional(),
});

export default function ApplicationForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      discord: "",
      game: "",
      twitch: "",
      tiktok: "",
      twitter: "",
      youtube: "",
      xbox: "",
      playstation: "",
      epicGames: "",
      steam: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitSuccess(false);
    try {
      const socialLinks = {
        twitch: values.twitch ? `https://twitch.tv/${values.twitch}` : '',
        tiktok: values.tiktok ? `https://tiktok.com/@${values.tiktok}` : '',
        twitter: values.twitter ? `https://twitter.com/${values.twitter}` : '',
        youtube: values.youtube ? `https://youtube.com/@${values.youtube}` : '',
      };

      const response = await fetch('https://discord.com/api/webhooks/1286395257197694997/rabYK9lHOIre11-05SKDjrsEg8OSPmlPa5svG0rx_zhtwW9z128-VC3zxmKKdmfZKf8-', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: 'New application submitted!',
          embeds: [{
            title: 'Application Details',
            fields: [
              ...Object.entries(values).map(([key, value]) => ({
                name: key,
                value: value || 'Not provided',
                inline: false,
              })),
              ...Object.entries(socialLinks).map(([key, value]) => ({
                name: `${key} Link`,
                value: value || 'Not provided',
                inline: false,
              })),
            ],
          }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <div className="relative py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 flex flex-col items-center">
          <Image
            src="/imgs/staystakedlogo.png"
            alt="Stay Staked Logo"
            width={200}
            height={100}
            objectFit="contain"
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-[#191919] border-none text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@example.com" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discord"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Discord</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="game"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Game Applying For</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#191919] text-white border-0 focus:ring-0">
                            <SelectValue placeholder="Select a game" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#191919] text-white border-0">
                          <SelectItem value="madden">Madden</SelectItem>
                          <SelectItem value="fifa">EA FC</SelectItem>
                          <SelectItem value="nba2k">NBA 2K</SelectItem>
                          <SelectItem value="nhl">NHL</SelectItem>
                          <SelectItem value="ufc">UFC</SelectItem>
                          <SelectItem value="callofduty">Call of Duty</SelectItem>
                          <SelectItem value="collegefootball">College Football</SelectItem>
                          <SelectItem value="rocketleague">Rocket League</SelectItem>
                          <SelectItem value="rust">RUST</SelectItem>
                          <SelectItem value="apexlegends">Apex Legends</SelectItem>
                          <SelectItem value="mlbtheshow">MLB The Show</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Social Media</h3>
                <FormField
                  control={form.control}
                  name="twitch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Twitch Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tiktok"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">TikTok Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormDescription className="text-gray-400">Optional</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Twitter (X) Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormDescription className="text-gray-400">Optional</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">YouTube Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormDescription className="text-gray-400">Optional</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Gaming Platforms</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="xbox"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Xbox Gamertag</FormLabel>
                      <FormControl>
                        <Input placeholder="Gamertag" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormDescription className="text-gray-400">Optional</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="playstation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">PlayStation Network ID</FormLabel>
                      <FormControl>
                        <Input placeholder="PSN ID" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormDescription className="text-gray-400">Optional</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="epicGames"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Epic Games Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormDescription className="text-gray-400">Optional</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="steam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Steam ID (64)</FormLabel>
                      <FormControl>
                        <Input placeholder="ID" {...field} className="bg-[#191919] text-white border-0 focus:ring-0 placeholder-gray-500" />
                      </FormControl>
                      <FormDescription className="text-gray-400">Optional</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {submitSuccess && (
              <div className="text-green-500 text-center mb-4">
                Application submitted successfully!
              </div>
            )}
            <div className="flex space-x-4">
            <ShinyButton 
                text="Submit Application" 
                className="w-full text-black bg-[#ff6ec7] hover:bg-[#ff8ed3]"
                onClick={form.handleSubmit(onSubmit)} // Submit Application button
              >
                <span>Submit Application</span>
              </ShinyButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}