const File = require("../models/textFileModel");
const fs = require("fs");
const util = require("util");
const Analysis = require("../models/analysisModel");
const writeFileAsync = util.promisify(fs.writeFile);

exports.getAll = async (req, res) => {
    try {
        const files = await File.find();

        res.status(200).json({
            message:
                files.length > 0
                    ? "Files retrieved successfully"
                    : "No files found in the database.",
            data: files,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getReport = async (req, res) => {
    try {
        const id = req.params.id;
        const report = await Analysis.findById(id);
        if (!report) {
            return res.status(404).json({
                message: "No report available for given ID",
            });
        }
        res.status(200).json({
            message: "Success",
            data: report,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.uploadFile = async (req, res) => {
    try {
        // Access uploaded file details
        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded.',
            });
        }

        const { originalname, buffer } = req.file;

        //check for file in db before uploading 
        let existFile = await File.findOne({ originalname })

        if (existFile) {
            return res.status(400).json({
                message: 'Same file already exist in DB. Try To upload other text file',
            });
        }
        // Save file to MongoDB using the File model
        const savedFile = await File.create({
            originalname,
            filename: `${Date.now()}-${originalname}`,
            path: buffer.toString("base64"), // Save file content as base64 encoded string
        });

        res.json(savedFile);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.analysis = async (req, res) => {
    try {
        const id = req.params.id;
        const targetWord = req.body.word;
        const files = await File.find({ _id: id });

        if (files.length === 0) {
            return res.status(404).json({
                message: "File not found",
            });
        }

        const file = files[0];
        const base64Content = file.path;

        // Convert base64 to a buffer
        const bufferContent = Buffer.from(base64Content, "base64");

        // Write the buffer to a temporary file
        const tempFilePath = "tempFile.txt"; // You can choose a suitable name and extension
        await writeFileAsync(tempFilePath, bufferContent);

        // Read the temporary file content
        const fileContent = fs.readFileSync(tempFilePath, "utf-8");
        const wordsInFile = fileContent.split(/\s+/);
        let countWords = wordsInFile.length;
        let uniqueWords = wordsInFile
            .filter((word) => /^[a-zA-Z]+$/.test(word))
            .filter((value, index, self) => self.indexOf(value) === index);
        let countUniqueWords = uniqueWords.length;

        // Use regular expression to find occurrences of the target word
        const regex = new RegExp(`\\b${targetWord}\\b`, "gi");
        const matches = fileContent.match(regex);
        const count = matches ? matches.length : 0;

        const analysis = await Analysis.create({
            countWords,
            countUniqueWords,
            getTopKWords: count,
        });
        res.status(200).json({
            message: "Success",
            data: {
                filename: file.originalname,
                message: `Analysis has been done and saved in db.`,
                fileId: analysis._id,
            },
        });

        // Optionally, you can delete the temporary file after reading its content
        fs.unlinkSync(tempFilePath);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteFile = await File.findByIdAndDelete({ _id: id });

        if (!deleteFile) {
            return res.status(404).json({
                message: "No file found to delete.",
            });
        }

        res.status(200).json({
            message: "File deleted successfully",
            deleted: deleteFile,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

