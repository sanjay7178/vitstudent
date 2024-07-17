import { jsxRenderer } from 'hono/jsx-renderer'
import { PropsWithChildren, useEffect, useState } from 'hono/jsx'
import { fetchFormattedData } from '.'

type Post = {
    downloadCount: number
    version: string
    link : string
    updatedOn : string
}



export const renderer = jsxRenderer(({ children, title }) => {
  const [postProps, setPostProps] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFormattedData(); // Call fetchFormattedData without arguments or pass necessary ones
        setPostProps({
          downloadCount: data.downloads,
          version: data.tagName,
          link: 'https://github.com/sanjay7178/android-vtop-vitap', // Assuming this is static or derived from fetched data
          updatedOn: data.updatedOn
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []); 

  if (!postProps) {
    return <div>Loading...</div>;
  }

  return (
    <html>
      <head>
        <link href="/static/style.css" rel="stylesheet" />
        <title>{title}</title>
      </head>
      <Component {...postProps} />

      
    </html>
  )
})


function Component({ downloadCount, version ,link, updatedOn }: PropsWithChildren<Post>) {
    return (
        <div className="App">
            <header className="header">
                <div className="logo">M</div>
                <nav className="nav">
                    <a href="#">About Me</a>
                    <a href="#">Donate</a>
                </nav>
            </header>
            <section className="hero">
                <div className="hero-content">
                    <h1>VIT Student (AP)</h1>
                    <p>@sanjay7178</p>
                    <p>{downloadCount} Downloads | v{version} | 8 MB Download Size</p>
                    <a href={link} className="button">Download</a>
                    <button className="button dark">Share</button>
                </div>
                <div className="app-info">
                    <h2>App info</h2>
                    <p>Requires Android 7.0+</p>
                    <p>Updated on {updatedOn}</p>
                    <p>Released on Mar 7, 2024</p>
                </div>
            </section>
            <section className="carousel">
                <img src="https://via.placeholder.com/200x400" alt="Screenshot 1" />
                <img src="https://via.placeholder.com/200x400" alt="Screenshot 2" />
                <img src="https://via.placeholder.com/200x400" alt="Screenshot 3" />
                <img src="https://via.placeholder.com/200x400" alt="Screenshot 4" />
                <img src="https://via.placeholder.com/200x400" alt="Screenshot 5" />
            </section>
            <section className="features">
                <h2>Features</h2>
                <div className="feature-grid">
                    {/* Add feature items here */}
                </div>
            </section>
            <section className="testimonials">
                <h2>What Users Say</h2>
                <div className="testimonial-grid">
                    {/* Add testimonial items here */}
                </div>
            </section>
            <section className="download">
                <h2>Download VIT Student (AP) App</h2>
                <p>Get VIT Student (AP) on your device and start boosting your productivity today.</p>

                <a href={link} className="button dark">Download for Android</a>
            </section>
        </div>
    )
}