import React, { useState } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import "./App.css";

const cards = [
  "http://clipart-library.com/images/8T65b4yjc.png",
  "https://opengameart.org/sites/default/files/king_of_hearts2.png",
  "https://opengameart.org/sites/default/files/queen_of_diamonds2.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTPsmXytIakEjzPvi6FSozhQkjVOS7jVb2JA&usqp=CAU",
  "https://cdn2.bigcommerce.com/n-d57o0b/1kujmu/products/297/images/932/10H__11470.1440113568.1280.1280.png?c=2",
  "https://cdn2.bigcommerce.com/n-d57o0b/1kujmu/products/297/images/926/4H__83243.1440113515.1280.1280.png?c=2",
  "https://cdn2.bigcommerce.com/n-d57o0b/1kujmu/products/297/images/924/2D__57497.1440113502.480.480.png?c=2",
  "https://opengameart.org/sites/default/files/7_of_clubs.png",
  "data:image/png;base64,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",
];



const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});


const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function App() {
  const [gone] = useState(() => new Set());
  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      set((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );

  return props.map(({ x, y, rot, scale }, i) => (
    <animated.div
      key={i}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
          backgroundImage: `url(${cards[i]})`,
        }}
      />
    </animated.div>
  ));
}

export default App;
