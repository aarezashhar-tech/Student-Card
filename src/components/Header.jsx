export default function Header({ count }) {
  return (
    <header className="hd">
      <h1>Student directory</h1>
      <p>
        {count} {count === 1 ? "student" : "students"} shown
      </p>
    </header>
  );
}
