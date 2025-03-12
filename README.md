# Scraping a twitter profile. 
## Follow the below steps to scrape a twitter profile. In this case https://x.com/CryptoMichNL

### Start the background server
- Install packages
  ```
  npm install
  ```
- Add OPENAI_API_KEY in `.env` file.
- Start the server
  ```
  npm run start
  ```

### Install chrome plugin.
- Go to `chrome_extension/manifest.json`. Make sure the twitter profile you are gonna scrape is there in content_scripts.matches. Here in this case https://x.com/CryptoMichNL.
- Install chrome plugin by following below steps.
  - In chrome browser. Navigate to chrome://extensions
  - Click on load unpacked and select the `chrome_extension` folder.

 ### Scraping.
 - Navigate to the twitter profile. In this case, its https://x.com/CryptoMichNL
 - Keep the tab open. It will keep scrolling. Close the tab when you want to stop.
 - To see if its working. Check if `output.txt` file exists.

 ### Parsing the output file.
 - Run the output_parser.ts
   ```
   npx ts-node src/output_parser.ts
   ```
 - The above file will generate tweets json file. That will contain the tweets that would most probably would have the prediction.
