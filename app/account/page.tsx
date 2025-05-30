import { redirect } from "next/navigation";
import { getUserWithSubscription } from "@/lib/auth";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "@/components/account/account-settings";
import BillingHistory from "@/components/account/billing-history";
import ApiKeys from "@/components/account/api-keys";

export default async function AccountPage() {
  const user = await getUserWithSubscription();
  
  if (!user) {
    redirect("/sign-in");
  }

  const planStatus = user.subscription?.status || "Free plan";
  const planExpiry = user.subscription?.currentPeriodEnd 
    ? new Date(user.subscription.currentPeriodEnd).toLocaleDateString() 
    : "N/A";

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Your Account</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.imageUrl} alt={user.name} />
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-medium">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 items-center">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Current Plan</div>
                <div className="font-medium">{planStatus}</div>
                {planStatus !== "Free plan" && (
                  <div className="text-xs text-muted-foreground">Renews on {planExpiry}</div>
                )}
              </div>
              {planStatus === "Free plan" ? (
                <Button asChild className="w-full">
                  <Link href="/pricing">Upgrade Plan</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full">
                  <Link href="/account/billing">Manage Subscription</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:w-2/3">
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>
            <TabsContent value="settings" className="mt-6">
              <AccountSettings user={user} />
            </TabsContent>
            <TabsContent value="billing" className="mt-6">
              <BillingHistory subscription={user.subscription} />
            </TabsContent>
            <TabsContent value="api" className="mt-6">
              <ApiKeys userId={user.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}