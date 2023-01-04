import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import "./home.scss";
import { Button } from "react-bootstrap";
import LoadingScreen from "../../components/layout/loading/LoadingScreen";
import { useState } from "react";
import { testGet } from "../../services/decision-service";

const Home = () => {

    const [loading, setLoading] = useState(false);
    const handlerLoading = () => {

        setLoading(true);

        testGet().then(res => {
            console.log(res)
            setLoading(false);
        })
    }
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <LoadingScreen text="Loading..." loading={loading} />
                    <h2>HOME</h2>
                    <Button onClick={handlerLoading}>Test Loading</Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
