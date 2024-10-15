# react-elegant-timeline

A React timeline component with elegant styles.

[![npm version](https://img.shields.io/npm/v/react-elegant-timeline.svg?style=flat)](https://www.npmjs.com/package/react-elegant-timeline)
[![Coverage Status](https://coveralls.io/repos/github/anduscheung/react-elegant-timeline/badge.svg?branch=main)](https://coveralls.io/github/anduscheung/react-elegant-timeline?branch=main)

# Demo

![gif](https://github.com/anduscheung/my-icon-host/blob/main/react-elegant-timeline-demo.gif)

or check it out at my [personal website](https://www.anduscheung.com) (click the "MY EXPE." button and start scrolling!)

# Installation

```bash
npm install react-elegant-timeline
```

or

```bash
yarn add react-elegant-timeline
```

# Usage Example

```Javascript
import Timeline from 'react-elegant-timeline';
import "react-elegant-timeline/dist/styles.css";

const data = [
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
    buttonText: "Custom text for button 2",
  },
  {
    title: "Event 3",
    description: "Description of event 3",
    buttonText: "Custom text for button 3",
  },
];

<Timeline data={data} />;
```

# Props

## data: Array of Objects

List of timeline items to render.

Each object in the data array should have the following properties:

| Prop          | Type   | Required | Default          | Description                                                                           |
| ------------- | ------ | -------- | ---------------- | ------------------------------------------------------------------------------------- |
| `title`       | string | ☑️       | None             | Title of the timeline item                                                            |
| `description` | string | ☑️       | None             | Description text for the item                                                         |
| `tagline`     | string |          | None             | (optional) Tagline for the item, tagline will be hidden if not provided               |
| `link`        | string |          | None             | (optional) URL for the button link, button will be hidden if you do not provide       |
| `image`       | string |          | None             | (optional) URL for an image, image will be hidden if not provided                     |
| `buttonText`  | string |          | "Click for more" | (optional) Custom text for the button, if provided, will override default button text |

# Custom Styles

By default, the timeline is styled with timeline.css. You can override the styles by providing your own custom CSS.

# License

MIT © Andus Cheung
