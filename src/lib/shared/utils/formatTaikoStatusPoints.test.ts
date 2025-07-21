import formatTaikoStatusPoints from './formatTaikoStatusPoints';

describe('formatTaikoStatusPoints', () => {
  it('should format small numbers without commas', () => {
    expect(formatTaikoStatusPoints(0)).toBe('0');
    expect(formatTaikoStatusPoints(1)).toBe('1');
    expect(formatTaikoStatusPoints(42)).toBe('42');
    expect(formatTaikoStatusPoints(100)).toBe('100');
    expect(formatTaikoStatusPoints(999)).toBe('999');
  });

  it('should format thousands with commas', () => {
    expect(formatTaikoStatusPoints(1000)).toBe('1,000');
    expect(formatTaikoStatusPoints(1234)).toBe('1,234');
    expect(formatTaikoStatusPoints(9999)).toBe('9,999');
    expect(formatTaikoStatusPoints(12345)).toBe('12,345');
    expect(formatTaikoStatusPoints(99999)).toBe('99,999');
  });

  it('should format millions with commas', () => {
    expect(formatTaikoStatusPoints(1000000)).toBe('1,000,000');
    expect(formatTaikoStatusPoints(1234567)).toBe('1,234,567');
    expect(formatTaikoStatusPoints(9876543)).toBe('9,876,543');
    expect(formatTaikoStatusPoints(12345678)).toBe('12,345,678');
    expect(formatTaikoStatusPoints(999999999)).toBe('999,999,999');
  });

  it('should format billions and larger numbers with commas', () => {
    expect(formatTaikoStatusPoints(1000000000)).toBe('1,000,000,000');
    expect(formatTaikoStatusPoints(1234567890)).toBe('1,234,567,890');
    expect(formatTaikoStatusPoints(9876543210123)).toBe('9,876,543,210,123');
    expect(formatTaikoStatusPoints(123456789012345)).toBe('123,456,789,012,345');
  });

  it('should handle very large numbers (JavaScript safe integers)', () => {
    expect(formatTaikoStatusPoints(Number.MAX_SAFE_INTEGER)).toBe('9,007,199,254,740,991');
    expect(formatTaikoStatusPoints(9007199254740991)).toBe('9,007,199,254,740,991');
  });

  it('should handle decimal numbers with proper formatting', () => {
    expect(formatTaikoStatusPoints(1234.56)).toBe('1,234.56');
    expect(formatTaikoStatusPoints(1000000.78)).toBe('1,000,000.78');
    expect(formatTaikoStatusPoints(123456.12)).toBe('123,456.12');
  });

  it('should round to maximum 2 decimal places', () => {
    expect(formatTaikoStatusPoints(1234567.123)).toBe('1,234,567.12');
    expect(formatTaikoStatusPoints(999999.999)).toBe('1,000,000');
    expect(formatTaikoStatusPoints(1000000.126)).toBe('1,000,000.13');
    expect(formatTaikoStatusPoints(123.456789)).toBe('123.46');
  });

  it('should handle long decimal numbers by rounding to 2 places', () => {
    expect(formatTaikoStatusPoints(1234567.123456789)).toBe('1,234,567.12');
    expect(formatTaikoStatusPoints(999999.999999999)).toBe('1,000,000');
    expect(formatTaikoStatusPoints(1000000.123456789)).toBe('1,000,000.12');
  });

  it('should handle negative numbers', () => {
    expect(formatTaikoStatusPoints(-1000)).toBe('-1,000');
    expect(formatTaikoStatusPoints(-1234567)).toBe('-1,234,567');
    expect(formatTaikoStatusPoints(-999999999)).toBe('-999,999,999');
    expect(formatTaikoStatusPoints(-1234.567)).toBe('-1,234.57');
  });

  it('should handle edge cases', () => {
    expect(formatTaikoStatusPoints(1001)).toBe('1,001');
    expect(formatTaikoStatusPoints(10001)).toBe('10,001');
    expect(formatTaikoStatusPoints(100001)).toBe('100,001');
    expect(formatTaikoStatusPoints(1000001)).toBe('1,000,001');
  });

  it('should handle scientific notation inputs', () => {
    expect(formatTaikoStatusPoints(1e6)).toBe('1,000,000');
    expect(formatTaikoStatusPoints(1.5e6)).toBe('1,500,000');
    expect(formatTaikoStatusPoints(2.5e9)).toBe('2,500,000,000');
  });

  it('should handle decimal edge cases', () => {
    expect(formatTaikoStatusPoints(0.1)).toBe('0.1');
    expect(formatTaikoStatusPoints(0.12)).toBe('0.12');
    expect(formatTaikoStatusPoints(0.123)).toBe('0.12');
    expect(formatTaikoStatusPoints(0.126)).toBe('0.13');
    expect(formatTaikoStatusPoints(0.999)).toBe('1');
  });

  it('should handle rounding edge cases', () => {
    expect(formatTaikoStatusPoints(999.995)).toBe('1,000');
    expect(formatTaikoStatusPoints(1234.005)).toBe('1,234.01');
    expect(formatTaikoStatusPoints(5678.994)).toBe('5,678.99');
    expect(formatTaikoStatusPoints(9999.996)).toBe('10,000');
  });
});
