import pkg from '@slack/bolt';
const { App } = pkg;
import dotenv from 'dotenv';
import { generateOracleCard } from './utils/oracle.js';

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.event('app_home_opened', async ({ event, client, logger }) => {
  console.log('📱 app_home_opened event received for user:', event.user);
  
  try {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: 'home',
        blocks: [
          {
            type: 'header',
            text: { type: 'plain_text', text: "Ginny Clarke's Oracle Cards" },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Draw a daily oracle card for insight or reflection.',
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: { type: 'plain_text', text: 'Draw Oracle Card' },
                style: 'primary',
                action_id: 'draw_card',
              },
            ],
          },
        ],
      },
    });
    console.log('✅ Home tab published successfully for user:', event.user);
  } catch (error) {
    console.error('❌ Error publishing home tab:', error);
  }
});

app.action('draw_card', async ({ ack, body, client, logger }) => {
  console.log('🎴 draw_card action triggered by user:', body.user.id);
  
  // Acknowledge immediately and update Home tab to show loading state
  await ack();
  console.log('✅ Button acknowledged');
  
  // Update Home tab to show loading/disabled state
  try {
    await client.views.publish({
      user_id: body.user.id,
      view: {
        type: 'home',
        blocks: [
          {
            type: 'header',
            text: { type: 'plain_text', text: "Ginny Clarke's Oracle Cards" },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Draw a daily oracle card for insight or reflection.',
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '_Generating your oracle card..._',
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error('❌ Error updating Home tab to loading state:', error);
  }
  
  // Generate and send oracle card asynchronously (non-blocking)
  (async () => {
    try {
      console.log('🔄 Starting oracle card generation...');
      const oracle = await generateOracleCard();
      console.log('🔮 Oracle message generated:', oracle.substring(0, 50) + '...');

      console.log('📤 Sending message to user:', body.user.id);
      await client.chat.postMessage({
        channel: body.user.id,
        text: `*Your Oracle Card*\n${oracle}`,
      });
      console.log('✅ Oracle card sent to user:', body.user.id);
      
      // Restore the original Home tab with button enabled
      await client.views.publish({
        user_id: body.user.id,
        view: {
          type: 'home',
          blocks: [
            {
              type: 'header',
              text: { type: 'plain_text', text: "Ginny Clarke's Oracle Cards" },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: 'Draw a daily oracle card for insight or reflection.',
              },
            },
            {
              type: 'divider',
            },
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: 'Draw Oracle Card' },
                  style: 'primary',
                  action_id: 'draw_card',
                },
              ],
            },
          ],
        },
      });
    } catch (error) {
      console.error('❌ Error generating or sending oracle card:', error);
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
      
      // Restore Home tab even on error
      try {
        await client.views.publish({
          user_id: body.user.id,
          view: {
            type: 'home',
            blocks: [
              {
                type: 'header',
                text: { type: 'plain_text', text: "Ginny Clarke's Oracle Cards" },
              },
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: 'Draw a daily oracle card for insight or reflection.',
                },
              },
              {
                type: 'divider',
              },
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: '_Something went wrong. Please try again._',
                },
              },
              {
                type: 'actions',
                elements: [
                  {
                    type: 'button',
                    text: { type: 'plain_text', text: 'Draw Oracle Card' },
                    style: 'primary',
                    action_id: 'draw_card',
                  },
                ],
              },
            ],
          },
        });
      } catch (restoreError) {
        console.error('❌ Error restoring Home tab:', restoreError);
      }
    }
  })();
});

(async () => {
  await app.start();
  console.log('⚡ Oracle App running with Socket Mode');
})();

