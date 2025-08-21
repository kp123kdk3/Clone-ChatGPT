import { render, screen } from '@testing-library/react'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { Message } from '@/types/chat'

describe('MessageBubble', () => {
  const mockUserMessage: Message = {
    id: '1',
    content: 'Hello, how are you?',
    role: 'USER',
    conversationId: 'conv-1',
    createdAt: new Date('2023-01-01'),
  }

  const mockAssistantMessage: Message = {
    id: '2',
    content: 'I am doing well, thank you!',
    role: 'ASSISTANT',
    conversationId: 'conv-1',
    createdAt: new Date('2023-01-01'),
  }

  it('renders user message correctly', () => {
    render(<MessageBubble message={mockUserMessage} />)
    
    expect(screen.getByText('Hello, how are you?')).toBeInTheDocument()
  })

  it('renders assistant message correctly', () => {
    render(<MessageBubble message={mockAssistantMessage} />)
    
    expect(screen.getByText('I am doing well, thank you!')).toBeInTheDocument()
  })

  it('applies correct styling for user messages', () => {
    const { container } = render(<MessageBubble message={mockUserMessage} />)
    
    const messageContainer = container.firstChild
    expect(messageContainer).toHaveClass('bg-gray-50')
  })

  it('applies correct styling for assistant messages', () => {
    const { container } = render(<MessageBubble message={mockAssistantMessage} />)
    
    const messageContainer = container.firstChild
    expect(messageContainer).toHaveClass('bg-white')
  })
})