import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector(
    (state) => state.auth.user
  );

  return (
    <>
      <h1>Dashboard Page</h1>

      <h2>
        Welcome {user?.email}
      </h2>
    </>
  );
}

export default Dashboard;