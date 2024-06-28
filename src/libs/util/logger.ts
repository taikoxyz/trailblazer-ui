import debug from 'debug';

export function getLogger(namespace: string) {
  return debug(`trailblazer:${namespace}`);
}
