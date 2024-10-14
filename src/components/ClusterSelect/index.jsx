import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FormattedMessage } from "react-intl";

import DropdownList from "../DropdownList";
// import request from "../utils/request";
import { SearchEngineIcon } from "../lib/search_engines";
import { HealthStatusRect } from "../infini/health_status_rect";
import { onClusterChange, formatLink } from "../utils/router";
// import { hasAuthority } from "../utils/authority";

export default forwardRef((props, ref) => {
  const {
    className,
    popoverClassName,
    children,
    width,
    dropdownWidth,
    value,
    onChange,
    disabled = false,
    mode = "",
    filters = {},
    action,
    extraData = [],
    getClusterList,
    showCreate = true,
    getPopupContainer = (triggerNode) => triggerNode.parentNode,
  } = props;
  const [sorter, setSorter] = useState([]);

  const [result, setResult] = useState({
    took: 0,
    total: 0,
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({
    from: 0,
    size: 10,
    keyword: "",
  });

  const fetchData = async (queryParams, sorter, filters) => {
    setLoading(true);
    const filter = [];
    if (queryParams.keyword?.trim()) {
      filter.push({
        query_string: {
          query: `*${queryParams.keyword}*`,
          fields: ["name", "version", "labels.health_status"],
        },
      });
    }
    const fields = Object.keys(filters);
    fields.forEach((field) => {
      filter.push({
        term: {
          [field]: { value: filters[field] },
        },
      });
    });
    // 注释掉请求
    return;
    const res = await request(action || `/collection/cluster/_search`, {
      method: "POST",
      body: {
        query: {
          bool: {
            filter,
          },
        },
        from: queryParams.from,
        size: queryParams.size,
        sort:
          sorter?.length === 2 ? [{ [sorter[0]]: { order: sorter[1] } }] : [],
      },
    });
    setResult({
      data: res?.hits?.hits || [],
      total: res?.hits?.total?.value || 0,
    });

    if (getClusterList) {
      getClusterList({
        data: res?.hits?.hits || [],
        total: res?.hits?.total?.value || 0,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(queryParams, sorter, filters);
  }, [
    JSON.stringify(queryParams),
    JSON.stringify(sorter),
    JSON.stringify(filters),
  ]);

  useImperativeHandle(ref, () => ({
    refresh: () => fetchData(queryParams, sorter, filters),
  }));

  const onChangeCluster = (item) => {
    onChange && onChange(item);
    onClusterChange(item.id, item);
  };

  const { data, total } = result;

  const actions = [];
  // if (hasAuthority("easysearch:cluster/create") && showCreate) {
  //   actions.push(
  //     <a
  //       onClick={() => {
  //         window.open(
  //           `/#${formatLink(`/infra/service/easysearch/create`)}`,
  //           "_blank"
  //         );
  //       }}
  //     >
  //       {FormattedMessage({ id: "account.team.select.action.create" }) +
  //         " Easysearch"}
  //     </a>
  //   );
  // }

  return (
    <DropdownList
      getPopupContainer={getPopupContainer}
      disabled={disabled}
      mode={mode}
      className={className}
      popoverClassName={popoverClassName}
      width={width}
      dropdownWidth={dropdownWidth}
      locale={"en-US"}
      value={value}
      onChange={onChangeCluster}
      rowKey="id"
      loading={loading}
      data={data.map((item) => ({ ...item._source }))}
      extraData={extraData}
      pagination={{
        currentPage: total
          ? Math.floor(queryParams.from / queryParams.size) + 1
          : 0,
        total,
        onChange: (page) => {
          setQueryParams({
            ...queryParams,
            from: (page - 1) * queryParams.size,
          });
        },
      }}
      renderItem={(item) => {
        return (
          <>
            {item.labels?.health_status && (
              <div
                style={{
                  marginRight: "5px",
                  display: "inline-block",
                  position: "relative",
                  top: "3px",
                }}
              >
                <HealthStatusRect status={item.labels?.health_status} />
              </div>
            )}
            <div
              style={{
                marginRight: "4px",
                display: "inline-block",
                position: "relative",
                top: "0px",
              }}
            >
              <SearchEngineIcon
                distribution={item.distribution || filters.distribution}
                width="16px"
                height="16px"
              />
            </div>
            {item.name}
          </>
        );
      }}
      renderTag={(item) => item.version}
      searchKey="name"
      onSearchChange={(value) => {
        setQueryParams({
          ...queryParams,
          keyword: value,
        });
      }}
      sorter={sorter}
      onSorterChange={setSorter}
      sorterOptions={[
        {
          label: FormattedMessage({ id: "cluster.monitor.summary.name" }),
          key: "name",
        },
      ]}
      onRefresh={() => {
        fetchData(queryParams, sorter, filters);
      }}
      actions={actions}
    >
      {children}
    </DropdownList>
  );
});
