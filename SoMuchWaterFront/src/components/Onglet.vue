<script setup lang="ts">
const props = defineProps<{ fn: Function, value: any }>()
const emit = defineEmits(["callBack"])
</script>

<template>

   <svg width="29.728474mm" class="onglet" height="8.1771822mm" viewBox="0 0 29.728474 8.1771822" version="1.1"
      id="svg1" inkscape:version="1.3.2 (1:1.3.2+202311252150+091e20ef0f)" sodipodi:docname="headFolder.svg"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
      <sodipodi:namedview id="namedview1" pagecolor="#ffffff" bordercolor="#000000" borderopacity="0.25"
         inkscape:showpageshadow="2" inkscape:pageopacity="0.0" inkscape:pagecheckerboard="0"
         inkscape:deskcolor="#d1d1d1" inkscape:document-units="mm" inkscape:zoom="10.504938" inkscape:cx="398.71724"
         inkscape:cy="161.2099" inkscape:window-width="1920" inkscape:window-height="935" inkscape:window-x="0"
         inkscape:window-y="32" inkscape:window-maximized="1" inkscape:current-layer="layer1" />
      <defs id="defs1">
         <inkscape:path-effect effect="fillet_chamfer" id="path-effect4" is_visible="true" lpeversion="1"
            nodesatellites_param="F,0,0,1,0,0,0,1 @ F,0,0,1,0,0,0,1 @ F,0,0,1,0,1.8143619,0,1 @ F,0,0,1,0,1.8143619,0,1"
            radius="0" unit="px" method="auto" mode="F" chamfer_steps="1" flexible="false" use_knot_distance="true"
            apply_no_radius="true" apply_with_radius="true" only_selected="false" hide_knots="false" />
      </defs>
      <g inkscape:label="Calque 1" inkscape:groupmode="layer" id="layer1" transform="translate(-91.502932,-41.120578)">
         <path id="path2" @click="$emit('callBack', fn(value))"
            class="duration-150" style="fill:#616161;stroke:none;stroke-width:0.0525229;stroke-linecap:round;stroke-linejoin:round"
            inkscape:transform-center-x="0.0043007531" inkscape:transform-center-y="-0.80718251"
            d="m 121.23141,49.297758 -29.72848,-0.0025 2.52961,-6.484572 a 2.6549976,2.6549976 145.65836 0 1 2.473744,-1.690109 l 19.739596,0.0021 a 2.6502171,2.6502171 34.402014 0 1 2.47054,1.691743 z"
            sodipodi:nodetypes="ccccc" inkscape:path-effect="#path-effect4"
            inkscape:original-d="m 121.23141,49.297758 -29.72848,-0.0025 3.188992,-8.174875 23.368318,0.0025 z" />
      </g>
   </svg>

</template>