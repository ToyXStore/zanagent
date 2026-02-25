# ZANAGENT

<div align="center">
  <img src="public/logo.png" alt="ZANAGENT Logo" width="200" />
  
  <h3>A Powerful Multimodal AI Agent Platform</h3>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
</div>

---

## 🚀 Features

- **🔐 User Authentication** - Secure registration and login with NextAuth.js
- **🤖 Multi-LLM Support** - Connect to OpenAI, Claude, Gemini, DeepSeek, Groq, Mistral, and more
- **💬 Chat Interface** - Beautiful chat UI with markdown support
- **🤖 Custom Agents** - Create and manage AI agents with custom system prompts
- **🔑 API Key Management** - Securely store and manage your LLM provider API keys
- **📊 Dashboard** - Track your usage and manage your workspace
- **🎨 Modern UI** - Beautiful dark theme with gradient accents
- **📱 Responsive** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (Prisma ORM)
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zanagent.git
   cd zanagent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Initialize the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Adding LLM Providers

1. Go to **Settings > API Keys**
2. Click **Add Key** for your desired provider
3. Enter your API key
4. Start chatting!

### Supported Providers

| Provider | Models | Get API Key |
|----------|--------|-------------|
| OpenAI | GPT-4, GPT-3.5 | [Get Key](https://platform.openai.com/api-keys) |
| Anthropic | Claude 3 Opus, Sonnet, Haiku | [Get Key](https://console.anthropic.com/settings/keys) |
| Google | Gemini Pro, Gemini 1.5 | [Get Key](https://aistudio.google.com/app/apikey) |
| DeepSeek | DeepSeek Chat, Coder | [Get Key](https://deepseek.com/) |
| Groq | Llama 3, Mixtral | [Get Key](https://console.groq.com/keys) |
| Mistral | Mistral Large, Medium | [Get Key](https://console.mistral.ai/api-keys) |
| OpenRouter | 100+ Models | [Get Key](https://openrouter.ai/keys) |

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Environment Variables for Production

```env
DATABASE_URL="file:./prod.db"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
```

## 📁 Project Structure

```
zanagent/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/
│   │   ├── (auth)/        # Authentication pages
│   │   ├── (dashboard)/   # Dashboard pages
│   │   ├── api/           # API routes
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Landing page
│   ├── components/
│   │   └── ui/            # UI components
│   └── lib/
│       ├── prisma.ts      # Database client
│       └── utils.ts       # Utilities
├── public/                # Static assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on top of [Agent TARS](https://github.com/bytedance/UI-TARS-desktop) by ByteDance
- Inspired by [manus.im](https://manus.im)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)

---

<div align="center">
  Made with ❤️ by ZANAGENT Team
</div>
