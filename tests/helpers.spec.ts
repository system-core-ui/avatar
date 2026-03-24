import { describe, it, expect } from 'vitest';
import { getInitials, getContrastText } from '../src/lib/helpers';

describe('getInitials()', () => {
  it('returns two initials from full name', () => {
    expect(getInitials('Quốc Thanh')).toBe('QT');
  });

  it('returns one initial from single name', () => {
    expect(getInitials('Alice')).toBe('A');
  });

  it('returns empty string for empty input', () => {
    expect(getInitials('')).toBe('');
  });

  it('handles extra whitespace', () => {
    expect(getInitials('  Alice   Smith  ')).toBe('AS');
  });

  it('uses first and last word for 3+ word names', () => {
    expect(getInitials('John Michael Doe')).toBe('JD');
  });

  it('uppercases initials', () => {
    expect(getInitials('alice smith')).toBe('AS');
  });
});

describe('getContrastText()', () => {
  it('returns white for dark hex colors', () => {
    expect(getContrastText('#000000')).toBe('#fff');
    expect(getContrastText('#1a1a1a')).toBe('#fff');
  });

  it('returns dark for light hex colors', () => {
    expect(getContrastText('#ffffff')).toBe('#212121');
    expect(getContrastText('#f0f0f0')).toBe('#212121');
  });

  it('returns white for dark HSL colors', () => {
    expect(getContrastText('hsl(210, 65%, 30%)')).toBe('#fff');
    expect(getContrastText('hsl(0, 65%, 45%)')).toBe('#fff');
  });

  it('returns dark for light HSL colors', () => {
    expect(getContrastText('hsl(0, 0%, 90%)')).toBe('#212121');
    expect(getContrastText('hsl(120, 50%, 80%)')).toBe('#212121');
  });

  it('falls back to dark for invalid input', () => {
    expect(getContrastText('not-a-color')).toBe('#212121');
  });
});
