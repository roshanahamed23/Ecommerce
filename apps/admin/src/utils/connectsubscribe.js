let eventSource;

/**
 * Establishes a connection to the SSE endpoint and listens for messages.
 * @returns {Promise<void>} Resolves when the connection is successfully established.
 */
function connectSubscribe() {
  return new Promise((resolve, reject) => {
    try {
      eventSource = new EventSource('/api/subscribe');

      eventSource.onopen = () => {
        console.log('Connected to SSE.');
        resolve(); // Resolve when the connection is successfully established
      };
    } catch (error) {
      console.error('Error initializing SSE connection:', error);
      reject(error); // Reject if any error occurs during initialization
    }
  });
}

/**
 * Closes the SSE connection.
 */
function closeSubscribe() {
  if (eventSource) {
    eventSource.close();
    console.log('SSE connection closed.');
  } else {
    console.warn('No active SSE connection to close.');
  }
}

/**
 * Waits for the subscription to complete or times out.
 * @param {number} [timeout=10000] Timeout in milliseconds before resolving.
 * @returns {Promise<void>} Resolves after the timeout.
 */
function waitForSubscriptionToComplete(timeout = 10000) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, timeout);
  });
}

export {
  connectSubscribe,
  closeSubscribe,
  waitForSubscriptionToComplete,
  eventSource,
};
