import axios from 'axios';

const API_URL = 'https://api.apilayer.com'; 

 

export async function getCurrencies(): Promise<string[]> {
  const apiKey = 'MO6W8BsOFgqZg7biTl45G3IwUe7EXuuH';
  const url = `${API_URL}/currencies?api_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Extract the list of currencies from the response data
    const currencies: string[] = Object.keys(data);

    return currencies;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    throw error;
  }
}

export async function getExchangeRate(baseCurrency: string, targetCurrency: string): Promise<number> {
  const apiKey = 'MO6W8BsOFgqZg7biTl45G3IwUe7EXuuH';
  const url = `${API_URL}/endpoint?api_key=${apiKey}&base=${baseCurrency}&symbols=${targetCurrency}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const exchangeRate = data.rates[targetCurrency];

    return exchangeRate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
}

