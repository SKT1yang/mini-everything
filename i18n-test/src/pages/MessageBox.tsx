import { t } from "@/entry/languages";
import { defineComponent } from "vue";

const MessageBox = defineComponent({
  name: "MessageBox",
  setup() {
    return () => (
      <div data-1={t("中文")} data-2={t("中文").length > 0 ? true : false}>
        {t("中文")}
      </div>
    );
  },
});

export { MessageBox };
