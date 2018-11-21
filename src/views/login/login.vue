<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" label-position="left">
      <div class="title-container">
        <h3 class="title">登录</h3>
        <lang-select class="set-language"></lang-select>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" placeholder="" name="username" type="text" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="loginForm.password" placeholder="" name="password" type="password" auto-complete="on"></el-input>
        <span class="show-pwd">
          <svg-icon icon-class="eye" />
        </span>      
      </el-form-item>
      <el-button :loading="loading" style="width:100%;margin-bottom:30px;" type="primary">登录</el-button>
      <div class="tips">
        <span>admin</span>
        <span>password</span>
      </div>
      <div class="tips">
        <span>admin</span>
        <span>password</span>
      </div>
      <el-button class="thirdparty-button" type="primary">Connect</el-button>
    </el-form>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
export default {
  name: 'Login',
  components: { LangSelect },
  data() {
    return {
      loginForm: {
        username: 'admin', //用户名
        password: '11111', //密码
      },
      loading: false,
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和 光标变色
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-wenkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    width: 85%;
    height: 47px;
    input {
      border: 0px;
      background: transparent;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.1);
    border-radius: 5px;
    color:#454545;
  }
}
</style>

<style scoped>
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
	position: fixed;
	height: 100%;
	width: 100%;
  background-color: $bg;
  .login-form{
    position:absolute;
    left:0;
    right:0;
    width: 520px;
    max-width: 100%;
    margin: 120px auto;
    padding: 35px 35px 15px 35px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}
  .title-container {
		position: relative;
		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
		.set-language {
			color: #fff;
			position: absolute;
			top: 5px;
			right: 0px;
		}
	}
	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
	.thirdparty-button {
		position: absolute;
		right: 35px;
		bottom: 28px;
	}
}

</style>

