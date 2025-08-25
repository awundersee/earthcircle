const { useState, useEffect } = React;

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("country");
  const [sortAsc, setSortAsc] = useState(true);

  // Daten laden
  useEffect(() => {
    fetch("data.json")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Fehler beim Laden:", err));
  }, []);

  // Input- und Dropdown-Listener
  useEffect(() => {
    const input = document.getElementById("searchInput");
    const dropdownButton = document.getElementById("sortDropdownButton");
    const dropdownItems = document.querySelectorAll("#sortDropdownButton + .dropdown-menu .dropdown-item");

    // Input
    const handleInput = (e) => setFilter(e.target.value);

    // Dropdown Klick
    const handleDropdownClick = (e) => {
      const key = e.target.dataset.key;
      const dir = e.target.dataset.dir;

      setSortKey(key);
      setSortAsc(dir === "asc");

      // Aktive Klasse setzen
      dropdownItems.forEach(item => item.classList.remove("active"));
      e.target.classList.add("active");
    };

    input.addEventListener("input", handleInput);
    dropdownItems.forEach(item => item.addEventListener("click", handleDropdownClick));

    return () => {
      input.removeEventListener("input", handleInput);
      dropdownItems.forEach(item => item.removeEventListener("click", handleDropdownClick));
    };
  }, []);

  // Gefilterte und sortierte Daten
  const filteredData = data
    .filter(row =>
      row.company.toLowerCase().includes(filter.toLowerCase()) ||
      row.country.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });

  // ARIA & Sort-Klassen
  const getSortClass = (key) => {
    if (sortKey === key) return sortAsc ? "asc-sorting" : "desc-sorting";
    return "no-sorting";
  };

  const getAriaLabel = (key, label) => {
    if (sortKey === key) {
      return sortAsc
        ? `${label}, aufsteigend sortiert`
        : `${label}, absteigend sortiert`;
    }
    return `${label}, nicht sortiert`;
  };

  // Tabellen-Header Button Klick
  const handleSortButton = (key) => {
    let newAsc = true;
    if (sortKey === key) newAsc = !sortAsc;

    setSortKey(key);
    setSortAsc(newAsc);

    // Dropdown synchronisieren: nur active
    const dropdownButton = document.getElementById("sortDropdownButton");
    const dropdownItems = document.querySelectorAll("#sortDropdownButton + .dropdown-menu .dropdown-item");

    const matchingItem = Array.from(dropdownItems).find(
      item => item.dataset.key === key && item.dataset.dir === (newAsc ? "asc" : "desc")
    );
    if (matchingItem) {
      dropdownItems.forEach(item => item.classList.remove("active"));
      matchingItem.classList.add("active");
    }
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col" className={getSortClass("country")} aria-sort={sortKey === "country" ? (sortAsc ? "ascending" : "descending") : "none"}>
            <button
              type="button"
              onClick={() => handleSortButton("country")}
              aria-label={getAriaLabel("country", "Land")}
              style={{ cursor: "pointer", border: "none", background: "transparent", padding: 0 }}
            >
              Land
            </button>
          </th>

          <th scope="col" className={getSortClass("company")} aria-sort={sortKey === "company" ? (sortAsc ? "ascending" : "descending") : "none"}>
            <button
              type="button"
              onClick={() => handleSortButton("company")}
              aria-label={getAriaLabel("company", "Unternehmen")}
              style={{ cursor: "pointer", border: "none", background: "transparent", padding: 0 }}
            >
              Unternehmen
            </button>
          </th>

          <th scope="col" className={getSortClass("emissions")} aria-sort={sortKey === "emissions" ? (sortAsc ? "ascending" : "descending") : "none"}>
            <button
              type="button"
              onClick={() => handleSortButton("emissions")}
              aria-label={getAriaLabel("emissions", "CO₂-Emissionen (t)")}
              style={{ cursor: "pointer", border: "none", background: "transparent", padding: 0 }}
            >
              CO₂-Emissionen (t)
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        {filteredData.map((row, idx) => (
          <tr key={idx}>
            <td className={sortKey === "country" ? "is-selected" : ""}>{row.country}</td>
            <td className={sortKey === "company" ? "is-selected" : ""}>{row.company}</td>
            <td className={sortKey === "emissions" ? "is-selected" : ""}>{row.emissions}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// App starten
const root = ReactDOM.createRoot(document.getElementById("table"));
root.render(<App />);