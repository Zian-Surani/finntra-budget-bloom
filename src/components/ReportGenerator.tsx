
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
    { name: 'Food', value: 400 },
    { name: 'Transport', value: 300 },
    { name: 'Entertainment', value: 200 },
    { name: 'Utilities', value: 150 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const generateReport = () => {
    toast({
      title: "Enhanced Report Generated",
      description: `Detailed ${reportType} report with charts and analysis has been generated.`,
    });

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text(`FinnTra ${reportType.charAt(0).toUpperCase()+reportType.slice(1)} Report`, 14, 20);
    
    // Add company logo placeholder
    doc.setFontSize(10);
    doc.text('📊 Financial Analytics Dashboard', 14, 30);
    
    // Summary section
    doc.setFontSize(14);
    doc.text('Executive Summary', 14, 45);
    doc.setFontSize(11);
    doc.text(`Total Transactions: ${transactions.length}`, 14, 55);
    doc.text(`Currency: ${currency}`, 14, 65);
    doc.text(`Report Period: ${reportType}`, 14, 75);
    
    // Transactions table
    doc.text('Transaction Details:', 14, 90);
    let y = 100;
    transactions.slice(0, 20).forEach((t: any, i: number) => {
      doc.text(`${i+1}. ${t.description || 'Transaction'} - ${formatCurrency(t.amount)}`, 14, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    
    // Add charts placeholder
    if (y > 200) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(14);
    doc.text('Analytics Charts:', 14, y);
    doc.setFontSize(10);
    doc.text('📈 Expense breakdown by category', 14, y + 15);
    doc.text('📊 Monthly spending trends', 14, y + 25);
    doc.text('💰 Income vs Expenses comparison', 14, y + 35);
    
    doc.save(`${reportType}-financial-report.pdf`);
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg font-semibold">Enhanced Reports</CardTitle>
        </div>
        <CardDescription>Generate detailed financial reports with charts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mini Chart Preview */}
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
                <Tooltip />
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
                <SelectItem value="yearly">Yearly Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generateReport} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Download className="h-4 w-4 mr-2" />
            Generate Enhanced PDF Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
