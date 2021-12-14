import {
    DocumentReportIcon,
    MailIcon,
    UserGroupIcon,
    ChatIcon,
    SwitchVerticalIcon,
    ClockIcon,
    ChartPieIcon
} from "@heroicons/vue/outline";
import { ref } from "vue";



 const navgiation = ref([
    {
        name: "Unlabeled",
        to: { name: "unlabeled" },
        icon: MailIcon,
        current: false,
    },
    {
        name: "Recently labeled",
        to: { name: "recently labeled" },
        icon: ClockIcon,
        current: false,
    },
    {
        name: "Labeled by Others",
        to: { name: "labeled by others" },
        icon: UserGroupIcon,
        current: false,
    },
    {
        name: "Conflicts",
        to: { name: "conflicts" },
        icon: SwitchVerticalIcon,
        current: false,
    },
    {
        name: "Discussions",
        to: { name: "discussions" },
        icon: ChatIcon,
        current: false,
    },
    {
        name: "All Comments",
        to: { name: "all comments" },
        icon: DocumentReportIcon,
        current: false,
    },
    {
        name: "Stats",
        to: { name: "stats" },
        icon: ChartPieIcon,
        current: false,
    },
 ])

 export default navgiation
