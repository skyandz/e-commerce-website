<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="http://localhost:8080/">KUSHOP</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <!-- a class="nav-link active" aria-current="page" href="#">Home</a -->
                        <router-link to="/" style="text-decoration: none;">
                            <div class="nav-link">Home</div>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="memName === null">
                        <router-link to="/Login" style="text-decoration: none;">
                            <div class="nav-link">Login</div>
                        </router-link>
                    </li>
                    <li class="nav-item" v-else>
                        <a href="#" @click="memlogout" style="text-decoration: none;">
                            <div class="nav-link">Logout</div>
                        </a>
                    </li>
                    <li class="nav-item ">
                        <router-link to="/cartlist" style="text-decoration: none;">
                            <div class="nav-link fw-bold">Cart</div>
                        </router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link to="/pagemember" style="text-decoration: none;">
                            <div class="nav-link fw-bold">{{ memName }}</div>
                        </router-link>
                    </li>
                </ul>
                <div class="text-end pe-3">
                    <CartInfo />
                </div>
            </div>
        </div>
    </nav>
</template>
 
<script>
import CartInfo from './CartInfo.vue';
import axios from "axios";
axios.defaults.withCredentials = true
import { EventBus } from "../event-bus"
export default {
    name: 'MainMenu',
    components:{
        CartInfo
    },
    data() {
        return {
            memName: null,
            backendMessage:null
        }
    },
    mounted() {
        // เมื่อเริ่ม mount ให้อ่านค่าจาก sessionStorage
        this.memName = sessionStorage.getItem('memName')
        // เมื่อ EventBus เกิดสัญญาณ loginok ให้อ่านข้อมูลจาก sessionStorage ใหม่
        EventBus.on('loginok', () => {
            this.memName = sessionStorage.getItem('memName')
        })
    },
    // เมื่อ Unmount ให้ปิดการเชื่อมต่อกับEventBus
    beforeUnmount() {
        EventBus.off('loginok');
    },
    methods: {
        async memlogout() {
            const cf = window.confirm('ต้องการออกจากระบบ?')
            if (cf) {
                try {
                    const response = await axios.get(
                        `http://localhost:3000/members/logout`)
                    this.backendMessage = response.data.messagelogout;
                    if (this.backendMessage == 'success') {
                        // ลบเฉพาะ sessionStorage ที่ระบุ
                        // sessionStorage.removeItem('memName');
                        // ลบ sessionStorage ทั้งหมด
                        sessionStorage.clear()
                        this.memName = null
                        this.$router.push('/')
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
        }

    }


}
</script>
 
<style>
 
</style>