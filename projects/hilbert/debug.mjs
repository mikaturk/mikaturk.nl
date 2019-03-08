const ENABLE_DEBUG = true;

export function logCall(name, milliseconds) {
  debug(`Call to ${name} took ${milliseconds} milliseconds.`);
}

export function debug(...args) {
  if (!ENABLE_DEBUG) return;
  console.log('[DEBUG]', ...args)
}
