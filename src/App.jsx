import { useMutation, useQuery } from "react-query";

const App = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3500/todos");
      if (response.ok) {
        // console.log(response.data);
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const { mutate } = useMutation({
    mutationFn: (newPost) =>
      fetch("http://localhost:3500/todos", {
        method: "POST",
        body: JSON.stringify(newPost),
      }).then((res) => res.json()),
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div>data is loading</div>;
  }

  return (
    <div>
      <button
        onClick={() =>
          mutate({
            userId: 400,
            id: "300",
            title: "Buy Toys",
            completed: false,
          })
        }
      >
        Add Post
      </button>
      {data?.map((todo) => (
        <div>
          <h3>ID: {todo.id}</h3>
          <h4>TITLE: {todo.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default App;
