// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type ErrorData = {
  error: string
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorData>
) {
  // Log the error to the server console
  console.error('Test error endpoint accessed - This is an intentional server error')
  
  // Throw an error to simulate a server-side error
  throw new Error('This is an intentional server error for testing error monitoring')
}
