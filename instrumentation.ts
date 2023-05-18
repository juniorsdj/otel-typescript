import otel from "@opentelemetry/api";
import {
  ExplicitBucketHistogramAggregation,
  MeterProvider,
  View,
} from "@opentelemetry/sdk-metrics";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { HostMetrics } from "@opentelemetry/host-metrics";

const { PrometheusExporter } = require("@opentelemetry/exporter-prometheus");

const { endpoint, port } = PrometheusExporter.DEFAULT_OPTIONS;

const exporter = new PrometheusExporter({}, () => {
  console.log(
    `prometheus scrape endpoint: http://localhost:${port}${endpoint}`
  );
});

const resource = Resource.default().merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "service-name-here",
    [SemanticResourceAttributes.SERVICE_VERSION]: "0.1.0",
  })
);

const myServiceMeterProvider = new MeterProvider({
  views: [
    new View({
      aggregation: new ExplicitBucketHistogramAggregation([0, 50, 100]),
      instrumentName: "my.histogram",
    }),
  ],
  resource: resource,
});

myServiceMeterProvider.addMetricReader(exporter);

const hostMetrics = new HostMetrics({
  meterProvider: myServiceMeterProvider,
  name: "service-name-here",
});
hostMetrics.start();

// Set this MeterProvider to be global to the app being instrumented.
otel.metrics.setGlobalMeterProvider(myServiceMeterProvider);
