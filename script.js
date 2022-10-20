const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];


function ShowLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    if (!loader.hidden) { 
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}


// Show New Quote
function newQuote(){
    ShowLoadingSpinner();
    // Pick a random quote from apiQuotes array'
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'Unknown'
    if (!quote.author){ 
    authorText.textContent = 'Unknown';
    } else {
       authorText.textContent = quote.author; 
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
    
}

// Get Quotes From API
async function getQuotes() {
    ShowLoadingSpinner();
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error){
        // Catch error here
    }
}


// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();