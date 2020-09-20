<template>
  <div class="layout">
    <section class="page-header" :style="'background-image: linear-gradient(120deg, '+backgroundColorLeft+', '+backgroundColorRight+');color: '+fontColor+';'">
        <!-- <div style="position:absolute; top:20px; right:20px; z-index:2;">
            <el-tooltip effect="dark" :content="fullButton.full?'退出':'全屏'" placement="bottom-end">
                <el-button @click="full" :icon="fullButton.full?'el-icon-close':'el-icon-rank'" circle></el-button>
            </el-tooltip>
        </div> -->
        <div v-for="(item,index) in randomIcon" :key="'ri'+index" :style="'position:absolute; top:'+item.top+'px; left:'+item.left+'px; z-index:1;'">
            <font :style="'font-size: '+item.size+'px;color:#fff;'">
                <b>♪</b>
            </font>
        </div>
        <h1 class="project-name">小毛驴儿</h1>
        <h2 class="project-tagline">欢迎来到小毛驴儿的个人博客</h2>
        <a :href="'https://github.com/'+githubUsername" class="btn" target="_blank">GitHub主页</a>
        <a href="https://github.com/GitHub-Laziji/vblog" class="btn" target="_blank" v-if="!mini">博客源码</a>
    </section>
    <section class="main-content">
        <el-row>
            <el-col :span="6" style="padding-right:10px">
                <!-- 侧边栏菜单  -->
                <div>
                  <el-card shadow="never">
                      <el-menu 
                        :default-active="active"
                      >
                          <el-menu-item v-for="(item) in constantRouterMap"
                              :key="item.id" :index="item.meta.path">
                              <g-link :to="item.meta.path">
                              <i :class="item.meta.icon"></i>
                              <span slot="title">{{item.meta.title}}</span>
                              </g-link>
                          </el-menu-item>
                      </el-menu>
                  </el-card>

                  <el-card shadow="never" style="margin-top: 20px;text-align: center">
                      <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                          <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token未绑定&nbsp;&nbsp;
                          <el-button type="text">绑定</el-button>
                      </div>
                      <div style="font-size: 0.9rem;line-height: 1.5;color: #303133;">
                          <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token已绑定&nbsp;&nbsp;
                          <el-button type="text">注销</el-button>
                      </div>
                      <div style="margin-top: 10px;text-align: left">
                          <el-alert title="Token获取" type="info" description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md"
                              :closable="false">
                          </el-alert>
                      </div>
                  </el-card>
                </div>
                <!-- 侧边栏菜单  -->
            </el-col>
            <el-col :span="18" style="padding-left:10px">
                <!-- <app-main></app-main> -->
                <section>
                  <slot/>
                </section>
            </el-col>
        </el-row>

    </section>
    <section class="foot">
      <div style="border-top: 1px #e1e4e8 solid !important;padding: 45px 0px 45px 0px;">
        <el-row>
          <el-col :span="10">
            <div>
              © 2018 GitHub-Laziji&emsp;&emsp;
              <a href="https://github.com/GitHub-Laziji" target="_blank">Profile</a>&emsp;&emsp;
              <a href="https://github.com/GitHub-Laziji/vblog" target="_blank">VBlog</a>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="text-align: center;font-size: 18px">
              <i class="el-icon-location-outline"></i>
            </div>
          </el-col>
          <el-col :span="10">
            <div style="float: right;">
              <a href="https://developer.github.com" target="_blank">GitHub-API</a>&emsp;&emsp;
              <a href="https://cn.vuejs.org/" target="_blank">Vue.js</a>&emsp;&emsp;
              <a href="http://element.eleme.io/" target="_blank">Element</a>

            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>
<script>
// import Sidebar from './components/Sidebar'
// // import AppMain from './components/AppMain'
// import Foot from './components/Foot'
export default {
  data () {
    return {
      randomIcon: [],
      fullButton: {
        full: false
      },
      backgroundColorLeft: '#683799',
      backgroundColorRight: '#822933',
      githubUsername: '小毛驴儿',
      fontColor: '#ffffff',
      mini: false,
      constantRouterMap: [{
        meta: {
            type: "user",
            icon: 'el-icon-star-off',
            title: '最新动态',
            id: 0,
            path: '/'
        }
      }, {
        meta: {
            type: "user",
            icon: 'el-icon-mobile-phone',
            title: '社交圈',
            id: 1,
            path: '/sociation'
        }
      }, {
        meta: {
            type: "user",
            icon: 'el-icon-edit-outline',
            title: '博客列表',
            id: 2,
            path: '/Vbloglist'
        }
      }, {
        meta: {
            type: "user",
            icon: 'el-icon-service',
            title: '开源项目',
            id: 3,
            path: '/Projectlist'
        }
      }
      // {
      //   meta: {
      //       type: "user",
      //       icon: 'el-icon-printer',
      //       title: '使用帮助',
      //       mini: true
      //   }
      // }, {
      //   meta: {
      //       type: "user",
      //       icon: 'el-icon-document',
      //       title: 'README.md'
      //   }
      // }
      ],
      topbar: {
        active: "",
      },
      active: "1"
    }
  },
  // components: {
  //     Sidebar,
  //     // AppMain,
  //     Foot
  // },
  mounted() {
    // this.$nextTick(() => {
    //   setInterval(this.listenMusic, 1000)
    // })
    let width = window.innerWidth
    for (let i = 0; i < 12; i++) {
      let temp = {}
      let left = this.$util.randomInt(10, width - 310)
      if(left>width/2-150){
          left+=300
      }
      temp["left"] = left
      temp["top"] = this.$util.randomInt(20, 300)
      temp["size"] = this.$util.randomInt(20, 40)
      this.randomIcon.push(temp)
    }
    let arr = this.$route.path.split('/')
    this.active = this.$route.path
  }
}
</script>
<style>
a {
  color: #303133 !important;
}
.el-menu-item.is-active a {
  color: #409EFF !important;
}
.page-header {
  padding: 5rem 6rem;
  color: #fff;
  text-align: center;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
}

.project-name {
  font-size: 3.25rem;
  margin-top: 0;
  margin-bottom: 0.1rem;
}

.project-tagline {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: normal;
  opacity: 0.7;
}

.btn:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

a:hover {
  text-decoration: underline;
}

a:active,
a:hover {
  outline: 0;
}

.btn {
  padding: 0.75rem 1rem;
  display: inline-block;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  border-style: solid;
  border-width: 1px;
  border-radius: 0.3rem;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

a {
  color: #1e6bb8;
  text-decoration: none;
}

.btn+.btn {
  margin-left: 1rem;
}

.main-content {
  max-width: 64rem;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
}

.foot {
  max-width: 67rem;
  margin: 0 auto;
  font-size: 12px !important;
  color: #586069 !important;
  word-wrap: break-word;
}
</style>
