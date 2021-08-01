import {
    DocumentReportIcon,
    MailIcon,
    UserGroupIcon,
    ChatIcon,
    SwitchVerticalIcon,
} from "@heroicons/vue/outline";

export default [
    {
        name: "Unlabeled",
        to: { name: "unlabeled" },
        icon: MailIcon,
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
];
