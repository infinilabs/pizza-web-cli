/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */
import { useMemo } from "react";
import { Icon } from "antd";

import AliyunImg from "../Icon/aliyun.svg";
import TenxunyunImg from "../Icon/txunyun.svg";
import YidongyunImg from "../Icon/yidongyun.svg";
import PrivateImg from "../Icon/private.svg";
import AWSImg from "../Icon/aws.svg";
import AzureImg from "../Icon/azure.svg";
import GCPImg from "../Icon/gcp.svg";
import IBMImg from "../Icon/ibm.svg";
import OracleImg from "../Icon/oracle.svg";
import DigitalOceanImg from "../Icon/digitalOcean.svg";
import INFINICloudImg from "../Icon/INFINICloud.svg";

export const generateIcon = (width, height, src) => {
  return () => <img height={height} width={width} src={src} />;
};

export const ProviderIcon = ({ provider, width = "24px", height = "24px" }) => {
  const [
    aliyunIcon,
    tenxunyunIcon,
    yidongyunIcon,
    privateIcon,
    awsIcon,
    azureIcon,
    gcpIcon,
    ibmIcon,
    oracleIcon,
    digitalOceanIcon,
    INFINICloudIcon,
  ] = useMemo(() => {
    return [
      generateIcon(width, height, AliyunImg),
      generateIcon(width, height, TenxunyunImg),
      generateIcon(width, height, YidongyunImg),
      generateIcon(width, height, PrivateImg),
      generateIcon(width, height, AWSImg),
      generateIcon(width, height, AzureImg),
      generateIcon(width, height, GCPImg),
      generateIcon(width, height, IBMImg),
      generateIcon(width, height, OracleImg),
      generateIcon(width, height, DigitalOceanImg),
      generateIcon(width, height, INFINICloudImg),
    ];
  }, [width, height]);
  switch (provider) {
    case ProvidersName.Aliyun:
      return (
        <Icon
          component={aliyunIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    case ProvidersName.TencentCloud:
      return (
        <Icon
          component={tenxunyunIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    case ProvidersName.Ecloud:
      return (
        <Icon
          component={yidongyunIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    case ProvidersName.AWS:
      return (
        <Icon
          component={awsIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    case ProvidersName.Azure:
      return (
        <Icon
          component={azureIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    case ProvidersName.GCP:
      return (
        <Icon
          component={gcpIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    case ProvidersName.IBM:
      return (
        <Icon
          component={ibmIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    case ProvidersName.Oracle:
      return (
        <Icon
          component={oracleIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    case ProvidersName.DigitalOcean:
      return (
        <Icon
          component={digitalOceanIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    case ProvidersName.INFINICloud:
      return (
        <Icon
          component={INFINICloudIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
    default:
      return (
        <Icon
          component={privateIcon}
          style={{ width: width, height: height, verticalAlign: "middle" }}
        />
      );
  }
};

export const ProvidersName = {
  OnPremises: "on_premises",
  AWS: "aws",
  Azure: "azure",
  GCP: "gcp",
  IBM: "ibm",
  Oracle: "oracle",
  DigitalOcean: "digital_ocean",
  Aliyun: "aliyun",
  TencentCloud: "tencent_cloud",
  Ecloud: "ecloud",
  INFINICloud: "infini_cloud",
};

export const ProvidersNameMap = {
  on_premises: "On premises",
  aliyun: "Aliyun",
  tencent_cloud: "Tencent Cloud",
  ecloud: "Ecloud",
  azure: "Azure",
  aws: "AWS",
  gcp: "GCP",
  ibm: "IBM",
  oracle: "Oracle",
  digital_ocean: "Digital Ocean",
  infini_cloud: "INFINI Cloud",
};
