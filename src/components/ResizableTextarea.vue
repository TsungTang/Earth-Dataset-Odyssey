
<script>
export default {
  name: "ResizableTextarea",
  methods: {
    resizeTextarea(event) {
      event.target.style.height = "auto"
      event.target.style.height = event.target.scrollHeight + "px"
    },
  },
  mounted() {
    this.$nextTick(() => {
      // DOM updated
      this.$el.setAttribute(
        "style",
        "height:" + this.$el.scrollHeight + "px;overflow-y:auto;"
      )
      this.$el.addEventListener("input", this.resizeTextarea)
    })
  },
  beforeDestroy() {
    this.$el.removeEventListener("input", this.resizeTextarea)
  },
  render() {
    return this.$slots.default[0]
  },
}
</script>
