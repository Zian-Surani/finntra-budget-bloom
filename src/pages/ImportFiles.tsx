
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, CheckCircle, ArrowLeft, Download, FileSpreadsheet, Database } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";

const ImportFiles = () => {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const supportedFormats = [
    { name: "CSV", icon: FileSpreadsheet, description: "Comma-separated values from any bank or app", color: "bg-green-500" },
    { name: "Excel", icon: FileSpreadsheet, description: "Microsoft Excel files (.xlsx, .xls)", color: "bg-blue-500" },
    { name: "OFX", icon: Database, description: "Open Financial Exchange format", color: "bg-purple-500" },
    { name: "QIF", icon: FileText, description: "Quicken Interchange Format", color: "bg-orange-500" },
    { name: "MT940", icon: Database, description: "SWIFT MT940 bank statements", color: "bg-red-500" },
    { name: "CAMT", icon: Database, description: "ISO 20022 CAMT format", color: "bg-indigo-500" },
    { name: "BAI", icon: FileText, description: "Bank Administration Institute format", color: "bg-yellow-500" },
    { name: "JSON", icon: FileText, description: "JavaScript Object Notation exports", color: "bg-gray-500" }
  ];

  const importSteps = [
    {
      title: "Choose Your File",
      description: "Select the file from your computer or drag and drop",
      icon: Upload,
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Map Columns",
      description: "Match your file columns to FinnTra categories",
      icon: FileText,
      color: "from-green-400 to-green-600"
    },
    {
      title: "Review & Import",
      description: "Preview your data and confirm the import",
      icon: CheckCircle,
      color: "from-purple-400 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={handleBackToHome} className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Button>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" onClick={() => window.location.href = '/login'}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full w-fit mx-auto mb-6">
              <Upload className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Import from File
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Bring your existing financial data into FinnTra with support for 8 popular file formats
            </p>
          </div>
          
          {/* File Upload Demo */}
          <div className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl mx-auto">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Drop your file here</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">or click to browse</p>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:scale-105 transition-transform duration-200">
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            8 Supported File Formats
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportedFormats.map((format, index) => (
              <Card key={index} className="text-center hover:scale-105 transition-transform duration-200">
                <CardHeader>
                  <div className={`${format.color} p-3 rounded-lg w-fit mx-auto`}>
                    <format.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{format.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{format.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How File Import Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {importSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`bg-gradient-to-r ${step.color} p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* File Mapping Example */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Smart Column Mapping
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your File Columns</h3>
                <div className="space-y-2">
                  {["Date", "Description", "Amount", "Balance", "Reference"].map((col, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 p-3 rounded border text-gray-900 dark:text-white">
                      {col}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">FinnTra Categories</h3>
                <div className="space-y-2">
                  {["Transaction Date", "Merchant/Description", "Amount", "Account Balance", "Transaction ID"].map((cat, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900 p-3 rounded border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100">
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300">
                <CheckCircle className="h-4 w-4 mr-1" />
                Auto-mapped successfully
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Sources */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Import from Popular Sources
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <FileSpreadsheet className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Bank Statements</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-left">
                  Import statements from:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Online banking downloads</li>
                    <li>Monthly PDF statements</li>
                    <li>Credit card statements</li>
                    <li>Investment account exports</li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <Database className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Other Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-left">
                  Migrate data from:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Mint exports</li>
                    <li>YNAB backups</li>
                    <li>Quicken files</li>
                    <li>Personal spreadsheets</li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Need Help?</h3>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              Can't find your format? We also accept custom CSV files and can help you map any data structure.
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100 hover:scale-105 transition-transform duration-200">
              <Download className="h-4 w-4 mr-2" />
              Download CSV Template
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Import Your Data?</h2>
          <p className="text-xl mb-8 text-green-100">Bring years of financial history into FinnTra in minutes</p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
            Start Importing
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ImportFiles;
