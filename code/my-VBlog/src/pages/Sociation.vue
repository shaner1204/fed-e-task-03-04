<template>
  <layout>
      <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px">
            <el-tabs v-model="activeTab" type="card">
                <el-tab-pane :label="'粉丝 '+ followers.length" name="followers" style="padding: 5px">
                    <div v-loading="followers.loading">
                        <div v-if="followings.length">
                            <el-row style="min-height: 200px; ">
                                <el-col :span="8" style="padding: 10px" v-for="(item, index) in followers" :key="index">
                                    <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                                        <i class="el-icon-star-off"></i>&emsp;
                                        <g-link :to="'/follower/' + item.node.id" style=" text-decoration:none;cursor:pointer">{{item.node.name}}</g-link>
                                        <br>
                                        <i class="el-icon-message"></i>&emsp;
                                        <g-link :to="item.node.htmlUrl" style=" text-decoration:none;cursor:pointer">TA的主页</g-link>
                                        <br>
                                        <div class="avator" :style="{backgroundImage:`url(http://localhost:1337${item.node.avatarUrl.url})`}"></div>
                                        <!-- <img src='http://localhost:1337${item.node.avatarUrl.url}' style="width: 100%;border-radius:5px;margin-top: 5px"> -->
                                    </el-card>
                                </el-col>
                            </el-row>
                            <!-- <div style="text-align: center;margin-top: 10px">
                                <el-pagination @current-change="onSelect" background layout="prev, pager, next" :current-page.sync="followers.query.page"
                                    :page-size="followers.query.pageSize" :total="followers.query.pageNumber*followers.query.pageSize">
                                </el-pagination>
                            </div> -->
                        </div>
                        <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-else>
                            <font style="font-size: 30px;color:#dddddd ">
                                <b>(￢_￢) 没有一个粉丝</b>
                            </font>
                        </div>
                        <pager :info="$page.followers.pageInfo"/>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="'关注 '+ followings.length" name="following" style="padding: 5px">
                    <div>
                        <div v-if="followings.length">
                            <el-row style="min-height: 200px; ">
                                <el-col :span="8" v-for="(item,index) in followings" :key="'following'+index" style="padding: 10px">
                                    <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                                        <i class="el-icon-star-off"></i>&emsp;
                                        <g-link :to="'/following/' + item.node.id" style=" text-decoration:none;cursor:pointer">{{item.node.name}}</g-link>
                                        <br>
                                        <i class="el-icon-message"></i>&emsp;
                                        <g-link :to="item.node.htmlUrl" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</g-link>
                                        <br>
                                        <div class="avator" :style="{backgroundImage:`url(http://localhost:1337${item.node.avatarUrl.url})`}"></div>
                                    </el-card>
                                </el-col>
                            </el-row>
                            <!-- <div style="text-align: center;margin-top: 10px">
                                <el-pagination @current-change="onSelect" background layout="prev, pager, next" :current-page.sync="following.query.page"
                                    :page-size="following.query.pageSize" :total="following.query.pageNumber*following.query.pageSize">
                                </el-pagination>
                            </div> -->
                        </div>
                        <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-else>
                            <font style="font-size: 30px;color:#dddddd ">
                                <b>(￢_￢) 还没有关注一个人</b>
                            </font>
                        </div>
                        <pager :info="$page.followings.pageInfo"/>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
  </layout>
</template>
<page-query>
    query ($page: Int) {
        followers: allStrapiFollowers (perPage: 2, page:$page) @paginate {
            pageInfo {
                totalPages
                currentPage
            }
            edges {
                node {
                    id
                    name
                    htmlUrl
                    avatarUrl {
                        url
                    }
                }
            }
        }
        followings: allStrapiFollowings (perPage: 2, page:$page) @paginate {
            pageInfo {
                totalPages
                currentPage
            }
            edges {
                node {
                    id
                    name
                    htmlUrl
                    avatarUrl {
                        url
                    }
                }
            }
        }
    }
</page-query>

<script>
import { Pager } from 'gridsome'
export default {
  name: 'Sociation',
  metaInfo: {
    title: '小毛驴儿的博客 - 社交圈'
  },
  data () {
    return {
    //   followersTotal: 12,
    //   followingTotal: 2,
    //   activeTab: "followers",
    //   followers: {
    //     query: {
    //         page: 1,
    //         pageSize: 9,
    //         pageNumber: 1
    //     },
    //     loading: false,
    //     list: []
    //   },
    //   following: {
    //     query: {
    //         page: 1,
    //         pageSize: 9,
    //         pageNumber: 1
    //     },
    //     loading: false,
    //     list: []
    //   }
    }
  },
  mounted () {
    console.log(this.$page, 'this------------')
    console.log(this.$page.followings.pageInfo, 'this------------followers')
    this.$set(this.$page.followers.edges, 'loading', false)
    this.$set(this.$page.followings.edges, 'loading', false)
  },
  computed: {
      followers () {
        this.$set(this.$page.followers.edges, 'loading', true)
        return this.$page.followers.edges
      },
      followings () {
          this.$set(this.$page.followings.edges, 'loading', true)
        return this.$page.followings.edges
      },
      activeTab () {
        return 'followers'
      }
  },
  components: {
    Pager
  },
  methods: {
    // onSelect() {
    //   switch (this.activeTab) {
    //     case "followers":
    //       this.listFollowers()
    //       break
    //     case "following":
    //       this.listFollowing()
    //       break
    //     default:
    //       break
    //   }
    // }
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