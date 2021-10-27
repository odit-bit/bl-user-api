//import 3rd party lib
const { google } = require("googleapis");
const sheets = google.sheets("v4");

//import std lib
const { env } = require("process");

const API_KEY = env.GOOGLE_SHEET_API_KEY;

async function FindByID(id, range) {
  const batchRange = ["A1:F1"];
  batchRange.push(range);
  const request = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: id, // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    ranges: batchRange, // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    valueRenderOption: "FORMATTED_VALUE", // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    dateTimeRenderOption: "SERIAL_NUMBER", // TODO: Update placeholder value.

    auth: API_KEY,
  };

  try {
    const response = (await sheets.spreadsheets.values.batchGet(request)).data;
    // TODO: Change code below to process the `response` object:
    //console.log(JSON.stringify(response, null, 2));

    //destructuring response..
    const [data1, data2] = response.valueRanges;
    const result = await sheetToJSON(data1, data2);
    return result;
  } catch (err) {
    const { error } = err.response.data;
    console.log(error);
    return error;
  }
}

function sheetToJSON(data1, data2) {
  const [value1] = data1.values;
  const [value2] = data2.values;
  const result = {};
  value1.map((item, index) => {
    result[item] = value2[index];
  });
  return result;
}

module.exports = FindByID;
