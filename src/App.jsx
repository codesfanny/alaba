import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import BlogPage from "./component/BlogPage";
import BlogList from "./component/BlogList";
import BlogEdit from "./component/BlogEdit";
import { useState } from "react";
import AuthContext from "./contexts/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/Layout";
import CreateBlogPost from "./component/CreateBlogPost";

const queryClient = new QueryClient();

function App() {
  const [auth, setAuth] = useState({});
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ setAuth, auth }}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/bloglist" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/blog/:id/edit" element={<BlogEdit />} />
              <Route path="/createblogpost" element={<CreateBlogPost />} />
            </Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
