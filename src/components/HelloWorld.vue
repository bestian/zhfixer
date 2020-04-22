<template>
  <div class='main'>
    <h3>常見中文別字全文轉換器(例: 松口 =&gt; 鬆口)</h3>
    <br/>
    <div class="hello">
      <textarea class='left' rows="15" v-model="myText" placeholder="請貼上要轉換的文章全文" v-autofocus></textarea>
      <textarea class='right' rows="15" placeholder="這裡是結果" :value="tr(myText)"></textarea>
    </div>
    <div class="index">
      <ol>
        <li v-for="(t, idx) in transList" :key = "idx">
          {{ t[0] }} =&gt; {{t[1]}}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    tr (text) {
      var ans = text
      var list = this.transList
      for (let i = 0; i < list.length; i++) {
        const o = list[i][0]
        const n = list[i][1]
        const reg = new RegExp(o, 'g')
        ans = ans.replace(reg, n)
      }
      return ans
    }
  },
  mounted () {
    this.$http.get('/trans.json').then(response => {
      this.transList = response.data
    })
  },
  data () {
    return {
      myText: '',
      transList: ['松口', '鬆口']
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

.hello {
  width: 85vw;
  display: inline-flex;
  justify-content: top;
}

textarea {
  width: 85%;
  font-size: 16px;
}

.left, .right {
  display: inline-block;
  box-sizing: border-box;
  width: 50%;
  height: 62vh;
  padding: 5px;
}

.left {
  border: 3px dotted blue;
  border-radius: 15px 0 0 15px;
}
.right {
  border: 3px solid blue;
  border-radius: 0 15px 15px 0;
}

.res {
  white-space: pre;
}

.index {
  display: inline-block;
  max-width: 420px;
}

</style>
