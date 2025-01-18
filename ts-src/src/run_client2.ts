import { AgentClient } from './client/client';

async function main() {
    // Initialize the client
    //const baseUrl = 'http://my-agent-alb-1226714337.us-east-1.elb.amazonaws.com';
    const baseUrl = 'http://localhost:8123';
    const client = new AgentClient(baseUrl);
    
    try {
        // Ensure we have agent info
        await client.retrieveInfo();

        const initialState = {
            appUrl: 'https://www.tvfoodmaps.com/',
            competitor_hint: 'Product Hunt',
            max_personas: 2,
          };

        // Start an agent run with a simple message
        console.log('Starting agent run...');
        const startResponse = await client.startAgentRun(
            null,
            initialState, // no initial state
            null, // use default model
            null  // no thread ID
        );
        
        console.log('Run started with ID:', startResponse.run_id);
        
        // Poll for status every 2 seconds until complete
        let isComplete = false;
        while (!isComplete) {
            const status = await client.getRunStatus(startResponse.run_id);
            console.log('Current status:', status.status);
            console.log('Current status:', status);
            
            if (status.status === 'completed' || status.status === 'failed') {
                isComplete = true;
                console.log('Final status:', status);
                if (status.status === 'completed' && status.response) {
                    console.log('Agent response:', status.response);
                }
            } else {
                // Wait 2 seconds before checking again
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the demonstration
main().catch(console.error); 