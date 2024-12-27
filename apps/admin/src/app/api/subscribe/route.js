// import Redis from 'ioredis';

// const redisSubscriber = new Redis(process.env.UPSTASH_URL);

// export const dynamic = 'force-dynamic';

// export async function GET() {

//   const stream = new ReadableStream({
//     start(controller) {
//       console.log('SSE Connection Opened');

//       redisSubscriber.on('connect', () => {
//         console.log('Connected to Redis');
//       });

//       redisSubscriber.on('error', (err) => {
//         console.error('Redis connection error:', err);
//       });

//       redisSubscriber.subscribe('userdata', (err) => {
//         if (err) {
//           console.error('Subscription Failed:', err);
//           controller.error(err);
//         }
//       });

//       redisSubscriber.on('message', (channel, message) => {
//         if (channel === 'userdata') {
//           console.log('Received Message:', message);
//           controller.enqueue(`data: ${message}\n\n`);
//         }
//       });

//       redisSubscriber.on('end', () => {
//         console.log('SSE Connection Closed');
//         controller.close();
//       });

//       redisSubscriber.on('error', (err) => {
//         console.error('Redis Error:', err);
//         controller.error(err);
//       });
//     },
//   });

//   return new Response(stream, {
//     headers: {
//       'Content-Type': 'text/event-stream; charset=utf-8',
//       'Cache-Control': 'no-cache, no-transform',
//       Connection: 'keep-alive',
//       'Content-Encoding': 'none',
//     },
//   });
// }
