import PricingSection from "@/components/marketing/pricing-section";

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-24">
      <div className="container px-4 md:px-6 mb-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Simple, Transparent Pricing
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose the perfect plan for your needs. No hidden fees or surprises.
          </p>
        </div>
      </div>
      
      <PricingSection />
      
      <div className="container px-4 md:px-6 mt-20">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-12 max-w-5xl">
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-medium">What happens when my trial ends?</h3>
              <p className="text-muted-foreground">
                When your trial ends, your account will automatically be downgraded to the Free plan. 
                You can upgrade at any time.
              </p>
            </div>
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-medium">Can I change plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings.
              </p>
            </div>
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-medium">Do you offer discounts?</h3>
              <p className="text-muted-foreground">
                We offer discounts for non-profits, educational institutions, and startups. 
                Contact our sales team for more information.
              </p>
            </div>
            <div className="space-y-2 text-left">
              <h3 className="text-xl font-medium">How does billing work?</h3>
              <p className="text-muted-foreground">
                We bill monthly or yearly, depending on your preference. All plans come with automatic 
                renewals which you can disable anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}