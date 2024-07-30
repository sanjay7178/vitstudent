import { Hono } from 'hono'
import { renderer } from './renderer'
import { cache } from 'hono/cache'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Welcome VIT Android App!</h1>, { title: 'VIT Android App' })
})

const owner = 'sanjay7178'
const repo = 'android-vtop-vitap'

app.get('/about.json', cache({ cacheName: 'github-release-info', cacheControl: 'max-age=3600' }), async (c) => {
  const version = c.req.query('v')
  try {
    const formattedData = await fetchFormattedData(version);
    return c.json(formattedData);
  } catch (error) {
    console.error('Error fetching release information:', error);
    return c.json({ error: 'Failed to fetch release information' }, 500);
  }
})


async function fetchAndGetVersionCode(url: string): Promise<number | null> {
  try {
    // Fetch the content from the URL
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Get the text content of the response
    const gradleContent = await response.text();
    
    // Parse the content to get the version code
    return getVersionCode(gradleContent);
  } catch (error) {
    console.error('Error fetching or parsing content:', error);
    return null;
  }
}

function getVersionCode(gradleContent: string): number | null {
  const lines = gradleContent.split('\n');
  for (const line of lines) {
    if (line.trim().startsWith('versionCode')) {
      const match = line.match(/versionCode\s+(\d+)/);
      if (match && match[1]) {
        return parseInt(match[1], 10);
      }
    }
  }
  return null;
}



// Define an async function that fetches and formats the data
export async function fetchFormattedData(version?: string) {
  let url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

  if (version) {
    url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.6312.40 Mobile Safari/537.36'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Version not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data :  any = await response.json();
    const url2 = 'https://raw.githubusercontent.com/sanjay7178/android-vtop-vitap/master/app/build.gradle';


    const versionCode = await fetchAndGetVersionCode(url2).then((versionCode) => versionCode);
    console.log('versionCode:', versionCode);
    if (versionCode === null) {
      throw new Error('Failed to fetch version code');
      console.error('Failed to fetch version code');
    }

    return {
      downloads: data.assets.reduce((total: any, asset: any) => total + asset.download_count, 0),
      updatedOn: data.published_at,
      releaseNotes: data.body,
      tagName: data.tag_name,
      versionCode:versionCode,
      authorisedUserAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.6312.40 Mobile Safari/537.36'
    };
  } catch (error) {
    console.error('Error fetching release information:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}


export default app
