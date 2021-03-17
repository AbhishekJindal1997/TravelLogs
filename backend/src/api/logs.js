const express = require("express");
const LogEntry = require("../models/LogEntry");
//const UserEntry = require("./UserEntry");
const router = express.Router();
const middlewares = require("../middlewares");
const { findById } = require("../models/LogEntry");

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const entries = await LogEntry.findById(id);
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
    console.log(req.body);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await LogEntry.findByIdAndDelete(id);
    res.json({ result, msg: "Entry Deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
