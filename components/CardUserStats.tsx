import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title?: string;
  daily?: number;
  monthly?: number;
  children: ReactNode;
}

const CardUserStats: React.FC<CardDataStatsProps> = ({
  title,
  daily,
  monthly,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-row items-center space-x-2">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {children}
        </div>
        <span className="text-lg font-medium">{title}</span>
      </div>

      <div className="flex items-end justify-between mt-4">
        <div className="w-full max-w-44">
          <div>
            <div className="flex flex-row items-center justify-between">
              <h4 className="text-base font-bold text-current dark:text-white">
                Daily:
              </h4>
              <h4 className="text-base font-bold text-black dark:text-white">
                {daily}
              </h4>
            </div>
            <div className="flex flex-row items-center justify-between">
              <h4 className="text-base font-bold text-current dark:text-white">
                Monthly:
              </h4>
              <h4 className="text-base font-bold text-black dark:text-white">
                {monthly}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUserStats;
