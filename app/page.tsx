import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import FeatureCard from '@/components/marketing/feature-card';
import PricingSection from '@/components/marketing/pricing-section';
import HeroAnimation from '@/components/marketing/hero-animation';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Build, Launch, and Scale Your SaaS Faster
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto">
              A complete SaaS starter template with authentication, payments, and database integration.
              Get your product to market in days, not months.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button asChild size="lg" className="font-medium px-8">
                <Link href="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium px-8">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full max-w-4xl mt-12">
            <HeroAnimation />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Everything You Need to Succeed
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Our platform provides all the tools and features you need to build, 
              launch, and scale your SaaS business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <FeatureCard 
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Authentication" 
              description="Secure user authentication with multiple social providers and email/password login." 
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6" />}
              title="Subscription Management" 
              description="Handle recurring payments, upgrades, and cancellations with ease." 
            />
            <FeatureCard 
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="DynamoDB Integration" 
              description="Scalable database solution to store and retrieve user data efficiently." 
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6" />}
              title="Dashboard Analytics" 
              description="Track user behavior and monitor important metrics in real-time." 
            />
            <FeatureCard 
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Responsive Design" 
              description="Beautiful UI that works perfectly on all devices and screen sizes." 
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6" />}
              title="Dark Mode Support" 
              description="Give users the option to choose between light and dark themes." 
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary">
        <div className="container px-4 md:px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground md:text-4xl">
              Ready to Start Building?
            </h2>
            <p className="text-primary-foreground/80 md:text-xl">
              Join thousands of founders who are building their dreams with our platform.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-4 font-medium px-8">
              <Link href="/signup">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}