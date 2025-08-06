/**
 * Lightweight lexicon mapping technical keywords to suggested tags, actions, metrics, patterns.
 * This can be expanded or sourced from a DB later.
 */
module.exports = {
  react: {
    tags: ['react', 'frontend', 'hooks'],
    actions: ['refactored components', 'optimized rendering', 'migrated class to hooks'],
    metrics: ['reduced re-renders', 'bundle size reduction'],
    patterns: ['memoization', 'code-splitting']
  },
  node: {
    tags: ['nodejs', 'backend'],
    actions: ['optimized event loop', 'improved async handling'],
    metrics: ['reduced memory usage', 'increased throughput'],
    patterns: ['worker threads', 'queueing']
  },
  express: {
    tags: ['express', 'api'],
    actions: ['added middleware', 'improved request validation'],
    metrics: ['reduced response time'],
    patterns: ['rate limiting', 'structured logging']
  },
  mongodb: {
    tags: ['mongodb', 'database'],
    actions: ['added indexes', 'optimized queries'],
    metrics: ['reduced query latency', 'lower CPU usage'],
    patterns: ['indexing strategy', 'aggregation pipeline']
  },
  redis: {
    tags: ['redis', 'caching'],
    actions: ['implemented caching', 'set TTL policy'],
    metrics: ['cache hit ratio', 'reduced DB load'],
    patterns: ['write-through cache', 'pub/sub']
  },
  websocket: {
    tags: ['websocket', 'realtime'],
    actions: ['implemented socket rooms', 'handled reconnection'],
    metrics: ['message delivery latency'],
    patterns: ['backoff retry', 'presence tracking']
  },
  docker: {
    tags: ['docker', 'containers'],
    actions: ['created multi-stage build', 'reduced image size'],
    metrics: ['faster deployments'],
    patterns: ['health checks', 'entrypoint scripts']
  },
  kubernetes: {
    tags: ['kubernetes', 'orchestration'],
    actions: ['configured liveness/readiness probes', 'set resource limits'],
    metrics: ['reduced pod restarts'],
    patterns: ['hpa', 'rolling updates']
  },
  testing: {
    tags: ['testing', 'ci/cd'],
    actions: ['added unit tests', 'added integration tests'],
    metrics: ['increased coverage', 'reduced regressions'],
    patterns: ['test pyramid', 'snapshot testing']
  },
  performance: {
    tags: ['performance', 'optimization'],
    actions: ['profiled hotspots', 'eliminated bottlenecks'],
    metrics: ['p95 latency', 'throughput', 'cpu usage'],
    patterns: ['lazy loading', 'debouncing', 'batching']
  },
  security: {
    tags: ['security'],
    actions: ['implemented input validation', 'added authz checks'],
    metrics: ['reduced vulnerabilities'],
    patterns: ['content security policy', 'principle of least privilege']
  }
};