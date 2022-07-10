import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <div>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Link to="/"> Go to HomePage</Link>
        </div>
    );

}

export default NotFound;