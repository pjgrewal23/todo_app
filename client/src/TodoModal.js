import React from 'react'
import { Modal, Form, Button, Input } from 'semantic-ui-react'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
let api = "http://localhost:9000";


//Modal for updating todo item
const TodoModal = props => {
    const [open, setOpen] = React.useState(false)
    const [todo, setTodo] = React.useState(props.todo.todo)

    const handleTodoChange = (e, { value }) => {
        setTodo(value);
    };
    const updateTask = id => {
        let updated = { todo:todo};
        
        axios
          .put(api + "/" + id, JSON.stringify(updated))
          .then(res => {
            getTasks();
            setOpen(false);
          });
      };

    const getTasks = () => {
        props.getTask()
    }
    return (
        
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button basic color='green'>Update</Button>}
        >
            <Form onSubmit={() => updateTask(props.todo.ID)}>
                <Input
                type="text"
                onChange={handleTodoChange}
                fluid
                value={todo}
                style={{ padding: 20 }}
                />
            <Modal.Actions style={{ paddingBottom: 20}}>
                <Button color='black' onClick={() => setOpen(false)}>
                Nope
                </Button>
                <Button
                content="Update"
                labelPosition='right'
                icon='checkmark'
                onClick={() => updateTask(props.todo.ID)}
                positive
                />
            </Modal.Actions>
            </Form>
        </Modal>
    )
}

export default TodoModal