'use server';
import {redis} from '@/lib/redis';

export async function subscribe() {
  return new Promise((resolve, reject) => {
    try {
      // Subscribe to the 'userdata' channel
      redis.subscribe('userdata', (err, count) => {
        if (err) {
          console.error('Subscription failed:', err);
          return reject(err);
        }
        console.log(`Subscribed to ${count} channel(s).`);
      });

      // Listen for messages
      redis.on('message', (channel, message) => {
        try {
          if (channel === 'userdata') {
            const data = JSON.parse(message);
            console.log('New login - pending for acceptance:', data);
            resolve(data); // Resolve on the first matching message
          }
        } catch (parseError) {
          console.error('Failed to parse message:', message, parseError);
          reject('Message parsing failed.');
        }
      });
    } catch (error) {
      reject('Error in subscription:', error);
    }
  });
}
