import { AgentClient } from './client/client';
import { OpenAIModelName } from './schema/models';
import { prettyPrint } from './schema/schema';

async function main() {
  // Initialize the client
  console.log('Initializing client...');

  const client = new AgentClient();

  try {
    // Get available agents and models
    //force default agent
    const info = await client.retrieveInfo();

    const initialState = {
      appUrl: 'https://www.tvfoodmaps.com',
      competitor_hint: 'Flavortown USA',
      max_personas: 2,
    };

    const threadId = "123"

    const response = await client.invoke(
      null,
      initialState,
      OpenAIModelName.GPT_4O_MINI,
      threadId
    );

    console.log(response);

    // Stream a response
    /*
    console.log('\nStreaming response:');
    for await (const message of client.stream(
      null,
      initialState,
      OpenAIModelName.GPT_4O_MINI
    )) {
      if (typeof message === 'string') {
        console.log(message);
      } else if ('content' in message) {
        process.stdout.write(message.content);
      } else {
        console.log(message);
      }
    }
    console.log('\n');
    */

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

void main(); 