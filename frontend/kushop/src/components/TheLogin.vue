<template>
    <div class="row mt-5">
        <div class="col-sm-12 col-md-6 col-lg-6 mb-5">
            <img src="../assets/LogoSRC.png" alt="" width="80%">
        </div>
        <div class="col-sm-12 col-md-6 col-lg-6 mb3">
            <!-- เมื่อสั่ง Submit ให้เรียก Function handleSubmit -->
            <form @submit.prevent="handleSubmit()">
                <div class="col-sm-12 col-md-10 col-lg-8">
                    <div class="form-floating mb-3">
                        <input class="form-control" type="text" id="loginname" v-model="loginname" autocomplete="off"
                            required autofocus placeholder="loginname">
                        <label for="loginname">Loginname</label>
                    </div>
                </div>
                <div class="col-sm-12  col-md-10 col-lg-8">
                    <div class="form-floating mb-3">
                        <input class="form-control" type="password" id="password" v-model="password" required
                            placeholder="Password">
                        <label for="password">Password</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12  col-md-6 mb-3">
                        <router-link to="/register" style="text-decoration: none;">
                            <a href="#" class="btn btn-outline-danger">
                                <i class="bi bi-heart-fill"></i>&nbsp;ลงทะเบียนใหม่</a>
                        </router-link>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <button class="btn btn-primary " type="submit" style="width: 6rem;">
                            <i class="bi bi-check-lg"></i>&nbsp;ตกลง</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- ส่วนแสดงสถานะ จากการตอบกลับของ Backend -->
    <p v-if="backendMessage == 'success'" class="alert alert-success ">
        เข้าระบบสำเร็จ-{{ backendMessage }}</p>
    <p v-else-if="backendMessage == 'fail'" class="alert alert-danger">
        เข้าระบบผิดพลาด-{{ backendMessage }}</p>
</template>

<script>
import axios from 'axios'
import { EventBus } from '../event-bus';
//axios.defaults.withCredentials = true;
export default {
    name: 'TheLogin',
    data() {
        return {
            loginname: null,
            password: null,
            backendMessage: null,
            memEmail: null,
            memName: null,
            dutyId: null,
        }
    },
    mounted() {
        if (sessionStorage.getItem('memEmail') != null) {
            this.$router.push('/pagemember')
        }
    },
    methods: {
        async handleSubmit() {
            let members = {
                loginname: this.loginname,
                password: this.password
            }
            try {
                const response = await axios.post(
                    //`http://localhost:3000/members/login`,members,{withCredentials : true}
                    `http://localhost:3000/members/login`, members
                )
                this.backendMessage = response.data.messagelogin;
                if (this.backendMessage == 'success') {
                    await this.chkSession()
                    EventBus.emit('loginok')
                    this.$router.push('/pagemember')
                }

            } catch (err) {
                console.log(err)

            }
        },
        async chkSession() {
            await axios.get(`http://localhost:3000/members/getss`)
                .then(res => {
                    console.log(res.data)
                    this.memEmail = res.data.email
                    this.memName = res.data.name
                    this.dutyId = res.data.duty
                    sessionStorage.setItem('memName', res.data.name)
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }
}
</script>

<style></style>