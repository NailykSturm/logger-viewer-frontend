<script setup lang="ts">
import { ref } from "vue";

import { GetRequest, PostRequest } from "../../utils/APIrequest.ts";

interface reponsesDisplay {
    date: Date,
    route: string,
    code: string,
    status: number,
    data: string,
}

const maxResponses = ref(20);
const listResponses = ref<reponsesDisplay[]>([]);

function addToListResponse(data: reponsesDisplay) {
    while (listResponses.value.length >= maxResponses.value) listResponses.value.splice(0, 1);
    listResponses.value.push(data);
}

function sendPing(back: string) {
    GetRequest(`${back}/ping`).then((res) => {
        addToListResponse({
            date: new Date(),
            route: `${back}/ping`,
            code: res.statusText,
            status: res.status,
            data: JSON.stringify(res.data)
        })
    }).catch((err) => {
        addToListResponse({
            date: new Date(),
            route: `${back}/ping`,
            code: err.response ? err.response.statusText : err.code,
            status: err.response ? err.response.status : err.status,
            data: JSON.stringify(err.response ? err.response.data : err.data)
        })
    });
}

function sendPingMultiple() {
    PostRequest('api/ping/rec', { "message": "Ping from frontend" }).then((res) => {
        addToListResponse({
            date: new Date(),
            route: `api/ping/rec`,
            code: res.statusText,
            status: res.status,
            data: JSON.stringify(res.data)
        })
    }).catch((err) => {
        addToListResponse({
            date: new Date(),
            route: `api/ping/rec`,
            code: err.response ? err.response.statusText : err.code,
            status: err.response ? err.response.status : err.status,
            data: JSON.stringify(err.response ? err.response.data : err.data)
        })
    });
}

</script>

<template>
    <div>
        <h1 class="text-xl font-semibold">Ping API</h1>
        <p class="font-mono">Outils servant à savoir si l'API communique bien avec notre application</p>
    </div>
    <div class="bg-base-200 w-full mt-6">
        <div class="flex justify-evenly my-4">
            <button class="btn btn-primary" @click="sendPing('api')">Ping API</button>
            <button class="btn btn-primary" @click="sendPing('logger')">Ping Logger</button>
            <button class="btn btn-primary" @click="sendPingMultiple()">Ping Both</button>
            <div class="gap-10 max-w-md">
                Nombres de retours à garder : {{ maxResponses }}
                <input type="range" v-model="maxResponses" min="5" max="20" class="range range-primary" />
            </div>
        </div>
        <div class="card bg-base-300 max-h-none">
            <div class="card-content overflow-x-auto">
                <template v-if="listResponses.length > 0">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>date</th>
                                <th>route</th>
                                <th>Status</th>
                                <th>Code</th>
                                <th>data</th>
                            </tr>
                        </thead>
                        <template v-for="(response, index) in listResponses">
                            <tr :class="response.status == 200 ? 'text-success' : 'text-error'">
                                <td>{{ index + 1 }}</td>
                                <td>{{ response.date.toLocaleString() }}</td>
                                <td>{{ response.route }}</td>
                                <td>{{ response.status }}</td>
                                <td>{{ response.code }}</td>
                                <td>{{ response.data }}</td>
                            </tr>
                        </template>
                    </table>
                </template>
            </div>
        </div>
    </div>
</template>