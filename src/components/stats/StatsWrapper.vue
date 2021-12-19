<template>
    <div class="p-4 flex-none bg-white shadow-lg rounded-xl">
        <h1 class="text-xl font-bold text-center text-slate-500"><slot name="header"></slot></h1>
        <div class="mt-2">
            <div class="space-y-3">
                <div class="flex justify-between">
                    <div class="space-y-3 flex-1 text-slate-500 font-semibold">
                       <slot name="content"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
