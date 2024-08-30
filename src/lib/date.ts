import { type DayProps } from "@/components/day";
import { api } from "@/trpc/server";
import { addDays, isPast, isToday } from "date-fns";

export async function generateDateArray() {
  const userInfo = await api.userRouter.getUserInfo();

  if (!userInfo) {
    return;
  }

  const { birthday, lifeExpectancy } = userInfo;

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
        formattedDate.getDate() === 27 && formattedDate.getMonth() + 1 === 2,
    };

    dateArray.push(dateInfo);
    currentDate = addDays(currentDate, 1);
  }

  return dateArray;
}
