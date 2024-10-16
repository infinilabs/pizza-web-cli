import { useEffect, useState } from "react";
import ConsoleUI from "@infinilabs/ui-web-cli";

// 图标组件，可以按照这个示例修改
import { SearchEngineIcon } from "./components/lib/search_engines";
// 左上角的 logo 组件
import PizzaImg from "./components/Icon/pizza"

function App() {
  const clusterList = [];
  const clusterStatus = undefined;

  const [ConsoleOpen, setConsoleOpen] = useState(true);

  useEffect(() => {
    const messageHandler = (event) => {
      if (event.data == true) {
        setConsoleOpen(true);
      }
    };
    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  // 点击加号 ➕ 展示的数据源的数据列表
  const fetchDataSource = (queryParams, sorter, filters) => {
    queryParams = {
      from: 0,
      size: 10,
      keyword: "",
    };
    sorter = [];
    filters = {};
    return new Promise((resolve, reject) => {
      // mock 数据
      const results = {
        data: [
          {
            _index: ".infini_tenant-cluster",
            _type: "_doc",
            _id: "cqm9b0o2sdb188kaaibg",
            _source: {
              cluster_uuid: "Xo_nz7q9RneFTBJIN6FnBA",
              create_time: "0001-01-01T00:00:00Z",
              created: "2024-08-02T16:14:59.295191+08:00",
              credential_id: "cqhngq82sdb12fth1d40",
              discovery: {
                enabled: true,
                refresh: {},
              },
              distribution: "pizza",
              enabled: true,
              endpoint: "https://127.0.0.1:9200",
              host: "127.0.0.1:9200",
              id: "cqm9b0o2sdb188kaaibg",
              init_time: "0001-01-01T00:00:00Z",
              initialized_time: "0001-01-01T00:00:00Z",
              k8s_cluster_id: "",
              k8s_instance_name: "",
              k8s_namespace: "",
              labels: {
                health_status: "yellow",
              },
              location: {
                provider: "on_premises",
                region: "default",
              },
              metadata_configs: {
                cluster_settings_check: {
                  enabled: true,
                  interval: "10s",
                },
                health_check: {
                  enabled: true,
                  interval: "10s",
                },
                metadata_refresh: {
                  enabled: true,
                  interval: "10s",
                },
                node_availability_check: {
                  enabled: true,
                  interval: "10s",
                },
              },
              metric_collection_mode: "agentless",
              monitor_configs: {
                cluster_health: {
                  enabled: true,
                  interval: "10s",
                },
                cluster_stats: {
                  enabled: true,
                  interval: "10s",
                },
                index_stats: {
                  enabled: true,
                  interval: "10s",
                },
                node_stats: {
                  enabled: true,
                  interval: "10s",
                },
              },
              monitored: true,
              name: "pizza",
              on_premises_type: "",
              raw_name: "pizza",
              region_id: "cqhnfio2sdb12fth1bpg",
              schema: "https",
              source: "pizza",
              tags: ["default"],
              tenant: {
                domain: "infini",
                id: "cqhlse02sdb0le811fug",
                name: "infini",
              },
              updated: "2024-08-30T10:05:32.944032+08:00",
              version: "1.7.1",
            },
          },
          {
            _index: ".infini_tenant-cluster",
            _type: "_doc",
            _id: "cqhngq82sdb12fth1d3g",
            _source: {
              cluster_uuid: "Xo_nz7q9RneFTBJIN6FnBA",
              created: "2024-07-26T18:20:25.867356+08:00",
              credential_id: "cqhngq82sdb12fth1d40",
              discovery: {
                enabled: true,
                refresh: {},
              },
              distribution: "pizza",
              enabled: true,
              endpoint: "https://127.0.0.1:9200",
              host: "127.0.0.1:9200",
              id: "cqhngq82sdb12fth1d3g",
              k8s_cluster_id: "",
              k8s_instance_name: "",
              k8s_namespace: "",
              labels: {
                health_status: "yellow",
              },
              location: {
                provider: "on_premises",
                region: "default",
              },
              metadata_configs: {
                cluster_settings_check: {
                  enabled: true,
                  interval: "10s",
                },
                health_check: {
                  enabled: true,
                  interval: "10s",
                },
                metadata_refresh: {
                  enabled: true,
                  interval: "10s",
                },
                node_availability_check: {
                  enabled: true,
                  interval: "10s",
                },
              },
              metric_collection_mode: "agentless",
              monitor_configs: {
                cluster_health: {
                  enabled: true,
                  interval: "10s",
                },
                cluster_stats: {
                  enabled: true,
                  interval: "10s",
                },
                index_stats: {
                  enabled: true,
                  interval: "10s",
                },
                node_stats: {
                  enabled: true,
                  interval: "10s",
                },
              },
              monitored: true,
              name: "pizza",
              on_premises_type: "",
              raw_name: "pizza",
              region_id: "cqhnfio2sdb12fth1bpg",
              schema: "https",
              source: "elastic",
              tags: ["default"],
              tenant: {
                domain: "infini",
                id: "cqhlse02sdb0le811fug",
                name: "infini",
              },
              updated: "2024-08-30T10:05:32.945475+08:00",
              version: "1.7.1",
            },
          },
        ],
        total: 0,
        took: 0,
      };
      resolve(results);
    });
  };

  // 点击执行操作按钮的方法
  // 接受参数 params 数据格式
  // 返回 Promise
  const sendRequestPlay = (params) => {
    // params = {
    //   requests: [
    //     {
    //       method: "GET",
    //       data: ['{\n  "query": {\n    "match_all": {}\n  }\n}'],
    //       url: "_search",
    //       range: {
    //         start: {
    //           lineNumber: 1,
    //           column: 1,
    //         },
    //         end: {
    //           lineNumber: 6,
    //           column: 2,
    //         },
    //       },
    //     },
    //   ],
    //   clusterID: "cqhngq82sdb12fth1d3g",
    // };

    return new Promise((resolve, reject) => {
      // mock 数据
      const results = [
        {
          response: {
            timeMs: 25,
            statusCode: 200,
            statusText: "OK",
            contentType: "application/json; charset=UTF-8",
            value:
              '{"took":9,"timed_out":false,"_shards":{"total":63,"successful":63,"skipped":0,"failed":0},"hits":{"total":{"value":10000,"relation":"gte"},"max_score":1.0,"hits":[{"_index":".pizza-job-scheduler-lock","_type":"_doc","_id":".pizza-ilm-config-WPwijAkmQ56vIANJ43X66w","_score":1.0,"_source":{"job_index_name":".pizza-ilm-config","job_id":"WPwijAkmQ56vIANJ43X66w","lock_time":1725263110,"lock_duration_seconds":3600,"released":true}},{"_index":".infini_activities","_type":"_doc","_id":"cqhm8b02sdb0rb2rofkg","_score":1.0,"_source":{"id":"cqhm8b02sdb0rb2rofkg","timestamp":"2024-07-26T16:54:04.877054+08:00","metadata":{"labels":{"cluster_id":"infini_default_system_cluster","cluster_name":"INFINI_SYSTEM (Thor)","node_id":"cqhm8b02sdb0rb2rofk0","node_name":"raindeMacBook-Pro.local","node_uuid":"hJjmChGWSdOIVtwA1Gt-Tw"},"category":"pizza","group":"metadata","name":"node_state_change","type":"create"},"payload":{"node_state":{"name":"raindeMacBook-Pro.local","version":"1.7.1","http":{"bound_address":["[::1]:9200","127.0.0.1:9200"],"publish_address":"127.0.0.1:9200","max_content_length_in_bytes":104857600},"roles":["data","ingest","master","remote_cluster_client"],"transport_address":"127.0.0.1:9300","host":"127.0.0.1","ip":"127.0.0.1","build_flavor":"light","build_type":"tar","build_hash":"4598885c115c8d74086abf68354e12464a67875d","total_indexing_buffer":107374182,"settings":{"client":{"type":"node"},"cluster":{"name":"pizza","routing":{"allocation":{"disk":{"threshold_enabled":"false"}}}},"http":{"compression":"false","type":"com.infinilabs.security.http.SecurityHttpServerTransport","type.default":"netty4"},"node":{"name":"raindeMacBook-Pro.local"},"path":{"home":"/Users/rain/Desktop/zhangbin/infini/pizza-cloud","logs":"/Users/rain/Desktop/zhangbin/infini/pizza-cloud/logs"},"transport":{"type":"com.infinilabs.security.ssl.http.netty.SecuritySSLNettyTransport","type.default":"netty4"}},"os":{"allocated_processors":12,"arch":"x86_64","available_processors":12,"name":"Mac OS X","pretty_name":"Mac OS X","refresh_interval_in_millis":1000,"version":"14.5"},"process":{"refresh_interval_in_millis":1000,"id":2117,"mlockall":false},"jvm":{"bundled_jdk":false,"gc_collectors":["G1 Young Generation","G1 Old Generation"],"input_arguments":["-Xshare:auto","-Des.networkaddress.cache.ttl=60","-Des.networkaddress.cache.negative.ttl=10","-XX:+AlwaysPreTouch","-Xss1m","-Djava.awt.headless=true","-Dfile.encoding=UTF-8","-Djna.nosys=true","-XX:-OmitStackTraceInFastThrow","-XX:+ShowCodeDetailsInExceptionMessages","-Dio.netty.noUnsafe=true","-Dio.netty.noKeySetOptimization=true","-Dio.netty.recycler.maxCapacityPerThread=0","-Dio.netty.allocator.numDirectArenas=0","-Dlog4j.shutdownHookEnabled=false","-Dlog4j2.disable.jmx=true","-Xms1g","-Xmx1g","-XX:+UseG1GC","-XX:G1ReservePercent=25","-XX:InitiatingHeapOccupancyPercent=30","-Djava.io.tmpdir=/var/folders/j8/ffk_kvbs7jgbfv504rr5gt280000gn/T/pizza-17749829493225272436","-Djava.security.manager=allow","-Djava.locale.providers=SPI,COMPAT","-XX:+HeapDumpOnOutOfMemoryError","-XX:HeapDumpPath=data","-XX:ErrorFile=logs/hs_err_pid%p.log","-Xlog:gc*,gc+age=trace,safepoint:file=logs/gc.log:utctime,pid,tags:filecount=32,filesize=64m","-XX:MaxDirectMemorySize=536870912","-Des.path.home=/Users/rain/Desktop/zhangbin/infini/pizza-cloud","-Des.path.conf=/Users/rain/Desktop/zhangbin/infini/pizza-cloud/config","-Des.distribution.flavor=oss","-Des.distribution.type=tar","-Des.bundled_jdk=false"],"mem":{"direct_max_in_bytes":0,"heap_init_in_bytes":1073741824,"heap_max_in_bytes":1073741824,"non_heap_init_in_bytes":7667712,"non_heap_max_in_bytes":0},"memory_pools":["CodeHeap \'non-nmethods\'","Metaspace","CodeHeap \'profiled nmethods\'","Compressed Class Space","G1 Eden Space","G1 Old Gen","G1 Survivor Space","CodeHeap \'non-profiled nmethods\'"],"pid":2117,"start_time_in_millis":1721981417754,"using_bundled_jdk":null,"using_compressed_ordinary_object_pointers":"true","version":"17.0.9","vm_name":"OpenJDK 64-Bit Server VM","vm_vendor":"Azul Systems, Inc.","vm_version":"17.0.9+8-LTS"},"thread_pool":{"analyze":{"queue_size":16,"size":1,"type":"fixed"},"fetch_shard_started":{"core":1,"keep_alive":"5m","max":24,"queue_size":-1,"type":"scaling"},"fetch_shard_store":{"core":1,"keep_alive":"5m","max":24,"queue_size":-1,"type":"scaling"},"flush":{"core":1,"keep_alive":"5m","max":5,"queue_size":-1,"type":"scaling"},"force_merge":{"queue_size":-1,"size":1,"type":"fixed"},"generic":{"core":4,"keep_alive":"30s","max":128,"queue_size":-1,"type":"scaling"},"get":{"queue_size":1000,"size":12,"type":"fixed"},"job_scheduler":{"queue_size":200,"size":12,"type":"fixed"},"listener":{"queue_size":-1,"size":6,"type":"fixed"},"management":{"core":1,"keep_alive":"5m","max":5,"queue_size":-1,"type":"scaling"},"refresh":{"core":1,"keep_alive":"5m","max":6,"queue_size":-1,"type":"scaling"},"replication_follower":{"core":1,"keep_alive":"1m","max":10,"queue_size":-1,"type":"scaling"},"replication_leader":{"queue_size":1000,"size":19,"type":"fixed"},"search":{"queue_size":1000,"size":19,"type":"fixed_auto_queue_size"},"search_throttled":{"queue_size":100,"size":1,"type":"fixed_auto_queue_size"},"snapshot":{"core":1,"keep_alive":"5m","max":5,"queue_size":-1,"type":"scaling"},"sql-worker":{"queue_size":1000,"size":12,"type":"fixed"},"system_read":{"queue_size":2000,"size":5,"type":"fixed"},"system_write":{"queue_size":1000,"size":5,"type":"fixed"},"warmer":{"core":1,"keep_alive":"5m","max":5,"queue_size":-1,"type":"scaling"},"write":{"queue_size":10000,"size":12,"type":"fixed"}},"transport":{"bound_address":["[::1]:9300","127.0.0.1:9300"],"publish_address":"127.0.0.1:9300","profiles":{}},"plugins":[{"classname":"org.pizza.analysis.ik.AnalysisIkPlugin","description":"The IK Analysis plugin integrates Lucene IK analyzer (http://code.google.com/p/ik-analyzer/) into pizza, support customized dictionary.","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"analysis-ik","version":"1.7.1"},{"classname":"org.pizza.plugin.analysis.pinyin.AnalysisPinyinPlugin","description":"This Pinyin Analysis plugin is used to do conversion between Chinese characters and Pinyin, integrates NLP tools (https://github.com/NLPchina/nlp-lang).","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"analysis-pinyin","version":"1.7.1"},{"classname":"org.pizza.replication.ReplicationPlugin","description":"Cross Cluster Replication Plugin","pizza_version":"1.7.1","extended_plugins":["index-management"],"has_native_controller":false,"java_version":"11","name":"cross-cluster-replication","version":"1.7.1"},{"classname":"org.pizza.indexmanagement.IndexManagementPlugin","description":"INFINI pizza Index Management Plugin","pizza_version":"1.7.1","extended_plugins":["job-scheduler"],"has_native_controller":false,"java_version":"11","name":"index-management","version":"1.7.1"},{"classname":"org.pizza.ingest.common.IngestCommonPlugin","description":"Module for ingest processors that do not require additional security permissions or have large dependencies and resources","pizza_version":"1.7.1","extended_plugins":["lang-painless"],"has_native_controller":false,"java_version":"11","name":"ingest-common","version":"1.7.1"},{"classname":"org.pizza.ingest.geoip.IngestGeoIpPlugin","description":"Ingest processor that uses looksup geo data based on ip adresses using the Maxmind geo database","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"ingest-geoip","version":"1.7.1"},{"classname":"org.pizza.ingest.useragent.IngestUserAgentPlugin","description":"Ingest processor that extracts information from a user agent","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"ingest-user-agent","version":"1.7.1"},{"classname":"org.pizza.knn.EasyknnPlugin","description":"pizza plugin for exact and approximate nearest neighbors search on sparse and dense vectors.","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"knn","version":"1.7.1"},{"classname":"org.pizza.plugin.mapper.AnnotatedTextPlugin","description":"The Mapper Annotated_text plugin adds support for text fields with markup used to inject annotation tokens into the index.","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"mapper-annotated-text","version":"1.7.1"},{"classname":"org.pizza.plugin.mapper.MapperMurmur3Plugin","description":"The Mapper Murmur3 plugin allows to compute hashes of a field\'s values at index-time and to store them in the index.","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"mapper-murmur3","version":"1.7.1"},{"classname":"org.pizza.plugin.mapper.MapperSizePlugin","description":"The Mapper Size plugin allows document to record their uncompressed size at index time.","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"mapper-size","version":"1.7.1"},{"classname":"org.pizza.sql.plugin.SQLPlugin","description":"pizza SQL","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"sql","version":"1.7.1"},{"classname":"org.pizza.transport.nio.NioTransportPlugin","description":"The nio transport.","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"transport-nio","version":"1.7.1"}],"modules":[{"classname":"org.pizza.search.aggregations.matrix.MatrixAggregationPlugin","description":"Adds aggregations whose input are a list of numeric fields and output includes a matrix.","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"aggs-matrix-stats","version":"1.7.1"},{"classname":"org.pizza.analysis.common.CommonAnalysisPlugin","description":"Adds \\"built in\\" analyzers to pizza.","pizza_version":"1.7.1","extended_plugins":["lang-painless"],"has_native_controller":false,"java_version":"11","name":"analysis-common","version":"1.7.1"},{"classname":"org.pizza.index.codec.customcodecs.CustomCodecPlugin","description":"A plugin that implements custom compression codecs.","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"custom-codecs","version":"1.7.1"},{"classname":"org.pizza.geo.GeoPlugin","description":"Placeholder plugin for geospatial features in ES. only registers geo_shape field mapper for now","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"geo","version":"1.7.1"},{"classname":"org.pizza.jobscheduler.JobSchedulerPlugin","description":"INFINI pizza Job Scheduler Plugin","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"job-scheduler","version":"1.7.1"},{"classname":"org.pizza.script.expression.ExpressionPlugin","description":"Lucene expressions integration for pizza","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"lang-expression","version":"1.7.1"},{"classname":"org.pizza.script.mustache.MustachePlugin","description":"Mustache scripting integration for pizza","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"lang-mustache","version":"1.7.1"},{"classname":"org.pizza.painless.PainlessPlugin","description":"An easy, safe and fast scripting language for pizza","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"lang-painless","version":"1.7.1"},{"classname":"org.pizza.index.mapper.MapperExtrasPlugin","description":"Adds advanced field mappers","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"mapper-extras","version":"1.7.1"},{"classname":"org.pizza.join.ParentJoinPlugin","description":"This module adds the support parent-child queries and aggregations","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"parent-join","version":"1.7.1"},{"classname":"org.pizza.percolator.PercolatorPlugin","description":"Percolator module adds capability to index queries and query these queries by specifying documents","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"percolator","version":"1.7.1"},{"classname":"org.pizza.index.rankeval.RankEvalPlugin","description":"The Rank Eval module adds APIs to evaluate ranking quality.","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"rank-eval","version":"1.7.1"},{"classname":"org.pizza.index.reindex.ReindexPlugin","description":"The Reindex module adds APIs to reindex from one index to another or update documents in place.","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"reindex","version":"1.7.1"},{"classname":"org.pizza.repositories.s3.S3RepositoryPlugin","description":"The S3 repository plugin adds S3 repositories","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"repository-s3","version":"1.7.1"},{"classname":"org.pizza.plugin.repository.url.URLRepositoryPlugin","description":"Module for URL repository","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"repository-url","version":"1.7.1"},{"classname":"com.infinilabs.security.SecurityPlugin","description":"Integrates pizza with security","pizza_version":"1.7.1","extended_plugins":["transport-netty4"],"has_native_controller":false,"java_version":"11","name":"security","version":"1.7.1"},{"classname":"org.pizza.transport.Netty4Plugin","description":"Netty 4 based transport implementation","pizza_version":"1.7.1","extended_plugins":[],"has_native_controller":false,"java_version":"11","name":"transport-netty4","version":"1.7.1"}],"ingest":{"processors":[{"type":"append"},{"type":"bytes"},{"type":"convert"},{"type":"csv"},{"type":"date"},{"type":"date_index_name"},{"type":"dissect"},{"type":"dot_expander"},{"type":"drop"},{"type":"fail"},{"type":"foreach"},{"type":"geoip"},{"type":"grok"},{"type":"gsub"},{"type":"html_strip"},{"type":"join"},{"type":"json"},{"type":"kv"},{"type":"lowercase"},{"type":"pipeline"},{"type":"remove"},{"type":"rename"},{"type":"script"},{"type":"set"},{"type":"sort"},{"type":"split"},{"type":"trim"},{"type":"uppercase"},{"type":"urldecode"},{"type":"user_agent"}]},"aggregations":{"adjacency_matrix":{"types":["other"]},"auto_date_histogram":{"types":["boolean","date","numeric"]},"avg":{"types":["boolean","date","numeric"]},"cardinality":{"types":["boolean","bytes","date","geopoint","ip","numeric","range"]},"children":{"types":["other"]},"composite":{"types":["other"]},"date_histogram":{"types":["boolean","date","numeric","range"]},"date_range":{"types":["boolean","date","numeric"]},"diversified_sampler":{"types":["boolean","bytes","date","numeric"]},"extended_stats":{"types":["boolean","date","numeric"]},"filter":{"types":["other"]},"filters":{"types":["other"]},"geo_bounds":{"types":["geopoint"]},"geo_centroid":{"types":["geopoint"]},"geo_distance":{"types":["geopoint"]},"geohash_grid":{"types":["geopoint"]},"geotile_grid":{"types":["geopoint"]},"global":{"types":["other"]},"histogram":{"types":["boolean","date","numeric","range"]},"ip_range":{"types":["ip"]},"matrix_stats":{"types":["other"]},"max":{"types":["boolean","date","numeric"]},"median_absolute_deviation":{"types":["numeric"]},"min":{"types":["boolean","date","numeric"]},"missing":{"types":["boolean","bytes","date","geopoint","ip","numeric","range"]},"nested":{"types":["other"]},"parent":{"types":["other"]},"percentile_ranks":{"types":["boolean","date","numeric"]},"percentiles":{"types":["boolean","date","numeric"]},"range":{"types":["boolean","date","numeric"]},"rare_terms":{"types":["boolean","bytes","date","ip","numeric"]},"rate":{"types":["boolean","numeric"]},"reverse_nested":{"types":["other"]},"sampler":{"types":["other"]},"scripted_metric":{"types":["other"]},"significant_terms":{"types":["boolean","bytes","date","ip","numeric"]},"significant_text":{"types":["other"]},"stats":{"types":["boolean","date","numeric"]},"sum":{"types":["boolean","date","numeric"]},"terms":{"types":["boolean","bytes","date","ip","numeric"]},"top_hits":{"types":["other"]},"value_count":{"types":["boolean","bytes","date","geopoint","ip","numeric","range"]},"variable_width_histogram":{"types":["numeric"]},"weighted_avg":{"types":["numeric"]}}}}}},{"_index":".infini_activities","_type":"_doc","_id":"cqhm8b82sdb0rb2rofm0","_score":1.0,"_source":{"id":"cqhm8b82sdb0rb2rofm0","timestamp":"2024-07-26T16:54:05.127826+08:00","metadata":{"labels":{"cluster_id":"infini_default_system_cluster","cluster_name":"INFINI_SYSTEM (Thor)","index_name":".infini_tenant-credential"},"category":"pizza","group":"metadata","name":"index_state_change","type":"create"},"payload":{"index_state":{"aliases":[],"aliases_version":1,"in_sync_allocations":{"0":["y-HbiFmJT_66rVAnSr41qQ"]},"mapping_version":2,"mappings":{"_doc":{"dynamic_templates":[{"strings":{"mapping":{"ignore_above":256,"type":"keyword"},"match_mapping_type":"string"}}],"properties":{"category":{"copy_to":["search_text"],"type":"keyword"},"created":{"type":"date"},"encrypt":{"enabled":false,"type":"object"},"id":{"type":"keyword"},"invalid":{"type":"boolean"},"name":{"copy_to":["search_text"],"type":"keyword"},"payload":{"enabled":false,"type":"object"},"search_text":{"analyzer":"suggest_text_search","index_phrases":true,"index_prefixes":{"max_chars":5,"min_chars":2},"type":"text"},"tenant":{"type":"object"},"type":{"type":"keyword"},"updated":{"type":"date"}}}},"primary_terms":{"0":1},"rollover_info":{},"routing_num_shards":1024,"settings":{"index":{"analysis":{"analyzer":{"suggest_text_search":{"filter":["word_delimiter"],"tokenizer":"classic"}}},"creation_date":"1721981643049","mapping":{"total_fields":{"limit":"20000"}},"max_result_window":"10000000","number_of_replicas":"1","number_of_shards":"1","provided_name":".infini_tenant-credential","uuid":"LrXtPIurQB28K3H7HWni9Q","version":{"created":"1070199"}}},"settings_version":1,"state":"open","system":false,"version":4}},"tenant":null}},{"_index":".infini_activities","_type":"_doc","_id":"cqhm8bg2sdb0rb2roi50","_score":1.0,"_source":{"id":"cqhm8bg2sdb0rb2roi50","timestamp":"2024-07-26T16:54:06.029625+08:00","metadata":{"labels":{"cluster_id":"infini_default_system_cluster","cluster_name":"INFINI_SYSTEM (Thor)","from":"unknown","to":"yellow"},"category":"pizza","group":"health","name":"cluster_health_change","type":"update"},"payload":null}},{"_index":".infini_activities","_type":"_doc","_id":"cqhm8b82sdb0rb2rofn0","_score":1.0,"_source":{"id":"cqhm8b82sdb0rb2rofn0","timestamp":"2024-07-26T16:54:05.130805+08:00","metadata":{"labels":{"cluster_id":"infini_default_system_cluster","cluster_name":"INFINI_SYSTEM (Thor)","index_name":".infini_commands"},"category":"pizza","group":"metadata","name":"index_state_change","type":"create"},"payload":{"index_state":{"aliases":[],"aliases_version":1,"in_sync_allocations":{"0":["z3B9UVcVTdGjlFTLmoa4kA"]},"mapping_version":2,"mappings":{"_doc":{"dynamic_templates":[{"strings":{"mapping":{"ignore_above":256,"type":"keyword"},"match_mapping_type":"string"}}],"properties":{"created":{"type":"date"},"requests":{"type":"object"},"tag":{"type":"keyword"},"title":{"fields":{"keyword":{"type":"keyword"}},"type":"text"}}}},"primary_terms":{"0":1},"rollover_info":{},"routing_num_shards":1024,"settings":{"index":{"analysis":{"analyzer":{"suggest_text_search":{"filter":["word_delimiter"],"tokenizer":"classic"}}},"creation_date":"1721981622610","mapping":{"total_fields":{"limit":"20000"}},"max_result_window":"10000000","number_of_replicas":"1","number_of_shards":"1","provided_name":".infini_commands","uuid":"6e1ds2hxTq6fckqs6_x-sA","version":{"created":"1070199"}}},"settings_version":1,"state":"open","system":false,"version":4}},"tenant":null}},{"_index":".infini_activities","_type":"_doc","_id":"cqhm8b82sdb0rb2rofo0","_score":1.0,"_source":{"id":"cqhm8b82sdb0rb2rofo0","timestamp":"2024-07-26T16:54:05.130958+08:00","metadata":{"labels":{"cluster_id":"infini_default_system_cluster","cluster_name":"INFINI_SYSTEM (Thor)","index_name":".infini_tenant-node"},"category":"pizza","group":"metadata","name":"index_state_change","type":"create"},"payload":{"index_state":{"aliases":[],"aliases_version":1,"in_sync_allocations":{"0":["HKu-KCcYSRWU5IhUBBDzeA"]},"mapping_version":2,"mappings":{"_doc":{"dynamic_templates":[{"strings":{"mapping":{"ignore_above":256,"type":"keyword"},"match_mapping_type":"string"}}],"properties":{"id":{"type":"keyword"},"metadata":{"properties":{"cluster_id":{"type":"keyword"},"cluster_name":{"copy_to":["search_text"],"type":"keyword"},"host":{"copy_to":["search_text"],"type":"keyword"},"node_id":{"type":"keyword"},"node_name":{"copy_to":["search_text"],"type":"keyword"},"tags":{"copy_to":["search_text"],"type":"keyword"}}},"payload":{"enabled":false,"properties":{"node_state":{"enabled":false,"type":"object"}}},"search_text":{"analyzer":"suggest_text_search","index_phrases":true,"index_prefixes":{"max_chars":5,"min_chars":2},"type":"text"},"tenant":{"type":"object"},"timestamp":{"type":"date"}}}},"primary_terms":{"0":1},"rollover_info":{},"routing_num_shards":1024,"settings":{"index":{"analysis":{"analyzer":{"suggest_text_search":{"filter":["word_delimiter"],"tokenizer":"classic"}}},"creation_date":"1721981638242","mapping":{"total_fields":{"limit":"20000"}},"max_result_window":"10000000","number_of_replicas":"1","number_of_shards":"1","provided_name":".infini_tenant-node","uuid":"9DvR1LvUQA-yLSYXEKuYYw","version":{"created":"1070199"}}},"settings_version":1,"state":"open","system":false,"version":4}},"tenant":null}},{"_index":".infini_activities","_type":"_doc","_id":"cqhm8b82sdb0rb2rofp0","_score":1.0,"_source":{"id":"cqhm8b82sdb0rb2rofp0","timestamp":"2024-07-26T16:54:05.131073+08:00","metadata":{"labels":{"cluster_id":"infini_default_system_cluster","cluster_name":"INFINI_SYSTEM (Thor)","index_name":".security"},"category":"pizza","group":"metadata","name":"index_state_change","type":"create"},"payload":{"index_state":{"aliases":[],"aliases_version":1,"in_sync_allocations":{"0":["O6rgyxlmRm-kYCdaMD6fEg"]},"mapping_version":9,"mappings":{"_doc":{"properties":{"audit":{"fields":{"keyword":{"ignore_above":256,"type":"keyword"}},"type":"text"},"config":{"fields":{"keyword":{"ignore_above":256,"type":"keyword"}},"type":"text"},"nodesdn":{"fields":{"keyword":{"ignore_above":256,"type":"keyword"}},"type":"text"},"privilege":{"fields":{"keyword":{"ignore_above":256,"type":"keyword"}},"type":"text"},"role":{"fields":{"keyword":{"ignore_above":256,"type":"keyword"}},"type":"text"},"role_mapping":{"fields":{"keyword":{"ignore_above":256,"type":"keyword"}},"type":"text"},"user":{"fields":{"keyword":{"ignore_above":256,"type":"keyword"}},"type":"text"},"whitelist":{"fields":{"keyword":{"ignore_above":256,"type":"keyword"}},"type":"text"}}}},"primary_terms":{"0":1},"rollover_info":{},"routing_num_shards":1024,"settings":{"index":{"auto_expand_replicas":"0-all","creation_date":"1721981431020","number_of_replicas":"0","number_of_shards":"1","provided_name":".security","uuid":"hPiSytCaQROOfTheWc1DCA","version":{"created":"1070199"}}},"settings_version":2,"state":"open","system":true,"version":13}},"tenant":null}},{"_index":".infini_activities","_type":"_doc","_id":"cqhm8b82sdb0rb2rofq0","_score":1.0,"_source":{"id":"cqhm8b82sdb0rb2rofq0","timestamp":"2024-07-26T16:54:05.131178+08:00","metadata":{"labels":{"cluster_id":"infini_default_system_cluster","cluster_name":"INFINI_SYSTEM (Thor)","index_name":".infini_email-server"},"category":"pizza","group":"metadata","name":"index_state_change","type":"create"},"payload":{"index_state":{"aliases":[],"aliases_version":1,"in_sync_allocations":{"0":["pbGkYwHhS2ieSBR4bKkxqg"]},"mapping_version":2,"mappings":{"_doc":{"dynamic_templates":[{"strings":{"mapping":{"ignore_above":256,"type":"keyword"},"match_mapping_type":"string"}}],"properties":{"auth":{"properties":{"password":{"type":"keyword"},"username":{"type":"keyword"}}},"created":{"type":"date"},"credential_id":{"type":"keyword"},"enabled":{"type":"boolean"},"host":{"type":"keyword"},"id":{"type":"keyword"},"name":{"type":"text"},"port":{"type":"keyword"},"tls":{"type":"keyword"},"updated":{"type":"date"}}}},"primary_terms":{"0":1},"rollover_info":{},"routing_num_shards":1024,"settings":{"index":{"analysis":{"analyzer":{"suggest_text_search":{"filter":["word_delimiter"],"tokenizer":"classic"}}},"creation_date":"1721981625781","mapping":{"total_fields":{"limit":"20000"}},"max_result_window":"10000000","number_of_replicas":"1","number_of_shards":"1","provided_name":".infini_email-server","uuid":"QGpZj-W2R1SbEwM1SaGJdQ","version":{"created":"1070199"}}},"settings_version":1,"state":"open","system":false,"version":4}},"tenant":null}},{"_index":".infini_activities","_type":"_doc","_id":"cqhm8b82sdb0rb2rofr0","_score":1.0,"_source":{"id":"cqhm8b82sdb0rb2rofr0","timestamp":"2024-07-26T16:54:05.131282+08:00","metadata":{"labels":{"cluster_id":"infini_default_system_cluster","cluster_name":"INFINI_SYSTEM (Thor)","index_name":".infini_tenant-account"},"category":"pizza","group":"metadata","name":"index_state_change","type":"create"},"payload":{"index_state":{"aliases":[],"aliases_version":1,"in_sync_allocations":{"0":["X2hpoUqySlKiWaE6GJBsuw"]},"mapping_version":2,"mappings":{"_doc":{"dynamic_templates":[{"strings":{"mapping":{"ignore_above":256,"type":"keyword"},"match_mapping_type":"string"}}],"properties":{"balance":{"properties":{"unit":{"type":"keyword"},"value":{"type":"float"}}},"billing_contact":{"type":"object"},"created":{"type":"date"},"credit_cards":{"type":"object"},"id":{"type":"keyword"},"tenant":{"type":"object"},"updated":{"type":"date"}}}},"primary_terms":{"0":1},"rollover_info":{},"routing_num_shards":1024,"settings":{"index":{"analysis":{"analyzer":{"suggest_text_search":{"filter":["word_delimiter"],"tokenizer":"classic"}}},"creation_date":"1721981633052","mapping":{"total_fields":{"limit":"20000"}},"max_result_window":"10000000","number_of_replicas":"1","number_of_shards":"1","provided_name":".infini_tenant-account","uuid":"Vggtxb14RJaKXHxb4jbgSA","version":{"created":"1070199"}}},"settings_version":1,"state":"open","system":false,"version":4}},"tenant":null}},{"_index":".infini_activities","_type":"_doc","_id":"cqhm8b82sdb0rb2rofs0","_score":1.0,"_source":{"id":"cqhm8b82sdb0rb2rofs0","timestamp":"2024-07-26T16:54:05.131365+08:00","metadata":{"labels":{"cluster_id":"infini_default_system_cluster","cluster_name":"INFINI_SYSTEM (Thor)","index_name":".infini_metadata"},"category":"pizza","group":"metadata","name":"index_state_change","type":"create"},"payload":{"index_state":{"aliases":[],"aliases_version":1,"in_sync_allocations":{"0":["WZHSqXoJROCBgNMDKlntFQ"]},"mapping_version":2,"mappings":{"_doc":{"dynamic_templates":[{"strings":{"mapping":{"ignore_above":256,"type":"keyword"},"match_mapping_type":"string"}}],"properties":{"created":{"type":"date"},"id":{"type":"keyword"},"key":{"type":"keyword"},"updated":{"type":"date"},"value":{"index":false,"type":"text"}}}},"primary_terms":{"0":1},"rollover_info":{},"routing_num_shards":1024,"settings":{"index":{"analysis":{"analyzer":{"suggest_text_search":{"filter":["word_delimiter"],"tokenizer":"classic"}}},"creation_date":"1721981636499","mapping":{"total_fields":{"limit":"20000"}},"max_result_window":"10000000","number_of_replicas":"1","number_of_shards":"1","provided_name":".infini_metadata","uuid":"t1Z-T-wBSAO5cQ5erj9fcg","version":{"created":"1070199"}}},"settings_version":1,"state":"open","system":false,"version":4}},"tenant":null}}]}}',
            header:
              "HTTP/1.1 200 OK\r\nDate: Tue, 15 Oct 2024 03:00:04 GMT\r\ncontent-type: application/json; charset=UTF-8\r\nContent-Length: 28453\r\n\r\n",
          },
          request: {
            data: '{\n  "query": {\n    "match_all": {}\n  }\n}\n',
            method: "GET",
            path: "_search",
            header:
              "GET /_search HTTP/1.1\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36\r\nHost: 127.0.0.1:9200\r\ncontent-type: application/json\r\nContent-Length: 41\r\nAuthorization: Basic YWRtaW46YWRtaW4=\r\nReferer: https://127.0.0.1:9200/_search\r\n\r\n",
          },
        },
      ];
      resolve(results);
    });
  };

  return (
    <>
      {ConsoleOpen ? (
        <div
          style={{
            borderTop: "solid 1px #ddd",
            background: "#fff",
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 19999,
          }}
        >
          <ConsoleUI
            clusterList={clusterList}
            visible={false}
            minimize={true}
            onMinimizeClick={() => {
              setConsoleOpen(false);
              window.parent.postMessage(false, "*");
            }}
            clusterStatus={clusterStatus}
            resizeable={true}
            sendRequestToES={sendRequestPlay}
            fetchDataSource={fetchDataSource}
            SearchEngineIcon={SearchEngineIcon}
            LogoImg={PizzaImg}
          />
        </div>
      ) : null}
    </>
  );
}

export default App;
