'use server';

import redis from '@/lib/redis';
export async function GetUserData() {
  const list = await redis.lrange('userdata', 0, -1);
  return list;
}

export async function DeleteUserdata(array) {
  await redis.del('userdata');
  array.forEach(async (element) => {
    const string = JSON.stringify(element);
    await redis.rpush('userdata', string);
  });
}
