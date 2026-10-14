
const express = require("express");
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Bansi", course: "MCA" },
  { id: 2, name: "Riya", course: "BCA" }
];

// READ
app.get("/students", (req, res) => {
  res.json(students);
});

// CREATE
app.post("/students", (req, res) => {
  const student = {
    id: Date.now(),
    name: req.body.name,
    course: req.body.course
  };

  students.push(student);
  res.status(201).json(student);
});

// UPDATE
app.put("/students/:id", (req, res) => {
  const student = students.find(
    s => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  student.name = req.body.name ?? student.name;
  student.course = req.body.course ?? student.course;

  res.json(student);
});

// DELETE
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = students.some(s => s.id === id);

  if (!exists) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  students = students.filter(s => s.id !== id);

  res.json({ message: "Student deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
