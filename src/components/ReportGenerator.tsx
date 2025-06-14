
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from "jspdf";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ReportGeneratorProps {
  transactions: any[];
  currency: string;
  formatCurrency: (amount: number) => string;
}

export const ReportGenerator = ({ transactions, currency, formatCurrency }: ReportGeneratorProps) => {
  const [reportType, setReportType] = useState('monthly');
  const { toast } = useToast();

  const chartData = [
    { name: 'Food', value: 400, color: '#0088FE' },
    { name: 'Transport', value: 300, color: '#00C49F' },
    { name: 'Entertainment', value: 200, color: '#FFBB28' },
    { name: 'Utilities', value: 150, color: '#FF8042' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const generateReport = async () => {
    try {
      const doc = new jsPDF();
      
      // Header with better formatting
      doc.setFontSize(20);
      doc.text(`FinnTra ${reportType.charAt(0).toUpperCase()+reportType.slice(1)} Report`, 20, 30);
      
      // Company info
      doc.setFontSize(12);
      doc.text('Financial Analytics Dashboard', 20, 45);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 55);
      
      // Summary section
      doc.setFontSize(16);
      doc.text('Executive Summary', 20, 75);
      
      doc.setFontSize(12);
      doc.text(`Report Period: ${reportType}`, 20, 90);
      doc.text(`Currency: ${currency}`, 20, 100);
      doc.text(`Total Transactions: ${transactions.length}`, 20, 110);
      
      // Calculate totals
      const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const netAmount = totalIncome - totalExpenses;
      
      doc.text(`Total Income: ${formatCurrency(totalIncome)}`, 20, 120);
      doc.text(`Total Expenses: ${formatCurrency(totalExpenses)}`, 20, 130);
      doc.text(`Net Amount: ${formatCurrency(netAmount)}`, 20, 140);
      
      // Enhanced chart data representation
      doc.setFontSize(16);
      doc.text('Expense Breakdown by Category', 20, 165);
      
      doc.setFontSize(12);
      let yPos = 180;
      chartData.forEach((item, index) => {
        // Add colored squares to represent chart segments
        doc.setFillColor(item.color);
        doc.rect(25, yPos - 3, 4, 4, 'F');
        doc.setTextColor(0, 0, 0);
        doc.text(`${item.name}: ${formatCurrency(item.value)} (${((item.value / chartData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%)`, 35, yPos);
        yPos += 12;
      });

      // Add a visual chart representation using ASCII-like bars
      doc.setFontSize(14);
      doc.text('Visual Chart Representation:', 20, yPos + 20);
      
      yPos += 35;
      const maxValue = Math.max(...chartData.map(d => d.value));
      chartData.forEach((item, index) => {
        const barLength = (item.value / maxValue) * 100; // Scale to fit page
        
        // Draw bar using rectangles
        doc.setFillColor(item.color);
        doc.rect(80, yPos - 3, barLength * 0.8, 6, 'F');
        
        doc.setTextColor(0, 0, 0);
        doc.text(`${item.name}`, 20, yPos);
        doc.text(`${formatCurrency(item.value)}`, 170, yPos);
        
        yPos += 15;
      });
      
      // Transaction details
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Recent Transactions', 20, 30);
      
      doc.setFontSize(10);
      yPos = 50;
      transactions.slice(0, 30).forEach((transaction, index) => {
        const description = transaction.description || `Transaction ${index + 1}`;
        const amount = transaction.amount > 0 ? `+${formatCurrency(transaction.amount)}` : `-${formatCurrency(Math.abs(transaction.amount))}`;
        const date = transaction.date || new Date().toLocaleDateString();
        
        doc.text(`${date} | ${description} | ${amount}`, 20, yPos);
        yPos += 8;
        
        if (yPos > 270) {
          doc.addPage();
          yPos = 30;
        }
      });
      
      // Enhanced analytics section
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Financial Analytics & Insights', 20, 30);
      
      doc.setFontSize(12);
      doc.text('Key Performance Indicators:', 20, 50);
      doc.text(`• Average Daily Spending: ${formatCurrency(totalExpenses / 30)}`, 30, 65);
      doc.text(`• Savings Rate: ${((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)}%`, 30, 75);
      doc.text(`• Largest Expense Category: ${chartData.reduce((max, item) => item.value > max.value ? item : max).name}`, 30, 85);
      doc.text(`• Monthly Budget Utilization: ${(totalExpenses / (totalIncome * 0.8) * 100).toFixed(1)}%`, 30, 95);
      
      doc.text('Recommendations:', 20, 115);
      doc.text('• Consider setting up automatic savings transfers', 30, 130);
      doc.text('• Review and optimize your largest expense categories', 30, 140);
      doc.text('• Track spending patterns to identify cost-saving opportunities', 30, 150);
      doc.text('• Set specific financial goals for the next quarter', 30, 160);
      
      // Footer
      doc.setFontSize(8);
      doc.text('Generated by FinnTra Financial Management System - Advanced Analytics Engine', 20, 280);
      
      doc.save(`${reportType}-financial-report-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "Enhanced Report Downloaded!",
        description: `Your comprehensive ${reportType} financial report with visual charts has been generated.`,
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg font-semibold">Enhanced Reports with Charts</CardTitle>
        </div>
        <CardDescription>Generate detailed financial reports with visual analytics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart Preview */}
          <div className="h-32 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={40}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Report Period</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly Report</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="quarterly">Quarterly Report</SelectItem>
                <SelectItem value="yearly">Yearly Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generateReport} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Download className="h-4 w-4 mr-2" />
            Generate Enhanced PDF with Charts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
