// Claim errors
export class InvalidClaimProof extends Error {
  name = 'InvalidClaimProof';
  shortMessage = 'An invalid proof was provided';
}

export class MissingClaimProof extends Error {
  name = 'MissingClaimProof';
  shortMessage = 'A proof is required';
}

export class InvalidClaimAmount extends Error {
  name = 'InvalidClaimAmount';
  shortMessage = 'An invalid amount was provided';
}

export class UnknownClaimError extends Error {
  name = 'UnknownClaimError';
  shortMessage = 'An unknown error occurred while claiming';
}

export class UnknownPreflightError extends Error {
  name = 'UnknownPreflightError';
  shortMessage = 'An unknown error occurred during preflight check';
}

export class ClaimContractError extends Error {
  name = 'ClaimContractError';
  shortMessage = 'An error occurred while checking the claim contract';
}
