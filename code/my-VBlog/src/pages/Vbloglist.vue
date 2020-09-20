<template>
  <layout>
      <div>
          <el-card shadow="hover" style="margin-bottom: 20px" v-for="(item, index) in blog" :key="'blog' + index">
              <div slot="header">
                  <el-row>
                      <el-col :span="16">
                          <span>
                              <g-link :to="'/vblog/' + item.node.id" style="text-decoration:none;cursor:pointer">
                                  <i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{item.node.title}}
                              </g-link>
                          </span>
                      </el-col>
                      <!-- <el-col :span="8">
                          <div style="text-align: right;">
                              <el-button @click="$share('/user/blog/details/'+item.id)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                              <el-button @click="editBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token"></el-button>
                              <el-button @click="deleteBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-delete" v-if="token"></el-button>
                          </div>
                      </el-col> -->
                  </el-row>
              </div>
              <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                  最近更新 {{item.node.updateTime}}
              </div>
              <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
                  {{item.node.description}}
              </div>
          </el-card>
          <!-- <div style="text-align: center">
              <el-pagination @current-change="list" background layout="prev, pager, next" :current-page.sync="query.page" :page-size="query.pageSize"
                  :total="query.pageNumber*query.pageSize">
              </el-pagination>
          </div> -->
          <pager :info="$page.blog.pageInfo"/>
      </div>
  </layout>
</template>
<page-query>
  query ($page: Int) {
    blog: allStrapiBlog (perPage: 2, page:$page) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          title
          content
          description
          updateTime
          createTime
        }
      }
    }
  }
</page-query>

<script>
import { Pager } from 'gridsome'
export default {
  name: 'VblogList',
  metaInfo: {
    title: '小毛驴儿的博客 - 博客列表'
  },
  computed: {
    blog () {
      return this.$page.blog.edges
    }
  },
  mounted () {
    console.log(this.blog, '博客列表')
  },
  components: {
    Pager
  }
}
</script>

<style>

</style>