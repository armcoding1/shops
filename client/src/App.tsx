import { FC } from "react";
import Signup from "./Signup";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App: FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    )
}

export default App;