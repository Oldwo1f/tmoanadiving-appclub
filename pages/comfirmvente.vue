<template>
	<div>
		<div>
			Vente comfirmé
			<br>
			Le compte client email@email.fr à été crédité de 10 plongée.
		</div>
	</div>
</template>

<script setup>

const { $store, $route, $dayjs, $axios } = useNuxtApp()
const { state } = $store


</script>

<style scoped lang="less">
@import '~static/less/variable.less';

div.center {
	text-align: center;
}

h1 {
	font-size: 2em;
	text-transform: uppercase;
	color: @blue;
	margin-top: 10px;
	font-weight: bold;
}

h3 a {
	font-size: 0.7em;
	color: @lightblue;
	float: right;
}

.search {
	width: 80%;
	margin-left: 10%;
	margin-top: 20px;
	position: relative;

	input {
		width: 100%;
		border: 2px solid @blue;
		border-radius: 10px;
		padding: 5px 15px;
		font-size: 1.5em;
	}

}

.search:after {
	content: "";
	width: 15px;
	height: 15px;
	background: url('assets/images/loupe.png');
	display: block;
	background-size: contain;
	position: absolute;
	right: 20px;
	top: 12px;
}

h3 {
	color: @blue;
	font-size: 1.5em;
	font-weight: bold;
	padding-bottom: 5px;
	border-bottom: 3px solid lightgrey;
	width: 80%;
	margin-left: 10%;
	text-align: left;
	margin-top: 20px;

}

.searchresult {
	width: 80%;
	margin-left: 10%;
	margin-top: -20px;
	padding-top: 20px;

	border: 2px solid @blue;

	.result {
		border-top: 1px solid @lightblue;
		// border-bottom :1px solid @lightblue;
		color: @blue;
		padding: 5px;
		// border-radius: 10px;
		margin-bottom: 0px;

		&:first-child {
			border-top: 0;
		}
	}
}

.blockclient {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: 80%;
	margin-left: 10%;
	border: 2px solid @blue;
	border-radius: 10px;
	padding: 10px 20px;
	margin-top: 20px;

	.picto {
		background: url('assets/images/plongeur principal.png') no-repeat center center;
		width: 40px;
		height: 40px;
		background-size: contain;
		margin-right: 30px;
	}

	.text {
		text-align: left;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		color: @blue;
		font-size: 1.2em;

		div {
			text-align: left;
			width: 100%;
		}

		label {
			display: inline;
			margin-bottom: 0;
		}

		span {
			display: inline;
			font-weight: bold;
		}
	}
}

form {
	width: 60%;
	margin-left: 20%;

	label {
		color: @blue;
		display: inline-block;
		font-size: 1.2em;
		margin-bottom: 5px;
	}

	input {
		margin-bottom: 15px;
		padding: 5px 15px;
		border-radius: 10px;
		border: 2px solid @blue;
		outline: 0;
	}

	input[type='number'] {
		font-size: 2.5em;
		width: 100px;
		text-align: center;
	}

	.btn {
		border: 2px solid @blue;
		padding: 7px 20px 5px 20px;
		font-size: 1.2em;
		border-radius: 10px;
		margin: 0 10px;
		color: @blue;

		&.active {
			background: @blue;
			color: white;
		}
	}
}

.separator {
	height: 3px;
	background: lightgrey;
	width: 60%;
	margin-left: 20%;
	margin-top: 20px;
	margin-bottom: 20px;
}

.textprice {
	color: @blue;
	font-size: 1.3em;
	line-height: 1.3em;

	span {
		font-weight: bold;
		font-size: 1.5em;
		line-height: 1em;
	}

	label {
		margin-bottom: 0;
	}
}

.btnValid {
	background: red;
	padding: 10px 15px;
	width: 60%;
	margin-left: 20%;
	border-radius: 50px;
	box-shadow: none;
	border: none;
	margin-top: 25px;
	outline: 0;
	text-align: center;
	font-weight: bold;
	color: white;
	text-transform: uppercase;
	font-size: 1.8em;
	cursor: pointer;
}
</style>