
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PiggyBank, 
  Target, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Edit,
  Trash2,
  Bot,
  Lightbulb,
  ArrowLeft
} from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
}

const Savings = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      target: 10000,
      current: 6500,
      deadline: '2024-12-31',
      category: 'Security'
    },
    {
      id: '2',
      name: 'Vacation to Europe',
      target: 5000,
      current: 2300,
      deadline: '2024-08-15',
      category: 'Travel'
    },
    {
      id: '3',
      name: 'New Car',
      target: 25000,
      current: 8900,
      deadline: '2025-06-01',
      category: 'Vehicle'
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    deadline: '',
    category: ''
  });

  const [aiInsights, setAiInsights] = useState([
    "💡 You're 65% towards your emergency fund goal! Consider increasing monthly contributions by $200 to reach it 2 months earlier.",
    "🎯 Your vacation goal needs $270/month to meet the deadline. Consider setting up an automatic transfer.",
    "📈 Based on your spending patterns, you could save an extra $180/month by reducing dining out expenses.",
    "🏆 Great progress! You're ahead of 73% of people your age in emergency fund savings."
  ]);

  const { formatCurrency } = useCurrencyConverter();

  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  const addGoal = () => {
    if (newGoal.name && newGoal.target) {
      const goal: SavingsGoal = {
        id: Date.now().toString(),
        name: newGoal.name,
        target: parseFloat(newGoal.target),
        current: 0,
        deadline: newGoal.deadline,
        category: newGoal.category
      };
      setGoals([...goals, goal]);
      setNewGoal({ name: '', target: '', deadline: '', category: '' });
    }
  };

  const updateGoalProgress = (id: string, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, current: Math.min(goal.current + amount, goal.target) }
        : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={() => window.location.href = '/dashboard'}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>
            <PiggyBank className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Savings</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalSaved)}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalTarget)}</div>
              <p className="text-xs text-muted-foreground">
                {goals.length} active goals
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="goals" className="space-y-6">
          <TabsList>
            <TabsTrigger value="goals">Savings Goals</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="add">Add Goal</TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid gap-6">
              {goals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                const remaining = goal.target - goal.current;
                const daysUntilDeadline = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                
                return (
                  <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {goal.name}
                            <Badge variant="secondary">{goal.category}</Badge>
                          </CardTitle>
                          <CardDescription>
                            {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed'}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteGoal(goal.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>{formatCurrency(goal.current)}</span>
                            <span>{formatCurrency(goal.target)}</span>
                          </div>
                          <Progress value={progress} />
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatCurrency(remaining)} remaining ({progress.toFixed(1)}% complete)
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Add amount" 
                            type="number" 
                            className="flex-1"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                const amount = parseFloat((e.target as HTMLInputElement).value);
                                if (amount > 0) {
                                  updateGoalProgress(goal.id, amount);
                                  (e.target as HTMLInputElement).value = '';
                                }
                              }
                            }}
                          />
                          <Button onClick={() => {
                            const input = document.querySelector(`input[placeholder="Add amount"]`) as HTMLInputElement;
                            const amount = parseFloat(input.value);
                            if (amount > 0) {
                              updateGoalProgress(goal.id, amount);
                              input.value = '';
                            }
                          }}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  AI Financial Insights
                </CardTitle>
                <CardDescription>
                  Personalized recommendations based on your savings patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Savings Goal</CardTitle>
                <CardDescription>Set a new financial target to work towards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Goal name (e.g., New Laptop)"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Target amount"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                />
                <Input
                  type="date"
                  placeholder="Target date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
                <Input
                  placeholder="Category (e.g., Electronics, Travel)"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                />
                <Button onClick={addGoal} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Goal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Savings;
