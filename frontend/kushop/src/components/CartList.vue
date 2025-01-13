<template>
    <H1>{{ memEmail }}</H1>
    <table class="table">
        <tr class="bg-secondary bg-opacity-10" style="height: 30px;">
            <td></td>
            <td>Cart ID</td>
            <td>Date</td>
            <td>Quantity</td>
            <td clss=text-center>Amount</td>
            <td class="text-end">CF Payment</td>

            <td></td>
        </tr>
        <tr v-for="(ct, cartId) in cart" :key="cartId" style="height: 30px;" >
            <td>{{ ct.row_number }}</td> <!-- row -->
            <td><span class="text-primary">
                    <router-link :to="`/cartshow/${ct.cartId }`" style="text-decoration: none;">
                        {{ ct.cartId }}
                    </router-link>
                </span>
            </td> <!-- เลขที่ -->
            <td>{{ formattedDate(ct.cartDate) }}</td> <!-- วันที่ -->
            <td class="text-center">{{ ct.sqty }}</td> <!-- จำนวน -->
           <!--  <td class="text-end">{{ ct.sprice.toLocaleString()}}</td> ยอดเงิน -->
            <td class="text-end">{{ ct.sprice}}</td> <!-- ยอดเงิน -->

            <!-- <td class="text-center">
                <i class="bi-x-lg text-danger"></i>
            </td> -->
            <td class="text-end">{{ ct.cartCf }}</td>
        </tr>
    </table>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true
export default {
    name:"CartList",
    data(){
        return{
            memEmail:null,
            cart:[] //รับข้อมูลตะกร้า
        }
    },
    async mounted(){
        await this.chkSession() //อ่านข้อมูลจาก Session
        await this.getCartList() //อ่านข้อมูล Cart
    },
    methods:{
        formattedDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth()+ 1).padStart(2, '0'); // เดือนเริ่มต้นที่ 0, จึงต้อง +1
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        async getCartList() {
            let customer = {
                id:this.memEmail
            }
            console.log('Get CartLIST')
            await axios.post(`http://localhost:3000/carts/getcartbycus`,customer)
                .then(res => {
                    console.log("Cart \n" + res.data)
                    this.cart = res.data
                    this.cusId = res.data[0].cusId
                })
                .catch(err => {
                    console.error(err);
                });
        },
        async chkSession() {
            await axios.get(`http://localhost:3000/members/getss`)
            .then(res => {
                console.log(res.data)
                this.memEmail = res.data.email
            })
            .catch(err => {
                console.error(err);
            });
        }
    }
}
</script>
<style></style>