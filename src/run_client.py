import asyncio

from client import AgentClient
from core import settings
from schema import ChatMessage


async def amain() -> None:
    #### ASYNC ####
    client = AgentClient(settings.BASE_URL)

    print("Agent info:")
    print(client.info)

    print("Chat example:")
    #response = await client.ainvoke("Twitter engagement planner")
    #response.pretty_print()

    print("\nStream example:")
    async for message in client.astream(state={"appName": "social network for developer", "max_personas": 2}):
        if isinstance(message, str):
            print(message, flush=True, end="")
        elif isinstance(message, ChatMessage):
            print("\n", flush=True)
            message.pretty_print()
        elif isinstance(message, dict):
            print(f"State update: {message}")
        else:
            print(f"ERROR: Unknown type - {type(message)}")


def main() -> None:
    #### SYNC ####
    client = AgentClient(settings.BASE_URL)

    print("Agent info:")
    print(client.info)

    #print("Agent Response:")
    #response = client.invoke(state={"appName": "social network for developer", "max_personas": 2})
    #print(response)

    print("\nStream example:")
    for message in client.stream(state={"appName": "social network for developer", "max_personas": 2}):
        print(message)
        if isinstance(message, str):
            print(message, flush=True, end="")
        elif isinstance(message, ChatMessage):
            print("\n", flush=True)
            message.pretty_print()
        elif isinstance(message, dict):
            print(f"State update: {message}")
        else:
            print(f"ERROR: Unknown type - {type(message)}")


if __name__ == "__main__":
    #print("Running in sync mode")
    #main()
    print("\n\n\n\n\n")
    print("Running in async mode")
    asyncio.run(amain())
