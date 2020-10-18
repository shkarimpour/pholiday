import express from "express";
import pholiday from "pholiday";

const app = express();
const port = process.env.PORT || 6006;

app.get("/today", (req, res) => {
  try {
    const pDate = pholiday();
    const isHoliday = pDate.isHoliday();
    const events = pDate.events();
    const persianDate = pDate.format("jYYYY-jMM-jDD");
    const gregorianDate = pDate.format("YYYY-MM-DD");

    res.status(200).json({ isHoliday, events, persianDate, gregorianDate });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: String(error) });
  }
});

app.get("/date/:date", (req, res) => {
  const { date: inputDate } = req.params;

  if (!inputDate) {
    return res.status(400).json({ error: "Please provide a date!" });
  }

  try {
    const pDate = pholiday(inputDate, "YYYY-MM-DD");
    if (pDate.isValid()) {
      const isHoliday = pDate.isHoliday();
      const events = pDate.events();
      const persianDate = pDate.format("jYYYY-jMM-jDD");
      const gregorianDate = pDate.format("YYYY-MM-DD");

      return res
        .status(200)
        .json({ isHoliday, events, persianDate, gregorianDate });
    } else {
      return res.status(400).json({
        error: `"${inputDate}" is an invalid date in gregorian calendar`,
      });
    }
  } catch (error) {
    console.log("error", error);
    if (String(error).includes("Invalid")) {
      return res.status(400).json({
        error: `"${inputDate}" is an invalid date in gregorian calendar`,
      });
    }
    return res.status(500).json({ error: String(error) });
  }
});

app.listen(port, () => console.log(`server is listening on port ${port}!`));
