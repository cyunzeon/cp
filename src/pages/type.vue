<template>
	<div :class="wrapClass">
		
	</div>
</template>
<script>
	export default {
		name:'type',
		data(){
			return{
				wrapClass:'',
		        urlDatas:{},
			}
		},
		created() {
      		let gid = this.$route.params.gid;
      		let data = this.lottery[gid];
      		let className = 'type-'+gid;
      		this.wrapClass = className+' type';
      		this.urlData = this.DownUrl
      	},
		mounted(){
			if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {//ios终端
				window.location = this.urlData.ios
			}else{
				window.location = this.urlData.and
			}
		}
	};
</script>
<style lang='scss' scoped>
	@import '../assets/css/type.scss';
</style>