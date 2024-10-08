import { jsxRenderer } from "hono/jsx-renderer";
import { PropsWithChildren } from "hono/jsx";

type Post = {
  downloadCount: number;
  version: string;
  link: string;
  updatedOn: string;
};

interface ApiResponse {
  version: string;
  downloads: number;
  updatedOn: string;
  releaseNotes: string;
  tagName: string;
  versionCode: string;
  authorisedUserAgent: string;
}

type Data = {
  tagName: string;
  downloads: number;
  updatedOn: string;
};

async function getTagName(): Promise<Data> {
  try {
    const response = await fetch("https://vitstudent.pages.dev/about.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as ApiResponse;
    return { tagName: data.tagName, downloads: data.downloads, updatedOn: data.updatedOn };
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    throw error;
  }
}

export const renderer = jsxRenderer(async ({ children, title }) => {
  const { tagName, downloads, updatedOn } = await getTagName();
  const postProps: Post = {
    downloadCount: downloads,
    version: tagName,
    link: `https://github.com/sanjay7178/android-vtop-vitap/releases/download/${tagName}/vtop_ap_${tagName}.apk`,
    updatedOn: new Date(updatedOn).toDateString(),
  };

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/static/style.css" rel="stylesheet" />
        <title>{title}</title>
      </head>
      <body>
        <Component {...postProps} />
        {/* Image Modal */}
        <div id="image-modal" className="modal">
          <span className="close">&times;</span>
          <img className="modal-content" id="modal-image" />
          <div id="caption"></div>
        </div>

        {/* Client-Side JavaScript */}
        <script>
          {`
            document.addEventListener('DOMContentLoaded', function() {
              // Image Modal Functionality
              const modal = document.getElementById('image-modal');
              const modalImg = document.getElementById('modal-image');
              const captionText = document.getElementById('caption');
              const closeBtn = document.getElementsByClassName('close')[0];
              const images = document.querySelectorAll('.carousel img');

              images.forEach(img => {
                img.addEventListener('click', () => {
                  modal.style.display = "block";
                  modalImg.src = img.src;
                  captionText.innerHTML = img.alt;
                });
              });

              closeBtn.addEventListener('click', () => {
                modal.style.display = "none";
              });

              window.addEventListener('click', (event) => {
                if (event.target == modal) {
                  modal.style.display = "none";
                }
              });

              // Hamburger Menu Functionality
              const navToggle = document.getElementById('nav-toggle');
              const nav = document.querySelector('.nav');
              const navToggleLabel = document.querySelector('.nav-toggle-label');

              navToggleLabel.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
              });

              // Close menu when a link is clicked
              const navLinks = document.querySelectorAll('.nav a');
              navLinks.forEach(link => {
                link.addEventListener('click', () => {
                  nav.style.display = 'none';
                });
              });
            });
          `}
        </script>
      </body>
    </html>
  );
});

function Component({ downloadCount, version, link, updatedOn }: PropsWithChildren<Post>) {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">M</div>
        {/* Hamburger Menu */}
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-toggle-label" aria-label="Toggle navigation menu">
          <span></span>
        </label>
        <nav className="nav">
          <a href="#">About Me</a>
          <a href="#">Donate</a>
          <a href="https://github.com/sanjay7178/android-vtop-vitap">Github</a>
          <a href="https://github.com/sanjay7178/android-vtop-vitap/issues">Submit Bug</a>
          <a href="https://github.com/sanjay7178/android-vtop-vitap/discussions">Request Feature</a>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-content">
          <h1>VIT Student (AP)</h1>
          <p>
            Credits: <a href="https://github.com/therealsujitk">@therealsujitk</a>
          </p>
          <p>
            Maintainer: <a href="https://github.com/sanjay7178">@sanjay7178</a>
          </p>
          <p>It's fully Open Source</p>
          <p>
            {downloadCount} Downloads | {version} | 8 MB Download Size | Updated on {updatedOn}
          </p>
          <a href={link} className="button">
            Download
          </a>
          <a href="#" className="button dark">
            Share
          </a>
          <a className="button dark" href="https://vtopchennai.therealsuji.tk/privacy-policy">
            Privacy Policy
          </a>
        </div>
        <div className="app-info">
          <h2>App Info</h2>
          <p>Requires Android 7.0+</p>
          <p>Updated on Jul 18, 2024</p>
          <p>Released on Mar 7, 2024</p>
        </div>
      </section>
      <section className="carousel">
        <img src="/static/image0.png" alt="Screenshot 1" loading="lazy" />
        <img src="/static/image1.png" alt="Screenshot 2" loading="lazy" />
        <img src="/static/image2.png" alt="Screenshot 3" loading="lazy" />
        <img src="/static/image3.png" alt="Screenshot 4" loading="lazy" />
        <img src="/static/image4.png" alt="Screenshot 5" loading="lazy" />
        <img src="/static/image5.png" alt="Screenshot 6" loading="lazy" />
        <img src="/static/image6.png" alt="Screenshot 7" loading="lazy" />
      </section>
      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div>
            <h3>Easy Timetable Access</h3>
            <p>View your class schedule at a glance, never miss a lecture again!</p>
          </div>
          <div>
            <h3>Grade Tracker</h3>
            <p>Keep track of your academic performance with our intuitive grade monitoring system.</p>
          </div>
          <div>
            <h3>Attendance</h3>
            <p>Monitor your attendance and stay on top of your academic commitments.</p>
          </div>
          <div>
            <h3>Material UI</h3>
            <p>Material UI for a clean and modern look, optimized for ease of use.</p>
          </div>
          <div>
            <h3>Class Notifier</h3>
            <p>Set reminders for your classes and never be late again!</p>
          </div>
          <div>
            <h3>Marks Checker</h3>
            <p>Check your internal marks and attendance with a single tap.</p>
          </div>
          <div>
            <h3>Examination Schedule View</h3>
            <p>View your upcoming exam schedule and prepare accordingly.</p>
          </div>
          <div>
            <h3>Feedback</h3>
            <p>Send us your feedback and suggestions directly from the app.</p>
          </div>
          <div>
            <h3>Fee Receipts</h3>
            <p>Access your fee receipts and payment history with ease.</p>
          </div>
          <div>
            <h3>Theme Toggle</h3>
            <p>Switch between light, dark, and AMOLED mode with a single tap.</p>
          </div>
        </div>
      </section>
      <section className="testimonials">
        <h2>What Users Say</h2>
        <div className="testimonial-grid">
          <div>
            <p>
              "This app has been a lifesaver! I can easily check my schedule and grades on the go."
            </p>
            <p>- Priya S., 3rd Year CSE</p>
          </div>
          <div>
            <p>
              "The campus map feature helped me find my way around during my first week. Highly recommend!"
            </p>
            <p>- Rahul K., 1st Year ECE</p>
          </div>
        </div>
      </section>
      <section className="download">
        <h2>Download VIT Student (AP) App</h2>
        <p>Get VIT Student (AP) on your device and start boosting your productivity today.</p>
        <a href={link} className="button dark">
          Download for Android
        </a>
        <a className="button dark" href="https://vtopchennai.therealsuji.tk/privacy-policy">
          Privacy Policy
        </a>
      </section>
    </div>
  );
}