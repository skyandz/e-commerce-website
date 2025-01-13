<template>
    <div class="row">
        <div class="col-lg-9 h1 text-danger">Our Products</div>
        <div class="col lg-2 text-end">
            <input type="text" v-model="stext" class="form-control">
        </div>
        <div class="col">
            <button class="btn btn-primary" @click="searchProduct()">search</button>
        </div>
    </div>
    <div class="row">
        <div v-for="(pd, pdId) in products" :key="pdId" class="col-lg-4 col-md-6 col-sm-12">
            <div class="card mt-4" style="width: 18rem; background-color: #EEEEEE;">
                <img :src="`http://127.0.0.1:3000/img_pd/${ pd.pdId }.jpg`" class="card-img-top p-2" alt="">
                <div class="card-body">
                    <h5 class="card-title">{{ pd.pdName }}</h5>
                    <p class="card-text">{{ pd.brand.brandName }} - {{ pd.pdPrice }}</p>
                    <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                    <!-- กำหนด router-link แสดง Component ProductShow -->
                    <!-- จะมีการส่ง Parameter ไปกับ router-link ด้วยจะต้องใช้ :to และกำหนด params -->
                    <!-- และส่งเป็นลักษณะชุดข้อมูล key:value -->
                    <!-- สามารถส่ง parameter ได้หลายตัวโดยระบุเป็นชุดข้อมูลซ้่อนเข้าไปได้ -->
                    <router-link :to="{ name: 'ProductShow', params: { pdId: pd.pdId } }" style="text-decoration: none;">
                        <div class="btn btn-primary">details</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import axios from 'axios';
export default {
    name: 'PageProduct',
    data() {
        return {
            products: [],
            stext: ''
        }
    },
    mounted(){
/*         fetch('http://127.0.0.1:3000/products')
        .then(res=>res.json())
        .then(data=>this.products=data)
        .catch(err=>console.log(err.message)) */
        // axios.get('http://127.0.0.1:3000/products')
        axios.get('http://127.0.0.1:3000/products/ten')
        .then(res => {
            this.products = res.data;
        })
        .catch(err => {
            console.error(err)
        })
    },
    methods:{
        searchProduct(){
            axios.get(`http://127.0.0.1:3000/products/search/${this.stext}`)
            .then(res=> {
                console.log(this.stext);
                this.products = res.data;
            })
            .catch(err => {
                console.error(err)
            })
        }
    }
}
</script>

<style></style>