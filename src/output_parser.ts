import { parse } from 'node-html-parser'
import fs from "fs";
import OpenAI from 'openai';

require('dotenv').config()

export async function parseOutput(filename: string) {
  const client = new OpenAI();
  const output = fs.readFileSync(filename, 'utf8')
  const root = parse(output)
  const outputElements = root.querySelectorAll("div[data-testid='cellInnerDiv']")
  const tweets = []

  for(const outputElement of outputElements) {
    const textElement = outputElement.querySelectorAll("[data-testid='tweetText']")
    const timeElement = outputElement.querySelectorAll("time")
    const linkElements = outputElement.querySelectorAll('a.css-146c3p1')

    const texts = []
    if(!timeElement[0]) {
      console.log('No time element found')
      continue
    }
    if(!textElement[0]) {
      console.log('No text element found')
      continue
    }
    if(!linkElements[0]) {
      console.log('No link element found')
      continue
    }
    for(const element of textElement) {
      texts.push(element?.text)
    }
    const text = texts.join('\n')
    const link = linkElements[0].getAttribute('href')

    const time = timeElement[0].getAttribute('datetime')
    tweets.push({ text, time, link: `x.com${link}` })
  }
  console.log(tweets)

  // Remove the duplicates
    const uniqueTweets = tweets.filter((tweet, index, self) =>
        index === self.findIndex((t) => (
        t.link === tweet.link
        ))
    )
    const predictionTweets = []
    for(const tweet of uniqueTweets) {
      const prediction = await client.chat.completions.create({
        messages: [{ role: 'user', content: `Flag the below tweet if it has a price prediction of any coin or not. In case if it has, the answer should "true" or else "false"\n\n ${tweet.text}` }],
        model: 'gpt-4o',
      })
      const predictionContent = prediction.choices[0]["message"].content
      if(predictionContent?.toLowerCase() === 'true') {
        predictionTweets.push(tweet)
      }
      console.log(prediction)
    }

    console.log(predictionTweets)
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
}

parseOutput('./output.txt')
