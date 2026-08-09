import { format } from "date-fns";

const formattedDate = (date: string) => {
  return format(date, "MMM dd, yyyy");
};

export { formattedDate };
