import * as React from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { useState } from "react";

import { DateRange } from "react-date-range";

export default function BasicDateRangePicker(props: any) {
  const { minDate } = props;

  const maxDate = new Date();
  const [state, setState] = useState([
    {
      startDate: minDate,
      endDate: maxDate,
      key: "selection",
    },
  ]);

  return (
    <>
      <DateRange
        editableDateInputs={true}
        onChange={(item: any) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        minDate={minDate}
        maxDate={maxDate}
      />
    </>
  );
}
