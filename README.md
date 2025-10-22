# ✨ Oracle Card Slack App

A Slack app that generates mystical oracle card messages using OpenAI. Users can click a "Draw Oracle Card" button in the app's Home tab to receive AI-generated wisdom and inspiration.

## Features

- **Home Tab Interface**: Beautiful, simple UI with a single button to draw oracle cards
- **AI-Powered Messages**: Uses OpenAI's GPT-4o-mini to generate unique, mystical oracle messages
- **Socket Mode**: No need for a public URL - uses Slack's Socket Mode for secure communication
- **Instant DMs**: Oracle messages are sent directly to users as private messages

## Tech Stack

- **Node.js** v18+
- **@slack/bolt** - Official Slack SDK for JavaScript
- **OpenAI API** - For generating oracle card messages
- **Socket Mode** - Secure WebSocket connection (no public URL needed)
- **Railway** - Recommended deployment platform

## Prerequisites

1. A Slack workspace where you have permissions to install apps
2. OpenAI API account with an API key
3. Node.js v18 or higher installed

## Slack App Setup

### 1. Create Your Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and click **Create New App**
2. Choose **From an app manifest**
3. Select your workspace
4. Copy the contents of [manifest.json](./manifest.json) into the JSON tab
5. Click **Create**
6. Review permissions and click **Install to Workspace**

### 2. Required Scopes

Your app needs these OAuth scopes (already in manifest.json):
- `chat:write` - Send messages as the bot
- `im:write` - Send direct messages to users
- `users:read` - Read user information
- `channels:read` - Read channel information

### 3. Enable Socket Mode

1. Go to **Socket Mode** in your app settings
2. Enable Socket Mode
3. Under **Event Subscriptions**, enable events and subscribe to:
   - `app_home_opened` - Triggered when users open the app's Home tab

### 4. Get Your Tokens

**Bot Token:**
1. Go to **OAuth & Permissions**
2. Copy the **Bot User OAuth Token** (starts with `xoxb-`)

**App Token:**
1. Go to **Basic Information**
2. Scroll to **App-Level Tokens**
3. Click **Generate Token and Scopes**
4. Name it "socket-token" and add the `connections:write` scope
5. Copy the token (starts with `xapp-`)

## Local Development Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-username/oracle-card-slack-app.git
cd oracle-card-slack-app

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Slack Bot Token (from OAuth & Permissions)
SLACK_BOT_TOKEN=xoxb-your-bot-token-here

# Slack App Token (from Basic Information > App-Level Tokens)
SLACK_APP_TOKEN=xapp-your-app-token-here

# OpenAI API Key (from platform.openai.com)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Environment
NODE_ENV=development
```

### 3. Start the App

```bash
# Start the app
npm start

# Or use development mode with auto-restart
npm run dev
```

You should see:
```
⚡ Oracle App running with Socket Mode
```

## Usage

1. **Open the App**: In Slack, go to the Apps section in your sidebar and click on "Oracle Cards"
2. **View Home Tab**: You'll see a beautiful interface with a "Draw Oracle Card" button
3. **Draw a Card**: Click the button to receive your mystical oracle message
4. **Receive Wisdom**: The oracle message will be sent to you as a direct message

## Project Structure

```
oracle-card-slack-app/
├── index.js              # Main application entry point
├── utils/
│   └── oracle.js         # OpenAI integration for generating oracle messages
├── package.json          # Dependencies and scripts
├── manifest.json         # Slack app configuration
├── .env                  # Environment variables (create this)
└── README.md            # This file
```

### `index.js`

The main application file that:
- Initializes the Bolt app with Socket Mode
- Handles the `app_home_opened` event to display the Home tab
- Handles the `draw_card` action when users click the button
- Sends oracle messages to users

### `utils/oracle.js`

Contains the OpenAI integration:
- Connects to OpenAI API
- Generates mystical oracle card messages
- Returns formatted text for display in Slack

## Deployment to Railway

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Oracle Card Slack App"
git remote add origin https://github.com/your-username/oracle-card-slack-app.git
git push -u origin main
```

### 2. Deploy to Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Add environment variables in Railway dashboard:
   ```
   SLACK_BOT_TOKEN=xoxb-...
   SLACK_APP_TOKEN=xapp-...
   OPENAI_API_KEY=sk-...
   NODE_ENV=production
   ```
5. Railway will automatically detect Node.js and run `npm start`
6. Your app will deploy and maintain the Socket Mode connection automatically

### Railway Benefits

- ✅ Always-on connection (required for Socket Mode)
- ✅ Automatic restarts on crashes
- ✅ Easy environment variable management
- ✅ Free tier available
- ✅ No need for a public URL

## Customization

### Modify Oracle Prompts

Edit the prompt in `utils/oracle.js`:

```javascript
const prompt = 'Generate a mystical oracle card message in one or two sentences. It should sound wise, poetic, and reflective.';
```

Try different prompts like:
- "Generate a tarot-style reading with deep spiritual insight"
- "Create an encouraging affirmation with mystical wisdom"
- "Give a zen-like philosophical message for daily reflection"

### Change the AI Model

In `utils/oracle.js`, you can change the model:

```javascript
model: 'gpt-4o-mini',  // Fast and cost-effective
// or
model: 'gpt-4o',       // More sophisticated responses
```

### Customize the Home Tab

In `index.js`, modify the `blocks` array in the `app_home_opened` handler to change:
- Header text and emojis
- Description text
- Button text and style
- Add more UI elements

## Troubleshooting

### App Not Responding

1. Check that Socket Mode is enabled in Slack app settings
2. Verify your tokens are correct in `.env`
3. Ensure the app is running (`npm start`)
4. Check console for error messages

### OpenAI Errors

1. Verify your OpenAI API key is valid
2. Check you have credits in your OpenAI account
3. Ensure you have access to the `gpt-4o-mini` model

### Permission Errors

1. Reinstall the app to your workspace
2. Verify all required scopes are added
3. Check the app is subscribed to `app_home_opened` event

## Development Commands

```bash
# Start the app
npm start

# Development mode with auto-restart
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test
```

## API Costs

- **Slack API**: Free
- **OpenAI API**: 
  - `gpt-4o-mini`: ~$0.00015 per oracle card message
  - Very cost-effective for typical usage

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - See [LICENSE](./LICENSE) file for details

## Support

- [Slack API Documentation](https://api.slack.com/)
- [Bolt for JavaScript](https://slack.dev/bolt-js/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Railway Documentation](https://docs.railway.app/)

---

Built with ✨ using Slack Bolt for JavaScript and OpenAI
