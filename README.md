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

### Install the Chrome plugin.
- Go to `chrome_extension/manifest.json`. Make sure the twitter profile you are gonna scrape is there in content_scripts.matches. Here in this case https://x.com/CryptoMichNL.
- Install the Chrome plugin by following the below steps.
  - In Chrome browser. Navigate to chrome://extensions
  - Click on load unpacked and select the `chrome_extension` folder.

 ### Scraping.
 - Navigate to the Twitter profile. In this case, its https://x.com/CryptoMichNL
 - Keep the tab open. It will keep scrolling. Close the tab when you want to stop.
 - To check if it's working. Check if `output.txt` got created. It contains the HMLT content of the tweets until now, which has been scraped.

 ### Parsing the output file.
 - Run the output_parser.ts
   ```
   npx ts-node src/output_parser.ts
   ```
 - The above command will generate a `tweets.json` file. That file will contain the tweets that most likely have the prediction.
