
<!-- admin chat -->
<template>
    <div class="admin-chat">
        <adminaside></adminaside>
        <adminheader></adminheader>
        <div class="admin-chat-main">
            <el-row style="margin: 0;height: 500px" :gutter="24">
                <el-col style="margin: 0;height: 100%; border-left: 1px solid rgb(212, 213, 218);" :span="3.9">
                    <el-tabs @tab-click="tabClick" style="color: #777; font-size: 15px">
                        <el-tab-pane name="1" label="全部群组" v-loading="loading">
                            <el-row style="margin-top: 5px; margin-bottom: 5px" :gutter="24"  v-for="(item, index) in dataList" :key="index" v-loading="loading">
                                <el-col :span="15">{{ item.groupName }}</el-col>
                                <el-col :span="9">{{ item.groupSize }} 人</el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane name="2" label="我的群组" v-loading="loading">
                            <el-row style="margin-top: 5px; margin-bottom: 5px" :gutter="24"  v-for="(items, index) in dataList" :key="index">
                                <el-col :span="15">
                                    <span  class="chat-group-info" @click="getGroup(items.id)" >{{ items.groupName }}</span>
                                </el-col>
                                <el-col :span="9">{{ items.groupSize }} 人</el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col v-show="chatBoxVisible" v-model="dataInfo" style="margin: 0; height: 500px; border-left: 1px solid rgb(212, 213, 218); color: #777;" :span="16">
                    <div style="width: 100%; height: 90%">
                        <span>群组名: {{ dataInfo.groupName }} &nbsp;&nbsp;&nbsp;&nbsp; 总人数: {{ dataInfo.userList.length }} &nbsp;&nbsp;&nbsp;&nbsp; 在线人数: {{ onlineNum }} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <div style="width: 100%; height: 100%; background-color: rgb(240, 240, 240)">
                            <div v-for="(item, index) in msgList" :key="index" style="width: 100%">
                                <div style="width: 96%; height: 30px; margin-left: 2%; margin-right: 2%;">
                                    <div :style="item.fromUser === userName ? 'float: right;' : 'float: left;'">
                                        <span v-if="item.fromUser === userName">{{ item.content }} :{{ item.fromUser }}</span>
                                        <span v-if="item.fromUser != userName">{{ item.fromUser }}: {{ item.content }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 100%; height: 10%;">
                        <el-input style="width:100%; border: none" size="medium" name="content" v-model="content" placeholder="请输入信息" clearable>
                            <el-button @click="sendMsg()" slot="append" style="width:100%; border: none" type="primary" size="medium">发送</el-button>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
import adminaside from '@/components/adminaside'
import adminheader from '@/components/adminheader'
import { uploadImage } from '@/api/admin/blog'
import { getList, getGroup, getMyGroup } from '@/api/admin/component/chat'
export default {
    name: 'adminchat',
    components: {
        adminaside,
        adminheader
    },
    data() {
        return {
            ws: null,
            loading: false,
            chatBoxVisible: false,
            dataList: [],
            id: '',
            userId: '',
            userName: '',
            dataInfo: {
                id: '',
                groupName: '',
                onlineNum: 0,
                offlineNum: 0,
                userList: []
            },
            msgList: [],
            content: '',
            onlineNum: 0
        }
    },

    created() {
        this.getList()
    },

    mounted() {
        // this.initWebSocket();
    },

    methods: {

        getList() {
            this.userId = JSON.parse(localStorage.getItem('userInfo')).id
            this.userName = JSON.parse(localStorage.getItem('userInfo')).username
            this.loading = true
            getList({}).then(response => {
                this.dataList = response.data.body.dataList
                this.loading = false
            }).catch(() => {
                this.loading = false
            });
        },

        getGroup(id) {
            this.chatBoxVisible = false
            this.loading = true
            getGroup({id: id}).then(response => {
                this.dataInfo = response.data.body.dataInfo
                this.loading = false
            }).catch(() => {
                this.loading = false
            });
            this.initWebSocket(id)
            this.chatBoxVisible = true
        },

        sendMsg() {
            var _this = this
            var params = {
                content: _this.content
            }
            _this.ws.send(JSON.stringify(params))
            this.content = ''
        },

        tabClick(tab, event) {
            if (tab.name === "1") {
                this.dataList = []
                this.loading = true
                getList({}).then(response => {
                    this.dataList = response.data.body.dataList
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                });
            } else {
                this.dataList = []
                this.loading = true
                getMyGroup({userId: this.userId}).then(response => {
                    this.dataList = response.data.body.dataList
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                });
            }
        },

        //初始化 websocket
        initWebSocket(id) {
            this.id = id
            var _this = this
            if (window.WebSocket) {
                var serverHot = window.location.hostname
                //本地
                //var url = 'ws://' + serverHot + ':8082' + '/api/chat/private/' + id + '/' + this.userId + '/' + this.userName
                //服务器
                var url = 'ws://119.23.234.176:3301' + '/chat/private/' + id + '/' + this.userId + '/' + this.userName
                var ws = new WebSocket(url)
                _this.ws = ws
                ws.onopen = function(e) {
                }
                ws.onmessage = function(e) {
                    _this.msgList.push(JSON.parse(e.data))
                    _this.onlineNum = JSON.parse(e.data).onlineNum
                }
                ws.onclose = function(e) {
                }
            }
        },

    }

}
</script>

<style>
.admin-chat {
    width: 100%;
}
.admin-chat-main {
    width: 81%;
    margin: 10px 2% 10px 16%;
    padding: 10px;
}
.chat-botton {
    padding-top: 10px;
}
.chat-table {
    padding-top: 10px;
}
.chat-page {
    padding-top: 10px;
}
.chat-send {
    width: 40%;
}
.chat-group-info {
    cursor: pointer;
}
.chat-group-info:hover {
    color: #409EFF;
}

</style>










