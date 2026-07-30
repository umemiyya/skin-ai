import 'server-only';
import { Client } from '@notionhq/client';

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY belum diset di environment variables.');
}
if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('NOTION_DATABASE_ID belum diset di environment variables.');
}

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

export const NOTION_PROPS = {
  username: process.env.NOTION_PROP_USERNAME || 'Username',
  password: process.env.NOTION_PROP_PASSWORD || 'Password',
  role: process.env.NOTION_PROP_ROLE || 'Role',
  createdAt: process.env.NOTION_PROP_CREATED_AT || 'CreatedAt',
};