import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();

    const db = client.db('react-blog-db');

    const article = await db.collection('articles').findOne({ name });
    if (article) {

        res.json(article);
    } else {
        res.sendStatus(404);
    }

})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
  //  const article = articlesInfo.find(a => a.name === name);//fake local db

    const client= new MongoClient('mongodb://localhost:27017');
    await client.connect();

    const db = client.db('react-blog-db');

    db.collection('articles').updateOne({name},{
        $inc:{ upvotes:1}, 
    })

    const article=await db.collection('articles').findOne({name});

    if (article) {
       // article.upvotes += 1;
        res.send(`The ${name} article has ${article.upvotes} upvotes!`);
    } else {
        res.send(`The ${name} article doesn\'t exist.`);
    }
})

app.post('/api/articles/:name/comments', (req, res) => {
    const { postedBy, text } = req.body;
    const { name } = req.params;
    const article = articlesInfo.find(a => a.name === name);
    if (article) {
        article.comments.push({ postedBy, text });
        res.send(article.comments);
    } else {
        res.send(`The ${name} article doesn\'t exist.`);
    }
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

