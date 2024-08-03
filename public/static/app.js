document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const resultsContainer = document.getElementById("results");
  
    searchInput.addEventListener("input", function () {
      const query = searchInput.value.trim();
  
      if (query === "") {
        resultsContainer.innerHTML = "";
        return;
      }
  
      fetch(`http://localhost:5173/api/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          resultsContainer.innerHTML = data.map(faculty => `
            <li class="faculty-item">
              <h3>${faculty["Name of the Faculty"]}</h3>
              <p>Designation: ${faculty.Designation}</p>
              <p>Department: ${faculty["Name of Department"]}</p>
              <p>School: ${faculty["School / Centre Name"]}</p>
              <p>Email: ${faculty["E-Mail Id"]}</p>
              <p>Cabin: ${faculty["Cabin Number"]}</p>
            </li>
          `).join('');
        })
        .catch(error => console.error("Error fetching data:", error));
    });
  });
  