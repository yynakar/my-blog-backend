import express from 'express';

const app=express();
app.use(express.json());

app.post('/hello',(req, res)=>{
    res.send(`Hello ${req.body.name}`);
});

app.get('/hello/:name/gn/:otherName',(req,res)=>{
    console.log(req.params);
    const {otherName}=req.params;
    res.send(`Hello ${otherName}!!`);
})

app.listen(8000,()=>{
    console.log('Server is listening on port 8000');
});

