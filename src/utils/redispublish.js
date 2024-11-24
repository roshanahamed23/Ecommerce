'use server';

import redis from '@/lib/redis'; // Adjust this to your actual Redis client configuration

export async function publishUserData({ firstname, lastname, email, password }) {
  try {
    // Validate input data
    if (!firstname || !lastname || !email || !password) {
      return {
        message: 'All fields are required.',
        success: false,
      };
    }

    // Serialize user data
    const data = JSON.stringify({ firstname, lastname, email, password });

    // Publish to Redis channel
    const subscribersCount = await redis.publish('userdata', data);

    // Return based on the number of subscribers
    if (subscribersCount > 0) {
      return {
        message: 'Admin needs to accept your registration.',
        success: true,
      };
    } else {
      return {
        message: 'No admin is currently listening.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Error during publishing:', error);
    return {
      message: 'An error occurred while publishing data.',
      success: false,
    };
  }
}
