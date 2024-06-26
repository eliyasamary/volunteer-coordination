import "../style/styles.css";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getAllTasks, getRecommendations, getUser } from "../HTTP/http";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [closedTasks, setClosedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("id"));
  const [recommendationsTasks, setRecommendationsTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const user = await getUser(userId);
        const userData = user.data;
        const response = await getAllTasks();
        const filteredTasks = response.data.filter((task) =>
          task.volunteers.includes(userId.toString())
        );
        const open = filteredTasks.filter((task) =>
          userData.tasks.includes(task._id)
        );
        const closed = filteredTasks.filter((task) =>
          userData.completedTasks.includes(task._id)
        );
        if (open.length > 0) {
          setMyTasks(open);
        }
        if (closed.length > 0) {
          setClosedTasks(closed);
        }
        const response2 = await getRecommendations(userId);
        if (response2?.length > 0) {
          setRecommendationsTasks(response2);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  if (loading) {
    return (
      <Box className="loading">
        <CircularProgress color="inherit" />
      </Box>
    );
  }
  return (
    <Box className="content-box">
      <h1 className="title">Dashboard</h1>
      <div id="flex-cards">
        <div className="card">
          <h2 className="font-primary card-title">My Tasks</h2>
          <div className="card-items">
            {myTasks.length > 0 ? (
              myTasks.map((item) => (
                <Link
                  to={`/ItemPage/${item._id}`}
                  key={item._id}
                  className="link-decoration"
                >
                  <p key={item._id} className="detail-text pink-container">
                    {item.title}
                  </p>
                </Link>
              ))
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
        <div className="card">
          <h2 className="font-primary card-title">Tasks I Performed</h2>
          <div className="card-items">
            {closedTasks.length > 0 ? (
              closedTasks.map((item) => (
                <Link
                  to={`/ItemPage/${item._id}`}
                  key={item._id}
                  className="link-decoration"
                >
                  <p key={item._id} className="detail-text green-container">
                    {item.title}
                  </p>
                </Link>
              ))
            ) : (
              <p>None</p>
            )}{" "}
          </div>
        </div>
        <div className="card">
          <h2 className="font-primary card-title">Suggested Tasks</h2>
          <div className="card-items">
            {recommendationsTasks.length > 0 ? (
              recommendationsTasks.map((item) => (
                <Link
                  to={`/ItemPage/${item._id}`}
                  key={item._id}
                  className="link-decoration"
                >
                  <p key={item._id} className="detail-text orange-container">
                    {item.title}
                  </p>
                </Link>
              ))
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
