const { Router } = require("express");
const express = require("express");
// importing the required functions from CsvController.
const {
  readCSv,
  upload,
  home,
  deleteFile,
} = require("../contollers/CsvController");

const router = Router();
// rendering the home page.
router.get("/", home);
// uploading the CSV file and redirecting back.
router.post("/upload", upload.single("csv_file"), function (req, res) {
  return res.redirect("back");
});
// reading the csv and rendering to showdata page with data
router.get("/show-data/:fileId", readCSv);
// deleting the requested file
router.get("/delete/:fileId", deleteFile);

module.exports = router;
