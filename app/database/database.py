from motor.motor_asyncio import AsyncIOMotorClient

from odmantic import AIOEngine

# Replace the connection string with your own
connection_string = "mongodb+srv://luisess:NWL4grBmclUXvyIo@cluster0.t3aobfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a MongoClient object
client = AsyncIOMotorClient(connection_string)

# Access the database
database = "green-retail"

# Access the collection
# collection = database["your_collection_name"]

# Perform database operations
# ...
engine = AIOEngine(client=client, database=database)

# Close the connection
# client.close()