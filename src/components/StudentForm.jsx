function StudentForm() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Student</h2>

      <input placeholder="Name" />
      <br /><br />

      <input placeholder="Roll Number" />
      <br /><br />

      <input placeholder="Department" />
      <br /><br />

      <button>Add Student</button>
    </div>
  );
}

export default StudentForm;