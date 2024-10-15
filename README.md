# react-elegant-timeline

A React timeline component with elegant styles.

[![npm version](https://img.shields.io/npm/v/react-elegant-timeline.svg?style=flat)](https://www.npmjs.com/package/react-elegant-timeline)
[![Coverage Status](https://coveralls.io/repos/github/anduscheung/react-elegant-timeline/badge.svg?branch=main)](https://coveralls.io/github/anduscheung/react-elegant-timeline?branch=main)

# Demo

![gif](https://github.com/anduscheung/my-icon-host/blob/main/react-elegant-timeline-demo.gif)

or check it out at my [personal website](https://www.anduscheung.com) (click the "MY EXPE." button and start scrolling!)

# Installation

```bash
# Install with npm
npm install react-elegant-timeline
```

or

```bash
# Install with yarn
yarn add react-elegant-timeline
```

# Usage Example

```Javascript
import React from 'react';
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
      buttonText: "Custom button text for button 2",
    },
    {
      title: "Event 3",
      description: "Description of event 3",
      showButton: false,
    },
  ];

const App = () => {
  return <Timeline data={data} />;
};

export default App;
```

# Props

## data: Array of Objects

List of timeline items to render.

Each object in the data array should have the following properties:

| Prop          | Type    | Required | Default          | Description                                        |
| ------------- | ------- | -------- | ---------------- | -------------------------------------------------- |
| `title`       | string  | ☑️       | None             | Title of the timeline item                         |
| `description` | string  | ☑️       | None             | Description text for the item                      |
| `tagline`     | string  |          | None             | (optional) Tagline of the item                     |
| `link`        | string  |          | None             | (optional) URL to open when the button is clicked  |
| `image`       | string  |          | None             | (optional) URL of the image that you want to show  |
| `buttonText`  | string  |          | "Click for more" | (optional) Custom text for the button              |
| `showButton`  | boolean |          | true             | (optional) Controls whether the button should show |

## onButtonClick: Function (optional)

A custom click handler function to be called when the button is clicked. If both onButtonClick and link are provided, onButtonClick is called first, and the link will open afterward. If no link is provided and onButtonClick is not defined, the button will do nothing.

    •	Type: (data: TimelineItemData, index: number) => void
    •	Default: undefined

# Custom Styles

By default, the timeline is styled with timeline.css. You can override the styles by providing your own custom CSS.

```CSS
.timeline__item {
  background-color: #f4f4f4; /* Custom styles to override the default timeline item background */
}
```

# License

MIT © Andus Cheung
