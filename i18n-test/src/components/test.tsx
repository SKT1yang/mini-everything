// vue3 tsx测试组件
import { defineComponent } from "vue";
import HelloWorld from "./HelloWorld.vue";
export default defineComponent({
  name: "TestApp",
  setup() {
    return () => (
      <div>
        {/* <div>中文</div> */}
        {/* <HelloWorld msg="中文" /> */}
        {/* <HelloWorld msg={"中文".length > 0 ? "中文" : "文本"} /> */}
      </div>
    );
  },
});
