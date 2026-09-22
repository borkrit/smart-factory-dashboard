import { useState } from "react";
import Form from "./Form";
// TODO create html for add operator 
const AddOperator = ()=>{

    const [operator,setOperator] = useState({
        operatorName:'',
        operatorShift:''
    })


    return (
        <Form />
    )

}

export default AddOperator;