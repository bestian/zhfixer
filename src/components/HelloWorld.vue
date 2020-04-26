<template>
  <div class='main'>
    <h3>常見中文別字全文轉換器(例: 松口 =&gt; 鬆口)</h3>
    <br/>
    <div class="hello">
      <textarea class='left' rows="15" v-model="myText" placeholder="請貼上要轉換的文章全文" v-autofocus></textarea>
      <textarea class='right' rows="15" placeholder="這裡是結果" :value="tr(myText)"></textarea>
    </div>
    <br/>
    <div class="source">
      <ol>
        <li>
          <a href="https://www.github.com/bestian/zhfixer" target="_blank">原始碼</a>
        </li>
        <li>
          <a href="https://bestian.github.io/zhfixer/trans.json" target="_blank">元資料</a>
        </li>
      </ol>
    </div>
    <br/>
<!--    <div class="index">
      <ol>
        <li v-for="(t, idx) in transList2" :key = "idx">
          <pre>{{ t[0] }}&#9;{{t[1]}}</pre>
        </li>
      </ol>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    tr (text) {
      var ans = text
      var list = this.transList2
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
    var vm = this
    this.$http.get('https://bestian.github.io/zhfixer/trans.json').then(response => {
      vm.transList1 = response.data
      // this.$http.get('/diffZhCn-ZhTw.txt').then(response => {
      //  var par = (txt) => { return txt.split('\n').map((l) => { return l.split('\t') }) }
      //  vm.transList1 = par(response.data)
      this.$http.get('https://bestian.github.io/zhfixer/trans.txt').then(response => {
        var par = (txt) => { return txt.split('\n').map((l) => { return l.split('\t') }) }
        vm.transList2 = par(response.data)
        console.log(vm.transList2.map((a) => { return a[0] }).indexOf('发妻'))
        for (var i = 0; i < vm.transList1.length; i++) {
          var s = vm.transList1[i][0]
          var t = vm.transList1[i][1]
          console.log(s)
          if (vm.transList2.map((a) => { return a[0] }).indexOf(s) === -1) {
            vm.transList.push([s, t])
            vm.transList2.push([s, t])
          }
        }
        vm.transList2.sort()
      })
    })
  },
  data () {
    return {
      myText: '',
      transList: [],
      transList1: [],
      transList2: []
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

.index, .source {
  display: inline-block;
  max-width: 420px;
  text-align: left;
}

</style>
