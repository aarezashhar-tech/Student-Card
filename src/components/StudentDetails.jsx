export default function StudentDetails({ student }) {
  if (!student) return null;
  return (
    <div className="student-details-preview">
      <h2>{student.name}</h2>
      <p>Roll: {student.roll}</p>
      <p>Department: {student.dept}</p>
      <p>CGPA: {student.cgpa}</p>
    </div>
  );
}
