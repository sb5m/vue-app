<template>
    <div
      class="badge"
      :style="{ backgroundColor: colorBackground, color: colorText }"
    >
      <span class="badge-dot" :style="{ backgroundColor: colorDot }"></span>
      <span><slot></slot></span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      color: {
        type: String,
        default: "teal",
      },
    },
    computed: {
      colorBackground() {
        const colors = {
          purple: "#E9D8FD",
          teal: "#B2F5EA",
          blue: "#BEE3F8",
          green: "#C6F6D5",
          default: "#B2F5EA",
        };
        return colors[this.color] || colors.default;
      },
      colorText() {
        const colors = {
          purple: "#6B46C1",
          teal: "#319795",
          blue: "#3182CE",
          green: "#38A169",
          default: "#319795",
        };
        return colors[this.color] || colors.default;
      },
      colorDot() {
        const colors = {
          purple: "#9F7AEA",
          teal: "#2C7A7B",
          blue: "#2B6CB0",
          green: "#2F855A",
          default: "#319795",
        };
        return colors[this.color] || colors.default;
      },
    },
  };
  </script>
  
  <style scoped>
  .badge {
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 20px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: bold;
  }
  
  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 4px;
  }
  </style>
  