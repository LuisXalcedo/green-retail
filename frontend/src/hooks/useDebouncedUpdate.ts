import { useDebouncedCallback } from "use-debounce";

const useDebouncedUpdate = (
  updateFunction: (value: string) => void,
  delay: number = 300
) => {
  const debouncedUpdate = useDebouncedCallback((newValue: string) => {
    updateFunction(newValue);
  }, delay);

  return debouncedUpdate;
};

export default useDebouncedUpdate;
