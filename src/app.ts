import express, {json, urlencoded} from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const PORT = 3000

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).send('No text provided!');
    }

    // Write the text to a local file
    const filePath = path.join(__dirname, 'output.txt');
    console.log(filePath);
    fs.appendFileSync("./output.txt", text + '\n', 'utf8');
    res.send('Text saved successfully!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
