<template>
  <div class="footer-disclaimer">
    <p>{{ disclaimerText }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disclaimerText: "KanbanVue App. In development."
    };
  }
};
</script>

<style scoped>
.footer-disclaimer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0px;
  font-size: 12px;
}
</style>
