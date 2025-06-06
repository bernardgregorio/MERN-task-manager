const whitelist = [
  "http://localhost:5173",
  "https://accounts.google.com",
  "http://172.19.0.3:5173/",
  "http://tms.local",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
export default corsOptions;
