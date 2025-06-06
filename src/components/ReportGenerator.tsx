
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportGeneratorProps {
  transactions: any[];
  currency: string;
  formatCurrency: (amount: number) => string;
}

export const ReportGenerator = ({ transactions, currency, formatCurrency }: ReportGeneratorProps) => {
  const [reportType, setReportType] = useState('monthly');
  const { toast } = useToast();

  const generateReport = () => {
    // In a real app, this would generate an actual PDF
    toast({
      title: "Report Generated",
      description: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report has been generated successfully.`,
    });
    
    // Simulate PDF download
    console.log(`Generating ${reportType} report with ${transactions.length} transactions in ${currency}`);
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg font-semibold">Generate Reports</CardTitle>
        </div>
        <CardDescription>Download detailed financial reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
            Generate PDF Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
