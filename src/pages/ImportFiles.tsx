
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from "@/components/ThemeToggle";
import { Upload, Download, FileText, AlertCircle, CheckCircle, Home } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const ImportFiles = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; count: number; errors: string[] } | null>(null);

  const supportedFormats = [
    { name: 'CSV', description: 'Comma-separated values', icon: '📊' },
    { name: 'Excel', description: 'Microsoft Excel files (.xlsx, .xls)', icon: '📈' },
    { name: 'QIF', description: 'Quicken Interchange Format', icon: '💾' },
    { name: 'OFX', description: 'Open Financial Exchange', icon: '🏦' },
    { name: 'PDF', description: 'Bank statements (text-based)', icon: '📄' },
    { name: 'TSV', description: 'Tab-separated values', icon: '📋' },
    { name: 'JSON', description: 'JavaScript Object Notation', icon: '🔧' },
    { name: 'XML', description: 'Extensible Markup Language', icon: '📝' }
  ];

  const downloadCSVTemplate = () => {
    const csvContent = `Date,Description,Amount,Category,Type,Account
2024-01-15,Grocery Store,-85.43,Food,Expense,Checking
2024-01-15,Salary Deposit,3500.00,Income,Income,Checking
2024-01-14,Electric Bill,-120.00,Utilities,Expense,Checking
2024-01-14,Coffee Shop,-12.50,Food,Expense,Credit Card
2024-01-13,Gas Station,-45.00,Transportation,Expense,Credit Card`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'finntra-import-template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV template downloaded successfully!');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportResult(null);
    }
  };

  const processImportFile = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setImportResult(null);

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock processing result
      const mockResult = {
        success: true,
        count: Math.floor(Math.random() * 50) + 10,
        errors: []
      };

      // Save to localStorage
      const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
      const newTransactions = Array.from({ length: mockResult.count }, (_, i) => ({
        id: Date.now() + i,
        description: `Imported Transaction ${i + 1}`,
        amount: (Math.random() - 0.5) * 1000,
        category: ['Food', 'Transportation', 'Utilities', 'Entertainment'][Math.floor(Math.random() * 4)],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }));

      localStorage.setItem('transactions', JSON.stringify([...newTransactions, ...existingTransactions]));
      setImportResult(mockResult);
      toast.success(`Successfully imported ${mockResult.count} transactions!`);
    } catch (error) {
      setImportResult({
        success: false,
        count: 0,
        errors: ['Failed to process file. Please check the format and try again.']
      });
      toast.error('Import failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" alt="FinnTra Logo" className="h-10 w-10" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Import Files</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Import Your Financial Data
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Upload files from your bank or financial software
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload File
              </CardTitle>
              <CardDescription>
                Select a file to import your transaction data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="file-upload" className="text-sm font-medium">
                  Choose File
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xlsx,.xls,.qif,.ofx,.pdf,.tsv,.json,.xml"
                  onChange={handleFileSelect}
                  className="mt-1"
                />
                {selectedFile && (
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        {selectedFile.name}
                      </span>
                      <Badge variant="secondary">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={processImportFile}
                disabled={!selectedFile || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Import File
                  </>
                )}
              </Button>

              {importResult && (
                <div className={`p-4 rounded-lg ${
                  importResult.success 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center gap-2">
                    {importResult.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <h4 className={`font-medium ${
                      importResult.success ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'
                    }`}>
                      {importResult.success ? 'Import Successful!' : 'Import Failed'}
                    </h4>
                  </div>
                  {importResult.success ? (
                    <p className="text-sm text-green-700 dark:text-green-200 mt-1">
                      Successfully imported {importResult.count} transactions.
                    </p>
                  ) : (
                    <ul className="text-sm text-red-700 dark:text-red-200 mt-1">
                      {importResult.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Template Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Template
              </CardTitle>
              <CardDescription>
                Get a sample CSV file with the correct format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Required Columns:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Date (YYYY-MM-DD format)</li>
                  <li>• Description</li>
                  <li>• Amount (negative for expenses)</li>
                  <li>• Category</li>
                  <li>• Type (Income/Expense)</li>
                  <li>• Account (optional)</li>
                </ul>
              </div>

              <Button
                onClick={downloadCSVTemplate}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Download CSV Template
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Need help? Check our{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    import guide
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Supported Formats */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>Supported File Formats</CardTitle>
            <CardDescription>
              FinnTra supports 8 different file formats for easy importing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {supportedFormats.map((format, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:scale-105 transition-transform"
                >
                  <span className="text-2xl mb-2">{format.icon}</span>
                  <h4 className="font-medium text-gray-900 dark:text-white">{format.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">
                    {format.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImportFiles;
