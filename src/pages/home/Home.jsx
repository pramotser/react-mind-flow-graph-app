import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import "./home.scss";
import { Button } from "react-bootstrap";
import LoadingScreen from "../../components/layout/loading/LoadingScreen";
import { useState } from "react";

const Home = () => {

  const [loading, setLoading] = useState(false);
  const handlerLoading = () => {

    setLoading(true);

    setTimeout(() => {

      setLoading(false);
    }, 3000)
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
