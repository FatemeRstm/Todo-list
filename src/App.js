import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";


class APP extends Component {
    constructor (props){
        super(props);

// تنظیم state
        this.state={
            userInput:"",
            list:[],
        };
    }
    //تنظیم کاربر و مقدار ورودی 
    updateInput(value){
        this.setState({
            userInput:value,
        });
    }

    //وارد کردن ورودی اگر کاربر مقدار تهی وارد نکند 
    addItem(){
        if(this.state.userInput !==""){
            const userInput={
                id:Math.random(),
                value:this.state.userInput,
            };

            //به روز کردن لیست 

            const list= [...this.state.list];
            list.push(userInput);

            this.setState({
                list,userInput:"",
            });
        }
    }

    //تابع حذف ایتم با استفاده از ای دی 

    deleteItem(key){
        const list=[...this.state.list];
        const updateInput=list.filter((item) => item.id !==key);

        this.setState({
            list:updateInput,
        });
    }

    editItem=(index) => {
        const todos=[...this.state.list];
        const editedTodo=prompt('Edit the Todo :');
        if(editedTodo!==null && editedTodo.trim() !==''){
            let updatedTodos=[...todos]
            updatedTodos[index].value=editedTodo 
            this.setState({list:updatedTodos,});
        }
    }
    render(){
        return(
            <Container>
                <Row style={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    fontSize:'3rem',
                    fontWeight:'bolder',
                    backgroundColor:'gray'
                }} >
                    Todo List
                </Row>

                <hr/>
                <Row>
                <Col md={{
                    span:5, 
                    offset:4
                }} >
                    <InputGroup className='mb-3'>
                    <FormControl 
                    placeholder="add Item . . ."
                    size="lg"
                    value={
                        this.state.userInput
                    }
                    onChange={(item) =>
                        this.updateInput(item.target.value)
                    }
                    aria-label="add something"
                    aria-describedby="basic-addon2"
                    />
                    <InputGroup>
                    <Button 
                    variant="dark"
                    className="mt-2"
                    onClick={()=>this.addItem()}
                    >
                    add
                    </Button>
                    </InputGroup>
                    </InputGroup>
                
                </Col>
                </Row>
                <Row>
                    <Col md={{span:5,offset:4}}>
                        <ListGroup>
                            {this.state.list.map((item,index)=>{
                                return(
                                    <div key={item.id}>
                                        <ListGroup.Item 
                                        variant="dark"
                                        action
                                        style={{
                                            display:'flex',
                                            justifyContent:'space-between'

                                        }}>
                                           {item.value}
                                           <span>
                                            <Button style={{marginRight:'10px'}}
                                            variant="light"
                                            onClick={()=>this.deleteItem(item.id)}>
                                                delete
                                            </Button>
                                            <Button variant="light"
                                            onClick={()=>this.editItem(index)}
                                            >
                                                edit
                                            </Button>
                                            </span>     
                                        </ListGroup.Item>
                                    </div>
                                )
                            })}
                        </ListGroup>
                    
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default APP;