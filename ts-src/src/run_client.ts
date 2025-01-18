import { AgentClient } from './client/client';
import { OpenAIModelName } from './schema/models';
import { prettyPrint } from './schema/schema';

async function main() {
  // Initialize the client
  console.log('Initializing client...');



  try {
    // Get available agents and models
    //force default agent
    const baseUrl = 'http://my-agent-alb-1226714337.us-east-1.elb.amazonaws.com';
    //const baseUrl = 'http://localhost:8123';
    const client = new AgentClient(baseUrl);
    const info = await client.retrieveInfo();

    const initialState = {
      appUrl: 'https://www.tvfoodmaps.com/',
      competitor_hint: 'Product Hunt',
      max_personas: 2,
    };

    const threadId = "123277233354"

    /*const response = await client.invoke(
      null,
      initialState,
      OpenAIModelName.GPT_4O_MINI,
      threadId
    );*/

    //console.log(response);

    // Stream a response
    
    console.log('\nStreaming response:');
    for await (const message of client.stream(
      null,
      initialState,
      OpenAIModelName.GPT_4O_MINI,
      threadId
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
    

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

void main(); 