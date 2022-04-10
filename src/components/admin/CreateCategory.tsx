import { Button, Input, Text } from "haki-ui";
import { FormEvent } from "react";

const CreateCategory = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "1rem",
      }}
    >
      <Text>Enter the Category</Text>
      <div>
        <Input />
      </div>
      <Button variant="outlined">Create Category</Button>
    </form>
  );
};

export default CreateCategory;
