// Middleware to check if the file type is text
exports.validateFileType = (req, res, next) => {
    const allowedFileTypes = ['text/plain', 'application/pdf']; // Adjust this based on the allowed file types
    if (!allowedFileTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
            message: 'Invalid file type. Only text files (plain text or PDF) are allowed.',
        });
    }
    next();
};
