<template>
  <div>
    <h2>Log Raw Data:</h2>
    <pre>{{ log }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    log: {
      type: String,
      required: true
    }
  },
};
</script>
