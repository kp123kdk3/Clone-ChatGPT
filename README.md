# 🤖 ChatGPT Clone

A full-stack ChatGPT clone built with Next.js 14, featuring real-time chat, authentication, and AI-powered conversations.

## ✨ Features

- **Real-time Chat Interface** - Smooth, responsive chat experience
- **User Authentication** - Secure login/register with NextAuth.js
- **AI Integration** - Powered by OpenAI's GPT models
- **Conversation Management** - Save and organize chat history
- **Modern UI/UX** - Beautiful interface with Tailwind CSS
- **Dark/Light Theme** - Toggle between themes
- **Responsive Design** - Works on all devices
- **TypeScript** - Full type safety
- **Testing** - Comprehensive test coverage with Jest
- **Database** - PostgreSQL with Prisma ORM

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kp123kdk3/Clone-ChatGPT.git
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
   
   Add your configuration:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/database"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   OPENAI_API_KEY="sk-your-openai-api-key"
   JWT_SECRET="your-jwt-secret"
   ```

4. **Set up database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
chatgpt-clone/
├── src/
│   ├── app/                 # Next.js 14 app router
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── chat/          # Chat interface components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   └── types/             # TypeScript type definitions
├── prisma/                # Database schema and migrations
├── __tests__/             # Test files
└── public/                # Static assets
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🚀 Deployment

This project includes automatic deployment via GitHub Actions. Every push to the main branch triggers a deployment to Vercel.

### Manual Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Your application URL | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `OPENAI_API_KEY` | OpenAI API key | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |

### Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- **User** - User accounts and authentication
- **Conversation** - Chat conversations
- **Message** - Individual chat messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [OpenAI](https://openai.com/) - AI API
- [Prisma](https://prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication

## 📞 Support

If you encounter any issues or have questions:

1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for troubleshooting
2. Search existing [issues](https://github.com/kp123kdk3/Clone-ChatGPT/issues)
3. Create a new issue with detailed information

---

**Star this repository if you find it helpful! ⭐**
