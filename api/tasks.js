import express from "express";
import { db } from "./server.js";

const router = express.Router();

const statuses = ["in progress", "completed"];

const tasks = [
  {
    id: 1,
    name: "Complete math homework",
    description:
      "Finish all assigned exercises from the algebra chapter, showing all work and checking answers for accuracy before submitting to the teacher.",
    createdAt: "2023-10-01T15:00:00Z",
    author: "hribeiro",
    status: statuses[0],
  },
  {
    id: 2,
    name: "Study for biology test",
    description:
      "Review notes and textbook chapters on cell structure and function, create flashcards for key terms, and take practice quizzes to prepare for the upcoming test.",
    createdAt: "2023-10-02T16:00:00Z",
    author: "hribeiro",
    status: statuses[1],
  },
  {
    id: 3,
    name: "Join science club meeting",
    description:
      "Attend the weekly science club meeting after school, participate in group activities, and sign up for the upcoming science fair project.",
    createdAt: "2023-10-03T17:00:00Z",
    author: "hribeiro",
    status: statuses[0],
  },
  {
    id: 4,
    name: "Prepare English essay",
    description:
      "Draft and revise an essay on the assigned novel, focusing on character development and themes, and submit the final version before the deadline.",
    createdAt: "2023-10-04T18:00:00Z",
    author: "hribeiro",
    status: statuses[1],
  },
  {
    id: 5,
    name: "Practice for basketball tryouts",
    description:
      "Attend after-school basketball practice, work on dribbling and shooting skills, and review the team playbook to get ready for tryouts.",
    createdAt: "2023-10-05T19:00:00Z",
    author: "hribeiro",
    status: statuses[0],
  },
  {
    id: 6,
    name: "Organize locker",
    description:
      "Clean out old papers and supplies from the locker, organize textbooks and notebooks, and decorate with new photos and stickers.",
    createdAt: "2023-10-06T20:00:00Z",
    author: "hribeiro",
    status: statuses[1],
  },
  {
    id: 7,
    name: "Meet with guidance counselor",
    description:
      "Schedule and attend a meeting with the guidance counselor to discuss course selections, college plans, and extracurricular activities.",
    createdAt: "2023-10-07T21:00:00Z",
    author: "hribeiro",
    status: statuses[0],
  },
  {
    id: 8,
    name: "Volunteer at school event",
    description:
      "Sign up to help set up and run the annual school fundraiser, assist with ticket sales, and clean up after the event.",
    createdAt: "2023-10-08T22:00:00Z",
    author: "hribeiro",
    status: statuses[1],
  },
  {
    id: 9,
    name: "Prepare for history presentation",
    description:
      "Research assigned historical topic, create a slideshow, and practice presenting in front of friends to get feedback before presenting in class.",
    createdAt: "2023-10-09T23:00:00Z",
    author: "hribeiro",
    status: statuses[0],
  },
  {
    id: 10,
    name: "Update student planner",
    description:
      "Review upcoming assignments and deadlines, add new tasks to the planner, and set reminders for important school events.",
    createdAt: "2023-10-10T08:00:00Z",
    author: "hribeiro",
    status: statuses[1],
  },
];

router.get("/", (req, res) => {
  db.all(`SELECT * FROM tasks`, (err, rows) => {
    if (err) {
      console.error("Error retrieving tasks:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(rows);
    }
  });
});

router.post("/", (req, res) => {
  const { name, description, author } = req.body;
  if (!name || !description || !author) {
    return res
      .status(400)
      .json({ error: "Name, description, and author are required." });
  }

  db.run(
    `INSERT INTO tasks (name, description, author, status) VALUES (?, ?, ?, ?)`,
    [name, description, author, statuses[0]],
    function (err) {
      if (err) {
        console.error("Error inserting new task:", err.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        db.get(
          "SELECT * FROM tasks WHERE id = ?",
          [this.lastID],
          (err, row) => {
            if (err) {
              return next(err);
            }
            res.status(201).json(row);
          }
        );
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { name, description, status } = req.body;
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  if (name) task.name = name;
  if (description) task.description = description;
  if (status && statuses.includes(status)) task.status = status;

  res.json(task);
});

export default router;
