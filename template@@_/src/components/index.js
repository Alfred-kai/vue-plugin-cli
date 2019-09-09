import @COMP_NAME from "./Component.vue";

@COMP_NAME.install = Vue => Vue.component(@COMP_NAME.name, @COMP_NAME);

export default @COMP_NAME;
