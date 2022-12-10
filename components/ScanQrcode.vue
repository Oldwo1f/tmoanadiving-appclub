<template>
	<div class="blockQR">
			<div class="text">Scanner le QR Code du client</div>
			<div class="QRCODE" v-if="showScanner">
				<client-only>
					<StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
					<!-- <qrcode-stream @decode="onDecode" @init="oninit"></qrcode-stream> -->
					<!-- <vue-qr-reader /> -->
				</client-only>
			</div>
	</div>
</template>
<script setup>

// import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import { StreamBarcodeReader } from "vue-barcode-reader";

const props = defineProps({
  
})
const emit = defineEmits(['found'])

const showScanner = ref(false);
const onDecode = function (val,t) {

	// alert('decode ++'+ val);
	
    emit('found', val)
	
}

// setTimeout(function () {
	showScanner.value = true;
// },2000)
const onLoaded = async function (promise) {
	console.log('init');
	console.log(promise);
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          console.log("ERROR: you need to grant camera access permission")
        } else if (error.name === 'NotFoundError') {
          console.log("ERROR: no camera on this device")
        } else if (error.name === 'NotSupportedError') {
          console.log("ERROR: secure context required (HTTPS, localhost)")
        } else if (error.name === 'NotReadableError') {
          console.log("ERROR: is the camera already in use?")
        } else if (error.name === 'OverconstrainedError') {
          console.log("ERROR: installed cameras are not suitable")
        } else if (error.name === 'StreamApiNotSupportedError') {
          console.log("ERROR: Stream API is not supported in this browser")
        } else if (error.name === 'InsecureContextError') {
			console.log('ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.')
        } else {
          console.log(`ERROR: Camera error (${error.name})`)
        }
      }
}
</script>

<style lang="less">
@import '~static/less/variable.less';

.blockQR {
	background: @blue;
	background: linear-gradient(184deg, @blue 0%, @lightblue 100%);
	width: 90%;
	margin-left: 5%;
	border-radius: 20px;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	margin-top: 30px;
	position: relative;


	.text {
		text-transform: uppercase;
		font-weight: bold;
		font-size: 1.2em;
		text-align: center;
		line-height: 1.2em;
		margin-bottom: 10px;

	}

	.QRCODE {
		width: 95%;
		border-radius: 20px;
		background: white;
		min-height:20px;
		// aspect-ratio: 1/1;

	}
}




</style>