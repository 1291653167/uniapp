<template>
	<view class="page">
		<view class="cells address-edit ">
			<view class="cell bottom">
				<view class="label">
					收货人
				</view>
				<view class="content">
					<input type="text" placeholder="收货人姓名" v-model="name">
				</view>
			</view>
			<view class="cell bottom">
				<view class="label">
					联系方式
				</view>
				<view class="content">
					<input type="text" placeholder="收货人手机号" v-model="tel">
				</view>
			</view>
			<view class="cell bottom" @click="showPicker=true">
				<view class="label">
					所在地区
				</view>
				<view class="content">
					<input type="text" placeholder="选择省 / 市 / 区" disabled v-model="addr_text">
				</view>
			</view>
			<view class="cell bottom">
				<view class="label">
					详细地址
				</view>
				<view class="content">
					<input type="text" placeholder="街道门牌或楼房房间号等信息" v-model="detail">
				</view>
			</view>
		</view>
		<view class="cells default">
			<view class="cell">
				<view class="label">
					设为默认地址
				</view>
				<view class="content">
					<switch color="#e13031" :checked="is_default" @change="change"></switch>
				</view>
			</view>
		</view>
		<view class="btn-add">
			<button @click="save">保存收货地址</button>
		</view>
		<w-picker mode="region" :visible="showPicker" :value="addr_code" default-type="value" @cancel='showPicker=false'
			@confirm="confirm"></w-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addr_id: '',
				tel: '',
				name: '',
				is_default: false,
				addr_text: '',
				addr_code: [],
				detail: '',
				showPicker: false
			}
		},
		onLoad(params) {
			if(!params.id){
				return;
			}
			// console.log(params)
			this.addr_id = params.id;
			if (this.addr_id) {
				this.getAddressDetail()
			}
		},
		methods: {
			getAddressDetail() {
				let uid = this.$store.getters.uid;
				let _id = this.addr_id;
				this.$api.getAddressDetail({
					uid,
					_id
				}).then(response => {
					//console.log(response);
					let data = response.data[0];
					this.name = data.name;
					this.is_default = data.is_default;
					this.tel = data.tel;
					this.addr_text = data.addr_text;
					this.addr_code = data.addr_code;
					this.detail = data.detail;
				})
			},
			confirm(data) {
				console.log(data);
				this.addr_text = data.result;
				this.addr_code = data.value;
				this.showPicker = false;
			},
			save() {
				let {
					addr_id,
					addr_text,
					addr_code,
					name,
					tel,
					detail,
					is_default
				} = this;
				let uid = this.$store.getters.uid;
				let token = this.$store.getters.token;
				//console.log(is_default)
				this.$api.saveAddress({
					addr_id,
					addr_text,
					addr_code,
					name,
					tel,
					detail,
					is_default,
					uid,
					token
				}).then(response => {
					console.log(response)
					if(response.code==1){
						this.toast(response.msg);
						setTimeout(()=>{
							uni.navigateBack({
								dalta:1
							})
						},1000);
					}
				})
			},
			change() {
				this.is_default = this.is_default ? false : true;
			}
		}
	}
</script>

<style lang="scss">
	.page {
		width: 100%;
		height: 100%;

		.address-edit {
			.label {
				width: 160rpx;
				color: #666;
			}
		}

		.default {
			.cell {
				justify-content: space-between;

				.label {
					color: #666;
				}

				.content {
					text-align: right;
				}
			}
		}

		.btn-add {
			margin: 0 32rpx;

			button {
				background-color: #e13031;
				color: #fff;
				border-radius: 60rpx;
				width: 80%;
			}
		}
	}
</style>
