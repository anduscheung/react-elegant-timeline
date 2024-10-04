# react-timeline-component

A React timeline component with elegant styles.

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
import 'react-timeline-component/dist/timeline.css';

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

## data: Array of Objects (Required)

List of timeline items to render.

Each object in the data array should have the following properties:

    •	title: string (required) — Title of the timeline item
    •	description: string (required) — Description text for the item
    •	tagline: string (required) — Tagline for the item
    •	link: string (required) — URL for the button link
    •	image: string (optional) — URL for an image (optional)
    •	buttonText: string (optional) — Custom text for the button (default: “Click for more”)

# Custom Styles

By default, the timeline is styled with timeline.css. You can override the styles by providing your own custom CSS.

# License

MIT © Andus Cheung
