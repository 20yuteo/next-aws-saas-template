"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

interface BillingHistoryProps {
  subscription: any;
}

const mockInvoices = [
  {
    id: "INV-001",
    date: "2023-05-12",
    amount: "$29.00",
    status: "Paid",
  },
  {
    id: "INV-002",
    date: "2023-04-12",
    amount: "$29.00",
    status: "Paid",
  },
  {
    id: "INV-003",
    date: "2023-03-12",
    amount: "$29.00",
    status: "Paid",
  },
];

export default function BillingHistory({ subscription }: BillingHistoryProps) {
  const isSubscribed = !!subscription;
  const planName = isSubscribed ? subscription.plan : "Free";
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>
            Manage your subscription and billing details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <div className="font-medium">Current Plan</div>
                <div className="text-sm text-muted-foreground">{planName}</div>
              </div>
              <Button asChild>
                <Link href="/pricing">
                  {isSubscribed ? "Change Plan" : "Upgrade"}
                </Link>
              </Button>
            </div>
            
            {isSubscribed && (
              <div className="flex justify-between items-center pb-4">
                <div>
                  <div className="font-medium">Billing Cycle</div>
                  <div className="text-sm text-muted-foreground">
                    Next payment on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/account/billing/manage">Manage Billing</Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View your past invoices and download receipts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockInvoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground mb-4">No billing history available</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/pricing">Upgrade to Pro</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}