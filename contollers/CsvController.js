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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: async (req, file, cb) => {
    // console.log(file);
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
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
          // return res.redirect("back");
        }
      );
    } catch (err) {
      console.log(err);
    }
    cb(null, fileName);
  },
});

module.exports.readCSv = async (req, res,next) => {
  try {
    const {fileId}=req.params;
    const Csv_file=await CSV_model.findById(fileId);
    const file_data=[];
    fs.createReadStream(`./uploads/${Csv_file.fileName}`)
      .pipe(parse({ delimiter: ","}))
      .on("data", function (row) {
        console.log("row",row);
        file_data.push(row)
      })
      .on("end", function () {
        console.log("finished");
        console.log("file_data",file_data)
        return res.render("show_data",{
          data:file_data
        })
      })
      .on("error", function (error) {
        console.log(error.message);
        return res.redirect('back')
      });

      // console.log("file_data",file_data)
      // return res.render("show_data",{
      //   data:file_data
      // })
    // console.log("file1",file1());
  } catch (error) {
    console.log("error in reading CSV ",error)
    return res.redirect('back')
  }
};

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("please upload csv file only", false);
  }
};

module.exports.upload = multer({ storage: storage, fileFilter: csvFilter });
