import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StudentList from "./components/StudentList";
import Footer from "./components/Footer";
import students from "./data/students";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = students.filter((s) =>
    [s.name, s.roll, s.dept].some((v) => String(v).toLowerCase().includes(q))
  );

  return (
    <>
      <Header count={filtered.length} />
      <main className="main">
        <SearchBar value={query} onChange={setQuery} />
        <StudentList
          students={filtered}
          query={query}
          onClear={() => setQuery("")}
        />
      </main>
      <Footer />
    </>
  );
}