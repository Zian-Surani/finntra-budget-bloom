
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Upload, FileText, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImportedTransaction {
  date: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
}

const ImportTransactions = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileFormat, setFileFormat] = useState<string>('');
  const [importedData, setImportedData] = useState<ImportedTransaction[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [mappings, setMappings] = useState({
    date: '',
    amount: '',
    description: '',
    category: '',
    type: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const supportedFormats = [
    { value: 'csv', label: 'CSV (Comma Separated Values)' },
    { value: 'xlsx', label: 'Excel (.xlsx)' },
    { value: 'xls', label: 'Excel (.xls)' },
    { value: 'qif', label: 'Quicken Interchange Format (.qif)' },
    { value: 'ofx', label: 'Open Financial Exchange (.ofx)' },
    { value: 'qfx', label: 'Quicken Financial Exchange (.qfx)' },
    { value: 'mt940', label: 'MT940 Bank Statement' },
    { value: 'json', label: 'JSON Format' }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Auto-detect format based on file extension
      const extension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (extension && supportedFormats.some(f => f.value === extension)) {
        setFileFormat(extension);
      }
    }
  };

  const simulateImport = async () => {
    if (!file) return;
    
    setIsImporting(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock imported data
    const mockData: ImportedTransaction[] = [
      {
        date: '2024-01-15',
        amount: -45.50,
        description: 'Grocery Store Purchase',
        category: 'Food & Dining',
        type: 'expense'
      },
      {
        date: '2024-01-14',
        amount: 3500.00,
        description: 'Salary Deposit',
        category: 'Income',
        type: 'income'
      },
      {
        date: '2024-01-12',
        amount: -120.00,
        description: 'Utility Bill Payment',
        category: 'Bills & Utilities',
        type: 'expense'
      }
    ];
    
    setImportedData(mockData);
    setIsImporting(false);
    
    toast({
      title: "Import Successful",
      description: `Successfully imported ${mockData.length} transactions from ${file.name}`,
    });
  };

  const downloadTemplate = (format: string) => {
    const templates = {
      csv: 'Date,Amount,Description,Category,Type\n2024-01-01,-50.00,Sample Expense,Food,expense\n2024-01-01,1000.00,Sample Income,Salary,income',
      json: JSON.stringify([
        { date: '2024-01-01', amount: -50.00, description: 'Sample Expense', category: 'Food', type: 'expense' },
        { date: '2024-01-01', amount: 1000.00, description: 'Sample Income', category: 'Salary', type: 'income' }
      ], null, 2)
    };
    
    const content = templates[format as keyof typeof templates] || templates.csv;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template.${format === 'json' ? 'json' : 'csv'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Transactions
          </CardTitle>
          <CardDescription>
            Import your financial data from various file formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Format Selection */}
          <div className="space-y-2">
            <Label htmlFor="format">Select File Format</Label>
            <Select value={fileFormat} onValueChange={setFileFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Choose format..." />
              </SelectTrigger>
              <SelectContent>
                {supportedFormats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <div className="flex gap-2">
              <Input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept=".csv,.xlsx,.xls,.qif,.ofx,.qfx,.json"
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => downloadTemplate(fileFormat)}
                disabled={!fileFormat}
              >
                <Download className="h-4 w-4 mr-2" />
                Template
              </Button>
            </div>
            {file && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          {/* Import Button */}
          <Button
            onClick={simulateImport}
            disabled={!file || !fileFormat || isImporting}
            className="w-full"
          >
            {isImporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Import Transactions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Preview Imported Data */}
      {importedData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Import Preview
            </CardTitle>
            <CardDescription>
              Review your imported transactions before saving
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {importedData.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {transaction.date} • {transaction.category}
                    </p>
                  </div>
                  <div className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Save All Transactions
              </Button>
              <Button variant="outline" onClick={() => setImportedData([])}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImportTransactions;
