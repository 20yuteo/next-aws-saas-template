"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out our platform",
      price: { monthly: "$0", yearly: "$0" },
      features: [
        "Basic analytics",
        "Up to 5 projects",
        "100 API requests per day",
        "Community support",
      ],
      cta: "Get Started",
      href: "/sign-up",
      highlighted: false,
    },
    {
      name: "Pro",
      description: "For individuals and small teams",
      price: { monthly: "$29", yearly: "$290" },
      features: [
        "Advanced analytics",
        "Unlimited projects",
        "10,000 API requests per day",
        "Priority support",
        "Custom domains",
        "Team collaboration",
      ],
      cta: "Start Free Trial",
      href: "/sign-up?plan=pro",
      highlighted: true,
      badge: "Popular",
    },
    {
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      price: { monthly: "$99", yearly: "$990" },
      features: [
        "Enterprise analytics",
        "Unlimited projects",
        "Unlimited API requests",
        "Dedicated support",
        "Custom domains",
        "Advanced security",
        "SLA guarantees",
        "SSO integration",
      ],
      cta: "Contact Sales",
      href: "/contact",
      highlighted: false,
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-muted/50" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Choose the perfect plan for your needs. Always know what you&apos;ll pay.
          </p>
          
          <div className="flex items-center space-x-2 mt-6">
            <span className={billingInterval === "monthly" ? "text-foreground" : "text-muted-foreground"}>
              Monthly
            </span>
            <Switch
              checked={billingInterval === "yearly"}
              onCheckedChange={(checked) => setBillingInterval(checked ? "yearly" : "monthly")}
            />
            <span className={billingInterval === "yearly" ? "text-foreground" : "text-muted-foreground"}>
              Yearly
              <Badge variant="outline" className="ml-2 bg-primary/20 text-primary">Save 20%</Badge>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-lg border bg-background p-6 shadow-sm transition-all ${
                plan.highlighted
                  ? "border-primary/50 shadow-md"
                  : "border-border"
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-2 right-4 bg-primary">
                  {plan.badge}
                </Badge>
              )}
              <div className="mb-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground mt-1">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {billingInterval === "monthly"
                    ? plan.price.monthly
                    : plan.price.yearly}
                </span>
                <span className="text-muted-foreground ml-1">
                  /{billingInterval === "monthly" ? "month" : "year"}
                </span>
              </div>
              <ul className="mb-6 space-y-2 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}