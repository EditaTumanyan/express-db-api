const express = require('express');
const { Pool } = require('pg');//Imports the Pool class from the 'pg' module
const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;


//Creates a new instance of Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: 5432,
  });

  
app.use(express.json());


app.post('/foods',  async(req, res)=>{
    const {name, price} = req.body
    if(!name || !price){
        return res.status(400).json({message: 'Name and price are required'})
    }
    try {
        const client = await pool.connect()
        const query = 'INSERT INTO foods (name, price) VALUES ($1, $2)'
        const values = [name, price]
        await client.query(query, values)
        client.release()

        return res.status(201).json({message: 'Food created'})


    } catch (error) {   
        console.error("Error creating food", error)
        return res.status(500).json({message: 'Error creating food'})

        
    }
})

app.get('/foods', async(req, res)=>{
    try {
        const client = await pool.connect()
        const result =await client.query('SELECT * FROM foods') 
        const foods = result.rows
        client.release()
        return res.status(200).json(foods)
        
    } catch (error) {
        console.error("Error getting foods", error)
        return res.status(500).json({message: 'Error getting foods'})
        
    }
})

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})