/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from "react";
import { FormattedMessage } from "react-intl";
import { Tooltip, Badge } from "antd";

import { HealthStatusCircle } from "../../../../infini/health_status_circle";

import "./request_status_bar.less";

export interface Props {
  requestInProgress: boolean;
  requestResult?: {
    // Status code of the request, e.g., 200
    statusCode: number;

    // Status text of the request, e.g., OK
    statusText: string;

    // Method of the request, e.g., GET
    method: string;

    // The path of endpoint that was called, e.g., /_search
    endpoint: string;

    // The time, in milliseconds, that the last request took
    timeElapsedMs: number;
    responseHeader: string;
    requestHeader: string;
  };
  selectedCluster?: {
    labels: any;
    host: any;
    version: any;
  };
  left?: any;
}

const mapStatusCodeToBadgeColor = (statusCode: number) => {
  if (statusCode <= 199) {
    return "default";
  }

  if (statusCode <= 299) {
    return "secondary";
  }

  if (statusCode <= 399) {
    return "primary";
  }

  if (statusCode <= 499) {
    return "warning";
  }

  return "danger";
};

export const RequestStatusBar = ({
  requestInProgress,
  requestResult,
  selectedCluster,
  left,
}: Props) => {
  let content: any = null;
  const clusterContent = (
    <div className="base-info">
      <div className="info-item health">
        <span>
          {" "}
          <FormattedMessage id="console.cluster.status" />：
        </span>
        <i style={{ position: "absolute", top: 1, right: 0 }}>
          <HealthStatusCircle status={selectedCluster?.labels?.health_status} />
        </i>
      </div>
      <div className="info-item">
        <span>
          <FormattedMessage id="console.cluster.endpoint" />：
        </span>
        <Badge color="default" text={selectedCluster?.host}></Badge>
      </div>
      <div className="info-item">
        <span>
          <FormattedMessage id="console.cluster.version" />：
        </span>
        <Badge color="default" text={selectedCluster?.version}></Badge>
      </div>
    </div>
  );

  if (requestInProgress) {
    content = <Badge color="hollow" text={"Request in progress"}></Badge>;
  } else if (requestResult) {
    const { endpoint, method, statusCode, statusText, timeElapsedMs } =
      requestResult;

    content = (
      <>
        <div className="status_info">
          <div className="info-item">
            <span>
              <FormattedMessage id="console.response.status" />：
            </span>
            <Tooltip
              placement="top"
              title={
                <span>{`${method} ${
                  endpoint.startsWith("/") ? endpoint : "/" + endpoint
                }`}</span>
              }
            >
              <Badge
                color={mapStatusCodeToBadgeColor(statusCode)}
                text={`${statusCode} - ${statusText}`}
              >
                {/*  Use &nbsp; to ensure that no matter the width we don't allow line breaks */}
              </Badge>
            </Tooltip>
          </div>
          <div className="info-item">
            <span>
              <FormattedMessage id="console.response.time_elapsed" />：
            </span>
            <Tooltip placement="top" title={<span>Time Elapsed</span>}>
              <Badge
                color="default"
                text={`${timeElapsedMs}&nbsp;${"ms"}`}
              ></Badge>
            </Tooltip>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="request-status-bar">
      {left ? (
        <div className="bar-item">{clusterContent}</div>
      ) : (
        <div className="bar-item">{content}</div>
      )}
    </div>
  );
};
