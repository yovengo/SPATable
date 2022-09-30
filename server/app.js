const express = require('express');
const { MongoClient } = require('mongodb');
const config = require('config');
const chalk = require('chalk');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = config.get('port') ?? 8080;
const client = new MongoClient(config.get('mongoUri'));

const start = async () => {
  try {
    const database = client.db('bkbqtsvyseqcjxm');
    const data = database.collection('data');
    console.log(chalk.green('MongoDB connected.'));

    app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}...`)));

    app.get('/api', async (req, res) => {
      data.find({}).toArray((error, result) => {
        res.send(result);
      });
    });

    // Добавление коллекции в базу данных

    // const options = { ordered: true };
    //
    // const result = await data.insertMany(dataMock, options);
    // console.log(chalk.green(`${result.insertedCount} documents were inserted`));
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
};

start();
