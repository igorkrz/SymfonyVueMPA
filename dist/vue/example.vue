<template>
    <div>
        <div id="content" v-if="loading = true">
            <table>
                <tr v-for="item in info">
                    <td>{{ item }}</td>
                </tr>
            </table>
        </div>
<!--        <another-example/>-->
    </div>
</template>
<script>
    // import AnotherExample from "./another_example.vue";
    export default {
        name: "Example",
        props: ['exampleProp'],
        // components: { AnotherExample },
        data: function () {
            return {
                loading: false,
                info: null
            }
        },
        methods: {
            getData() {
                fetch(`https://jsonplaceholder.typicode.com/todos/${this.$attrs.dataID}`)
                    .then(async response => {
                        const data = await response.json();
                        if (!response.ok) {
                            // get error message from body or default to response statusText
                            const error = (data && data.message) || response.statusText;
                            return Promise.reject(error);
                        }
                        else {
                            this.info = data;
                            this.loading = true;
                        }
                    })
                    .catch(error =>{
                        console.error("There was an error!", error)
                    })
            },
        },
        created() {
            this.getData()
        }
    }
</script>
