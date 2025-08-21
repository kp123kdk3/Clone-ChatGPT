# ChatGPT Clone - Project Structure

```
chatgpt-clone/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── register/route.ts
│   │   │   │   └── [...nextauth]/route.ts
│   │   │   ├── conversations/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts
│   │   │   │       └── messages/route.ts
│   │   │   ├── chat/
│   │   │   │   └── stream/route.ts
│   │   │   └── user/
│   │   │       └── profile/route.ts
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── chat/
│   │   │   └── [id]/page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ThemeProvider.tsx
│   │   ├── chat/
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── InputBox.tsx
│   │   │   └── ConversationList.tsx
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   └── auth/
│   │       ├── LoginForm.tsx
│   │       └── RegisterForm.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── openai.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useChat.ts
│   │   └── useTheme.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── chat.ts
│   │   └── user.ts
│   └── styles/
│       └── globals.css
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── __tests__/
│   ├── components/
│   ├── api/
│   └── utils/
├── public/
│   └── favicon.ico
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.js
├── jest.config.js
├── package.json
└── README.md
```

## Key Architecture Decisions

1. **Next.js App Router**: Using the latest App Router for better performance and developer experience
2. **Prisma ORM**: For type-safe database operations with PostgreSQL
3. **NextAuth**: For secure authentication with JWT tokens
4. **TailwindCSS**: For ChatGPT-identical styling
5. **Server-Sent Events**: For real-time streaming responses
6. **Lucide React**: For consistent icon system

## Database Schema

- **User**: Authentication and profile information
- **Conversation**: Chat sessions with titles and metadata
- **Message**: Individual messages with role (user/assistant) and content