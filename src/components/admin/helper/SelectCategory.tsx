import useEndpoint from "api/useEndpoint";
import { Select, Text } from "haki-ui";
import { ChangeEvent } from "react";
import { Category } from "shared-types";

type SelectCategoryProps = {
  handleChange: ({
    // eslint-disable-next-line no-unused-vars
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const SelectCategory = ({ handleChange }: SelectCategoryProps) => {
  const { error, result } = useEndpoint<undefined, Category[]>({
    endpoint: "/categories",
    preLoadResult: true,
  });

  return (
    <>
      <Select fullWidth name="category" onChange={handleChange} required>
        {result?.map(({ _id, name }) => (
          <option key={_id} value={name}>
            {name}
          </option>
        ))}
      </Select>
      {error && (
        <Text color="danger" variant="caption">
          {error}
        </Text>
      )}
    </>
  );
};

export default SelectCategory;
