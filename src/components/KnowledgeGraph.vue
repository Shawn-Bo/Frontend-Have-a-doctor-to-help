
<script setup>
import { Notify } from '@nutui/nutui';
import cytoscape from 'cytoscape';
import { onMounted, ref } from 'vue';

import { graph_query } from "../apis/graph.js";
import kg_style from '../assets/kg_style.json';

const graph_start_entity = ref("");
var cy;
onMounted(() => {
  cy = cytoscape({
    container: document.getElementById('cy'), // container to render in
    style: kg_style
  });
  cy.on('tap', function (event) {
    var evtTarget = event.target;
    if (evtTarget === cy) {
    } else {
      update_graph(evtTarget.id());
    }
  });
})
const update_graph = function (query_entity) {
  graph_query(query_entity).then((res) => {
    if (res["code"] === "success") {
      graph_start_entity.value = "";
      let triples_list = res["data"];
      if (query_entity === "random") {
        cy.remove(cy.elements());
      }

      let actual_query_entity = res["query_entity"];

      // 加入所有已知结点和边
      for (let i = 0; i < triples_list.length; i++) {

        let head_entity_name = triples_list[i][0];
        let predicate_or_attribute_name = triples_list[i][1];
        let tail_entity_name = triples_list[i][2];

        if (cy.getElementById(head_entity_name).length === 0) {
          cy.add([{ group: 'nodes', data: { id: head_entity_name } }]);
        }

        if (cy.getElementById(tail_entity_name).length === 0) {
          cy.add([{ group: 'nodes', data: { id: tail_entity_name } }]);
        }

        // 根据情况添加边，避免添加重复边
        let edge_already_exists = cy.elements(`edge[source = "${tail_entity_name}"][target = "${head_entity_name}"]`).length != 0;
        if (!edge_already_exists) {
          cy.add([{ group: 'edges', data: { label: predicate_or_attribute_name, source: tail_entity_name, target: head_entity_name, id: cy.elements().size() } }]);
        }
      }
      let options = {
        name: 'concentric',
        fit: false, // whether to fit the viewport to the graph
        padding: 0, // the padding on fit
        startAngle: 3 / 2 * Math.PI, // where nodes start in radians
        sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
        clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
        equidistant: true, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
        minNodeSpacing: 20, // min spacing between outside of nodes (used for radius adjustment)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        height: undefined, // height of layout area (overrides container height)
        width: undefined, // width of layout area (overrides container width)
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        concentric: function (node) { // returns numeric value for each node, placing higher nodes in levels towards the centre
          return node.degree();
        },
        levelWidth: function (nodes) { // the variation of concentric values in each level
          return nodes.maxDegree() / 4;
        },
        animate: true, // whether to transition the node positions
        animationDuration: 300, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
        transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
      };

      cy.layout(options).run();
    } else {
      Notify.warn("图谱查询失败，请稍后重试。");
    }
  });
}

const start_update_graph = function (query_entity) {
  if (query_entity !== "") {
    cy.remove(cy.elements());
    update_graph(query_entity);
  } else {
    Notify.warn("请输入查询的疾病名称！", { duration: 1000 })
  }
}

update_graph("random");
</script>


<template>
  <div>
    <div class="graph_start_interact">
      <nut-input placeholder="输入疾病名称开始探索..." v-model="graph_start_entity">
        <template #button>
          <nut-button size="small" type="primary" shape="square"
            @click="start_update_graph(graph_start_entity)">开始探索</nut-button>
          <nut-button size="small" type="info" shape="square" @click="update_graph('random')">随机漫步</nut-button>
        </template>
      </nut-input>

    </div>
    <div id="cy"></div>
  </div>
</template>


<style scoped>
#cy {
  height: 78vh;
  /* border: 1px solid red; */
}
</style>
