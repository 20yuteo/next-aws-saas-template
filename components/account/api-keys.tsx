"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Key, RefreshCw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeysProps {
  userId: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

// Mock API keys for demonstration
const mockApiKeys: ApiKey[] = [
  {
    id: "key_1",
    name: "Production API Key",
    key: "sk_prod_xxxxxxxxxxxxxxxxxxxx",
    createdAt: "2023-01-15",
    lastUsed: "2023-05-10",
  },
  {
    id: "key_2",
    name: "Development API Key",
    key: "sk_dev_xxxxxxxxxxxxxxxxxxxx",
    createdAt: "2023-03-22",
    lastUsed: "2023-05-12",
  },
];

export default function ApiKeys({ userId }: ApiKeysProps) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
  const [newKeyName, setNewKeyName] = useState("");
  const { toast } = useToast();

  const createNewKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Key name required",
        description: "Please provide a name for your API key.",
        variant: "destructive",
      });
      return;
    }

    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      key: `sk_${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    
    toast({
      title: "API key created",
      description: "Your new API key has been created successfully.",
    });
  };

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    
    toast({
      title: "API key deleted",
      description: "The API key has been deleted successfully.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Copied to clipboard",
      description: "API key copied to clipboard.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="mr-2 h-5 w-5" /> API Keys
        </CardTitle>
        <CardDescription>
          Manage your API keys for accessing our services programmatically
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">New API Key Name</label>
              <Input
                placeholder="e.g., Production API Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
            <Button onClick={createNewKey}>Generate New API Key</Button>
          </div>
          
          <div className="border rounded-md">
            <div className="p-4 border-b bg-muted/50">
              <h3 className="font-medium">Your API Keys</h3>
            </div>
            <div className="divide-y">
              {apiKeys.length > 0 ? (
                apiKeys.map((key) => (
                  <div key={key.id} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{key.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>•••••••••••••••••••••••</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={() => copyToClipboard(key.key)}
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span className="sr-only">Copy API key</span>
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Created on {key.createdAt}
                        {key.lastUsed && ` • Last used on ${key.lastUsed}`}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(key.key)}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy API key</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteKey(key.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete API key</span>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No API keys found</p>
                  <Button
                    variant="outline"
                    className="mx-auto"
                    onClick={() => setNewKeyName("My First API Key")}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Create your first API key
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}