const { useState, useEffect } = React;

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("country");
  const [sortAsc, setSortAsc] = useState(true);

  // Daten laden
  useEffect(() => {
    fetch("../assets/data/data.json")
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
              aria-label={getAriaLabel("emissions", "CO₂-Emissionen (MtCO₂)")}
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

// ----------------- Rendering getrennt -----------------
const tableEl = document.getElementById("table");
if (tableEl) {
  ReactDOM.createRoot(tableEl).render(<App />);
}

const h = React.createElement;

  // Utilities
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
  const containsCode = (text) => /<[^>]+>/.test(String(text || ""));

  // Feld mit optionaler Fehlermeldung
  function FieldWrapper({ children, error }) {
    return h("div", { className: "mb-2 w-100 z-1" }, children, error ? h("div", { className: "invalid-feedback d-block" }, error) : null);
  }

  function CustomForm({ type, formId }) {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      newsletter: false,
      message: "",
      honeypot: "",
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const setField = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

    const handleChange = (e) => {
      const t = e.target;
      const value = t.type === "checkbox" ? !!t.checked : t.value;
      setField(t.name, value);
    };

    const validate = () => {
      const newErrors = {};

      // Honeypot: Bot erkannt → still abbrechen
      if (formData.honeypot && String(formData.honeypot).trim() !== "") return { honeypot: true };

      // Name
      if (!String(formData.name).trim() || containsCode(formData.name)) newErrors.name = "Bitte einen Namen eingeben.";

      // E-Mail
      if (!isValidEmail(formData.email)) newErrors.email = "Bitte eine gültige E-Mail eingeben.";

      // Nachricht nur Kontaktformular
      if (type === "contact") {
        if (!String(formData.message).trim() || containsCode(formData.message)) newErrors.message = "Bitte eine Nachricht eingeben.";
      }

      return newErrors;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = validate();
      if (newErrors.honeypot) return; // Bot → Abbruch
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
      // Hier kannst du den Backend-Call einfügen:
      // fetch('/api/submit', { method: 'POST', body: JSON.stringify({ type, formId, ...formData }) });
      setSubmitted(true);
    };

    if (submitted) {
      return h("div", { className: "alert alert-success my-3" },
        type === "newsletter" ? "Vielen Dank für Dein Interesse!" : "Vielen Dank für Deine Nachricht!"
      );
    }

    const cls = (err) => "form-control" + (err ? " is-invalid" : "");

    const formClassName =
    type === "newsletter"
    ? "p-3 border rounded-3 mb-4 d-flex flex-wrap justify-content-between align-items-center form-gradient"
    : "mb-4 d-flex flex-wrap justify-content-between align-items-center";

    return h(
      "form",
      { className: formClassName, onSubmit: handleSubmit, noValidate: true },

      // Name
      h(FieldWrapper, { error: errors.name },
        h("label", { className: "form-label", htmlFor: formId + "-name" }, "Name"),
        h("input", { id: formId + "-name", name: "name", type: "text", className: cls(errors.name), value: formData.name, onChange: handleChange, required: true })
      ),

      // E-Mail
      h(FieldWrapper, { error: errors.email },
        h("label", { className: "form-label", htmlFor: formId + "-email" }, "E-Mail"),
        h("input", { id: formId + "-email", name: "email", type: "email", className: cls(errors.email), value: formData.email, onChange: handleChange, required: true })
      ),

      // Newsletter Checkbox nur Newsletter
      type === "newsletter" && h("small", { className: "pb-3 form-hint opacity-75 z-1" }, 
        "Du wirst mit dem Absenden des Formulars nicht automatisch Mitglied, sondern erhältst alle Informationen zur Mitgliedschaft sowie das Antragsformular per Mail. Mit dem Absenden stimmst Du unseren ",
        h("a", { href: "/datenschutz", target: "_blank", className: "underline text-primary" }, "Datenschutzbestimmungen"),
        " zu."
        ),
       type === "newsletter" && h("div", { className: "form-check mb-3 order-5 z-1" },
        h("input", { id: formId + "-newsletter", name: "newsletter", type: "checkbox", className: "form-check-input", checked: formData.newsletter, onChange: handleChange }),
        h("label", { htmlFor: formId + "-newsletter", className: "form-check-label" }, "Zum Newsletter anmelden")
      ),

      // Nachricht nur Kontakt
      type === "contact" && h(FieldWrapper, { error: errors.message },
        h("label", { className: "form-label", htmlFor: formId + "-message" }, "Nachricht"),
        h("textarea", { id: formId + "-message", name: "message", rows: 4, className: cls(errors.message), value: formData.message, onChange: handleChange, required: true })
      ),
      type === "contact" && h("small", { className: "pb-3 form-hint opacity-75 z-1 w-100" }, 
        "Mit dem Absenden stimmst Du unseren ",
        h("a", { href: "/datenschutz", target: "_blank", className: "underline text-primary" }, "Datenschutzbestimmungen"),
        " zu."
        ),

      // Honeypot
      h("input", { type: "text", name: "honeypot", value: formData.honeypot, onChange: handleChange, style: { display: "none" } }),

      // Submit
      h("button", { type: "submit", className: "btn btn-primary z-1" }, type === "newsletter" ? "Antragsformular anfordern" : "Senden")
    );
  }

  // ---------- Mounting ----------
  document.querySelectorAll(".form").forEach((el, i) => {
    const typeAttr = (el.getAttribute("data-type") || "").toLowerCase();
    if (typeAttr !== "newsletter" && typeAttr !== "contact") return;
    const formId = el.getAttribute("data-id") || (typeAttr + "-" + (i + 1));
    const root = ReactDOM.createRoot(el);
    root.render(h(CustomForm, { type: typeAttr, formId }));
  });