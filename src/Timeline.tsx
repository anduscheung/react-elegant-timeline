import React from "react";
import TimelineItem from "./TimelineItem";
import FormatNumber from "./FormatNumber";
import "./Timeline.css";

export interface TimelineItemData {
  title: string;
  description: string;
  tagline?: string;
  link?: string;
  image?: string;
  buttonText?: string;
}

const Timeline: React.FC<{
  data: TimelineItemData[];
}> = ({ data }) => {
  return (
    <div className="timeline" id="elegant-timeline">
      {data.map((item, index) => {
        return (
          <TimelineItem
            key={index}
            number={FormatNumber(index)}
            title={item.title}
            description={item.description}
            tagline={item.tagline}
            link={item.link}
            image={item.image}
            buttonText={item.buttonText}
          />
        );
      })}
    </div>
  );
};

export default Timeline;
