import React from "react";
import TimelineItem from "./TimelineItem";
import "./Timeline.css";

export interface TimelineItemData {
  title: string;
  description: string;
  tagline?: string;
  link?: string;
  image?: string;
  buttonText?: string;
  showButton?: boolean;
}

const Timeline: React.FC<{
  data: TimelineItemData[];
  onButtonClick?: (data: TimelineItemData, index: number) => void;
}> = ({ data, onButtonClick }) => {
  return (
    <div className="timeline" id="elegant-timeline">
      {data.map((item, index) => {
        return (
          <TimelineItem
            key={index}
            index={index}
            data={item}
            onButtonClick={onButtonClick}
          />
        );
      })}
    </div>
  );
};

export default Timeline;
