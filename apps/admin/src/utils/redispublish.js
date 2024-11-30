'use server';
import redis from '@/lib/redis';
import bcrypt from 'bcryptjs';
async function publishUserData({ firstname, lastname, email, password }) {
  try {
    // Validate input data
    if (!firstname || !lastname || !email || !password) {
      return {
        message: 'All fields are required.',
        success: false,
      };
    }

    const hashpassword = await bcrypt.hash(password, 10);
    // Serialize user data
    const data = JSON.stringify({
      firstname,
      lastname,
      email,
      password: hashpassword,
    });

    // Publish to Redis channel
    subscribersCount = await redis.lpush('userdata', data);

    // Return based on the number of subscribers
    if (subscribersCount > 0) {
      return {
        message: 'Admin needs to accept your registration.',
        success: true,
      };
    } else {
      return {
        message: 'list is empty',
        success: false,
      };
    }
  } catch (error) {
    console.error('Error during data storing in list:', error);
    return {
      message: 'An error occurred while storing data.',
      success: false,
    };
  }
}

export { publishUserData };
