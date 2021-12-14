<template>
  <div class="min-h-full flex flex-col bg-white">
    <div class="flex flex-col mt-auto">
      <div class="mx-auto flex items-center gap-x-2">
        <img
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
          alt="Easywire logo"
        />
        <div class="text-3xl text-slate-600 font-bold">Sentrade</div>
      </div>

      <div
        class="max-w-md sm:w-full mt-10 mx-2 sm:mx-auto pb-14 pt-10 px-4 shadow-xl drop-shadow-2xl rounded-xl bg-slate-200/70 sm:px-10"
      >
        <h2 class="text-center text-2xl font-bold text-slate-700 mb-3">Choose User for Labeling</h2>
        <form @submit.prevent="forwardToMainPage" class="space-y-6">
          <select-menu @selected="changeUser" :people="people" />

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!userSelected"
            >Einloggen</button>
          </div>
        </form>
      </div>
    </div>

    <footer class="mt-auto px-6">
      <div class="border-t-2 border-slate-300">
        <div class="flex justify-between py-6">
          <p class="text-sm text-slate-700 font-extrabold mb-2">© 2021 Sentrade</p>
          <a
            class="text-sm text-slate-700 font-extrabold mb-2"
            href
            target="_blank"
            rel="noopener noreferrer"
          >Datenschutzerklärung</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useMainStore } from "../store";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import SelectMenu from "../components/SelectMenu.vue";
import { onMounted } from "@vue/runtime-core";
export default {
  components: { SelectMenu },

  setup() {
    const store = useMainStore();
    const router = useRouter();


    const userSelected = ref(false);



    const forwardToMainPage = () => {
      if (router.currentRoute.value.query.redirect) {
        router.push({
          path: router.currentRoute.value.query.redirect
        })
      } else {
        router.push({
          name: "unlabeled",
        });
      }


    };

    const changeUser = (selected) => {
      store.setCurrentUser({ id: selected.id, name: selected.name });
      userSelected.value = true;
    };

    return { people: store.users, changeUser, userSelected, forwardToMainPage };
  },
};
</script>