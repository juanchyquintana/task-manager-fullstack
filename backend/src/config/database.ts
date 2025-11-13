import mongoose from "mongoose";

class Database {
  private static instance: Database;
  private connection?: typeof mongoose;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public async connectToDatabase(url: string): Promise<typeof mongoose> {
    if(this.connection) {
        console.log("The Database is already connected");
        return this.connection;
    }

    try {
      this.connection = await mongoose.connect(url);
      console.log("✅ - Database connected");

      return this.connection;
    } catch (error) {
      console.log("❌ - Error connecting to the database", error);
      process.exit(1);
    }
  }

  public async disconnectToDatabase(): Promise<void> {
    if(!this.connection) return;
    await mongoose.disconnect();

    this.connection = undefined;
    console.log("Conection with MongoDB Closed");
  }
}

export const database = Database.getInstance();
