function dumpText(text) {
    var url = "http://localhost:3000/submit"
    var data = { text: text }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.text()) // Or response.json() if server returns JSON
        .then(result => console.log(result))
        .catch(error => console.error('Error:', error));
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "greet") {
        console.log("Message from content script:", message.message);
        dumpText(message.message);
    }
    // Return `true` to indicate you will send a response asynchronously
    return true;
});
