<template>
<div>
      <div class="headerText" align="center" style="height:40px">
    <h2>Inserisci qui la tua firma Digitale</h2> 
    <p v-if="errorSignature" style="color: red">La Firma è obbligatoria</p> 
  </div>
    <div class="firmadigitale">
        <VueSignaturePad
            height="300px"
            ref="signaturePad"
            />
    </div>
    <div class="btnSignature" style="padding-top:20px;">
        <vs-row>
            <vs-col vs-w="1" vs-type="flex" vs-justify="center" vs-align="center">
            </vs-col>
            <vs-col vs-w="4" vs-type="flex" vs-justify="center" vs-align="center">
                <b @click="undo" style="color:grey; font-size:20px">Ultima Modifica</b>
            </vs-col>
            <vs-col vs-w="2" vs-type="flex" vs-justify="center" vs-align="center">
            </vs-col>
            <vs-col vs-w="4" vs-type="flex" vs-justify="center" vs-align="center">
                <b @click="clear" style="color:#BC1254; font-size:20px">Cancella Tutto</b>
            </vs-col>
            <vs-col vs-w="1" vs-type="flex" vs-justify="center" vs-align="center">
            </vs-col>
        </vs-row>
    </div>
<vs-popup class="confirmSignature" button-close-hidden  title="La firma digitale è chiara e scritta in modo corretto?" :active.sync="popupSignature">
    <img :src="image" style="width:100%">
    <vs-row>
            <vs-col vs-w="6" vs-type="flex" vs-justify="center" vs-align="center">
                <b @click="popupSignature = false" style="color:#BC1254; font-size:20px">Annulla</b>
            </vs-col>
            <vs-col vs-w="6" vs-type="flex" vs-justify="center" vs-align="center">
              <vs-button 
        color="#BC1254" 
        size="large" 
        style="width: 100%;"
        icon="arrow_forward"
        icon-after
        @click="confirmSignature()" 
        type="filled">Conferma
    </vs-button>
            </vs-col>
        </vs-row>
    
</vs-popup>
</div>
</template>
<script>
  export default {
    name: 'digitalSignature',
    data(){
      return{
          popupSignature:false,
          image: '',
          errorSignature: false,
      }
    },
    methods: {
      undo() {
        this.$refs.signaturePad.undoSignature();
      },
      confirmSignature(){
            this.$emit("confirmSignature", this.image)
            this.popupSignature= false
      },
      save() {
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
        if(isEmpty) this.errorSignature = true
        else {this.errorSignature = false
        this.image = data
        this.popupSignature = true
        }
      },
      clear(){
        this.$refs.signaturePad.clearSignature()
      },
    }
  }
</script>
<style>
.firmadigitale{
  margin-top:20px;
  background-color: white;
  border-radius: 20px
}
</style>