const { Router } = require("express");
const express = require("express");
const {
  readCSv,
  upload,
  home,
  deleteFile,
} = require("../contollers/CsvController");

const router = Router();

router.get("/", home);

router.post("/upload", upload.single("csv_file"), function (req, res) {
  return res.redirect("back");
});

router.get("/show-data/:fileId", readCSv);

router.get("/delete/:fileId", deleteFile);

module.exports = router;
