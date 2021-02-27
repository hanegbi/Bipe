import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { Container } from "react-bootstrap";

function App() {
    return (
        <Router>
            <main className="py-3">
                <Container>
                    <Route path="/" component={HomeScreen} exact />
                </Container>
            </main>
        </Router>
    );
}

export default App;
