const {body, validationResult} = require('express-validator')
const express = require('express');
const cors = require('cors');
const app = express();




const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


app.get('/', (req, res)=> {
  res.status(200).json({
      slackUsername: 'Pinocchio',
      backend: true,
      age: 23,
      bio: 'i am a boy trying to make it'
  
  })
})


app.post('/', body('x').isInt(), body('y').isInt(), (req, res)=>{
 
  const x = req.body.x
  const y = req.body.y
  const operator = req.body.operation_type
  const operatorEnum = ['addition', 'substraction', 'multiplication']
  let result
  let index

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()})
  }
  if(operatorEnum.includes(operator)){
    if(operator === 'addition'){
      index = 1
      result = x + y
    }else if (operator === 'substraction'){
      index =1
      result = x-y
    }else if (operator === 'multiplication'){
      result = x*y
      index = 2
    }
    return res.status(200).json({
      slackUsername: 'Pinocchio',
      operation_type: operatorEnum[index],
      result
    })
  }
})
app.listen(PORT,()=>{
  console.log(`serving on port ${PORT}`)
})