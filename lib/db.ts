import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

// Initialize the DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// Table names
const USERS_TABLE = "Users";
const SUBSCRIPTIONS_TABLE = "Subscriptions";

// User operations
export async function createUser(user: any) {
  const command = new PutCommand({
    TableName: USERS_TABLE,
    Item: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  try {
    const response = await docClient.send(command);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error };
  }
}

export async function getUserById(id: string) {
  const command = new GetCommand({
    TableName: USERS_TABLE,
    Key: {
      id,
    },
  });

  try {
    const response = await docClient.send(command);
    return { success: true, data: response.Item };
  } catch (error) {
    console.error("Error getting user:", error);
    return { success: false, error };
  }
}

export async function deleteUser(id: string) {
  const command = new DeleteCommand({
    TableName: USERS_TABLE,
    Key: {
      id,
    },
  });

  try {
    const response = await docClient.send(command);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error };
  }
}

// Subscription operations
export async function createSubscription(subscription: any) {
  const command = new PutCommand({
    TableName: SUBSCRIPTIONS_TABLE,
    Item: {
      id: subscription.id,
      userId: subscription.userId,
      status: subscription.status,
      plan: subscription.plan,
      priceId: subscription.priceId,
      quantity: subscription.quantity,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  try {
    const response = await docClient.send(command);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error creating subscription:", error);
    return { success: false, error };
  }
}

export async function getSubscriptionsByUserId(userId: string) {
  const command = new QueryCommand({
    TableName: SUBSCRIPTIONS_TABLE,
    IndexName: "UserIdIndex",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  });

  try {
    const response = await docClient.send(command);
    return { success: true, data: response.Items };
  } catch (error) {
    console.error("Error getting subscriptions:", error);
    return { success: false, error };
  }
}

export async function updateSubscription(subscription: any) {
  const command = new PutCommand({
    TableName: SUBSCRIPTIONS_TABLE,
    Item: {
      ...subscription,
      updatedAt: new Date().toISOString(),
    },
  });

  try {
    const response = await docClient.send(command);
    return { success: true, data: response };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return { success: false, error };
  }
}