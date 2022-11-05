const {body, validationResult} = require('express-validator')
const express = require('express');
const cors = require('cors');
const app = express();




const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


app.post('/', body('x').isInt(), body('y').isInt(), (req, res)=>{
 
  const x = req.body.x
  const y = req.body.y
  const operator = req.body.operation_type
  const operatorEnum = ['addition', 'subtraction', 'multiplication']
  let result
  let index

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()})
  }
  if(operatorEnum.includes(operator)){
    if(operator === 'addition'){
      index = 0
      result = x + y
    }else if (operator === 'subtraction'){
      index =1
      result = x-y
    }else if (operator === 'multiplication'){
      result = x*y
      index = 2
    }
    return res.status(200).json({
      status: "success",
     data: {
        slackUsername: 'Pinocchio',
        operation_type: operatorEnum[index],
        result
      }
    })
  }else {
    return res.status(400).json({
      status:"fail",
      message:"invalid operator"
    })
  }
})
app.listen(PORT,()=>{
  console.log(`serving on port ${PORT}`)
})