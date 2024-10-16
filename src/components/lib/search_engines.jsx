/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Icon } from "antd";

import PizzaImg from "../Icon/pizza.svg";

export const SearchEngines = {
  Pizza: "pizza",
};

export const generateIcon = (width, height, src) => {
  return () => <img height={height} width={width} src={src} />;
};

export const SearchEngineIcon = ({
  distribution,
  width = "24px",
  height = "24px",
}) => {
  const [pizzaIcon] = useMemo(() => {
    return [
      generateIcon(width, height, PizzaImg),
    ];
  }, [width, height]);
  switch (distribution) {
    case SearchEngines.Pizza:
      return (
        <Icon
          component={pizzaIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    default:
      return (
        <Icon
          component={pizzaIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
  }
};
