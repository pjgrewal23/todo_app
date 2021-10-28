import './App.css';
import { Container } from 'semantic-ui-react';
import Todo from './Todo';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <Container>
        <Todo />
      </Container>
    </div>
  );
}

export default App;
