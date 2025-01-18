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

    initial_state = {
        "appUrl": "https://www.tvfoodmaps.com",
        "competitor_hint": "Flavortown USA",
        "max_personas": 2,
    }

    print("\nStream example:")
    async for message in client.astream(state=initial_state):
        if isinstance(message, str):
            print(message, flush=True, end="")
        elif isinstance(message, ChatMessage):
            print("\n", flush=True)
            message.pretty_print()
        elif isinstance(message, dict):
            print(f"State update: {message}")
        else:
            print(f"ERROR: Unknown type - {type(message)}")



def start_run() -> None:
    client = AgentClient(settings.BASE_URL)
    initial_state = {
        "appUrl": "https://www.tvfoodmaps.com",
        "competitor_hint": "Flavortown USA",
        "max_personas": 2,
    }
    result = client.startAgentRun(state=initial_state)
    run_id = result["run_id"]  # exact key may vary based on server implementation
    print("Run ID: ", run_id)

    # Wait for 1 minute
    import time
    time.sleep(30)

    # Check status
    status = client.getRunStatus(run_id)
    print("Status: ", status)
   
    time.sleep(30)

    # Check status
    status = client.getRunStatus(run_id)
    print("Status2: ", status)

    time.sleep(30)

    # Check status
    status = client.getRunStatus(run_id)
    print("Status3: ", status)



if __name__ == "__main__":
    #print("Running in sync mode")
    #main()
    #print("\n\n\n\n\n")
    #print("Running in async mode")
    #asyncio.run(amain())
    start_run()
