import { Collection, MongoClient } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient,
  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    this.client.close();
  },

  async getCollection(name: string): Promise<Collection> {
    return this.client.db().collection(name);
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection;

    return { ...collectionWithoutId, id: _id };
  },
};
