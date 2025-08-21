import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InputBox } from '@/components/chat/InputBox'

describe('InputBox', () => {
  const mockOnSendMessage = jest.fn()
  const mockOnStopGeneration = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders input field and send button', () => {
    render(<InputBox onSendMessage={mockOnSendMessage} />)
    
    expect(screen.getByPlaceholderText('Send a message...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onSendMessage when form is submitted with text', async () => {
    const user = userEvent.setup()
    render(<InputBox onSendMessage={mockOnSendMessage} />)
    
    const input = screen.getByPlaceholderText('Send a message...')
    const sendButton = screen.getByRole('button')
    
    await user.type(input, 'Hello world')
    await user.click(sendButton)
    
    expect(mockOnSendMessage).toHaveBeenCalledWith('Hello world')
  })

  it('calls onSendMessage when Enter is pressed', async () => {
    const user = userEvent.setup()
    render(<InputBox onSendMessage={mockOnSendMessage} />)
    
    const input = screen.getByPlaceholderText('Send a message...')
    
    await user.type(input, 'Hello world')
    await user.keyboard('{Enter}')
    
    expect(mockOnSendMessage).toHaveBeenCalledWith('Hello world')
  })

  it('does not call onSendMessage when Shift+Enter is pressed', async () => {
    const user = userEvent.setup()
    render(<InputBox onSendMessage={mockOnSendMessage} />)
    
    const input = screen.getByPlaceholderText('Send a message...')
    
    await user.type(input, 'Hello world')
    await user.keyboard('{Shift>}{Enter}{/Shift}')
    
    expect(mockOnSendMessage).not.toHaveBeenCalled()
  })

  it('shows stop button when loading', () => {
    render(
      <InputBox 
        onSendMessage={mockOnSendMessage} 
        isLoading={true}
        onStopGeneration={mockOnStopGeneration}
      />
    )
    
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onStopGeneration when stop button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <InputBox 
        onSendMessage={mockOnSendMessage} 
        isLoading={true}
        onStopGeneration={mockOnStopGeneration}
      />
    )
    
    const stopButton = screen.getByRole('button')
    await user.click(stopButton)
    
    expect(mockOnStopGeneration).toHaveBeenCalled()
  })

  it('disables input when disabled prop is true', () => {
    render(<InputBox onSendMessage={mockOnSendMessage} disabled={true} />)
    
    const input = screen.getByPlaceholderText('Send a message...')
    expect(input).toBeDisabled()
  })

  it('clears input after sending message', async () => {
    const user = userEvent.setup()
    render(<InputBox onSendMessage={mockOnSendMessage} />)
    
    const input = screen.getByPlaceholderText('Send a message...') as HTMLTextAreaElement
    const sendButton = screen.getByRole('button')
    
    await user.type(input, 'Hello world')
    await user.click(sendButton)
    
    expect(input.value).toBe('')
  })
})