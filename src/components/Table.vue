<!-- This example requires Tailwind CSS v2.0+ -->
<template class="relative">
    <div class="shadow overflow-hidden sm:rounded-lg">
        <table class="min-w-full divide-y divide-slate-200 table">
            <thead class="bg-slate-50">
                <tr>
                    <th
                        scope="col"
                        class="text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    ></th>
                    <th
                        scope="col"
                        @click="sortPeople"
                        class="cursor-pointer px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >Name {{height}}</th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >Title</th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >Email</th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                    >Role</th>
                    <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(person, personIdx) in people" :key="person.email">
                    <tr :class="personIdx % 2 === 0 ? 'bg-white' : 'bg-slate-100'">
                        <td
                            @click="show = !show"
                            class="flex justify-center py-4 cursor-pointer whitespace-nowrap text-sm font-medium text-slate-900"
                        >
                            <chevron-right-icon
                                :class="[show ? 'rotate-90' : 'rotate-0']"
                                class="h-4 w-4 duration-300"
                            />
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900"
                        >{{ person.name }}</td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-slate-500"
                        >{{ person.title }}</td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-slate-500"
                        >{{ person.email }}</td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-slate-500"
                        >{{ person.role }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div
                                @click="show = !show"
                                href="#"
                                class="text-indigo-600 hover:text-indigo-900"
                            >Edit</div>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="5">
                            <div class="flex">
                                <transition
                                    @after-enter="showContent = true"
                                    @leave="showContent = false"
                                    leave-active-class="duration-500 ease-out"
                                    leave-from-class="h-16"
                                    leave-to-class="h-0"
                                    enter-from-class="h-0"
                                    enter-active-class="duration-500 ease-in"
                                    enter-to-class="h-16"
                                >
                                    <div
                                        v-if="show"
                             
                                        class="text-9xl overflow-hidden"
                                    >Jo</div>
                                </transition>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

</template>

<script setup>
import { ChevronRightIcon } from "@heroicons/vue/outline"
import { reactive, ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core"
import { useElementSize } from '@vueuse/core'

const people = ref([
    { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
    { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
    // More people...
])

const sortCounter = ref(0)
const sort = ['asc', 'dsc']
const el = ref(null)
const { width, height } = useElementSize(el)
const asc = () => {
    people.value = people.value.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }

        // Namen müssen gleich sein
        return 0;
    })
}

const dsc = () => {
    people.value = people.value.sort((a, b) => {
        if (a.name > b.name) {
            return -1;
        }
        if (a.name < b.name) {
            return 1;
        }

        // Namen müssen gleich sein
        return 0;
    })
}


    const sortPeople = () => {
        sortCounter.value++
        console.log(sort[sortCounter.value] % 2)
        if (sort[sortCounter.value %2]  === 'asc') {
            asc()
        } else {
            dsc()
        }
    }







const show = ref(false)
const showContent = ref(false)

</script>
