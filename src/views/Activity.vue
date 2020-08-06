<template>
  <div id="activity">
    <b-container>
      <b-card-group columns class="my-5">
        <b-link v-b-modal="'modal'+index" v-for="(item, index) in items" :key="index">
          <b-card id="card" class="mt-4"
            :title="item.title"
            :img-src="item.img"
            img-top
          >
            <b-card-text>{{item.text}}</b-card-text>
          </b-card>
          <b-modal :id="'modal'+index" scrollable hide-footer :title="item.title1">
              <b-img id="modal-img" fluid :src="item.modalimg" class="mt-3"></b-img>
              <p class="mt-4" v-html="item.p"></p>
            </b-modal>
        </b-link>
      </b-card-group>
    </b-container>

    <b-col class="chevron-up-bg">
      <b-button pill href="#top"><font-awesome-icon :icon="['fas', 'chevron-up']" /></b-button>
    </b-col>
  </div>
</template>

<script>
export default {
  name: 'activity',
  data () {
    return {
      items: [
        {
          title: '海上牧場',
          img: './images/海上牧場.jpg',
          text: '鮮蚵吃到飽｜體驗海上牧場垂釣樂',
          title1: '海上牧場',
          modalimg: './images/海上牧場.jpg',
          p: '介紹：<br>來訪澎湖必遊的海上平台，以海為田、放魚為牧。意指在某一海域內，採用一整套規模化的漁業設施和系統化的管理體制，利用自然的海洋生態環境，將人工放流的經濟海洋生物聚集起來，進行海上放養魚蝦貝類的大型人工漁場。旅客們可乘船至海洋牧場，體驗誘釣海鱺魚，還可品嚐美味的炭烤鮮蚵。<br><br>特色：<br>◆品嚐鮮美、料多的海鮮粥，更有自助烤牡蠣，補充滿滿體力<br>◆體驗釣海鱺魚，即使是用無鉤魚餌也可感受一番搏鬥<br>◆提供海上平台卡拉OK，盡情在海上放聲高歌。'
        },
        {
          title: '夜釣小管',
          img: './images/澎湖夜釣.jpg',
          text: '搭船出海，親自誘釣小管',
          title1: '夜釣小管',
          modalimg: './images/澎湖夜釣.jpg',
          p: '搭船出海，親自誘釣小管，搏力鬥智，感受傳統漁撈和漁民的甘苦，現殺現吃沙西米，新鮮味美口感鮮甜的享受，船家還會以新鮮小管烹煮小管麵條或麵線，品嘗截然不同口感和鮮味，在海釣船上感受澎湖燦爛的星晚，邊玩邊釣，享受不一樣的休閒生活'
        },
        {
          title: '海底漫步',
          img: './images/澎湖龍宮浮淺.jpg',
          text: '登陸海底 窺探海底世界',
          title1: '海底漫步',
          modalimg: './images/澎湖龍宮浮淺.jpg',
          p: '◆不會游泳也可以玩<br>◆一次玩轉海底漫步、浮潛跟近兩層樓高的地方跳海<br>◆可以雙腳踩在海底超特別<br>◆全程有教練幫忙水下水上攝影作紀念'
        },
        {
          title: '獨木舟',
          img: './images/獨木舟.jpg',
          text: '龍宮浮潛 + sup板體驗',
          title1: '龍宮浮潛 + sup板體驗',
          modalimg: './images/獨木舟.jpg',
          p: '來到世界最美麗的海灣，由專業教練帶領您，一起探索神秘的海底龍宮世界，欣賞各種色彩繽紛的珊瑚及魚群，偶然出現翱翔的洪魚，可愛又超萌的河豚，人見人愛的派大星，成群的鸚哥魚，夢幻的藍雀鯛、神仙魚等美不勝收，贈送SUP板教學，教練耐心的教學技巧可以很快的上手，享受乘風破浪的成就感!'
        },
        {
          title: '夜探龍宮',
          img: './images/夜探龍宮.jpg',
          text: '夜訪潮間帶',
          title1: '夜探龍宮',
          modalimg: './images/夜探龍宮.jpg',
          p: '月光灑落，水波上漂游著稀疏小魚，細細蕩出圈圈漣漪，天地間靜得彷彿睡著，所有聲音似乎都被隔絕於凡俗之外，潮水靜止不動，天上星星好近~好近。受驚嚇的海洋生物，水深及膝處可能突發的驚喜，隨著燈火掃過水面引得海面下都動了起來。<br><br>大狗仔的光手滑面蟹癡肥地爬入洞穴，蝦子透明的身軀優游的隨潮水飄蕩，若非在暗夜裡發亮著眼睛，恐怕真難發現，各類海洋生物有些睡著有些動了起來。如此的驚豔探索、就屬特別的妳。'
        },
        {
          title: '澎湖海釣',
          img: './images/澎湖海釣.jpg',
          text: '帶您前往私人釣點，專業海釣系列--海釣船體驗班',
          title1: '澎湖海釣',
          modalimg: './images/澎湖海釣.jpg',
          p: '來到澎湖 想要體驗釣魚人的渡假生活嗎？<br>兩手空空甚麼都沒帶？怎麼辦呢？<br>沒關係都替你準備好囉!<br>不用帶任何裝備就能上船 體驗釣魚人的生活<br>就算你沒有任何經驗，想要體驗看看也是可以的唷!'
        },
        {
          title: '隘門沙灘透明獨木舟',
          img: './images/隘門沙灘透明獨木舟.jpg',
          text: '與親朋好友一同划著透明獨木舟，輕鬆欣賞海面下的景色',
          title1: '隘門沙灘透明獨木舟',
          modalimg: './images/隘門沙灘透明獨木舟.jpg',
          p: '◆澎湖期間限定夏日活動，盡情享受夏天海邊的熱情時光<br>◆透明獨木舟，讓你不用下水即可欣賞美麗的海底世界<br>◆行程長度：2 - 3 小時'
        },
        {
          title: 'SUP 立式划槳巡航',
          img: './images/SUP 立式划槳巡航.jpg',
          text: 'SUP 立式划槳巡航＋欣賞浪漫海中夕陽',
          title1: 'SUP 立式划槳巡航＋欣賞浪漫海中夕陽',
          modalimg: './images/SUP 立式划槳巡航.jpg',
          p: '擁有多樣性玩法的 SUP，可以站著玩、跪著划、坐著划，既安全又刺激！歡迎一起從海上出發，欣賞美麗的海岸線，吸收海洋的氣息。抑或避開烈陽，享受浪漫氛圍。讓我們一同在海上追逐夕陽，寫下美好回憶！'
        },
        {
          title: '藍洞巡航',
          img: './images/藍洞.jpg',
          text: '一起感受到那夢幻的神秘感',
          title1: '藍洞巡航',
          modalimg: './images/藍洞.jpg',
          p: '位於澎湖南方四島的西吉嶼為玄武岩地質，因海水侵蝕雃成形的海蝕洞，加上頂端風化而崩塌形成了藍洞，又被稱為「灶籠」。在烈日陽光射入海蝕洞時，洞中海水反射出極為清澈又閃耀的藍光，是大自然打造出的天然神秘美景。<br><br>澎湖藍洞已列入澎湖縣南海玄武岩自然保留區的範圍內，須經過「申請」才可到此，想要一覽這神秘藍洞，唯一方式只有搭乘合法船隻才能靠近，不過澎湖藍洞即便遠觀，也能感受到那夢幻的神秘感。'
        }
      ]
    }
  }
}
</script>
