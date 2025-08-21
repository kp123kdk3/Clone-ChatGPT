# ChatGPT Clone

A fully functional ChatGPT clone built with Next.js, React, TypeScript, and OpenAI's API. This application replicates the core functionality and interface of ChatGPT with real-time streaming responses, conversation management, and user authentication.

## ✨ Features

### Core Functionality
- 🤖 **AI Chat Interface** - Real-time conversations with AI using OpenAI's GPT models
- 💬 **Message Streaming** - Token-by-token streaming responses for natural conversation flow
- 🔄 **Conversation Management** - Create, save, rename, and delete chat sessions
- ⏸️ **Stop Generation** - Ability to interrupt AI responses mid-generation

### Authentication & User Management
- 🔐 **Secure Authentication** - JWT-based auth with NextAuth.js
- 👤 **User Registration & Login** - Complete user account system
- 🔒 **Session Management** - Persistent user sessions with automatic refresh

### UI/UX Features
- 🎨 **ChatGPT-Identical Interface** - Pixel-perfect recreation of ChatGPT's design
- 🌓 **Dark/Light Theme** - System-aware theme switching
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- ⌨️ **Keyboard Shortcuts** - Enter to send, Shift+Enter for new line
- ✏️ **Auto-resizing Input** - Dynamic textarea that grows with content

### Technical Features
- ⚡ **Real-time Streaming** - Server-Sent Events for live response streaming
- 🗄️ **Database Integration** - PostgreSQL with Prisma ORM
- 🔧 **Type Safety** - Full TypeScript implementation
- 🧪 **Testing Suite** - Comprehensive Jest and React Testing Library tests
- 🛡️ **Security** - Input validation, XSS protection, secure headers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatgpt-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/chatgpt_clone"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # OpenAI API
   OPENAI_API_KEY="your-openai-api-key-here"

   # JWT
   JWT_SECRET="your-jwt-secret-here"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Or run migrations (for production)
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
chatgpt-clone/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── chat/       # Chat streaming endpoint
│   │   │   └── conversations/ # Conversation management
│   │   ├── auth/           # Auth pages (login/register)
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── auth/          # Authentication forms
│   │   ├── chat/          # Chat interface components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   └── types/             # TypeScript type definitions
├── prisma/                # Database schema and migrations
├── __tests__/             # Test files
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🛠️ Available Scripts

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing
- `npm run test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

### Database
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 🏗️ Architecture

### Frontend Architecture
- **Next.js 15** with App Router for modern React patterns
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for utility-first styling
- **React Hooks** for state management
- **Custom hooks** for chat functionality and theme management

### Backend Architecture
- **Next.js API Routes** for serverless backend functions
- **NextAuth.js** for authentication with JWT strategy
- **Prisma ORM** for type-safe database operations
- **PostgreSQL** for robust data storage
- **Server-Sent Events** for real-time streaming

### Security Features
- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt with salt rounds
- **Input Validation** on both client and server
- **CORS Protection** and security headers
- **Environment Variable** protection for sensitive data

## 🧪 Testing

The project includes comprehensive testing with:

- **Unit Tests** for utility functions and components
- **Integration Tests** for API endpoints
- **Component Tests** with React Testing Library
- **Mocking** for external dependencies

Run tests:
```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Set up your production database

3. Configure environment variables

4. Start the production server:
   ```bash
   npm run start
   ```

### Database Setup for Production
1. Set up PostgreSQL instance (Neon, Supabase, etc.)
2. Update `DATABASE_URL` in environment variables
3. Run migrations:
   ```bash
   npm run db:migrate
   ```

## ⚙️ Configuration

### Model Configuration
You can configure the AI model behavior in `src/lib/openai.ts`:

```typescript
const {
  model = 'gpt-3.5-turbo',      // Change model
  temperature = 0.7,            // Creativity (0-1)
  max_tokens = 1000,            // Response length
  top_p = 1                     // Nucleus sampling
} = options || {}
```

### Theme Configuration
Customize the theme in `src/app/globals.css` and `tailwind.config.ts`.

### Authentication Configuration
Modify authentication settings in `src/lib/auth.ts`:

```typescript
session: {
  strategy: 'jwt',
  maxAge: 24 * 60 * 60, // 24 hours
},
```

## 🔧 API Reference

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints

### Chat Endpoints
- `POST /api/chat/stream` - Streaming chat responses

### Conversation Endpoints
- `GET /api/conversations` - List user conversations
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/[id]` - Get conversation details
- `PUT /api/conversations/[id]` - Update conversation
- `DELETE /api/conversations/[id]` - Delete conversation

### Message Endpoints
- `GET /api/conversations/[id]/messages` - Get conversation messages
- `POST /api/conversations/[id]/messages` - Add message to conversation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure responsive design
- Maintain code documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for the GPT API
- [Next.js](https://nextjs.org/) for the incredible framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Prisma](https://prisma.io/) for database management

## 📞 Support

If you have any questions or need help:

1. Check the [documentation](docs/)
2. Search existing [issues](issues)
3. Create a new issue if needed

---

**Built with ❤️ using Next.js, React, and OpenAI**
