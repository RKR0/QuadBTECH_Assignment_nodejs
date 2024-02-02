import pool from "../config/db.js";
import axios from "axios";

const getData = async (req, res)=>{
    
    pool.query('SELECT * FROM dataquadb LIMIT 10', (err, result) => {
        if (err) {
          console.error('Error fetching data from the database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          const data = result.rows;
          res.json(data);
        }
});
}

const getDataholdInfo = async (req, res)=>{
    try {
        // Fetch data from WazirX API
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const data = response.data;

        // Extracting data for the top 10 results
        const top10Data = Object.values(data).slice(0, 10);

        // Clear existing data
        await pool.query('DELETE FROM dataquadb');

        // Insert new data into the database
        const insertQuery = 'INSERT INTO dataquadb (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)';
        for (const item of top10Data) {
            const values = [item.name, item.last, item.buy, item.sell, item.volume, item.base_unit];
            await pool.query(insertQuery, values);
        }



        res.send('Data fetched and stored successfully.');
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
   


}

const autosave = async (req, res,next)=>{
    try {
        // Fetch data from WazirX API
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const data = response.data;

        // Extracting data for the top 10 results
        const top10Data = Object.values(data).slice(0, 10);

        // Clear existing data
        await pool.query('DELETE FROM dataquadb');

        // Insert new data into the database
        const insertQuery = 'INSERT INTO dataquadb (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)';
        for (const item of top10Data) {
            const values = [item.name, item.last, item.buy, item.sell, item.volume, item.base_unit];
            await pool.query(insertQuery, values);
        }


            next();
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
   


}

export default { getData, getDataholdInfo,autosave}