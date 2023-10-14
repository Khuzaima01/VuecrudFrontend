<script>
import axios from 'axios';

export default {
    data() {
        return {
            FormData: {
                name: '',
                price: '',
                image: null,
            },
            submitting: false,
            validationErrors: [],
            productCreatedSucc: '',
            product: '',
            productImage: '',
        }
    },
    methods: {
        handleImage(e) {
            this.FormData.image = e.target.files[0];
        },
        submitForm() {
            this.submitting = true;
            this.validationErrors= '',
            axios.post(`http://127.0.0.1:8000/api/update/product/22`, this.FormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
                .then(response => {
                    this.productCreatedSucc = response.data.productCreatedSucc;
                    this.submitting = false;
                    // this.$router.push('/show');
                })
                .catch(error => {
                    console.error(error);
                    this.submitting = false;
                    this.validationErrors = error.response.data.errors;
                });
        },
        async getProductData(itemId) {
            try {
                const productData = await axios.get(`http://127.0.0.1:8000/api/edit/product/${itemId}`)
                    .then(res => {
                        this.product = res.data.product;
                        this.FormData.name = this.product[0].name;
                        this.FormData.price = this.product[0].price;
                        this.productImage = this.product[0].product_image.image;

                    });
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.getProductData(this.$route.params.id);
    }
}
</script>

<template>
    <div class="p-4">
        <form @submit.prevent="submitForm" class="w-50 mx-auto mt-5 border rounded p-3 shadow w-[700px]">
            <div class=" card-header border-bottom p-2">
                <h3 class=" text-2xl">Create Product</h3>
            </div>
            <div class="form-group my-4">
                <label for="exampleInputEmail1" class="my-2">Name</label>
                <input type="text" id="name" v-model="FormData.name"
                    class="block border-2 border-gray-300 rounded p-3 w-full" aria-describedby="emailHelp"
                    placeholder="Enter Name">
            </div>
            <div v-if="validationErrors.name" class="my-2">
                <p class=" text-red-600">{{ validationErrors.name[0] }}</p>
            </div>
            <div class="form-group my-4">
                <label for="exampleInputEmail1" class="my-2 block">Price</label>
                <input type="text" id="price" v-model="FormData.price" class="border-2 border-gray-300 p-3 rounded w-full"
                    aria-describedby="emailHelp" placeholder="Enter Price">
            </div>
            <div v-if="validationErrors.price" class="my-2">
                <p class=" text-red-600">{{ validationErrors.price[0] }}</p>
            </div>
            <div class="form-group my-4">
                <label for="exampleInputEmail1" class="my-2 block">Image</label>
                <input type="file" id="price" v-on:change="handleImage" class="border-2 border-gray-300 p-3 rounded w-full">
            </div>
            <div v-if="validationErrors.image" class="my-2">
                <p class=" text-red-600">{{ validationErrors.image[0] }}</p>
            </div>
            <button type="submit" v-if="!submitting" class=" bg-blue-500 rounded text-white"
                style="width: 100px; height: 40px;">Submit</button>
            <button v-else class="btn btn-primary d-flex align-items-center justify-content-center"
                style="width: 100px; height: 40px;">
                <div class=" bg-blue-400 rounded p-2 text-white">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </button>
            <div v-for="(item, index) in product" :key="item.id">
                <div class=" flex items-center p-4 border">
                    <p>Old Image:</p>
                    <img class="w-[200px] rounded-lg"
                        :src="'http://127.0.0.1:8000/productImages/' + item.product_image.image"
                        alt="Product Image Description">
                </div>
            </div>
            <p class=" text-green-500">{{ productCreatedSucc }}</p>
        </form>
    </div>
</template>