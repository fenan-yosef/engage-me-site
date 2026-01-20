import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

type UploadedFile = {
  filepath: string
  originalFilename?: string
  mimetype?: string
  size?: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();
  const form = new IncomingForm({ multiples: false });

  form.parse(req as unknown as import('http').IncomingMessage, (err: unknown, fields: Record<string, unknown>, files: Record<string, UploadedFile | UploadedFile[] | undefined>) => {
    if (err) {
      console.error('form parse error', err);
      return res.status(500).json({ error: 'Form parse error' });
    }

    // Validate required fields server-side (basic)
    const errors: string[] = []
    if (!fields.fname) errors.push('First name is required')
    if (!fields.lname) errors.push('Last name is required')

    if (errors.length) {
      return res.status(400).json({ error: errors.join('; ') })
    }

    // For now, save uploaded photo to /public/uploads if present
    if (files && files.photo) {
      const file = Array.isArray(files.photo) ? files.photo[0] : files.photo
      const f = file as UploadedFile
      const data = fs.readFileSync(f.filepath);
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const filename = `${Date.now()}-${f.originalFilename || 'upload'}`;
      fs.writeFileSync(path.join(uploadDir, filename), data);
      fields.photo_saved = `/uploads/${filename}`;
    }

    // Persist a simple JSON record to data/submissions.json for now
    const dbDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true })
    const dbFile = path.join(dbDir, 'submissions.json')
    let existing: unknown[] = []
    try {
      if (fs.existsSync(dbFile)) existing = JSON.parse(fs.readFileSync(dbFile, 'utf8'))
    } catch (e) {
      console.warn('Could not read submissions.json', e)
    }
    const entry = { id: Date.now(), created_at: new Date().toISOString(), fields }
    existing.push(entry)
    fs.writeFileSync(dbFile, JSON.stringify(existing, null, 2))

    console.log('Saved submission:', entry)

    res.status(200).json({ success: true, fields });
  });
};

export default handler;
