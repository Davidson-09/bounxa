/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
//

import React from "react";
import date from "date-and-time";
import Link from "next/link";
import { useAccount } from "@particle-network/connectkit";
import { truncateString } from "@/utils/function.helper";

function EventsCard2({ data, text }: any) {
  const dateFormat = new Date(data?.start_date);
  const { address } = useAccount();
  return (
    <Link
      href={
        text
          ? ""
          : data.host === address!
            ? `/analytics/${data.id}`
            : `/event/${data.id}`
      }
      className="flex w-full flex-col items-start gap-3"
    >
      <div>
        <p className="font-medium">{date.format(dateFormat, "DD")}</p>
        <p className="text-[26px] font-medium">
          {date.format(dateFormat, "dddd")}
        </p>
      </div>
      <div className="group flex w-full justify-between rounded-xl bg-white p-3 text-black hover:bg-[#6637ED] hover:text-white">
        <div className="flex flex-col items-start">
          <p className="text-xs font-medium phone:text-base">
            {date.format(dateFormat, "hh:mm")}
          </p>
          <p className="font-bold">{truncateString(data.name, 14)}</p>
          <p className="text-sm font-medium phone:text-base">
            {truncateString(data.location, 13)}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <img
              src="/images/events.png"
              className="h-[18px] w-[18px] rounded-full"
              alt=""
            />
            <p className="text-sm font-medium capitalize">
              {truncateString(data.host_name, 10)}
            </p>
          </div>
          <div
            className={
              "mt-3 w-auto rounded-md bg-black p-1 text-[12px] font-medium text-white group-hover:bg-white group-hover:text-black"
            }
          >
            {text ? text : "View event"}
          </div>
        </div>
        <img
          src={data.image_url}
          className="h-[148px] w-[148px] rounded-xl"
          alt=""
        />
      </div>
    </Link>
  );
}

export default EventsCard2;
