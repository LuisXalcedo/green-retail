from motor.motor_asyncio import AsyncIOMotorClient

from database import connection_string


async def ping_server():
    # Create a new client and connect to the server
    client = AsyncIOMotorClient(connection_string)

    # Send a ping to confirm a successful connection
    try:
        await client.admin.command("ping")
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

    # Close the connection
    # client.close()
