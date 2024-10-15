import React, { Component, createRef } from "react";
import "./Timeline.css";
import { TimelineItemData } from "./Timeline";
import FormatNumber from "./FormatNumber";
interface TimelineItemProps {
  index: number;
  data: TimelineItemData;
  onButtonClick?: (data: TimelineItemData, index: number) => void;
}

interface TimelineItemState {
  isVisible: boolean;
}

class TimelineItem extends Component<TimelineItemProps, TimelineItemState> {
  itemRef: React.RefObject<HTMLDivElement>;
  progressRef: React.RefObject<HTMLDivElement>;
  number: string;

  constructor(props: TimelineItemProps) {
    super(props);
    this.state = {
      isVisible: false,
    };

    this.itemRef = createRef();
    this.progressRef = createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.number = FormatNumber(this.props.index);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    if (this.itemRef.current && this.progressRef.current) {
      const itemTop = this.itemRef.current.getBoundingClientRect().top;
      const itemHeight = this.itemRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const threshold = windowHeight / 2;
      if (itemTop < threshold) {
        this.setState({ isVisible: true });
        const progress = Math.min(
          Math.max(((threshold - itemTop) * 100) / itemHeight, 0),
          100
        );

        this.progressRef.current.style.height = `${progress}%`;
      } else {
        this.setState({ isVisible: false });
        this.progressRef.current.style.height = "0%";
      }
    }
  }

  render() {
    const {
      data: {
        title,
        description,
        tagline,
        link,
        image,
        buttonText,
        showButton = true,
      },
      onButtonClick,
    } = this.props;
    const { isVisible } = this.state;

    return (
      <div ref={this.itemRef} className="timeline__item">
        <div className="timeline__empty-content"></div>
        <div className="timeline__main-axis">
          <div
            data-testid={`timeline-indicator-frame-${this.number}`}
            className={`timeline__indicator-frame ${
              isVisible ? "timeline__indicator-frame--active" : ""
            }`}
          >
            <h1>{this.number}</h1>
          </div>
          <div className="timeline__progress-bar">
            <div
              data-testid={`timeline-progress-${this.number}`}
              className="timeline__progress"
              ref={this.progressRef}
            ></div>
          </div>
        </div>
        <div
          data-testid={`timeline-item-content-${this.number}`}
          className={`timeline__item-content ${
            isVisible ? "timeline__item-content--visible" : ""
          }`}
        >
          {tagline && <span className="timeline__tagline">{tagline}</span>}
          <h2>{title}</h2>
          {image && (
            <img
              data-testid={`timeline-image-${this.number}`}
              src={image}
              alt={title}
              width={200}
              height={200}
              className="timeline__image"
            />
          )}
          <p>{description}</p>

          <button
            data-testid={`timeline-button-${this.number}`}
            className="timeline__button"
            onClick={() => {
              onButtonClick && onButtonClick(this.props.data, this.props.index);
              link && window.open(link, "_blank");
            }}
          >
            {buttonText ? buttonText : "Click for more"}
          </button>
        </div>
      </div>
    );
  }
}

export default TimelineItem;
