import customInstance from "../src/axiosInstance";

/* 
    A post contains: 
    {id: string,
    title: string,
    content: string,
    created_at: Date,
    }
*/

const BlogAPI = () => {
  const instance = customInstance;

  const fetchAllPosts = async () => {
    return instance.get("post").then((res) => {
      const data = res.data;

      const mappedData = data.map((v) => {
        return {
          id: v.id,
          title: v.title,
          body: v.content,
          createdAt: v.created_at,
        };
      });

      return mappedData;
    });
  };

  const createNewPost = async (values) => {
    return await instance.post("post", {
      title: values.title,
      content: values.body,
    });
  };

  const getSinglePost = async (id) => {
    return await instance.get(`post/${id}`).then((v) => {
      return {
        id: v.data.id,
        title: v.data.title,
        body: v.data.content,
        createdAt: v.data.created_at,
      };
    });
  };

  const editSinglePost = async (id, values) => {
    return await instance.put(`post/${id}`, {
      title: values.title,
      content: values.content,
    });
  };

  const deleteSinglePost = async (id) => {
    return await instance.delete(`post/${id}`);
  };

  return {
    fetchAllPosts,
    createNewPost,
    getSinglePost,
    editSinglePost,
    deleteSinglePost,
  };
};

export default BlogAPI;
