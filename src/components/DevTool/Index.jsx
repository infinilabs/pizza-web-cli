/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Card } from "antd";

import { ConsoleUI } from "@/pages/DevTool/Console";

const Index = (props) => {
  return (
    <Card bodyStyle={{ padding: 5 }}>
      <ConsoleUI
        selectedCluster={props.selectedCluster}
        clusterList={props.clusterList}
        visible={true}
        minimize={false}
        onMinimizeClick={() => {}}
        clusterStatus={props.clusterStatus}
        resizeable={false}
        height={props.height}
        mode="page"
      />
    </Card>
  );
};

export default Index;
