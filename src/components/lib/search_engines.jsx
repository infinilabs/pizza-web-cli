/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Icon } from "antd";

import ElasticImg from "../Icon/elasticsearch.svg";
import EasysearchImg from "../Icon/easysearch.svg";
import OpenSearchImg from "../Icon/opensearch.svg";

export const SearchEngines = {
  Elasticsearch: "elasticsearch",
  Opensearch: "opensearch",
  Easysearch: "easysearch",
};

export const generateIcon = (width, height, src) => {
  return () => <img height={height} width={width} src={src} />;
};

export const SearchEngineIcon = ({
  distribution,
  width = "24px",
  height = "24px",
}) => {
  const [elasticsearchIcon, easysearchIcon, opensearchIcon] = useMemo(() => {
    return [
      generateIcon(width, height, ElasticImg),
      generateIcon(width, height, EasysearchImg),
      generateIcon(width, height, OpenSearchImg),
    ];
  }, [width, height]);
  switch (distribution) {
    case SearchEngines.Easysearch:
      return (
        <Icon
          component={easysearchIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    case SearchEngines.Opensearch:
      return (
        <Icon
          component={opensearchIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    default:
      return (
        <Icon
          component={elasticsearchIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
  }
};
