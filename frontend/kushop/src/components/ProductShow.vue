<template>
    <!-- {{ products }} -->
    <div v-for="(pd, pdId) in products" :key="pdId" class="mt-5">
        <div class="row ">
            <div class="col-md-6 col-sm-12 ">
                <div class="card mx-auto" style="width: 18rem">
                    <img :src="`http://localhost:3000/img_pd/${pd.pdId}.jpg`" alt="">
                </div>
            </div>
            <div class="col-md-6 col-sm-12 ">
                <table class="table">
                    <tr class="table-secondary">
                        <td><h4>{{ pd.pdId }}</h4></td>
                        <td><h4>{{ pd.pdName }}</h4></td>
                    </tr>
                    <tr>
                        <td><h5>Price</h5></td>
                        <td><h5>{{ pd.pdPrice }}</h5></td>
                    </tr>
                    <tr>
                        <td><h5>Brand</h5></td>
                        <td><h5>{{ pd.brand.brandName }}</h5></td>
                    </tr>
                    <tr>
                        <td><h5>Detail</h5></td>
                        <td><h5>{{ pd.pdRemark }}</h5></td>
                    </tr>
                </table>
                
                <!-- สร้างปุ่มเพื่อทำการนำสินค้าลงตะกร้า เรียก function chkLogin -->
                <button class="btn btn-primary" @click="chkLogin()">
                    <i class="bi bi-cart lead"></i> Add to cart&nbsp;
                </button>

                <!-- <router-link to="/editDetail">
                    <button class="btn btn-warning float-end"><i class="bi bi-pencil-fill lead"></i>
                    แก้ไข&nbsp;&nbsp;</button>
                </router-link> -->
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true
import { EventBus } from "../event-bus"
export default {
    name: 'ProductShow',
    data() {
        return {
            products: [],//array เก็บข้อมูลสินค่า
            id: null, // รหัสสินค้าที่ส่งมา
            memEmail: null,
            cartId: null
        }
    },
    mounted() {
        // อ่านค่าจะ parameter ที่ส่งมาจาก routes
        this.id = this.$route.params.pdId
        // ระบุ id ของสินค้าที่ต้องการ
        axios.get(`http://localhost:3000/products/${this.id}`)
            .then(res => {
                this.products = res.data;
            })
            .catch(err => {
                console.error(err);
            });
    },
    methods: {
        async chkLogin() {
            console.log('chkLogin')
            await this.chkSession() //ตรวจสอบว่า Login แล้วหรือยัง
            if(this.memEmail == null)
            {
                alert("ต้อง Login เข้าระบบก่อน")
                return false //ถ้ายังไม่ Login บอกให้ Login
            }
            await this.chkCart() // ถ้า Login แล้วให้ตรวจสอบว่ามี Cart หรือยัง
            if(this.cartId == null)
            {
                await this.addCart() // ถ้ายังไม่มีให้สร้างตะกร้า
            }
            this.addCartDtl() // ถ้ามีตะกร้าแล้วให้เอาสินค้าใส่ตะกร้า
        },
        async chkSession() {
            await axios.get(`http://localhost:3000/members/getss`)
                .then(res => {
                    this.memEmail = res.data.email
                    console.log(this.memEmail)
                })
                .catch(err => {
                    console.error(err);
                });
        },
        async chkCart()
        {
            console.log('chkCart')
             await axios.get(`http://localhost:3000/carts/chkcart`)
                .then(res => {
                    console.log("Cart"+res.data)
                    this.cartId = res.data.id
                })
                .catch(err => {
                    console.error(err);
                });
        },
        async addCart()
        {
            console.log("addCard")
            let customer={ //1.สร้างชุดข้อมูลส่งไปให้ Backend POST
                cusId:this.memEmail
            }
            try{ //2.ส่ง Method Request POST
                const response =await axios.post(
                `http://localhost:3000/carts/addcart`,customer
                )
                // 3.รับค่า Response จาก Backend เพื่ีอแสดงผล
                this.backendMessage = response.data.messageAddCart;
                this.cartId=response.data.messageAddCart
                console.log( response.data)
            }
            catch(err){
                console.log(err)
            }
        },
        async addCartDtl()
        {
            console.log("addCartDtl")
            let cartdtl={ //1.สร้างชุดข้อมูลส่งไปให้ Backend POST
                cartId:this.cartId,
                pdId:this.id,
                pdPrice:this.products[0].pdPrice
            }
            try{ //2.ส่ง Method Request POST
                const response =await axios.post(
                `http://localhost:3000/carts/addcartdtl`,cartdtl
                )
                EventBus.emit('cartdtlOK')
                // 3.รับค่า Response จาก Backend เพื่ีอแสดงผล
                this.backendMessage = response.data.messageAddCartDtl;
                console.log( response.data)
                // ส่งสัญญานมีการใส่ตะกร้า
               
            }
            catch(err){
                console.log(err)
            }
        }


    }
}
</script>

<style></style>