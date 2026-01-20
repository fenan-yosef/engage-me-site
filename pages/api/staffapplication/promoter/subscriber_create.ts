import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, phone, type } = req.body
  console.log('subscriber_create', { name, email, phone, type })

  // TODO: validation and persistence
  res.status(200).json({ success: 'Subscriber received' })
}
