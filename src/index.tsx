import { Hono } from "hono";
import { renderer } from "./renderer";
import { cache } from "hono/cache";
import fs from "fs";
import { facultySearch } from "./facultySearch";
import { swaggerUI } from '@hono/swagger-ui'
import axios from "axios";

const app = new Hono();

// const jsonData = JSON.parse(fs.readFileSync("faculty_data.json", "utf8"));
// import axios from 'axios';

// let jsonData: any = null;

// async function fetchData() {
//   try {
//     const response = await fetch('https://raw.githubusercontent.com/sanjay7178/vitstudent/main/public/static/faculty_data.json');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     jsonData = await response.json();
//   } catch (error) {
//     console.error('Error fetching data from primary URL, trying secondary URL', error);
//     try {
//       const response = await fetch('https://raw.githubusercontent.com/sanjay7178/vitstudent/main/public/static/faculty_data.json');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       jsonData = await response.json();
//     } catch (secondaryError) {
//       console.error('Error fetching data from secondary URL', secondaryError);
//     }
//   }
//   // console.log(jsonData);
// }

// fetchData();

// Serve faculty data as JSON
app.get("/api/faculty", async (c) => {
  let jsonData :any = null;
  const response = await fetch('https://raw.githubusercontent.com/sanjay7178/vitstudent/main/public/static/faculty_data.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  jsonData = await response.json();
  return c.json(jsonData);
});

// Search API
app.get("/api/search", async (c) => {
  const query = c.req.query("q")?.toLowerCase();
  if (!query) return c.json([]);

  let jsonData :any = null;
  const response = await fetch('https://raw.githubusercontent.com/sanjay7178/vitstudent/main/public/static/faculty_data.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  jsonData = await response.json();
  
  const results = jsonData.filter((faculty: any) =>
    Object.values(faculty).some((value: any) =>
      value.toLowerCase().includes(query)
    )
  );
  return c.json(results);
});

// CORS middleware
app.use("*", async (c, next) => {
  await next();
  c.res.headers.set("Access-Control-Allow-Origin", "*");
});




app.use(facultySearch) ;
// Serve static files
app.get("/facultySearch", (c) => {
  return c.redirect("/static/faculty.html");
});

app.use(renderer);

app.get("/", (c) => {
  return c.render(<h1>Welcome VIT Android App!</h1>, {
    title: "VIT Android App",
  });
});

const owner = "sanjay7178";
const repo = "android-vtop-vitap";

app.get(
  "/about.json",
  cache({ cacheName: "github-release-info", cacheControl: "max-age=3600" }),
  async (c) => {
    const version = c.req.query("v");
    try {
      const formattedData = await fetchFormattedData(version);
      return c.json(formattedData);
    } catch (error) {
      console.error("Error fetching release information:", error);
      return c.json({ error: "Failed to fetch release information" }, 500);
    }
  }
);

// Define an async function that fetches and formats the data
export async function fetchFormattedData(version?: string) {
  let url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

  if (version) {
    url = `https://api.github.com/repos/${owner}/${repo}/releases/tags/v${version}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.6312.40 Mobile Safari/537.36",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Version not found");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: any = await response.json();

    return {
      downloads: data.assets.reduce(
        (total: any, asset: any) => total + asset.download_count,
        0
      ),
      updatedOn: data.published_at,
      releaseNotes: data.body,
      tagName: data.tag_name,
      versionCode: data.id,
      authorisedUserAgent:
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.6312.40 Mobile Safari/537.36",
    };
  } catch (error) {
    console.error("Error fetching release information:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export default app;
