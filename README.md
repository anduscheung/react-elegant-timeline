# react-timeline-component

A React timeline component with elegant styles.

[![npm version](https://img.shields.io/npm/v/react-elegant-timeline.svg?style=flat)](https://www.npmjs.com/package/react-elegant-timeline)
[![Coverage Status](https://coveralls.io/repos/github/anduscheung/react-elegant-timeline/badge.svg?branch=main)](https://coveralls.io/github/anduscheung/react-elegant-timeline?branch=main)

# Demo

![gif](https://github.com/anduscheung/my-icon-host/blob/main/react-elegant-timeline-demo.gif)

or check it out at my [personal website](https://www.anduscheung.com) (click the "MY EXPE." button and start scrolling!)

# Installation

```bash
npm install react-timeline-component
```

or

```bash
yarn add react-timeline-component
```

# Usage Example

```Javascript
import Timeline from 'react-timeline-component';
import "react-elegant-timeline/dist/styles.css";

const data = [
  {
    title: "Event 1",
    description: "Description for event 1",
    tagline: "Tagline 1",
    link: "https://example.com/event1",
    image: "path/to/image1.png",
    buttonText: "Learn More"
  },
  {
    title: "Event 2",
    description: "Description for event 2",
    tagline: "Tagline 2",
    link: "https://example.com/event2"
  }
];

<Timeline data={data} />;
```

# Props

## data: Array of Objects

List of timeline items to render.

Each object in the data array should have the following properties:

| Prop          | Type   | Required | Default          | Description                           |
| ------------- | ------ | -------- | ---------------- | ------------------------------------- |
| `title`       | string | ☑️       | None             | Title of the timeline item            |
| `description` | string | ☑️       | None             | Description text for the item         |
| `tagline`     | string | ☑️       | None             | Tagline for the item                  |
| `link`        | string | ☑️       | None             | URL for the button link               |
| `image`       | string |          | None             | URL for an image (optional)           |
| `buttonText`  | string |          | "Click for more" | Custom text for the button (optional) |

# Custom Styles

By default, the timeline is styled with timeline.css. You can override the styles by providing your own custom CSS.

# License

MIT © Andus Cheung
