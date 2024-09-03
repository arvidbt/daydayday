import { type DayProps } from "@/components/day";
import { api } from "@/trpc/server";
import { addDays, isPast, isToday } from "date-fns";
import { cache } from "react";

async function uncachedGenerateDateArray() {
  const userInfo = await api.userRouter.getUserInfo();

  if (!userInfo) {
    return;
  }

  const { birthday, lifeExpectancy } = userInfo;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, month, day] = birthday.split("-");

  const startDate = new Date(birthday);
  const endDate = addDays(startDate, lifeExpectancy! * 365);
  const dateArray: DayProps[] = [];

  let currentDate = startDate;

  while (currentDate <= endDate) {
    const formattedDate = new Date(currentDate);

    const dateInfo = {
      date: formattedDate,
      past: isPast(formattedDate),
      today: isToday(formattedDate),
      birthday:
        day && month
          ? formattedDate.getDate() === parseInt(day) &&
            formattedDate.getMonth() + 1 === parseInt(month)
          : false,
    };

    dateArray.push(dateInfo);
    currentDate = addDays(currentDate, 1);
  }

  return dateArray;
}

export const cachedGenerateDateArray = cache(uncachedGenerateDateArray);
