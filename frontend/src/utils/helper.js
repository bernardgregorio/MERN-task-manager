import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const stringAvatar = (name, size = 40) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      height: size,
      fontSize: 18,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

export const formatDate = (date, format) => {
  switch (format) {
    case "YYYY-MM-DD":
      return dayjs(date).format("YYYY-MM-DD");
    default:
      return dayjs(date).fromNow();
  }
};

export const errorMsg = (error) => {
  let msg = error?.data?.message[0].msg
    ? error?.data?.message[0].msg
    : error?.data?.message
    ? error?.data?.message
    : "Invalid. Please try again.";

  return msg;
};
