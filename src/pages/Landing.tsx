import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, PieChart, CreditCard, Shield, Smartphone, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";
import LandingMockupCarousel from "@/components/LandingMockupCarousel";
import HeroStockImage, { HERO_IMAGES, HERO_LOGO_SRC } from "@/components/HeroStockImage";
import { useState } from "react";
const featureBubbles = [{
  text: "Automatic Sync",
  emoji: "🔗"
}, {
  text: "Playful Reports",
  emoji: "📊"
}, {
  text: "Multi-currency",
  emoji: "💲"
}, {
  text: "AI Assistant",
  emoji: "🤖"
}];
const bgGradients = <>
    {/* Color Splashes */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute left-[-10vw] top-[-10vw] w-[45vw] h-[35vw] bg-gradient-to-br from-indigo-300/30 to-blue-500/20 rounded-full blur-3xl animate-fade-in" />
      <div className="absolute right-[-7vw] top-28 w-[30vw] h-[28vw] bg-gradient-to-br from-yellow-200/30 via-indigo-300/20 to-blue-400/10 rounded-full blur-3xl animate-fade-in delay-100" />
      <div className="absolute left-1/4 top-[64vh] w-[40vw] h-[26vw] bg-gradient-to-tr from-fuchsia-300/30 to-blue-200/30 rounded-full blur-3xl animate-fade-in delay-200" />
    </div>
  </>;
const Landing = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const features = [{
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Get AI-powered insights into your spending patterns and financial health."
  }, {
    icon: PieChart,
    title: "Visual Reports",
    description: "Interactive charts and graphs to visualize your financial data."
  }, {
    icon: CreditCard,
    title: "Bank Sync",
    description: "Connect multiple bank accounts and credit cards for automatic tracking."
  }, {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is encrypted and stored securely."
  }, {
    icon: Smartphone,
    title: "Multi-Currency",
    description: "Support for multiple currencies including INR, USD, EUR, and more."
  }, {
    icon: DollarSign,
    title: "Budget Management",
    description: "Set budgets, track expenses, and get alerts when you're overspending."
  }];
  const handleLogoClick = () => {
    window.location.href = '/';
  };
  // Center logo above hero
  return <div className="relative min-h-screen font-sans overflow-x-hidden bg-gradient-to-br from-indigo-50 via-blue-100 to-white dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 transition-colors duration-700">
      {bgGradients}
      {/* Header */}
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
            <img src={HERO_LOGO_SRC} alt="FinnTra Logo" className="h-10 w-10" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FinnTra</h1>
          </div>
          <div className="flex space-x-2 items-center">
            <ThemeToggle />
            <Button variant="outline" onClick={() => window.location.href = '/login'}>
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" onClick={() => window.location.href = '/login'}>
              Get Started
            </Button>
            <Button variant="secondary" onClick={() => window.location.href = '/ai-chat'}>
              AI Assistant
            </Button>
          </div>
        </div>
      </header>

      {/* Hero section with carousel-synced stock image */}
      <section className="relative py-24 sm:py-32 flex flex-col items-center z-10 animate-fade-in">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center gap-4">
          {/* Logo centered above hero image and headline */}
          <img
            src={HERO_LOGO_SRC}
            alt="FinnTra Logo"
            className="h-16 w-16 rounded-full mb-4 shadow-lg object-cover bg-white/90 z-20"
            style={{ border: "2px solid #d2e4fa"}}
          />
          <div className="relative flex items-center justify-center w-full">
            <HeroStockImage activeIndex={carouselIndex} />
          </div>
          {/* Text that changes with the hero image */}
          <div className="text-lg sm:text-xl font-medium text-blue-900 dark:text-blue-100 mb-2 min-h-7 transition-all animate-fade-in" key={`hero-text-${carouselIndex}`}>
            {HERO_IMAGES[carouselIndex % HERO_IMAGES.length].text}
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800 dark:text-white mb-3 leading-tight tracking-tight animate-fade-in">
            Your finances, <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">happy</span> and under control
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 mb-4 max-w-2xl mx-auto animate-fade-in delay-100">
            FinnTra brings color and fun to your money management. See the big picture, get playful insights, save more painlessly.
          </p>
          <div className="flex flex-wrap justify-center gap-3 my-4">
            {featureBubbles.map((f, i) => <span key={f.text} className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-br from-indigo-100 via-fuchsia-100 to-amber-100 dark:from-indigo-900 dark:via-fuchsia-900 dark:to-amber-900 shadow hover:scale-105 transition-all text-gray-800 dark:text-gray-200 font-semibold text-md animate-scale-in" style={{
            animationDelay: `${150 + i * 60}ms`
          }}>
                <span className="mr-2">{f.emoji}</span> {f.text}
              </span>)}
          </div>
          <div className="flex justify-center space-x-4 mt-6 animate-fade-in delay-200">
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 drop-shadow-xl shadow-blue-300 smooth-btn" onClick={e => {
            e.currentTarget.classList.add("btn-pressed");
            setTimeout(() => e.currentTarget.classList.remove("btn-pressed"), 240);
            window.location.href = '/login';
          }}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="hover:scale-105 bg-white/50 dark:bg-slate-800/70 border-2 border-indigo-300 dark:border-indigo-700 shadow smooth-btn" onClick={e => {
            e.currentTarget.classList.add("btn-pressed");
            setTimeout(() => e.currentTarget.classList.remove("btn-pressed"), 240);
            window.location.href = '/dashboard';
          }}>
              Try Demo
            </Button>
          </div>
        </div>
        {/* Playful circle illustration (removed by user request) */}
      </section>
      {/* Professional auto-advance carousel with image sync */}
      <section className="relative py-10 z-10 animate-fade-in">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center animate-fade-in">Love your charts and reports</h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-5 text-center">Swipe through our colorful, cheerful, and powerful mockups!</p>
        <LandingMockupCarousel onSlideChange={setCarouselIndex} />
        {/* Professional auto-scroll hint */}
        <div className="mt-4 flex justify-center animate-fade-in">
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FinnTra?</h3>
            <p className="text-lg text-gray-600">Powerful features to help you master your finances</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => <Card key={index} className="shadow-lg border-0 hover:scale-105 transition-transform hover:shadow-xl">
                <CardHeader>
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg w-fit">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Developer Section (dark contact boxes) */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet the Developer</h3>
            <p className="text-lg text-gray-600">Built with passion for financial empowerment</p>
          </div>
          
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-full">
                  <DollarSign className="h-16 w-16 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">FinnTra Development Team</h4>
                  <p className="text-gray-600 mb-4">
                    Passionate about creating tools that help people achieve financial freedom. 
                    FinnTra is built with modern web technologies to provide a seamless, 
                    secure, and intuitive finance tracking experience.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Tailwind CSS</Badge>
                    <Badge variant="secondary">Recharts</Badge>
                    <Badge variant="secondary">Shadcn/ui</Badge>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="border-t pt-6 mt-6">
                <h5 className="text-lg font-semibold text-gray-900 mb-4 text-center">Get in Touch</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-center space-x-2 p-3 bg-black rounded-lg hover:scale-105 cursor-pointer transition-transform">
                    <Mail className="h-5 w-5 text-white" />
                    <span className="text-sm text-white">dev@finntra.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 p-3 bg-black rounded-lg hover:scale-105 cursor-pointer transition-transform">
                    <Github className="h-5 w-5 text-white" />
                    <span className="text-sm text-white">github.com/finntra</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 p-3 bg-black rounded-lg hover:scale-105 cursor-pointer transition-transform">
                    <Linkedin className="h-5 w-5 text-white" />
                    <span className="text-sm text-white">linkedin.com/finntra</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mockups Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center text-center animate-scale-in transition-all">
              <Smartphone className="w-12 h-12 mb-4 text-indigo-500 bg-indigo-100 dark:bg-indigo-900 rounded-full p-2" />
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Mobile-First Design</h3>
              <p className="text-gray-500 dark:text-gray-400">Track expenses easily from your phone. UI optimized for fast input anywhere, anytime.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center text-center animate-scale-in delay-100 transition-all">
              <DollarSign className="w-12 h-12 mb-4 text-green-600 bg-green-100 dark:bg-green-900 rounded-full p-2" />
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">AI-Powered Suggestions</h3>
              <p className="text-gray-500 dark:text-gray-400">Let the assistant help you save with personalized finance tips.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center text-center animate-scale-in delay-200 transition-all">
              <PieChart className="w-12 h-12 mb-4 text-blue-600 bg-blue-100 dark:bg-blue-900 rounded-full p-2" />
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Beautiful Visual Reports</h3>
              <p className="text-gray-500 dark:text-gray-400">Your finances, visualized in engaging and colorful ways on any device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4 cursor-pointer" onClick={handleLogoClick}>
            <img src="/lovable-uploads/62637124-2993-4040-a176-d1e9ed77f87d.png" alt="FinnTra Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold">FinnTra</h1>
          </div>
          <p className="text-gray-400 mb-4">© 2024 FinnTra. All rights reserved.</p>
          <p className="text-gray-400">Your financial journey starts here.</p>
        </div>
      </footer>
    </div>;
};
export default Landing;
