const fs = require("fs");
const { parse } = require("csv-parse");
const multer = require("multer");
const CSV_model = require("../models/CSV_model");

module.exports.home = async (req, res) => {
  let CSV_files = await CSV_model.find({});
  return res.render("index", {
    title: "Home page",
    Uploaded_files: CSV_files,
  });
};

module.exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const fileDel = await CSV_model.findById(fileId);

    if (!fileDel) {
      return;
    }

    let filePath = `./uploads/${fileDel.fileName}`;
    fs.unlinkSync(filePath);
    fileDel.remove();
    return res.redirect("back");
  } catch (error) {
    console, log("error in deleting file ", error);
    return res.redirect("back");
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: async (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    const { date } = req.body;
    try {
      await CSV_model.create(
        {
          fileName,
        },
        (err, CSV_model) => {
          if (err) {
            console.log("error", err);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
    cb(null, fileName);
  },
});

module.exports.readCSv = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const Csv_file = await CSV_model.findById(fileId);
    const file_data = [];
    fs.createReadStream(`./uploads/${Csv_file.fileName}`)
      .pipe(parse({ delimiter: "," }))
      .on("data", function (row) {
        file_data.push(row);
      })
      .on("end", function () {
        return res.render("show_data", {
          data: file_data,
        });
      })
      .on("error", function (error) {
        console.log(error.message);
        return res.redirect("back");
      });
  } catch (error) {
    console.log("error in reading CSV ", error);
    return res.redirect("back");
  }
};

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload CSV file only", false);
  }
};

module.exports.upload = multer({ storage: storage, fileFilter: csvFilter });
