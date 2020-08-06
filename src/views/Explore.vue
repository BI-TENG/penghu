<template>
  <div id="explore">
    <section id="section1" class="text-center">
      <h1>地 理 位 置</h1>
    </section>
    <b-container fluid>
      <b-row id="group-1" class="mt-5">
        <b-col class="col-6 col-md-4 mb-5">
          <b-img thumbnail fluid :src="'./images/老街.jpg'"></b-img>
          <div id="little-box">
            <p to="/magong">馬公市</p>
            <b-link to="/magong">舊稱媽宮，知名景點為澎湖天后宮、澎湖觀音亭、馬公城隍廟、中央老街、四眼井、馬公金龜(龍)頭砲臺等古蹟，以及第一手海鮮集散地第三漁港。</b-link>
          </div>
        </b-col>

        <b-col class="col-6 col-md-4 mb-5">
          <b-img thumbnail fluid :src="'./images/摩西分海.jpg'"></b-img>
          <div id="little-box">
            <p to="/huxi">湖西鄉</p>
            <b-link to="/huxi">湖西鄉是澎湖縣第一大鄉。澎湖八景，湖西鄉獨占其四。 隘門、林投潔白的沙灘成為吸引遊客留連駐足的最佳觀光景點。</b-link>
          </div>
        </b-col>

        <b-col class="col-6 col-md-4 mb-5">
          <b-img thumbnail fluid :src="'./images/東吉嶼.jpg'"></b-img>
          <div id="little-box">
            <p to="wangan">望安鄉</p>
            <b-link to="/wangan">澎湖縣面積最大的離島位於澎湖本島南方海上，且擁有漫長綿延沙灘並兼有自然天成的環境，因此每年夏天就有綠蠵龜陸續上岸產卵。</b-link>
          </div>
        </b-col>

        <b-col class="col-6 col-md-4 mb-5">
          <b-img thumbnail fluid :src="'./images/二崁聚落保存區.jpg'"></b-img>
          <div id="little-box">
            <p to="/xiyu">西嶼鄉</p>
            <b-link to="/xiyu">澎湖群島中的第二大島，與白沙鄉有澎湖跨海大橋連接。觀光點有：西嶼燈塔、二崁陳家大厝、大菓葉海岸、屹仔尾西流等。</b-link>
          </div>
        </b-col>

        <b-col class="col-6 col-md-4 mb-5">
          <b-img thumbnail fluid :src="'./images/雙心石滬.jpg'"></b-img>
          <div id="little-box">
            <p to="/qimei">七美鄉</p>
            <b-link to="/qimei">是澎湖縣最南端的一個鄉。為紀念明朝嘉靖年間倭寇侵犯本島，逼迫七位美女投井殉節之貞烈事蹟，始正式更名為「七美鄉」。</b-link>
          </div>
        </b-col>

        <b-col class="col-6 col-md-4 mb-5">
          <b-img thumbnail fluid :src="'./images/跨海大橋.jpg'"></b-img>
          <div id="little-box">
            <p to="/baisha">白沙鄉</p>
            <b-link to="/baisha">位於澎湖本島北方，與西嶼鄉有澎湖跨海大橋連接。因有綿長的白色沙灘而得名。</b-link>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <section id="section2" class="text-center">
      <h1>在 地 美 食</h1>
    </section>
    <b-carousel
      id="carousel-1"
      :interval="0"
      controls
      indicators
    >
      <b-carousel-slide>
        <template v-slot:img>
          <b-link class="col-6 col-md-3" v-b-modal="'modal1'">
            <img :src="'./images/馬路益燒肉飯01.jpg'" >
            <b-modal :id="'modal1'" title="馬路益燒肉飯" ok-only>
              <b-img fluid :src="'./images/馬路益燒肉飯.jpg'"></b-img>
              <p class="my-4">
                澎湖經營30年的好味道!位在澎湖市區巷子內的馬路益燒肉飯，一直以來都是馬公市區熱門推薦的美食之一，馬路益除了有名的燒肉＋雞腿雙拼外，花枝排也很夯的，吃起來不油膩，花枝排和雞腿酥脆可口、燒肉(排骨)鹹香厚實，除了賣燒肉飯以外，還有臭豆腐、蚵煎等特色小吃。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal2'">
            <img thumbnail :src="'./images/玉冠嫩仙草01.jpg'" >
            <b-modal :id="'modal2'" title="玉冠嫩仙草" ok-only>
              <b-img fluid :src="'./images/玉冠嫩仙草.jpg'"></b-img>
              <p class="my-4">
                澎湖排隊冰品，沁涼爽口的仙草剉冰，料實在又美味，在市區玉冠嫩仙草有兩家店，人最多的是位在民福路上店面，但想要吹冷氣內用的朋友記得到菊島之星。<br><br>民福店 :<br>玉冠嫩仙草的民福店餐點，幾乎是外帶系列的餐點，想吃仙草剉冰的話，只有菊島之星才有喲但除了剉冰以外，他們的仙草凍其實也是廣為人知的一道美味甜品<br><br>菊島之星店 :<br>菊島之星的餐點偏冰品較多，想吃純仙草凍的朋友，就到民福路上外帶吧！還有這邊也有總店沒賣的仙草蜜和果茶喲～
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal3'">
            <img thumbnail :src="'./images/前益堂藥膳蛋01.jpg'" >
            <b-modal :id="'modal3'" title="前益堂藥膳蛋" ok-only>
              <b-img fluid :src="'./images/前益堂藥膳蛋.jpg'"></b-img>
              <p class="my-4">
                當你在四眼井旁看到這座古色古香的建築，就代表你找到了乾益堂藥膳蛋，乾益堂藥行本身已經在澎湖開了近90年，老闆本來只是將所學的中藥知識熬煮藥膳蛋給朋友品嚐，卻意外受到好評鼓勵，才轉而開始販賣給遊客。<br><br>每顆飽滿的蛋都沈浸在十全大補的中藥材中，蛋白蛋黃都滷得十分入味而且吃起來不會太鹹，又有中藥的清香。另外也有賣藥膳豆干，也是不錯吃!
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal4'">
            <img thumbnail :src="'./images/阿豹香腸攤01.jpg'" >
            <b-modal :id="'modal4'" title="阿豹香腸攤" ok-only>
              <b-img fluid :src="'./images/阿豹香腸攤.jpg'"></b-img>
              <p class="my-4">
                賣的是炭烤大腸包小腸和多樣關東煮，關東煮有很多種選擇，湯還可以免費喝到飽，但阿豹香腸的份量和價位比較沒那麼討喜，但對於第一次來到澎湖的朋友是可以到阿豹香腸攤嘗鮮一下的！
              </p>
            </b-modal>
          </b-link>
        </template>
      </b-carousel-slide>

      <b-carousel-slide>
        <template v-slot:img>
          <b-link class="col-6 col-md-3" v-b-modal="'modal5'">
            <img thumbnail :src="'./images/劉正港檸檬汁01.jpg'" >
            <b-modal :id="'modal5'" title="劉正港檸檬汁" ok-only>
              <b-img fluid :src="'./images/劉正港檸檬汁.jpg'"></b-img>
              <p class="my-4">
                劉正港檸檬汁主打新鮮現打，且不添加冰塊的但會冷藏，冰涼的時候喝，有著微酸甜又不苦的味道，喝了很消暑又解渴。就連在地人也都會跟著我們這些觀光客一同排隊呢。口感是只有微酸感，而且不苦澀還有微微的甜味，喝起來很順口不卡喉，建議趕快喝完，等到不冰時酸度會提升，喝起來會有點澀口喲!<br><br>劉正港的飲品除了檸檬汁外，風茹茶也很有名，風茹茶俗稱澎湖的青草茶，喝起來還真的有青草茶涼涼清香的味道且甜度不高，在正熱的時候來一杯解渴又消暑。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal6'">
            <img thumbnail :src="'./images/鐘記燒餅01.jpg'" >
            <b-modal :id="'modal6'" title="鐘記燒餅" ok-only>
              <b-img fluid :src="'./images/鐘記燒餅.jpg'"></b-img>
              <p class="my-4">
                知名人氣早餐『鐘記燒餅(文康店)』，很特別的是可以包小管醬、干貝醬、吻仔魚，一般燒餅店比較不會出現的餡料。鐘記燒餅的燒餅口味有甜有鹹，燒餅本身是屬於有點厚度的厚燒餅，在口感上也會來的比較紮實一些!，價位平均在30-45元之間，加荷包蛋或起司再加10元，加蔥蛋的話是15元。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal18'">
            <img thumbnail :src="'./images/北新橋牛雜湯01.jpg'" >
            <b-modal :id="'modal18'" title="北新橋牛雜湯" ok-only>
              <b-img fluid :src="'./images/北新橋牛雜湯.jpg'"></b-img>
              <p class="my-4">
                來這裡必點的是牛雜湯、餡餅(炸肉包)和肉包。招牌牛雜湯是用牛骨加上黃牛肉下去慢火清燉的，湯的顏色看起來沒有很深但味道很濃郁，另外加入的薑絲也能夠去除肉的腥味，最後撒上蔥花讓整碗牛雜湯無論是顏色還是味道上口感層次都更豐富!
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal7'">
            <img thumbnail :src="'./images/香亭𩵚魠魚羹01.jpg'" >
            <b-modal :id="'modal7'" title="香亭𩵚魠魚羹" ok-only>
              <b-img fluid :src="'./images/香亭𩵚魠魚羹.jpg'"></b-img>
              <p class="my-4">
                香亭土魠魚羹在地人也愛，魚嫩湯香好滋味!這裡的羹湯是加入很多高麗菜一起熬煮的，而且高麗菜用得非常多。用高麗菜和柴魚一起熬煮的湯頭很鮮美，甜而不膩；而裹了粉去炸的土魠魚羹是現炸的，嫩又新鮮。
              </p>
            </b-modal>
          </b-link>
        </template>
      </b-carousel-slide>

      <b-carousel-slide>
        <template v-slot:img>
          <b-link class="col-6 col-md-3" v-b-modal="'modal8'">
            <img thumbnail :src="'./images/三哥雞排01.jpg'" >
            <b-modal :id="'modal8'" title="三哥雞排" ok-only>
              <b-img fluid :src="'./images/三哥雞排.jpg'"></b-img>
              <p class="my-4">
                秒殺級一小時完售的『澎湖三哥雞排酒釀雞排』，雞排大小約一個手掌大，酒釀的醃製處理，讓雞排吃起來帶點淡淡的酒香氣，咀嚼後還有微微的甜味，口味非常特別。如果不想現場等候太久建議可以打電話先預訂。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal9'">
            <img thumbnail :src="'./images/郵局口蔥油餅01.jpg'" >
            <b-modal :id="'modal9'" title="郵局口蔥油餅" ok-only>
              <b-img fluid :src="'./images/郵局口蔥油餅.jpg'"></b-img>
              <p class="my-4">
                郵局口蔥油餅的麵皮炸比較酥脆，類似抓餅夾上蛋的感覺，另外也可以依照自己喜好自由添加醬油膏、辣椒醬油、 胡椒粉、番茄醬等佐料都有，小黃瓜絲更是可以隨意加滿，搭配小黃瓜冰冰涼涼的綜合掉了蔥油餅的油膩感，吃起來意外的清爽，就看個人的喜好去加量。價目表：蔥油餅$30、單蛋$35、雙蛋$45。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal10'">
            <img thumbnail :src="'./images/炸粿01.jpg'" >
            <b-modal :id="'modal10'" title="講美回家炸粿" ok-only>
              <b-img fluid :src="'./images/炸粿.jpg'"></b-img>
              <p class="my-4">
                回家炸粿，白沙鄉講美人氣老店，新鮮現炸在地美食！招牌的雙拼炸粿又叫做大烏龜背蝦子，餡料有高麗菜、鮮蚵，面皮上則是澎湖有名的狗蝦，連殼吃沒問題！另外還有買霜淇淋還有送花枝頭!也推薦炸鮮蚵串，一串5粒且都很肥美，炸衣適中，新鮮又好。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal12'">
            <img thumbnail :src="'./images/澎湖人蛋黃麵01.jpg'" >
            <b-modal :id="'modal12'" title="澎湖人蛋黃麵" ok-only>
              <b-img fluid :src="'./images/澎湖人蛋黃麵.jpg'"></b-img>
              <p class="my-4">
                蛋黃麵，澎湖在地人推薦，地址位在澎湖城隍麵附近，份量不多，很適合觀光客當成小吃的安排。招牌蛋黃麵條Q，口感細緻，麵條本身還有一股特殊香氣，味道很香，且底下的醬汁鹹度也剛剛好，而配料有豬肉片和豆芽菜，整體口感真的不錯。
              </p>
            </b-modal>
          </b-link>
        </template>
      </b-carousel-slide>

      <b-carousel-slide>
        <template v-slot:img>
          <b-link class="col-6 col-md-3" v-b-modal="'modal11'">
            <img thumbnail :src="'./images/小管麵線.jpg'" >
            <b-modal :id="'modal11'" title="小管麵線" ok-only>
              <b-img fluid :src="'./images/小管麵線.jpg'"></b-img>
              <p class="my-4">
                小管可是澎湖最火紅的海鮮之一。夜釣小管，小管麵線，都是與小管息息相關的必遊、必吃的行程。澎湖小管遠近馳名，是每個來到當地的遊客必吃的菜餚之一。在潔白細緻的麵線上，小管粉嫩嫩穿透其中，灑上脆嫩的芹菜，海的甘甜馬上融入口中。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal13'">
            <img thumbnail :src="'./images/澎湖仙人掌.jpg'" >
            <b-modal :id="'modal13'" title="澎湖仙人掌" ok-only>
              <b-img fluid :src="'./images/澎湖仙人掌.jpg'"></b-img>
              <p class="my-4">
                仙人掌是外來種，原是駐軍種植成為天然的圍牆，其果實亦是當地小朋友的天然水菓。直到20幾年前有攤販研發販賣「仙人掌冰」，那艷麗的桃紅色澤與名稱，加上吃起來的酸甜。令人難忘。仙人掌系列餐點：仙人掌果汁、仙人掌果凍、 仙人掌涼麵、仙人掌炒飯。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal16'">
            <img thumbnail :src="'./images/澎湖黑糖糕.jpg'" >
            <b-modal :id="'modal16'" title="澎湖黑糖糕" ok-only>
              <b-img fluid :src="'./images/澎湖黑糖糕.jpg'"></b-img>
              <p class="my-4">
                黑糖糕原是澎湖糕點店的產品之一，開始熱門大約是30幾年前， 因應觀光需求，個別化包裝後，成為澎湖伴手禮之一。堅持不加防腐劑的黑糖糕，保鮮期室溫只有三天，也正由於它的新鮮可口，說明了數十年如一日澎湖人的敦厚精神。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal15'">
            <img thumbnail :src="'./images/XO醬.jpg'" >
            <b-modal :id="'modal15'" title="XO醬" ok-only>
              <b-img fluid :src="'./images/XO醬.jpg'"></b-img>
              <p class="my-4">
                用干貝、丁香魚、蝦米、香魚片、蒜頭、辣椒、紅蔥酥等製成的干貝醬，不管是單吃或淋到白飯上，皆有各自的獨特口感。遊客們若想細細回憶澎湖的海鮮味，擁有多層次口感的干貝醬是最好的伴手禮。
              </p>
            </b-modal>
          </b-link>
        </template>
      </b-carousel-slide>

      <b-carousel-slide>
        <template v-slot:img>
          <b-link class="col-6 col-md-3" v-b-modal="'modal17'">
            <img thumbnail :src="'./images/鹹餅.jpg'" >
            <b-modal :id="'modal17'" title="鹹餅" ok-only>
              <b-img fluid :src="'./images/鹹餅.jpg'"></b-img>
              <p class="my-4">
                澎湖販售鹹餅的特產店相當多，各家的口味也不盡相同。有的老店遵循古法，口味偏重鹹；有的則是因應現代人口味，較清爽，各有特色。在購買前不妨上網調查或是看看店內有無試吃品。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal14'">
            <img thumbnail :src="'./images/高麗菜炒土豆麩.jpg'" >
            <b-modal :id="'modal14'" title="高麗菜炒土豆麩" ok-only>
              <b-img fluid :src="'./images/高麗菜炒土豆麩.jpg'"></b-img>
              <p class="my-4">
                「土豆麩」就是碎花生粉，花生是澎湖特產，這道菜是窮人變通的菜色。花生富含油脂，先民只需以少許油將碎花生炒過，再加入高麗菜同炒，香甜好吃， 還可補充人體需要的油脂。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal19'">
            <img thumbnail :src="'./images/駝石鱉燉土豆.jpg'" >
            <b-modal :id="'modal19'" title="駝石鱉燉土豆" ok-only>
              <b-img fluid :src="'./images/駝石鱉燉土豆.jpg'"></b-img>
              <p class="my-4">
                又稱「海鋼盔」，是一種單殼貝類，貼附於潮間帶岩石上，肉雖小但有嚼勁，將之加在湯裏與花生同燉。澎湖海鮮百百種，現代人吃「奇巧」，對先民來說這些都是蛋白質來源呢。
              </p>
            </b-modal>
          </b-link>
          <b-link class="col-6 col-md-3" v-b-modal="'modal20'">
            <img thumbnail :src="'./images/鮖鮔燉排骨.jpg'" >
            <b-modal :id="'modal20'" title="鮖鮔燉排骨" ok-only>
              <b-img fluid :src="'./images/鮖鮔燉排骨.jpg'"></b-img>
              <p class="my-4">
                鮖鮔是章魚的一種，清炒鮖鮔料理並非澎湖人所愛，但鮖鮔曬乾後，拿它來滷肉，香味無法擋。鮖鮔滷五花肉是道地的澎湖家鄉菜，取肉精華部位，推出「鮖鮔燉排骨」，起鍋前加入青蒜，湯頭香味最是濃郁，這也是澎湖人吃章魚類海鮮的習慣。
              </p>
            </b-modal>
          </b-link>
        </template>
      </b-carousel-slide>
    </b-carousel>

    <b-col class="chevron-up-bg">
      <b-button pill href="#top"><font-awesome-icon :icon="['fas', 'chevron-up']" /></b-button>
    </b-col>
  </div>
</template>
