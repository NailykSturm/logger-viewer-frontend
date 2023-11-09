<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import PingAPI from '../components/tools/PingAPI.vue';

const usedTool = shallowRef(PingAPI);
const usedToolName = ref('PingAPI');

function changeTool(tool: string) {
    switch (tool) {
        case 'PingAPI':
            usedTool.value = PingAPI;
            usedToolName.value = 'PingAPI';
            break;
        default:
            usedTool.value = PingAPI;
            usedToolName.value = 'PingAPI';
            break;
    }
}

</script>

<template>
    <div class="bg-base-200 w-screen">
        <div class="tabs justify-center">
            <a class="tab tab-lg tab-lifted" :class="usedToolName == 'PingAPI' ? 'tab-active' : ''"
                @click="changeTool('PingAPI')">Ping API</a>
        </div>
    </div>
    <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold">Outils</h1>
        <div>Page ayant divers outils pour aider lors du développement</div>
        
        <usedTool/>
    </div>
</template>