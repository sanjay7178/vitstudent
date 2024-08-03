import axios from "axios";
// import { useEffect, useState } from "hono/jsx";


// export default App;

import { jsxRenderer } from "hono/jsx-renderer";
import { PropsWithChildren, useEffect, useRef, useState } from "hono/jsx";
import { fetchFormattedData } from ".";
import { version } from "vite";
import { html } from "hono/html";

interface Faculty {
  ID: string;
  "Name of the Faculty": string;
  Designation: string;
  "Name of Department": string;
  "School / Centre Name": string;
  "E-Mail Id": string;
  "Cabin Number": string;
}

export const facultySearch = jsxRenderer(async ({ children, title }) => {
 

  return (
    <html>
      <head>
        <link href="/static/faculty.css" rel="stylesheet" />
        <title>{title}</title>
      </head>
        {/* <App /> */}
        {html`
        
        `

        }
    </html>
  );
});




// function App() {
//     const [results, setResults] = useState<Faculty[]>([]);
//     const inputRef = useRef(null);
  
//     const handleSubmit = async (e: Event) => {
//       e.preventDefault();
      
//     //   const query = inputRef.current?.value.trim() || "";
//       const query =  inputRef.current ?? "";
//       if (query === "") {
//         setResults([]);
//         return;
//       }
//       console.log(query);

//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/search?q=${encodeURIComponent(query)}`
//         );
//         setResults(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
  
//     return (
//       <div className="App">
//         <h1>Faculty Search</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             ref={inputRef}
//             placeholder="Search for faculty..."
//             className="search-input"
//           />
//           <button type="submit">Search</button>
//         </form>
//         <ul className="results">
//           {results.map((faculty) => (
//             <li key={faculty.ID} className="faculty-item">
//               <h3>{faculty["Name of the Faculty"]}</h3>
//               <p>Designation: {faculty.Designation}</p>
//               <p>Department: {faculty["Name of Department"]}</p>
//               <p>School: {faculty["School / Centre Name"]}</p>
//               <p>Email: {faculty["E-Mail Id"]}</p>
//               <p>Cabin: {faculty["Cabin Number"]}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }