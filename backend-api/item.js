import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    UpdateCommand,
    PutCommand,
    DynamoDBDocumentClient,
    ScanCommand,
    DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto"; // generate random unique partition key

const client = new DynamoDBClient({ region: "us-west-1" });
const docClient = DynamoDBDocumentClient.from(client);

export const fetchItems = async () => {
    const command = new ScanCommand({
      ExpressionAttributeNames: { "#name": "name" },
      ProjectionExpression: "id, #name, completed",
      TableName: "Items",
    });
  
    const response = await docClient.send(command);
  
    return response;
};

export const createItems = async ({ name, completed }) => {
    const uuid = crypto.randomUUID();
    const command = new PutCommand({
      TableName: "Items",
      Item: {
        id: uuid,
        name,
        completed,
      },
    });
  
    const response = await docClient.send(command);
  
    return response;
};
  
export const updateItems = async ({ id, name, completed }) => {
    const command = new UpdateCommand({
      TableName: "Items",
      Key: {
        id,
      },
      ExpressionAttributeNames: {
        "#name": "name",
      },
      UpdateExpression: "set #name = :n, completed = :c",
      ExpressionAttributeValues: {
        ":n": name,
        ":c": completed,
      },
      ReturnValues: "ALL_NEW",
    });
  
    const response = await docClient.send(command);
  
    return response;
};

export const deleteItems = async (id) => {
    const command = new DeleteCommand({
      TableName: "Items",
      Key: {
        id,
      },
    });
  
    const response = await docClient.send(command);
  
    return response;
};