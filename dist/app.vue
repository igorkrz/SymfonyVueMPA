<template>
    <div style="margin-top: 180px">
        <component :is="this.$parent.componentName" :dataID="this.$parent.dataID"/>
    </div>
</template>
<script>
    const SomeComponent = () => import (this.$parent.componentRoute);
    export default  {
        name: 'App',
        components: { SomeComponent }
    };
</script>