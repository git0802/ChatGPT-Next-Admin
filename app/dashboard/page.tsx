"use client";
import React, { useEffect, useState } from "react";
import ModelChat from "@/components/Charts/ModelChat";
import CardDataStats from "@/components/CardDataStats";
import axios from "axios";
import BackdropPage from "@/components/Backdrop/Backdrop";

import PaymentsIcon from "@mui/icons-material/Payments";

import BasicDateRangePicker from "@/components/DataRangePicker";

const ECommerce: React.FC = () => {
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [logs, setLogs] = useState<any>([]);
  const [gpt4Input, setGpt4Input] = useState(0);
  const [gpt4Output, setGpt4Output] = useState(0);
  const [gpt3Input, setGpt3Input] = useState(0);
  const [gpt3Output, setGpt3Output] = useState(0);
  const [mistralInput, setMistralInput] = useState(0);
  const [mistralOutput, setMistralOutput] = useState(0);
  const [totalCost, setTotalCost] = useState("");
  const [minDate, setMinDate] = useState<Date>();
  const [maxDate, setMaxDate] = useState<Date>();
  const [categories, setCategories] = useState<any>([]);

  const [chartData, setChartData] = useState<any>([]);
  const [largestValue, setLargestValue] = useState(0);

  // function isToday(data: any) {
  //   const today = new Date();
  //   const date = new Date(data);
  //   return (
  //     date.getDate() === today.getDate() &&
  //     date.getMonth() === today.getMonth() &&
  //     date.getFullYear() === today.getFullYear()
  //   );
  // }

  // function isWithinLastWeek(data: any) {
  //   const now = new Date();
  //   const date = new Date(data);
  //   const oneWeekAgo = new Date(
  //     now.getFullYear(),
  //     now.getMonth(),
  //     now.getDate() - 7
  //   );

  function isWithinDate(date: Date, startDate: Date, endDate: Date) {
    const Currentdate = new Date(date);

    return Currentdate >= startDate && Currentdate <= endDate;
  }

  //   return date >= oneWeekAgo && date <= now;
  // }

  // function formatDate(date: any) {
  //   return date.toISOString().split("T")[0];
  // }

  // function separateDataByDate(data: any) {
  //   return data.reduce((acc: any, item: any) => {
  //     if (isWithinLastWeek(item.createdAt)) {
  //       const dateKey = formatDate(new Date(item.createdAt));
  //       if (!acc[dateKey]) {
  //         acc[dateKey] = [];
  //       }
  //       acc[dateKey].push(item);
  //     }
  //     return acc;
  //   }, {});
  // }

  function isGpt4(data: any) {
    return data === "gpt-4-0125-preview";
  }

  function isGpt3(data: any) {
    return data === "gpt-3.5-turbo";
  }

  function isMistral(data: any) {
    return data === "mistral-medium";
  }

  function isInput(data: any) {
    return data === "input";
  }

  function isOutput(data: any) {
    return data === "output";
  }

  function sumToken(data: any) {
    let token = 0;
    for (let i = 0; i < data.length; i++) {
      token = token + data[i].token;
    }

    return token;
  }

  function getInitialDate(data: any) {
    return data.reduce((earliest: any, item: any) => {
      const currentCreatedAt = new Date(item.createdAt);
      return currentCreatedAt < earliest ? currentCreatedAt : earliest;
    }, new Date(data[0].createdAt)); // Start comparing from the first date in the array
  }

  function getTotalCost(
    gpt4Input: number,
    gpt4Output: number,
    gpt3Input: number,
    gpt3Output: number,
    mistralInput: number,
    mistralOutput: number
  ) {
    const gpt4InputCost = gpt4Input * 0.01;
    const gpt4OutputCost = gpt4Output * 0.03;

    const gpt3InputCost = gpt3Input * 0.001;
    const gpt3OutputCost = gpt3Output * 0.002;

    const mistralInputCost = mistralInput * 2.5;
    const mistralOutputCost = mistralOutput * 7.5;

    const usd =
      (gpt4InputCost + gpt4OutputCost + gpt3InputCost + gpt3OutputCost) / 1000;

    const euro = (mistralInputCost + mistralOutputCost) / 1000000;

    const total = (usd + euro * 1.08).toFixed(4);

    return `$${total}`;
  }

  const tokenArray = (data: any) => {
    const getDate = (dateTime: any) => dateTime.split("T")[0];

    const tokenSumByDateAndModel = data.reduce(
      (acc: any, { createdAt, model, token }: any) => {
        const date = getDate(createdAt);
        if (!acc[date]) {
          acc[date] = {};
        }
        if (!acc[date][model]) {
          acc[date][model] = 0;
        }
        acc[date][model] += token;
        return acc;
      },
      {}
    );

    // Convert the token summary object into an array
    const tokenSummaryArray = Object.entries(tokenSumByDateAndModel).map(
      ([date, models]) => ({
        date,
        models: Object.entries(models as any).map(
          ([modelName, tokenTotal]) => ({
            model: modelName,
            totalTokens: tokenTotal,
          })
        ),
      })
    );

    let maxTotalTokens = -Infinity;

    tokenSummaryArray.forEach((entry) => {
      entry.models.forEach((modelInfo: any) => {
        if (modelInfo.totalTokens > maxTotalTokens) {
          maxTotalTokens = modelInfo.totalTokens;
        }
      });
    });

    setLargestValue(maxTotalTokens);

    const allModels = ["gpt-3.5-turbo", "gpt-4-0125-preview", "mistral-medium"];

    const completeData = tokenSummaryArray.map((day) => {
      // Create an object to store total tokens for each model
      const modelTotals: any = {};

      // Initialize all models to zero
      allModels.forEach((modelName) => {
        modelTotals[modelName] = { model: modelName, totalTokens: 0 };
      });

      // Fill in the actual totals from the day's data
      day.models.forEach((modelEntry) => {
        modelTotals[modelEntry.model].totalTokens = modelEntry.totalTokens;
      });

      // Get an array of the models from the totals object
      const modelsArray = Object.values(modelTotals);

      // Return the new object that contains the complete list of models
      return { date: day.date, models: modelsArray };
    });

    const chartDataFormat = allModels.map((modelName) => {
      return {
        name: modelName,
        data: completeData.map((day) => {
          const modelEntry: any = day.models.find(
            (model: any) => model.model === modelName
          );
          return modelEntry ? modelEntry.totalTokens : 0;
        }),
      };
    });
    const category = completeData.map((item) => item.date);

    setChartData(chartDataFormat);
    setCategories(category);
  };

  const getLogData = async () => {
    handleBackdropOpen();
    try {
      const { data } = await axios.get("/api/usage");

      // setLogs(data);

      // const userData = new Set(data.map((item: any) => item.email));
      // setUsers(userData);

      // const today = data.filter((item: any) => isToday(item.createdAt));
      // setTodayData(today);

      // const lastWeeksData = data.filter((item: any) =>
      //   isWithinLastWeek(item.createdAt)
      // );
      // setWeekData(lastWeeksData);

      const gpt4Data = logs.filter((item: any) => isGpt4(item.model));

      const gpt4InputData = gpt4Data.filter((item: any) =>
        isInput(item.methods)
      );
      const gpt4InputToken = sumToken(gpt4InputData);
      setGpt4Input(gpt4InputToken);

      const gpt4OutputData = gpt4Data.filter((item: any) =>
        isOutput(item.methods)
      );
      const gpt4OutputToken = sumToken(gpt4OutputData);
      setGpt4Output(gpt4OutputToken);
      // const gpt4DatabyDate = separateDataByDate(gpt4Data);

      const gpt3Data = logs.filter((item: any) => isGpt3(item.model));
      const gpt3InputData = gpt3Data.filter((item: any) =>
        isInput(item.methods)
      );
      const gpt3InputToken = sumToken(gpt3InputData);
      setGpt3Input(gpt3InputToken);

      const gpt3OutputData = gpt3Data.filter((item: any) =>
        isOutput(item.methods)
      );
      const gpt3OutputToken = sumToken(gpt3OutputData);
      setGpt3Output(gpt3OutputToken);
      // const gpt3DatabyDate = separateDataByDate(gpt3Data);

      const mistralData = logs.filter((item: any) => isMistral(item.model));
      const mistralInputData = mistralData.filter((item: any) =>
        isInput(item.methods)
      );
      const mistralInputToken = sumToken(mistralInputData);
      setMistralInput(mistralInputToken);

      const mistralOutputData = mistralData.filter((item: any) =>
        isOutput(item.methods)
      );
      const mistralOutputToken = sumToken(mistralOutputData);
      setMistralOutput(mistralOutputToken);
      // const mistralDatabyDate = separateDataByDate(mistralData);

      const total = getTotalCost(
        gpt4InputToken,
        gpt4OutputToken,
        gpt3InputToken,
        gpt3OutputToken,
        mistralInputToken,
        mistralOutputToken
      );

      setTotalCost(total);

      const date = getInitialDate(logs);
      const today = new Date();

      setMinDate(date);
      setMaxDate(today);

      tokenArray(logs);

      handleBackdropClose();
    } catch (error) {
      console.error(error);
      handleBackdropClose();
    }
  };

  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };

  const handleBackdropOpen = () => {
    setBackdropOpen(true);
  };

  useEffect(() => {
    getLogData();
  }, [logs]);

  return (
    <>
      <BackdropPage open={backdropOpen} handleClose={handleBackdropClose} />

      <div className="flex w-full gap-4 my-5">
        <BasicDateRangePicker
          minDate={minDate}
          maxDate={maxDate}
          setLogs={setLogs}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5 w-full">
          <CardDataStats
            title="GPT-4 Turbo Token"
            input={gpt4Input}
            output={gpt4Output}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="24"
                height="24"
                viewBox="0 0 43 44"
                fill="none"
              >
                <defs>
                  <rect
                    id="path_0"
                    x="0"
                    y="0"
                    width="43"
                    height="43.580135196270106"
                  />
                </defs>
                <g
                  opacity="1"
                  transform="translate(0 0.000001981943071882597)  rotate(0 21.5 21.790067598135053)"
                >
                  <mask id="bg-mask-0" fill="white">
                    <use xlinkHref="#path_0"></use>
                  </mask>
                  <g mask="url(#bg-mask-0)">
                    <path
                      id="分组 1"
                      fillRule="evenodd"
                      style={{
                        fill: "#1976d2",
                        transform:
                          "translate(0 0) rotate(0 21.5 21.790067598135053)",
                      }}
                      d="M40.17 17.84L40.17 17.84C40.53 16.73 40.72 15.57 40.72 14.41C40.72 12.48 40.21 10.58 39.23 8.92C37.27 5.51 33.64 3.41 29.71 3.41C28.94 3.41 28.16 3.49 27.41 3.65C25.35 1.33 22.39 0 19.29 0L19.22 0L19.19 0C14.43 0 10.21 3.07 8.74 7.6C5.68 8.23 3.03 10.15 1.48 12.87C0.51 14.54 0 16.45 0 18.38C0 21.1 1.01 23.73 2.83 25.74C2.47 26.85 2.28 28.01 2.28 29.17C2.28 31.1 2.79 33 3.77 34.66C6.14 38.8 10.92 40.93 15.59 39.93C17.65 42.25 20.61 43.58 23.71 43.58L23.78 43.58L23.81 43.58C28.57 43.58 32.8 40.51 34.26 35.97C37.33 35.35 39.97 33.43 41.52 30.71C42.49 29.03 43 27.13 43 25.2C43 22.48 41.99 19.86 40.17 17.84Z M18.817 38.6948C18.727 38.7448 18.647 38.7948 18.557 38.8448C20.017 40.0648 21.867 40.7348 23.777 40.7348L23.787 40.7348C28.287 40.7248 31.937 37.0648 31.947 32.5648L31.947 22.4348C31.937 22.3848 31.907 22.3548 31.877 22.3348L28.207 20.2148L28.207 32.4548C28.207 32.9648 27.937 33.4348 27.487 33.6848L18.817 38.6948Z M17.3932 36.223L26.1632 31.163C26.2032 31.133 26.2232 31.093 26.2232 31.053L26.2132 31.053L26.2132 26.813L15.6232 32.933C15.1832 33.183 14.6432 33.183 14.2032 32.933L5.52317 27.923C5.44317 27.873 5.32317 27.803 5.26317 27.763C5.18317 28.223 5.14317 28.693 5.14317 29.163C5.14317 30.593 5.52317 31.993 6.23317 33.233L6.23317 33.233C7.70317 35.763 10.3932 37.313 13.3132 37.313C14.7432 37.313 16.1532 36.943 17.3932 36.223Z M8.20584 11.013C8.20584 10.923 8.20584 10.783 8.20584 10.713C6.41583 11.373 4.90584 12.643 3.95583 14.293L3.95583 14.293C3.24583 15.533 2.86583 16.943 2.86583 18.373C2.86583 21.293 4.41583 23.983 6.94584 25.443L15.7158 30.513C15.7558 30.533 15.8058 30.533 15.8358 30.503L19.5058 28.383L8.91584 22.273C8.47583 22.023 8.20584 21.553 8.20584 21.043L8.20584 21.033L8.20584 11.013Z M36.0546 18.1303L27.2846 13.0603C27.2446 13.0403 27.1946 13.0503 27.1646 13.0703L23.4946 15.1903L34.0846 21.3103C34.5246 21.5603 34.7946 22.0203 34.7946 22.5303C34.7946 22.5303 34.7946 22.5403 34.7946 22.5403L34.7946 32.8603C38.0046 31.6803 40.1446 28.6203 40.1446 25.2003C40.1446 22.2803 38.5846 19.5903 36.0546 18.1303Z M16.8345 12.4124C16.8045 12.4424 16.7845 12.4824 16.7845 12.5224L16.7845 12.5224L16.7845 16.7624L27.3745 10.6424C27.5945 10.5224 27.8445 10.4524 28.0945 10.4524C28.3445 10.4524 28.5845 10.5224 28.8045 10.6424L37.4845 15.6624C37.5645 15.7124 37.6545 15.7624 37.7345 15.8124L37.7345 15.8124C37.8145 15.3524 37.8545 14.8924 37.8545 14.4324C37.8545 9.92236 34.1945 6.26236 29.6845 6.26236C28.2545 6.26236 26.8545 6.64236 25.6045 7.35236L16.8345 12.4124Z M19.2209 2.84925C14.7109 2.84925 11.0509 6.49925 11.0509 11.0093L11.0509 21.1393C11.0609 21.1893 11.0809 21.2193 11.1209 21.2393L14.7909 23.3593L14.8009 11.1293L14.8009 11.1193C14.8009 10.6193 15.0709 10.1493 15.5109 9.89925L24.1909 4.88925C24.2609 4.83925 24.3809 4.77925 24.4409 4.73925C22.9809 3.51925 21.1309 2.84925 19.2209 2.84925Z M16.783 24.5101L21.503 27.2401L26.223 24.5101L26.223 19.0601L21.503 16.3401L16.783 19.0701L16.783 24.5101Z "
                    />
                  </g>
                </g>
              </svg>
            </div>
          </CardDataStats>
          <CardDataStats
            title="GPT-3.5 Turbo Token"
            input={gpt3Input}
            output={gpt3Output}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="24"
              height="24"
              viewBox="0 0 43 44"
              fill="none"
            >
              <defs>
                <rect
                  id="path_0"
                  x="0"
                  y="0"
                  width="43"
                  height="43.580135196270106"
                />
              </defs>
              <g
                opacity="1"
                transform="translate(0 0.000001981943071882597)  rotate(0 21.5 21.790067598135053)"
              >
                <mask id="bg-mask-0" fill="white">
                  <use xlinkHref="#path_0"></use>
                </mask>
                <g mask="url(#bg-mask-0)">
                  <path
                    id="分组 1"
                    fillRule="evenodd"
                    style={{
                      fill: "#9c27b0",
                      transform:
                        "translate(0 0) rotate(0 21.5 21.790067598135053)",
                    }}
                    d="M40.17 17.84L40.17 17.84C40.53 16.73 40.72 15.57 40.72 14.41C40.72 12.48 40.21 10.58 39.23 8.92C37.27 5.51 33.64 3.41 29.71 3.41C28.94 3.41 28.16 3.49 27.41 3.65C25.35 1.33 22.39 0 19.29 0L19.22 0L19.19 0C14.43 0 10.21 3.07 8.74 7.6C5.68 8.23 3.03 10.15 1.48 12.87C0.51 14.54 0 16.45 0 18.38C0 21.1 1.01 23.73 2.83 25.74C2.47 26.85 2.28 28.01 2.28 29.17C2.28 31.1 2.79 33 3.77 34.66C6.14 38.8 10.92 40.93 15.59 39.93C17.65 42.25 20.61 43.58 23.71 43.58L23.78 43.58L23.81 43.58C28.57 43.58 32.8 40.51 34.26 35.97C37.33 35.35 39.97 33.43 41.52 30.71C42.49 29.03 43 27.13 43 25.2C43 22.48 41.99 19.86 40.17 17.84Z M18.817 38.6948C18.727 38.7448 18.647 38.7948 18.557 38.8448C20.017 40.0648 21.867 40.7348 23.777 40.7348L23.787 40.7348C28.287 40.7248 31.937 37.0648 31.947 32.5648L31.947 22.4348C31.937 22.3848 31.907 22.3548 31.877 22.3348L28.207 20.2148L28.207 32.4548C28.207 32.9648 27.937 33.4348 27.487 33.6848L18.817 38.6948Z M17.3932 36.223L26.1632 31.163C26.2032 31.133 26.2232 31.093 26.2232 31.053L26.2132 31.053L26.2132 26.813L15.6232 32.933C15.1832 33.183 14.6432 33.183 14.2032 32.933L5.52317 27.923C5.44317 27.873 5.32317 27.803 5.26317 27.763C5.18317 28.223 5.14317 28.693 5.14317 29.163C5.14317 30.593 5.52317 31.993 6.23317 33.233L6.23317 33.233C7.70317 35.763 10.3932 37.313 13.3132 37.313C14.7432 37.313 16.1532 36.943 17.3932 36.223Z M8.20584 11.013C8.20584 10.923 8.20584 10.783 8.20584 10.713C6.41583 11.373 4.90584 12.643 3.95583 14.293L3.95583 14.293C3.24583 15.533 2.86583 16.943 2.86583 18.373C2.86583 21.293 4.41583 23.983 6.94584 25.443L15.7158 30.513C15.7558 30.533 15.8058 30.533 15.8358 30.503L19.5058 28.383L8.91584 22.273C8.47583 22.023 8.20584 21.553 8.20584 21.043L8.20584 21.033L8.20584 11.013Z M36.0546 18.1303L27.2846 13.0603C27.2446 13.0403 27.1946 13.0503 27.1646 13.0703L23.4946 15.1903L34.0846 21.3103C34.5246 21.5603 34.7946 22.0203 34.7946 22.5303C34.7946 22.5303 34.7946 22.5403 34.7946 22.5403L34.7946 32.8603C38.0046 31.6803 40.1446 28.6203 40.1446 25.2003C40.1446 22.2803 38.5846 19.5903 36.0546 18.1303Z M16.8345 12.4124C16.8045 12.4424 16.7845 12.4824 16.7845 12.5224L16.7845 12.5224L16.7845 16.7624L27.3745 10.6424C27.5945 10.5224 27.8445 10.4524 28.0945 10.4524C28.3445 10.4524 28.5845 10.5224 28.8045 10.6424L37.4845 15.6624C37.5645 15.7124 37.6545 15.7624 37.7345 15.8124L37.7345 15.8124C37.8145 15.3524 37.8545 14.8924 37.8545 14.4324C37.8545 9.92236 34.1945 6.26236 29.6845 6.26236C28.2545 6.26236 26.8545 6.64236 25.6045 7.35236L16.8345 12.4124Z M19.2209 2.84925C14.7109 2.84925 11.0509 6.49925 11.0509 11.0093L11.0509 21.1393C11.0609 21.1893 11.0809 21.2193 11.1209 21.2393L14.7909 23.3593L14.8009 11.1293L14.8009 11.1193C14.8009 10.6193 15.0709 10.1493 15.5109 9.89925L24.1909 4.88925C24.2609 4.83925 24.3809 4.77925 24.4409 4.73925C22.9809 3.51925 21.1309 2.84925 19.2209 2.84925Z M16.783 24.5101L21.503 27.2401L26.223 24.5101L26.223 19.0601L21.503 16.3401L16.783 19.0701L16.783 24.5101Z "
                  />
                </g>
              </g>
            </svg>
          </CardDataStats>
          <CardDataStats
            title="Mistral-Medium Token"
            input={mistralInput}
            output={mistralOutput}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 256 233"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <g>
                <rect
                  fill="#000000"
                  x="186.181818"
                  y="0"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#F7D046"
                  x="209.454545"
                  y="0"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#000000"
                  x="0"
                  y="0"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#000000"
                  x="0"
                  y="46.5454545"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#000000"
                  x="0"
                  y="93.0909091"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#000000"
                  x="0"
                  y="139.636364"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#000000"
                  x="0"
                  y="186.181818"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#F7D046"
                  x="23.2727273"
                  y="0"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#F2A73B"
                  x="209.454545"
                  y="46.5454545"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#F2A73B"
                  x="23.2727273"
                  y="46.5454545"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#000000"
                  x="139.636364"
                  y="46.5454545"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#F2A73B"
                  x="162.909091"
                  y="46.5454545"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#F2A73B"
                  x="69.8181818"
                  y="46.5454545"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#EE792F"
                  x="116.363636"
                  y="93.0909091"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#EE792F"
                  x="162.909091"
                  y="93.0909091"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#EE792F"
                  x="69.8181818"
                  y="93.0909091"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#000000"
                  x="93.0909091"
                  y="139.636364"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#EB5829"
                  x="116.363636"
                  y="139.636364"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#EE792F"
                  x="209.454545"
                  y="93.0909091"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#EE792F"
                  x="23.2727273"
                  y="93.0909091"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#000000"
                  x="186.181818"
                  y="139.636364"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#EB5829"
                  x="209.454545"
                  y="139.636364"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#000000"
                  x="186.181818"
                  y="186.181818"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#EB5829"
                  x="23.2727273"
                  y="139.636364"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#EA3326"
                  x="209.454545"
                  y="186.181818"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
                <rect
                  fill="#EA3326"
                  x="23.2727273"
                  y="186.181818"
                  width="46.5454545"
                  height="46.5454545"
                ></rect>
              </g>
            </svg>
          </CardDataStats>
          <CardDataStats title="Total Cost" total={totalCost}>
            <PaymentsIcon color="success" />
          </CardDataStats>
        </div>
      </div>

      <ModelChat categories={categories} data={chartData} max={largestValue} />
    </>
  );
};

export default ECommerce;
