const fs = require("fs");
const { parse } = require("csv-parse");
const multer =require('multer')
const CSV_model=require('../models/CSV_model')

module.exports.home=(req,res)=>{
  return res.render('index',{});
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: async (req, file, cb)=> {
    // console.log(file);
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileName=Date.now() + '-' + file.originalname;
    const {date}=req.body;
    try {
      await CSV_model.create(
        {
          fileName,
        },
        (err, CSV_model) => {
          if (err) {
            console.log("error",err)
          }
          // return res.redirect("back");
        }
      );
    } catch (err) {
      console.log(err);
    }
    cb(null, fileName)
  }
})


module.exports.readCSv = (req,res) => {
  fs.createReadStream("./studentsReport.csv")
    .pipe(parse({ delimiter: ",", from_line: 1 }))
    .on("data", function (row) {
      console.log(row);
    })
    .on("end", function () {
      console.log("finished");
    })
    .on("error", function (error) {
      console.log(error.message);
    });
};

const csvFilter=(req,file,cb)=>{
  if(file.mimetype.includes("csv")){
    cb(null,true);
  }
  else
  {
    cb("please upload csv file only",false)
  }
}


module.exports.upload = multer({ storage: storage,fileFilter:csvFilter })


