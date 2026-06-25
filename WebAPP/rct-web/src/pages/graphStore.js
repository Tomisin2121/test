import { buildGraph, SAMPLE, kRoutes, routeStats } from './wayfinderEngine';

let graph = null;

export function getGraph() {
  if (!graph) graph = buildGraph(SAMPLE);
  return graph;
}

export function resetGraph() {
  graph = buildGraph(SAMPLE);
  return graph;
}

export function setGraph(g) {
  graph = g;
}

export { kRoutes, routeStats, buildGraph };
