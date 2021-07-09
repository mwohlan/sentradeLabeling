<template>
  <div class="min-h-screen bg-white grid grid-rows-12 px-2 sm:px-6 lg:px-8">
    <div
      class="
        row-start-1 row-end-3
        sm:row-end-4
        pb-12
        mx-auto
        self-end
        filter
        drop-shadow-xl
        blur-xs
      "
    >
      <div class="flex-shrink-0 flex items-center gap-x-2 px-4">
        <img
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
          alt="Easywire logo"
        />
        <div class="text-3xl text-cyan-500 font-bold">Sentrade</div>
      </div>
    </div>

    <div
      class="self-start row-start-4 row-end-10 sm:mx-auto sm:w-full sm:max-w-md"
    >
      <div class="pb-8 pt-5 px-4 shadow-xl rounded-xl bg-gray-200 sm:px-10">
        <h2 class="text-center text-2xl font-bold text-gray-900 mb-3">
          Choose User for Labeling
        </h2>
        <form @submit.preventDefault="forwardToMainPage" class="space-y-6">
          <select-menu @selected="changeUser" :people="people" />

          <div>
            <button
              type="submit"
              class="
                w-full
                flex
                justify-center
                py-2
                px-4
                border border-transparent
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-white
                bg-cyan-500
                hover:bg-cyan-600
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
              :disabled="!userSelected"
            >
              Einloggen
            </button>
          </div>
        </form>
      </div>
    </div>

    <footer class="row-span-2 self-end bg-grey-800 border-blue-700 px-6">
      <div class="border-t-2 border-gray-300">
        <div class="flex justify-between py-6">
          <p class="text-sm text-gray-700 font-extrabold mb-2">
            © 2021 Sentrade
          </p>
          <a
            class="text-sm text-gray-700 font-extrabold mb-2"
            href=""
            target="_blank"
            rel="noopener noreferrer"
            >Datenschutzerklärung</a
          >
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
    
    onMounted( () => {
      if (store.users.length == 0) {
         store.setUsers();
      }
    });

    const forwardToMainPage = () => {
      router.push({
        name: "unlabeled",
      });
    };

    const changeUser = (selected) => {
      store.setCurrentUser({ id: selected.id, name: selected.name });
      userSelected.value = true;
    };

    return { people: store.users, changeUser, userSelected, forwardToMainPage };
  },
};
</script>