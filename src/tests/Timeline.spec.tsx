import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Timeline from "../Timeline";
import TimelineItem from "../TimelineItem";

describe("Timeline content rendering correctness", () => {
  const mockData = [
    {
      title: "Event 1",
      description: "Description of event 1",
      tagline: "Tagline 1",
      link: "https://example1.com",
      image: "image1.png",
    },
    {
      title: "Event 2",
      description: "Description of event 2",
      tagline: "Tagline 2",
      link: "https://example2.com",
      buttonText: "Custom button text for button 2",
    },
    {
      title: "Event 3",
      description: "Description of event 3",
      buttonText: "Should be unused when button showButton is false",
      link: "Should be unused when button showButton is false",
      showButton: false,
    },
  ];
  test("renders timeline content correctly", () => {
    render(<Timeline data={mockData} />);

    // first timeline item
    expect(screen.getByText("01", { selector: "h1" })).toBeInTheDocument();
    expect(
      screen.getByText(mockData[0].title, { selector: "h2" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockData[0].description, { selector: "p" })
    ).toBeInTheDocument();
    expect(screen.queryByTestId("timeline-image-01")).toBeInTheDocument();
    expect(
      screen.getByText("Click for more", { selector: "button" })
    ).toBeInTheDocument();

    // second timeline item (no image, custom button text)
    expect(screen.getByText("02", { selector: "h1" })).toBeInTheDocument();
    expect(
      screen.getByText(mockData[1].title, { selector: "h2" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockData[1].description, { selector: "p" })
    ).toBeInTheDocument();
    expect(screen.queryByTestId("timeline-image-02")).not.toBeInTheDocument();
    expect(
      screen.getByText(mockData[1].buttonText!, { selector: "button" })
    ).toBeInTheDocument();

    // third timeline item (no image, no tagline, no button)
    expect(screen.queryByTestId("timeline__tagline")).not.toBeInTheDocument();
    expect(
      screen.getByText(mockData[2].title, { selector: "h2" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockData[2].description, { selector: "p" })
    ).toBeInTheDocument();
    expect(screen.queryByTestId("timeline-image-03")).not.toBeInTheDocument();
    expect(screen.queryByTestId("timeline-button-03")).not.toBeInTheDocument();
  });
});

describe("TimelineItem button click behavior", () => {
  const mockUrl = "https://example.com";
  const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);

  afterEach(() => {
    openSpy.mockClear();
  });

  test("calls onButtonClick when provided and no link is present", () => {
    const mockOnClick = jest.fn();

    render(
      <TimelineItem
        index={0}
        data={{
          title: "Test Title",
          description: "Test Description",
          buttonText: "Click here",
        }}
        onButtonClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getByText("Click here"));
    expect(mockOnClick).toHaveBeenCalledWith(
      {
        title: "Test Title",
        description: "Test Description",
        buttonText: "Click here",
      },
      0
    );
    expect(openSpy).not.toHaveBeenCalled();
  });

  test("opens link when provided and no onButtonClick is present", () => {
    render(
      <TimelineItem
        index={0}
        data={{
          title: "Test Title",
          description: "Test Description",
          buttonText: "Click here",
          link: mockUrl,
        }}
      />
    );

    fireEvent.click(screen.getByText("Click here"));
    expect(openSpy).toHaveBeenCalledWith(mockUrl, "_blank");
  });

  test("calls both onButtonClick and opens link when both are provided", () => {
    const mockOnClick = jest.fn();

    render(
      <TimelineItem
        index={0}
        data={{
          title: "Test Title",
          description: "Test Description",
          buttonText: "Click here",
          link: mockUrl,
        }}
        onButtonClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getByText("Click here"));
    expect(mockOnClick).toHaveBeenCalledWith(
      {
        title: "Test Title",
        description: "Test Description",
        buttonText: "Click here",
        link: mockUrl,
      },
      0
    );
    expect(openSpy).toHaveBeenCalledWith(mockUrl, "_blank");
  });

  test("does nothing when neither onButtonClick nor link is provided", () => {
    render(
      <TimelineItem
        index={0}
        data={{
          title: "Test Title",
          description: "Test Description",
          buttonText: "Click here",
        }}
      />
    );

    fireEvent.click(screen.getByText("Click here"));
    expect(openSpy).not.toHaveBeenCalled(); // window.open should not be called
  });
});

describe("TimelineItem scrolling behavior", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 400,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
    });
  });

  test("first element is not visible before scrolling", () => {
    // @ts-ignore
    jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      top: 450, // Element is above the threshold (half the viewport)
      bottom: 850,
      height: 400,
      width: 800,
      left: 0,
      right: 800,
    });

    const { getByTestId } = render(
      <TimelineItem
        index={0}
        data={{
          title: "Test Title",
          description: "Test Description",
          tagline: "Test Tagline",
          link: "/test",
          image: "test.png",
        }}
      />
    );

    expect(getByTestId("timeline-indicator-frame-01")).not.toHaveClass(
      "timeline__indicator-frame--active"
    );
    expect(getByTestId("timeline-item-content-01")).not.toHaveClass(
      "timeline__item-content--visible"
    );

    // Progress bar should not have height before the first element is visible for the first time
    // Reason: initial height from css file is not detected because of limitation of JSDOM
    const progressElement = getByTestId("timeline-progress-01");
    expect(progressElement.style.height).toBe("");
  });

  test("first element becomes visible when scrolled into view", () => {
    // @ts-ignore
    jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      top: 100, // Element is now within the viewport
      bottom: 500,
      height: 400,
      width: 800,
      left: 0,
      right: 800,
    });

    const { getByTestId } = render(
      <TimelineItem
        index={0}
        data={{
          title: "Test Title",
          description: "Test Description",
          tagline: "Test Tagline",
          link: "/test",
          image: "test.png",
        }}
      />
    );

    fireEvent.scroll(window, { target: { scrollY: 150 } });

    expect(getByTestId("timeline-indicator-frame-01")).toHaveClass(
      "timeline__indicator-frame--active"
    );
    expect(getByTestId("timeline-item-content-01")).toHaveClass(
      "timeline__item-content--visible"
    );

    // Progress bar should be updated based on scroll position
    const progressElement = getByTestId("timeline-progress-01");
    expect(progressElement.style.height).toBe("75%"); // Adjust based on the expected progress calculation
  });

  test("first element becomes invisible when scrolled below threshold but still in viewport", () => {
    // @ts-ignore
    jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      top: 600, // Element is still in the viewport but below the threshold
      bottom: 1000,
      height: 400,
      width: 800,
      left: 0,
      right: 800,
    });

    const { getByTestId } = render(
      <TimelineItem
        index={0}
        data={{
          title: "Test Title",
          description: "Test Description",
          tagline: "Test Tagline",
          link: "/test",
          image: "test.png",
        }}
      />
    );

    fireEvent.scroll(window, { target: { scrollY: -150 } });

    expect(getByTestId("timeline-indicator-frame-01")).not.toHaveClass(
      "timeline__indicator-frame--active"
    );
    expect(getByTestId("timeline-item-content-01")).not.toHaveClass(
      "timeline__item-content--visible"
    );

    // Progress bar height should be reset to 0
    const progressElement = getByTestId("timeline-progress-01");
    expect(progressElement.style.height).toBe("0%");
  });

  test("first element stays visible when scrolled above viewport (above threshold)", () => {
    // @ts-ignore
    jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      top: -100, // Element is scrolled above the viewport, stays visible
      bottom: 300,
      height: 400,
      width: 800,
      left: 0,
      right: 800,
    });

    const { getByTestId } = render(
      <TimelineItem
        index={0}
        data={{
          title: "Test Title",
          description: "Test Description",
          tagline: "Test Tagline",
          link: "/test",
          image: "test.png",
        }}
      />
    );

    fireEvent.scroll(window, { target: { scrollY: -300 } });

    // Element should remain active and visible
    expect(getByTestId("timeline-indicator-frame-01")).toHaveClass(
      "timeline__indicator-frame--active"
    );
    expect(getByTestId("timeline-item-content-01")).toHaveClass(
      "timeline__item-content--visible"
    );

    // Progress bar height should remain at full (100%)
    const progressElement = getByTestId("timeline-progress-01");
    expect(progressElement.style.height).toBe("100%");
  });
});
