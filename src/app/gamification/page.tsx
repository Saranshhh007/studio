import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUser, mockDistrictLeaderboard, mockStateLeaderboard, mockMonthlyChallenge } from "@/lib/gamification-data";
import { Trophy, Award, CheckCircle, Gift, Users } from "lucide-react";
import Image from "next/image";

export default function GamificationPage() {
  const user = mockUser;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-deep-blue">Gamification & Rewards</h1>
          <p className="text-muted-foreground">
            Your contributions to a more transparent India, recognized and rewarded.
          </p>
        </div>
      </div>

      {/* User Profile Card */}
      <Card className="overflow-hidden shadow-lg border-2 border-primary/50">
        <CardHeader className="bg-primary/10 p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Image src={user.profile.avatarUrl || '/avatar-placeholder.png'} alt={user.profile.name} width={96} height={96} className="rounded-full border-4 border-white shadow-md" data-ai-hint="person avatar"/>
              <span className="absolute bottom-0 right-0 block h-6 w-6 rounded-full bg-green-500 border-2 border-white" title="Online"></span>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-brand-deep-blue">{user.profile.name}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">{user.profile.civicLevel} - {user.profile.district}, {user.profile.state}</CardDescription>
              <div className="mt-2 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-xl text-brand-deep-blue">{user.profile.totalPoints.toLocaleString()}</span>
                <span className="text-muted-foreground">Civic Points</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{user.activities.statementsTracked}</p>
              <p className="text-sm text-muted-foreground">Statements Tracked</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.activities.commentsPosted}</p>
              <p className="text-sm text-muted-foreground">Comments Posted</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.activities.evidenceUploaded}</p>
              <p className="text-sm text-muted-foreground">Evidence Uploaded</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.activities.referralsComplete}</p>
              <p className="text-sm text-muted-foreground">Referrals</p>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">My Badges</h4>
            <div className="flex flex-wrap gap-2">
              {user.profile.currentBadges.map((badge, i) => (
                <Badge key={i} variant="secondary" className="text-sm py-1 px-3 border-2 border-primary/20 bg-primary/10">
                  {badge.icon} {badge.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Leaderboards */}
        <div className="md:col-span-2">
            <Tabs defaultValue="district">
                <div className="flex items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="district">District Leaderboard</TabsTrigger>
                        <TabsTrigger value="state">State Champions</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="district">
                    <Card>
                        <CardHeader>
                            <CardTitle>{mockDistrictLeaderboard[0].district} District Rankings</CardTitle>
                            <CardDescription>Top contributors in your district.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="w-[50px]">Rank</TableHead>
                                    <TableHead>Citizen</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead className="text-right">Points</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockDistrictLeaderboard.map((u) => (
                                    <TableRow key={u.rank} className={u.name === user.profile.name ? 'bg-secondary' : ''}>
                                        <TableCell className="font-bold text-lg">{u.rank}</TableCell>
                                        <TableCell>
                                            <div className="font-medium">{u.name}</div>
                                            <div className="text-sm text-muted-foreground flex gap-1 mt-1">
                                                {u.badges.map(b => <span key={b.name} title={b.name}>{b.icon}</span>)}
                                            </div>
                                        </TableCell>
                                        <TableCell><Badge variant="outline">{u.level}</Badge></TableCell>
                                        <TableCell className="text-right font-bold">{u.points.toLocaleString()}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="state">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bihar State Champions</CardTitle>
                            <CardDescription>Top performing districts and their leading citizens.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>District</TableHead>
                                    <TableHead>Top Citizen</TableHead>
                                    <TableHead className="text-right">Total Points</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockStateLeaderboard.map((s) => (
                                    <TableRow key={s.district}>
                                        <TableCell className="font-bold">{s.district}</TableCell>
                                        <TableCell>{s.topCitizen}</TableCell>
                                        <TableCell className="text-right font-medium">{s.totalPoints.toLocaleString()}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>

        {/* Monthly Challenge & Rewards */}
        <div className="space-y-8">
            <Card className="bg-secondary">
                <CardHeader>
                    <CardTitle>{mockMonthlyChallenge.name}</CardTitle>
                    <CardDescription>{mockMonthlyChallenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {mockMonthlyChallenge.tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle className={`h-5 w-5 mt-0.5 ${task.completed ? 'text-green-500' : 'text-muted-foreground'}`} />
                                <div>
                                    <p className="font-medium">{task.task}</p>
                                    <p className="text-sm text-muted-foreground">+{task.points} points</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Progress value={33} className="mt-4" />
                    <Button className="w-full mt-4">Join Challenge</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Real Rewards</CardTitle>
                    <CardDescription>Unlockable rewards for your contributions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Gift className="w-5 h-5 text-primary"/>
                        <span className="font-medium">Official Digital Certificate</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary"/>
                        <span className="font-medium">Meeting with Local Officials</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-primary"/>
                        <span className="font-medium">RTI Fee Waivers</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
