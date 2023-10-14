<script>
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';

export default {
    data() {
        return {
            productData: null,
            imgurl: '',
            productDeletedMessage: '',
        };
    },
    methods: {
        async fetchProductData() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/show/product');
                this.productData = res.data.product;
            } catch (error) {
                console.error(error);
            }
        },
        async handleDelete(itemId) {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/delete/product/${itemId}`);
                this.productDeletedMessage = res.data.productDeletedMessage;

                this.fetchProductData();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        },
    },
    mounted() {
        this.fetchProductData();
    },
};
</script>







<template>
    <div class="flex justify-center h-screen bg-gray-200 p-20">
        <div class="flex flex-col">
            <p class=" text-green-500">{{ productDeletedMessage }}</p>
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full text-center text-sm text-black bg-white">
                            <thead class="border-b bg-white font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" class="px-6 py-4">#</th>
                                    <th scope="col" class="px-6 py-4">Name</th>
                                    <th scope="col" class="px-6 py-4">Price</th>
                                    <th scope="col" class="px-6 py-4">Image</th>
                                    <th scope="col" class="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b bg-neutral-100 dark:border-neutral-500"
                                    v-for="(item, index) in productData" :key="item.id">
                                    <td class="whitespace-nowrap px-6 py-4 font-medium">{{ item.id }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ item.name }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">{{ item.price }}</td>
                                    <td class="whitespace-nowrap px-6 py-4">
                                        <img class="w-[200px] rounded-lg"
                                            :src="'http://127.0.0.1:8000/productImages/' + item.product_image.image"
                                            alt="Product Image Description">
                                    </td>
                                    <td class="whitespace-nowrap px-6 py-4">
                                        <router-link class="mx-2 text-orange-400 text-lg hover:text-orange-700" :to="{ name: 'Update', params: { id: item.id } }">Edit</router-link>

                                        <button v-on:click="handleDelete(item.id)"
                                            class=" mx-2 text-red-600 text-lg hover:text-red-700">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>