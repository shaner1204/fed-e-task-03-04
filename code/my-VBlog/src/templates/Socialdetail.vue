<template>
  <layout>
      <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;">
            <div slot="header" class="clearfix">
                <span>{{detail.name}}</span>
                <el-button @click="$router.go(-1)" style="float: right; padding: 3px 0" type="text" icon="el-icon-d-arrow-left">返回</el-button>
            </div>
            <el-row>
                <el-col :span="9" style="padding: 0px 10px 20px 0px">
                    <div class="avator" :style="{backgroundImage:`url(http://localhost:1337${detail.avatarUrl.url})`}"></div>
                    <!-- <img :src="avatarUrl" style="width: 100%;border-radius:5px;"> -->
                    <div style="padding: 10px">
                        <font style="font-size: 26px;line-height: 40px;font-weight: 600">{{detail.firstname}}
                            <br>
                        </font>
                        <font style="font-size: 20px;font-style: normal;font-weight: 300;line-height: 35px;color: #666;">{{detail.name}}
                            <br>
                        </font>
                        <font style="font-size: 14px;color:#606266;">
                            <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                            <a target="_blank">{{detail.htmlUrl}}</a>
                            <br>
                        </font>
                    </div>

                </el-col>
                <el-col :span="15" style="padding: 0px 20px 20px 10px">
                    <div style="width: 100%;min-height: 300px; border-radius:5px; border: 1px solid #EBEEF5;padding: 10px;font-size: 16px;
                    color: #6a737d;" v-if="detail.intro">
                       {{detail.intro}}
                    </div>
                    <div style="width: 100%;min-height: 300px; border-radius:5px; border: 1px solid #EBEEF5;padding: 30px;text-align: center;
                    font-size: 30px;color:#dddddd" v-else>
                        <b>◔ ‸◔？没有简介</b>
                    </div>
                </el-col>
            </el-row>

        </el-card>
  </layout>
</template>
<page-query>
query ($id: ID!) {
  detail: strapiFollowers (id: $id) {
    name
    htmlUrl
    avatarUrl {
      url
    }
    intro
  }
  detailFollowing: strapiFollowings (id: $id) {
    name
    htmlUrl
    avatarUrl {
      url
    }
    intro
  }
}
</page-query>

<script>
export default {
  name: 'Socialdetail',
  metaInfo: {
    title: '小毛驴儿的博客 - 社交圈详情'
  },
  computed: {
    detail () {
        console.log(this.$route.path.split('/'))
        return this.$route.path.split('/')[1] === 'follower' ? this.$page.detail : this.$page.detailFollowing
    }
  },
  mounted () {
    console.log(this.detail, 'detail')
  }
}
</script>

<style>
.avator {
    width: 153px;
    height: 153px;
    border-radius: 5px;
    background-size: contain;
    background-repeat: no-repeat;
}
</style>