export default function FilterDropdown({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange && onChange(e.target.value)}>
      <option value="All Departments">All Departments</option>
      <option value="AI & ML">AI & ML</option>
      <option value="Computer Science">Computer Science</option>
      <option value="Data Science">Data Science</option>
      <option value="Cyber Security">Cyber Security</option>
      <option value="Electronics & Comm">Electronics & Comm</option>
    </select>
  );
}
