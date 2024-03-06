// export function GET(request: Request) {
//   return new Response(`Hello from API`);
// }

export function GET(request: Request) {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}