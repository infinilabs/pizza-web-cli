/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from "react";

// import ClusterSelect from "../ClusterSelect";

class NewTabMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data || [],
    };
  }

  componentDidMount() {}

  handleItemClick = (item) => {
    const onItemClick = this.props.onItemClick;
    if (onItemClick && typeof onItemClick == "function") {
      onItemClick(item);
    }
  };

  getClusterList = (data = {}) => {
    if (data.data?.length > 0 && this.props.panes?.length === 0) {
      this.handleItemClick(data.data[0]?._source);
    }
  };

  render() {
    const { clusterStatus, DataSourceSelector } = this.props;
    return (
      <div>
        {DataSourceSelector ? (
          <DataSourceSelector
            width={34}
            dropdownWidth={400}
            onChange={(item) => this.handleItemClick(item)}
            getClusterList={this.getClusterList}
          >
            {this.props.children}
          </DataSourceSelector>
        ) : null}
      </div>
    );
  }
}

export default NewTabMenu;
