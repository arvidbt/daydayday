"use client";

import { Day, type DayProps } from "./day";
import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/lib/utils";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface VirtualisedListProps {
  dateArray: DayProps[];
}

export function VirtualisedList({ dateArray }: VirtualisedListProps) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: Math.floor(dateArray.length / 64),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 200,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: 64,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 0,
  });

  return (
    <div
      ref={parentRef}
      className={cn(`relative m-auto h-full w-1/2 overflow-y-auto`)}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => (
        <React.Fragment key={virtualRow.key}>
          {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
            <div
              key={virtualColumn.key}
              className="absolute left-0 top-0"
              style={{
                transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
              }}
            >
              <Day
                {...dateArray.at(virtualRow.index * 64 + virtualColumn.index)!}
                key={virtualColumn.key}
              />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
