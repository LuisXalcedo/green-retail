import { useDebouncedCallback } from "use-debounce";

const useDebouncedFieldUpdate = (
  updateFunction: (field: string, value: any) => void,
  delay: number = 1000
) => {
  const debouncedUpdate = useDebouncedCallback((field: string, value: any) => {
    updateFunction(field, value);
  }, delay);

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      debouncedUpdate(field, event.target.value);
    };

  return handleChange;
};

export default useDebouncedFieldUpdate;
