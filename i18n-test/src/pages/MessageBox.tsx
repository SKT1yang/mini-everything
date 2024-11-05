import { defineComponent } from "vue";

const MessageBox = defineComponent({
  name: "MessageBox",
  setup() {
    return () => (
      <div data-1="中文" data-2={"中文".length > 0 ? true : false}>
       中文
      </div>
    );
  },
});

export { MessageBox };

// import { defineComponent } from "vue";

// const MessageBox = defineComponent({
//   name: "MessageBox",
//   setup() {
//     return () => (
//       <div data-1="中文" data-2={"中文".length > 0 ? true : false}>
//        中文
//       </div>
//     );
//   },
// });

// export { MessageBox };
