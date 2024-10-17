from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine

from ..config.config import settings

# Replace the connection string with your own
connection_string = settings.MONGO_URI

# Create a MongoClient object
client = AsyncIOMotorClient(connection_string)

# Access the database
database = settings.MONGO_DB

# Access the collection
# collection = database["your_collection_name"]

# Perform database operations
# ...
engine = AIOEngine(client=client, database=database)

# Close the connection
# client.close()
