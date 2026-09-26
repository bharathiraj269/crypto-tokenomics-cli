const axios = require('axios');

async function analyzeToken(coinId) {
    console.log(`\nFetching real-time data for: ${coinId}...`);
    try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`;
        const response = await axios.get(url);
        
        if (response.data.length === 0) {
            console.log("Token not found. Try 'bitcoin', 'ethereum', or 'sui'.");
            return;
        }

        const data = response.data[0];
        
        console.log("\n=== " + data.name + " (" + data.symbol.toUpperCase() + ") ===");
        console.log(`Current Price:       $${data.current_price}`);
        console.log(`Market Cap:          $${data.market_cap.toLocaleString()}`);
        console.log(`Fully Diluted (FDV): $${data.fully_diluted_valuation ? data.fully_diluted_valuation.toLocaleString() : 'N/A'}`);
        console.log(`Circulating Supply:  ${data.circulating_supply.toLocaleString()}`);
        console.log(`=========================\n`);
        
    } catch (error) {
        console.log("Error fetching data. Check your internet connection.");
    }
}

const targetCoin = process.argv[2] || 'bitcoin';
analyzeToken(targetCoin);