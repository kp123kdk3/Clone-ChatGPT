import { cn, formatDate, generateConversationTitle } from '@/lib/utils'

describe('Utility functions', () => {
  describe('cn (className merger)', () => {
    it('should merge class names correctly', () => {
      const result = cn('base-class', 'additional-class')
      expect(result).toBe('base-class additional-class')
    })

    it('should handle conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class')
      expect(result).toBe('base-class conditional-class')
    })

    it('should handle undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'final-class')
      expect(result).toBe('base-class final-class')
    })
  })

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-01-15T14:30:00')
      const formatted = formatDate(date)
      
      expect(formatted).toMatch(/Jan 15.*2:30 PM/)
    })

    it('should handle different dates', () => {
      const date = new Date('2023-12-25T09:15:00')
      const formatted = formatDate(date)
      
      expect(formatted).toMatch(/Dec 25.*9:15 AM/)
    })
  })

  describe('generateConversationTitle', () => {
    it('should return original message if under 50 characters', () => {
      const message = 'Hello, how are you today?'
      const title = generateConversationTitle(message)
      
      expect(title).toBe(message)
    })

    it('should truncate long messages with ellipsis', () => {
      const longMessage = 'This is a very long message that exceeds the fifty character limit and should be truncated'
      const title = generateConversationTitle(longMessage)
      
      expect(title).toHaveLength(53) // 50 chars + '...'
      expect(title).toEndWith('...')
      expect(title).toBe('This is a very long message that exceeds the fifty...')
    })

    it('should handle empty string', () => {
      const title = generateConversationTitle('')
      expect(title).toBe('')
    })

    it('should handle exactly 50 characters', () => {
      const message = '12345678901234567890123456789012345678901234567890' // exactly 50 chars
      const title = generateConversationTitle(message)
      
      expect(title).toBe(message)
      expect(title).not.toEndWith('...')
    })
  })
})