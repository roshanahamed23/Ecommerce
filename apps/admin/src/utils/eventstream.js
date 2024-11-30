// import { eventSource } from "./connectsubscribe";

// function getdatafromsubscribe() {
//   // Handle incoming messages
//   eventSource.onmessage = (event) => {
//     console.log('Received message:', event.data);
//   };

//   // Handle errors
//   eventSource.onerror = (error) => {
//     console.error('EventSource error:', error);
//     eventSource.close(); // Close the connection on error
//   };
// }

// function closeSubscribe() {
//   // Close the EventSource connection if it's open
//   if (eventSource) {
//     eventSource.close();
//     console.log('EventSource connection closed');
//   }
// }

// export { getdatafromsubscribe, closeSubscribe };
