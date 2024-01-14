# Text Analysis Project

This project allows users to upload text files, perform text analysis, and retrieve analysis results.

### Prerequisites

- Node.js installed
- MongoDB installed and running
- Postman or any API testing tool

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

cd text-analysis-project
npm install

Create .env file in root of project
Provide MONGO_DB_URL in .env like sample.env.file

### Start Project

npm start

### Endpoints

POST /files/upload: Upload a text file.
GET /files: Retrieve all uploaded files.

POST /files/analysis/:id
Provide word in json format in request to perform analysis:
{
"word": "jam"
}

GET /files/getreport/:id - Provide here id which is generated after POST analysis request.

DELETE /files/delete/:id: Delete a specific file.
