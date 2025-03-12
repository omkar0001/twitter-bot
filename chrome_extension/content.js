
async function sendMessageAsync(message) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, (response) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(response);
            }
        });
    });
}

var humanLikeScroll = async function () {
    var distance = 0; // Track the distance scrolled
    var maxDistance = document.body.scrollHeight; // Total page height

    while (true) {
        // URL to send the POST request

        var elements = document.querySelectorAll('[data-testid="cellInnerDiv"]')
        for(var i = 0; i < elements.length; i++) {
            var message = elements[i].outerHTML + "\n"
            sendMessageAsync({ action: "greet", message: message });
        }

        // Random scroll step size (200px to 400px)
        var step = Math.random() * 200 + 200;

        // Random delay between steps (1s to 3s)
        var delay = Math.random() * 2000 + 1000;

        // Scroll by the step size
        window.scrollBy(0, step);
        distance += step;

        // Wait for the delay
        await new Promise(function (resolve) {
            setTimeout(resolve, delay);
        });

        // Update maxDistance in case new content loads dynamically
       //maxDistance = document.body.scrollHeight;

        console.log("Scrolled to " + distance + "px of " + maxDistance + "px");
    }

    console.log("Finished scrolling to the end!");
};

// Execute the function when the content script runs
humanLikeScroll();
