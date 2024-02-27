import * as React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { useState } from "react";

import { DateRange } from "react-date-range";
import axios from "axios";

export default function BasicDateRangePicker(props: any) {
  const now = new Date();
  const minDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const { setLogs } = props;
  const [state, setState] = useState([
    {
      startDate: minDate,
      endDate: maxDate,
      key: "selection",
    },
  ]);

  function isWithinDate(date: any, startDate: any, endDate: any): boolean {
    const _date = new Date(date);
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);

    return (
      _date.getTime() >= _startDate.getTime() &&
      _date.getTime() <= _endDate.getTime()
    );
  }

  const getLogData = async (startDate: any, endDate: any) => {
    try {
      const { data } = await axios.get("/api/usage");

      const useData = data.filter((item: any) =>
        isWithinDate(item.createdAt, startDate!, endDate!)
      );

      if (typeof setLogs === "function") {
        setLogs(useData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getLogData(state[0].startDate, state[0].endDate);
  }, [state]);

  return (
    <>
      <DateRange
        editableDateInputs={true}
        onChange={(item: any) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </>
  );
}
