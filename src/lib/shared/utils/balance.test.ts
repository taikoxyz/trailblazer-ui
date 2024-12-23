import { renderBalance, renderEthBalance } from './balance';

vi.mock('@wagmi/core', () => ({
  createStorage: vi.fn(),
  cookieStorage: vi.fn(),
  reconnect: vi.fn(),
}));

describe('renderBalance', () => {
  it('should return "0.00" when balance is null', () => {
    expect(renderBalance(null)).toBe('0.00');
  });

  it('should return "0 ETH" for zero balance', () => {
    expect(
      renderBalance({
        decimals: 18,
        formatted: '0',
        symbol: 'ETH',
        value: BigInt(0),
      }),
    ).toBe('0 ETH');
  });

  it('should handle small balances with maximum decimals', () => {
    expect(
      renderBalance({
        decimals: 18,
        formatted: '0.0000001234567',
        symbol: 'ETH',
        value: BigInt('123456700000'),
      }),
    ).toBe('0.0000001234567 ETH');
  });

  it('should handle whole number balances', () => {
    expect(
      renderBalance({
        decimals: 18,
        formatted: '1',
        symbol: 'ETH',
        value: BigInt(1e18),
      }),
    ).toBe('1 ETH');
  });

  it('should handle balances with decimals', () => {
    expect(
      renderBalance({
        decimals: 18,
        formatted: '1.23',
        symbol: 'ETH',
        value: BigInt('1230000000000000000'),
      }),
    ).toBe('1.23 ETH');
  });

  it('should truncate symbol if it exceeds 7 characters', () => {
    expect(
      renderBalance({
        decimals: 18,
        formatted: '10.123456',
        symbol: 'ETH',
        value: BigInt('10123456000000000000'),
      }),
    ).toBe('10.123456 ETH');
  });

  it('should handle balances less than 0.000001 with maximum decimals', () => {
    expect(
      renderBalance({
        decimals: 18,
        formatted: '0.0000005',
        symbol: 'ETH',
        value: BigInt('500000000000'),
      }),
    ).toBe('0.0000005 ETH');
  });

  it('should handle balances exactly at the threshold', () => {
    expect(
      renderBalance({
        decimals: 18,
        formatted: '0.000001',
        symbol: 'ETH',
        value: BigInt('1000000000'),
      }),
    ).toBe('0.000001 ETH');
  });
});

describe('renderEthBalance', () => {
  it('should return "0.000000 ETH" for zero wei with default maxDecimals', () => {
    expect(renderEthBalance(BigInt(0))).toBe('0 ETH');
  });

  it('should handle small wei values with default rounding', () => {
    expect(renderEthBalance(BigInt(1))).toBe('0.000000000000000001 ETH');
    expect(renderEthBalance(BigInt(123456789000))).toBe('0.000000123456789 ETH');
  });

  it('should correctly round up when rounding mode is "ceil"', () => {
    expect(renderEthBalance(BigInt(1234567890000), 6, 'ceil')).toBe('0.000002 ETH');
  });

  it('should correctly round down when rounding mode is "floor"', () => {
    expect(renderEthBalance(BigInt(1234567890000), 6, 'floor')).toBe('0.000001 ETH');
  });

  it('should correctly round based on the "round" mode', () => {
    expect(renderEthBalance(BigInt('1500000000000000000'), 6, 'round')).toBe('1.5 ETH');

    expect(renderEthBalance(BigInt('1499999999999999000'), 6, 'round')).toBe('1.5 ETH');
  });

  it('should abbreviate large balances', () => {
    // Simulate a large integer part
    const largeWei = BigInt('1234567890123456789012345'); // 1234567890.123456789012345678 ETH
    expect(renderEthBalance(largeWei)).toBe('1234567... ETH');
  });

  it('should handle maximum decimals correctly', () => {
    expect(renderEthBalance(BigInt('1234567890000000000'), 18)).toBe('1.23456789 ETH');
  });

  it('should handle different maxDecimals values', () => {
    expect(renderEthBalance(BigInt('1234567890000000000'), 2)).toBe('1.23 ETH');
    expect(renderEthBalance(BigInt('1234567890000000000'), 4)).toBe('1.2346 ETH');
  });

  // Additional Tests for Validation
  it('should throw an error for maxDecimals greater than 18', () => {
    expect(() => renderEthBalance(BigInt(1), 19)).toThrow('maxDecimals must be between 0 and 18');
  });

  it('should throw an error for negative maxDecimals', () => {
    expect(() => renderEthBalance(BigInt(1), -1)).toThrow('maxDecimals must be between 0 and 18');
  });
});
